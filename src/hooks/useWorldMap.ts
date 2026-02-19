"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { geoCentroid, geoNaturalEarth1, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { feature, mesh } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import { cities } from "@/data";
import { useInView } from "./useInView";
import { useMediaQuery } from "./useMediaQuery";
import {
  WORLD_MAP_DESKTOP_PADDING,
  WORLD_MAP_DIMENSIONS,
  WORLD_MAP_MASK_STOPS,
  WORLD_MAP_MOBILE_BREAKPOINT_QUERY,
  WORLD_MAP_MOBILE_PADDING,
  WORLD_MAP_TOPOJSON_URL,
} from "@/constants";

interface FocusBounds {
  minLng: number;
  maxLng: number;
  minLat: number;
  maxLat: number;
}

interface MapPaths {
  land: string[];
  borders: string;
}

const EMPTY_MAP_PATHS: MapPaths = {
  land: [],
  borders: "",
};

type GeoFeature = Feature<Geometry> | FeatureCollection<Geometry>;

const flattenFeatures = (geoData: GeoFeature): Feature<Geometry>[] => {
  if (geoData.type !== "FeatureCollection") {
    return [geoData];
  }

  return geoData.features as Feature<Geometry>[];
};

export const useWorldMap = () => {
  const { ref: mapContainerRef, isVisible: isMapInView } =
    useInView<HTMLDivElement>({ threshold: 0.15 });
  const [mapPaths, setMapPaths] = useState<MapPaths>(EMPTY_MAP_PATHS);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const isMobile = useMediaQuery(WORLD_MAP_MOBILE_BREAKPOINT_QUERY);

  const uid = useId().replace(/:/g, "");
  const fadeGradientId = `map-fade-${uid}`;
  const maskId = `map-mask-${uid}`;

  const focusedPadding = isMobile
    ? WORLD_MAP_MOBILE_PADDING
    : WORLD_MAP_DESKTOP_PADDING;

  const focusBounds = useMemo<FocusBounds>(() => {
    const longitudeValues = cities.map((city) => city.lng);
    const latitudeValues = cities.map((city) => city.lat);

    return {
      minLng: Math.min(...longitudeValues) - focusedPadding.lngPad,
      maxLng: Math.max(...longitudeValues) + focusedPadding.lngPad,
      minLat: Math.min(...latitudeValues) - focusedPadding.latPad,
      maxLat: Math.max(...latitudeValues) + focusedPadding.latPad,
    };
  }, [focusedPadding.latPad, focusedPadding.lngPad]);

  const focusRegion = useMemo(
    () =>
      ({
        type: "MultiPoint",
        coordinates: cities.map(
          (city) => [city.lng, city.lat] as [number, number],
        ),
      }) as Geometry,
    [],
  );

  const projection = useMemo(
    () =>
      geoNaturalEarth1().fitExtent(
        [
          [focusedPadding.xPad, focusedPadding.yPad],
          [
            WORLD_MAP_DIMENSIONS.width - focusedPadding.xPad,
            WORLD_MAP_DIMENSIONS.height - focusedPadding.yPad,
          ],
        ],
        focusRegion,
      ),
    [focusRegion, focusedPadding.xPad, focusedPadding.yPad],
  );

  const pathGenerator = useMemo(() => geoPath(projection), [projection]);

  useEffect(() => {
    let isCancelled = false;
    const abortController = new AbortController();

    const loadMapPaths = async () => {
      try {
        const response = await fetch(WORLD_MAP_TOPOJSON_URL, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load world map data");
        }

        const worldTopology = (await response.json()) as Topology;
        const countriesGeometry = worldTopology.objects[
          "countries"
        ] as GeometryCollection;
        const countriesGeo = feature(worldTopology, countriesGeometry);

        const countryFeatures = flattenFeatures(countriesGeo as GeoFeature);

        const filteredLandPaths = countryFeatures
          .filter((countryFeature) => {
            const [longitude, latitude] = geoCentroid(countryFeature);
            return (
              longitude >= focusBounds.minLng &&
              longitude <= focusBounds.maxLng &&
              latitude >= focusBounds.minLat &&
              latitude <= focusBounds.maxLat
            );
          })
          .map((countryFeature) => pathGenerator(countryFeature) ?? "")
          .filter(Boolean);

        const borderGeometry = mesh(
          worldTopology,
          countriesGeometry,
          (leftCountry, rightCountry) => leftCountry !== rightCountry,
        );
        const borderPath = pathGenerator(borderGeometry) ?? "";

        if (isCancelled) return;

        setMapPaths({ land: filteredLandPaths, borders: borderPath });
        setIsMapLoaded(true);
      } catch {
        if (abortController.signal.aborted || isCancelled) return;
        setMapPaths(EMPTY_MAP_PATHS);
        setIsMapLoaded(false);
      }
    };

    loadMapPaths();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, [focusBounds, pathGenerator]);

  const hubProjection = projection([cities[0].lng, cities[0].lat]) ?? [0, 0];
  const hubPoint: [number, number] = [hubProjection[0], hubProjection[1]];
  const isMapActive = isMapInView && isMapLoaded;

  const maskStops = isMobile
    ? WORLD_MAP_MASK_STOPS.mobile
    : WORLD_MAP_MASK_STOPS.desktop;

  return {
    mapContainerRef,
    mapPaths,
    projection,
    hubPoint,
    isMapActive,
    isMobile,
    maskStops,
    fadeGradientId,
    maskId,
  };
};

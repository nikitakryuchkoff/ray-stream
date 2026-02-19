"use client";

import { WORLD_MAP_DIMENSIONS } from "@/constants/worldMap";
import { cities } from "@/data/cities";
import { useWorldMap } from "@/hooks/useWorldMap";

export default function WorldMap() {
  const {
    mapContainerRef,
    mapPaths,
    projection,
    hubPoint,
    isMapActive,
    isMobile,
    maskStops,
    fadeGradientId,
    maskId,
  } = useWorldMap();

  return (
    <div ref={mapContainerRef}>
      <svg
        viewBox={`0 0 ${WORLD_MAP_DIMENSIONS.width} ${WORLD_MAP_DIMENSIONS.height}`}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          <radialGradient id={fadeGradientId} cx="50%" cy="48%" r={maskStops.radius}>
            <stop offset={maskStops.core} stopColor="white" stopOpacity="1" />
            <stop offset={maskStops.soft} stopColor="white" stopOpacity="0.5" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={maskId}>
            <rect
              width={WORLD_MAP_DIMENSIONS.width}
              height={WORLD_MAP_DIMENSIONS.height}
              fill={`url(#${fadeGradientId})`}
            />
          </mask>
        </defs>

        <g mask={`url(#${maskId})`}>
          <g>
            {mapPaths.land.map((landPath, index) => (
              <path
                key={`land-${index}`}
                d={landPath}
                fill="rgba(255,255,255,.08)"
                stroke="rgba(255,255,255,.03)"
                strokeWidth=".25"
              />
            ))}
            {mapPaths.borders && (
              <path
                d={mapPaths.borders}
                fill="none"
                stroke="rgba(255,255,255,.03)"
                strokeWidth=".2"
              />
            )}
          </g>

          <g>
            {cities.slice(1).map((city, index) => {
              const projectedCityPoint =
                projection([city.lng, city.lat]) ?? [hubPoint[0], hubPoint[1]];
              const controlPointX = (hubPoint[0] + projectedCityPoint[0]) / 2;
              const controlPointY = (hubPoint[1] + projectedCityPoint[1]) / 2 - 25;

              return (
                <path
                  key={city.name}
                  d={`M${hubPoint[0]},${hubPoint[1]} Q${controlPointX},${controlPointY} ${projectedCityPoint[0]},${projectedCityPoint[1]}`}
                  fill="none"
                  stroke="rgba(255,255,255,.1)"
                  strokeWidth={isMobile ? "1.1" : ".8"}
                  strokeDasharray={isMobile ? "3,3" : "4,4"}
                  opacity={isMapActive ? 1 : 0}
                  style={{
                    transition: `opacity 1s var(--ease) ${0.4 + index * 0.1}s`,
                  }}
                />
              );
            })}
          </g>

          <g>
            {cities.map((city, index) => {
              const [x, y] = projection([city.lng, city.lat]) ?? [0, 0];
              const isHubCity = Boolean(city.hub);

              const outerRadius = isHubCity
                ? isMobile
                  ? 9
                  : 8
                : isMobile
                  ? 6
                  : 5;
              const innerRadius = isHubCity
                ? isMobile
                  ? 4.5
                  : 4
                : isMobile
                  ? 2.8
                  : 2.2;
              const textSize = isHubCity
                ? isMobile
                  ? 9
                  : 8
                : isMobile
                  ? 8
                  : 7;

              const cityDelaySeconds = `${0.3 + index * 0.12}s`;

              return (
                <g key={city.name}>
                  <circle
                    cx={x}
                    cy={y}
                    r={outerRadius}
                    fill="none"
                    stroke={`rgba(255,255,255,${isHubCity ? ".4" : ".25"})`}
                    strokeWidth={isHubCity ? ".8" : ".6"}
                    opacity={isMapActive ? 1 : 0}
                    style={{
                      transition: `opacity .6s var(--ease) ${cityDelaySeconds}`,
                      animation: isMapActive
                        ? `ringP ${isHubCity ? 2.5 : 3}s ease-in-out infinite ${index * 0.3}s`
                        : "none",
                    }}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={innerRadius}
                    fill="#fff"
                    opacity={isMapActive ? (isHubCity ? 1 : 0.8) : 0}
                    style={{
                      transition: `opacity .6s var(--ease) ${cityDelaySeconds}`,
                    }}
                  />
                  <text
                    x={x}
                    y={y - (isHubCity ? (isMobile ? 18 : 16) : isMobile ? 14 : 12)}
                    textAnchor="middle"
                    fill={`rgba(255,255,255,${isHubCity ? ".55" : ".35"})`}
                    fontSize={textSize}
                    fontWeight={isHubCity ? 500 : 400}
                    fontFamily="'DM Sans', sans-serif"
                    letterSpacing={isHubCity ? "1.5px" : "1px"}
                    opacity={isMapActive ? 1 : 0}
                    style={{
                      transition: `opacity .6s var(--ease) ${0.5 + index * 0.1}s`,
                    }}
                  >
                    {city.name}
                  </text>
                </g>
              );
            })}
          </g>
        </g>

        <style>{`@keyframes ringP{0%,100%{r:5;opacity:.4}50%{r:14;opacity:0}}`}</style>
      </svg>
    </div>
  );
}

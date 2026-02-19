export const WORLD_MAP_DIMENSIONS = {
  width: 960,
  height: 500,
} as const;

export const WORLD_MAP_TOPOJSON_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export const WORLD_MAP_MOBILE_BREAKPOINT_QUERY = "(max-width: 768px)";

export const WORLD_MAP_DESKTOP_PADDING = {
  xPad: 170,
  yPad: 95,
  lngPad: 18,
  latPad: 12,
} as const;

export const WORLD_MAP_MOBILE_PADDING = {
  xPad: 72,
  yPad: 40,
  lngPad: 10,
  latPad: 7,
} as const;

export const WORLD_MAP_MASK_STOPS = {
  desktop: {
    radius: "68%",
    core: "62%",
    soft: "86%",
  },
  mobile: {
    radius: "82%",
    core: "72%",
    soft: "93%",
  },
} as const;

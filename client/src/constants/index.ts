// API Configuration
export const API_BASE_URL = "https://red-report.vercel.app/api";
export const API_ENDPOINTS = {
  IMPORT: `${API_BASE_URL}/import`,
  UPLOAD: `${API_BASE_URL}/upload`,
} as const;

// Map Configuration
export const MAP_CONFIG = {
  CENTER: [41.7002, -86.2379] as [number, number],
  ZOOM: 15,
  MIN_ZOOM: 15,
  MAX_ZOOM: 19,
  BOUNDS: [
    [41.7152, -86.2079],
    [41.6852, -86.2679],
  ] as [[number, number], [number, number]],
  MAPTILER_STYLE: "80390579-ac14-4623-ba3e-80bdbcb7bd5f",
  MAPTILER_API_KEY: "4XUdc4BtSv2psaIP6grE",
} as const;

// Incident Types
export const INCIDENT_TYPES = {
  UNCOMFORTABLE_SITUATION: 0,
  SEXUAL_HARASSMENT: 1,
  PHYSICAL: 2,
  VERBAL_AGGRESSION: 3,
  DISCRIMINATION: 4,
} as const;

export const INCIDENT_TYPE_NAMES = {
  [INCIDENT_TYPES.UNCOMFORTABLE_SITUATION]: "Uncomfortable Situation",
  [INCIDENT_TYPES.SEXUAL_HARASSMENT]: "Sexual Harassment",
  [INCIDENT_TYPES.PHYSICAL]: "Physical",
  [INCIDENT_TYPES.VERBAL_AGGRESSION]: "Verbal Aggression",
  [INCIDENT_TYPES.DISCRIMINATION]: "Discrimination",
} as const;

// Map Colors
export const MAP_COLORS = {
  UNCOMFORTABLE: "#de9e36",
  HARASSMENT: "#ca3c25",
  PHYSICAL: "#701d52",
  VERBAL: "#212475",
  DISCRIMINATION: "#1d1a05",
  MARKER: "black",
} as const;

// Firebase Configuration
export const FIREBASE_CONFIG = {
  COLLECTION_NAME: "Test",
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
} as const;

// UI Configuration
export const UI_CONFIG = {
  MAX_HALL_COUNT: 6,
  CIRCLE_RADIUS_MULTIPLIER: 5,
  MARKER_RADIUS: 3,
  MARKER_OPACITY: 0.9,
} as const;

// client/src/services/analyticsService.ts
import { analytics } from "../config/firebase.ts";
import { Analytics, logEvent } from "firebase/analytics";

export class AnalyticsService {
  static logReportSubmission(
    hall: string,
    type: number,
    hallData?: any,
    deviceInfo?: any
  ) {
    if (analytics) {
      logEvent(analytics as Analytics, "report_submitted", {
        hall_name: hall,
        incident_type: type,
        building_type: hallData?.buildingType || "Unknown",
        location: hallData?.location || "Unknown",
        platform: deviceInfo?.platform || "Unknown",
        browser: deviceInfo?.browser || "Unknown",
        screen_resolution: deviceInfo?.screenResolution || "Unknown",
        timestamp: new Date().toISOString(),
      });
    }
  }

  static logMapView() {
    if (analytics) {
      logEvent(analytics as Analytics, "map_viewed", {
        timestamp: new Date().toISOString(),
      });
    }
  }

  static logError(error: string, context?: string) {
    if (analytics) {
      logEvent(analytics as Analytics, "error_occurred", {
        error_message: error,
        context: context || "general",
        timestamp: new Date().toISOString(),
      });
    }
  }

  static logHallSelection(hall: string, buildingType: string) {
    if (analytics) {
      logEvent(analytics as Analytics, "hall_selected", {
        hall_name: hall,
        building_type: buildingType,
        timestamp: new Date().toISOString(),
      });
    }
  }

  static logTypeSelection(type: number, typeName: string) {
    if (analytics) {
      logEvent(analytics as Analytics, "type_selected", {
        type_id: type,
        type_name: typeName,
        timestamp: new Date().toISOString(),
      });
    }
  }

  static logSessionStart(sessionId: string, deviceInfo?: any) {
    if (analytics) {
      logEvent(analytics as Analytics, "session_started", {
        session_id: sessionId,
        platform: deviceInfo?.platform || "Unknown",
        browser: deviceInfo?.browser || "Unknown",
        language: deviceInfo?.language || "Unknown",
        timezone: deviceInfo?.timezone || "Unknown",
        timestamp: new Date().toISOString(),
      });
    }
  }

  static logIncidentSeverity(severity: number, typeName: string) {
    if (analytics) {
      logEvent(analytics as Analytics, "incident_severity", {
        severity_level: severity,
        incident_type: typeName,
        timestamp: new Date().toISOString(),
      });
    }
  }

  static logBuildingTypeAnalysis(buildingType: string, incidentCount: number) {
    if (analytics) {
      logEvent(analytics as Analytics, "building_type_analysis", {
        building_type: buildingType,
        incident_count: incidentCount,
        timestamp: new Date().toISOString(),
      });
    }
  }

  static logGeographicAnalysis(
    location: string,
    latitude?: number,
    longitude?: number
  ) {
    if (analytics) {
      logEvent(analytics as Analytics, "geographic_analysis", {
        location: location,
        latitude: latitude,
        longitude: longitude,
        timestamp: new Date().toISOString(),
      });
    }
  }
}

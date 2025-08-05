// Utility functions for analyzing enhanced report data

import { Case } from "../types/index.ts";

export interface IncidentAnalysis {
  totalIncidents: number;
  incidentsByType: { [key: number]: number };
  incidentsByBuildingType: { [key: string]: number };
  incidentsByLocation: { [key: string]: number };
  averageSeverity: number;
  mostCommonLocations: Array<{ location: string; count: number }>;
  mostCommonBuildingTypes: Array<{ buildingType: string; count: number }>;
  timeDistribution: {
    hourly: { [key: number]: number };
    daily: { [key: number]: number };
    monthly: { [key: number]: number };
  };
  deviceAnalysis: {
    platforms: { [key: string]: number };
    browsers: { [key: string]: number };
  };
}

export function analyzeIncidents(reports: Case[]): IncidentAnalysis {
  const analysis: IncidentAnalysis = {
    totalIncidents: reports.length,
    incidentsByType: {},
    incidentsByBuildingType: {},
    incidentsByLocation: {},
    averageSeverity: 0,
    mostCommonLocations: [],
    mostCommonBuildingTypes: [],
    timeDistribution: {
      hourly: {},
      daily: {},
      monthly: {},
    },
    deviceAnalysis: {
      platforms: {},
      browsers: {},
    },
  };

  let totalSeverity = 0;
  const locationCounts: { [key: string]: number } = {};
  const buildingTypeCounts: { [key: string]: number } = {};

  reports.forEach((report) => {
    // Count by incident type
    analysis.incidentsByType[report.Type] =
      (analysis.incidentsByType[report.Type] || 0) + 1;

    // Count by building type
    const buildingType = report.hallData?.buildingType || "Unknown";
    analysis.incidentsByBuildingType[buildingType] =
      (analysis.incidentsByBuildingType[buildingType] || 0) + 1;
    buildingTypeCounts[buildingType] =
      (buildingTypeCounts[buildingType] || 0) + 1;

    // Count by location
    const location = report.hallData?.location || "Unknown";
    analysis.incidentsByLocation[location] =
      (analysis.incidentsByLocation[location] || 0) + 1;
    locationCounts[location] = (locationCounts[location] || 0) + 1;

    // Time distribution
    const date = new Date(report.Time);
    const hour = date.getHours();
    const day = date.getDay();
    const month = date.getMonth();

    analysis.timeDistribution.hourly[hour] =
      (analysis.timeDistribution.hourly[hour] || 0) + 1;
    analysis.timeDistribution.daily[day] =
      (analysis.timeDistribution.daily[day] || 0) + 1;
    analysis.timeDistribution.monthly[month] =
      (analysis.timeDistribution.monthly[month] || 0) + 1;

    // Device analysis
    if (report.deviceInfo) {
      const platform = report.deviceInfo.platform || "Unknown";
      const browser = report.deviceInfo.browser || "Unknown";

      analysis.deviceAnalysis.platforms[platform] =
        (analysis.deviceAnalysis.platforms[platform] || 0) + 1;
      analysis.deviceAnalysis.browsers[browser] =
        (analysis.deviceAnalysis.browsers[browser] || 0) + 1;
    }
  });

  // Sort locations by count
  analysis.mostCommonLocations = Object.entries(locationCounts)
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count);

  // Sort building types by count
  analysis.mostCommonBuildingTypes = Object.entries(buildingTypeCounts)
    .map(([buildingType, count]) => ({ buildingType, count }))
    .sort((a, b) => b.count - a.count);

  return analysis;
}

export function getIncidentsByTimeRange(
  reports: Case[],
  startDate: Date,
  endDate: Date
): Case[] {
  return reports.filter((report) => {
    const reportDate = new Date(report.Time);
    return reportDate >= startDate && reportDate <= endDate;
  });
}

export function getIncidentsByGeographicArea(
  reports: Case[],
  centerLat: number,
  centerLng: number,
  radiusKm: number
): Case[] {
  return reports.filter((report) => {
    if (!report.hallData?.latitude || !report.hallData?.longitude) return false;

    const distance = calculateDistance(
      centerLat,
      centerLng,
      report.hallData.latitude,
      report.hallData.longitude
    );

    return distance <= radiusKm;
  });
}

function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function generateReportSummary(analysis: IncidentAnalysis): string {
  const summary = [
    `Total Incidents: ${analysis.totalIncidents}`,
    `Average Severity: ${analysis.averageSeverity.toFixed(2)}`,
    `Most Common Location: ${
      analysis.mostCommonLocations[0]?.location || "N/A"
    } (${analysis.mostCommonLocations[0]?.count || 0} incidents)`,
    `Most Common Building Type: ${
      analysis.mostCommonBuildingTypes[0]?.buildingType || "N/A"
    }`,
  ];

  return summary.join("\n");
}

import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import React from "react";
import { NDHallsWithCoordinates } from "../../data/hallsData.ts";
import { Case, MapPoint } from "../../types/index.ts";
import { AnalyticsService } from "../../services/analyticsService.ts";
import { FirebaseService } from "../../services/firebaseService.ts";
import {
  getIncidentTypeName,
  getIncidentSeverity,
} from "../../utils/deviceUtils.ts";

interface MapProps {
  reports?: Case[];
  onReportClick?: (report: Case) => void;
}

interface EnhancedMapPoint {
  hallName: string;
  coordinates: [number, number];
  totalIncidents: number;
  incidentCounts: {
    [key: number]: number; // Type -> Count
  };
  buildingType: string;
  location: string;
  severityStats: {
    averageSeverity: number;
    highSeverityCount: number; // Severity 4-5
  };
  recentIncidents: Case[];
}

function Map({ reports = [], onReportClick }: MapProps) {
  const [Points, SetPoints] = useState<Case[]>([]);
  const [enhancedMapPoints, setEnhancedMapPoints] = useState<
    EnhancedMapPoint[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Convert hall data to map format with enhanced information
  const initializeMapPoints = (): { [key: string]: EnhancedMapPoint } => {
    const mapPoints: { [key: string]: EnhancedMapPoint } = {};

    NDHallsWithCoordinates.forEach((hall) => {
      mapPoints[hall.name] = {
        hallName: hall.name,
        coordinates: [hall.latitude, hall.longitude],
        totalIncidents: 0,
        incidentCounts: {
          0: 0, // Uncomfortable Situation
          1: 0, // Sexual Harassment
          2: 0, // Physical
          3: 0, // Verbal Aggression
          4: 0, // Discrimination
        },
        buildingType: hall.buildingType,
        location: hall.location,
        severityStats: {
          averageSeverity: 0,
          highSeverityCount: 0,
        },
        recentIncidents: [],
      };
    });

    return mapPoints;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use Firebase service instead of direct API call
        const cases: Case[] = await FirebaseService.getReports(1000);

        if (cases.length === 0) {
          // Fallback to API if Firebase is not available
          const response = await fetch(
            "https://red-report.vercel.app/api/import"
          );
          const data = await response.json();
          const fallbackCases: Case[] = data.map((point: any) => ({
            id: point.id,
            Dorm: point.Dorm,
            Time: new Date(point.Time),
            Type: point.Type,
          }));
          SetPoints(fallbackCases);
        } else {
          SetPoints(cases);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load incident data");
      } finally {
        setLoading(false);
      }
    };

    if (!mapRef.current) {
      mapRef.current = L.map("map", { maxZoom: 19 })
        .setView([41.7002, -86.2379], 15)
        .setMinZoom(15)
        .setMaxBounds([
          [41.7152, -86.2079],
          [41.6852, -86.2679],
        ]);

      new MaptilerLayer({
        style: "80390579-ac14-4623-ba3e-80bdbcb7bd5f",
        apiKey: "4XUdc4BtSv2psaIP6grE",
      }).addTo(mapRef.current);
    }

    getData();
  }, []);

  useEffect(() => {
    if (!mapRef.current || Points.length === 0) return;

    // Clear existing markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Circle) {
        mapRef.current!.removeLayer(layer);
      }
    });

    // Initialize enhanced map points
    const mapPoints = initializeMapPoints();

    // Process incidents and build enhanced data
    Points.forEach((point) => {
      try {
        const hallName = point.Dorm;
        if (mapPoints[hallName]) {
          // Update incident counts
          mapPoints[hallName].totalIncidents++;
          mapPoints[hallName].incidentCounts[point.Type]++;

          // Add to recent incidents (keep last 10)
          mapPoints[hallName].recentIncidents.push(point);
          if (mapPoints[hallName].recentIncidents.length > 10) {
            mapPoints[hallName].recentIncidents.shift();
          }

          // Calculate severity statistics
          const severity =
            point.incidentDetails?.severity || getIncidentSeverity(point.Type);
          if (severity >= 4) {
            mapPoints[hallName].severityStats.highSeverityCount++;
          }
        }
      } catch (error) {
        console.warn(`Error processing incident for ${point.Dorm}:`, error);
      }
    });

    // Calculate average severity for each hall
    Object.values(mapPoints).forEach((mapPoint) => {
      if (mapPoint.totalIncidents > 0) {
        const totalSeverity = mapPoint.recentIncidents.reduce(
          (sum, incident) => {
            return (
              sum +
              (incident.incidentDetails?.severity ||
                getIncidentSeverity(incident.Type))
            );
          },
          0
        );
        mapPoint.severityStats.averageSeverity =
          totalSeverity / mapPoint.totalIncidents;
      }
    });

    setEnhancedMapPoints(Object.values(mapPoints));

    // Create map markers with enhanced information
    Object.values(mapPoints).forEach((mapPoint) => {
      if (mapPoint.totalIncidents > 0) {
        // Determine circle size based on total incidents
        const circleSize = Math.min(mapPoint.totalIncidents * 5, 30);

        // Determine color based on most common incident type
        const mostCommonType = Object.entries(mapPoint.incidentCounts).sort(
          ([, a], [, b]) => b - a
        )[0][0];

        const typeColors = {
          0: "#de9e36", // Uncomfortable Situation - Yellow
          1: "#ca3c25", // Sexual Harassment - Red
          2: "#701d52", // Physical - Purple
          3: "#212475", // Verbal Aggression - Blue
          4: "#1d1a05", // Discrimination - Black
        };

        const circleColor =
          typeColors[parseInt(mostCommonType) as keyof typeof typeColors] ||
          "#666666";
        // Create main incident circle
        L.circle(mapPoint.coordinates, {
          color: circleColor,
          fillColor: circleColor,
          fillOpacity: 0.7,
          radius: circleSize,
          weight: 2,
        }).addTo(mapRef.current!);

        // Create detailed popup with enhanced information
        const popupContent = createEnhancedPopup(mapPoint);

        L.circle(mapPoint.coordinates, {
          color: "black",
          fillColor: "black",
          fillOpacity: 0.9,
          radius: 3,
        })
          .addTo(mapRef.current!)
          .bindPopup(popupContent, {
            maxWidth: 400,
            className: "enhanced-popup",
          });
      }
    });

    // Log map view analytics
    AnalyticsService.logMapView();
  }, [Points]);
  const createEnhancedPopup = (mapPoint: EnhancedMapPoint): string => {
    // Calculate risk score based on recent incidents (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentIncidents = mapPoint.recentIncidents.filter(
      (incident) => new Date(incident.Time) >= sevenDaysAgo
    );

    // Calculate risk score based on number of recent incidents (all types equal)
    let riskScore = 1;

    // Simple count-based risk scoring (all incident types treated equally)
    if (recentIncidents.length >= 5) riskScore = 5;
    else if (recentIncidents.length >= 3) riskScore = 4;
    else if (recentIncidents.length >= 2) riskScore = 3;
    else if (recentIncidents.length >= 1) riskScore = 2;
    else riskScore = 1;

    // Risk color based on score
    const riskColor =
      riskScore >= 4
        ? "#ca3c25" // Red for high risk
        : riskScore >= 3
        ? "#de9e36" // Orange for medium-high risk
        : riskScore >= 2
        ? "#212475" // Blue for medium risk
        : "#28a745"; // Green for low risk

    // Incident type names and colors
    const typeInfo = [
      { name: "Uncomfortable Situation", color: "#de9e36" },
      { name: "Sexual Harassment", color: "#ca3c25" },
      { name: "Physical", color: "#701d52" },
      { name: "Verbal Aggression", color: "#212475" },
      { name: "Discrimination", color: "#1d1a05" },
    ];

    return `
      <div class="enhanced-popup-content">
        <h3 style="margin: 0 0 10px 0; color: #333;">${mapPoint.hallName}</h3>
        
        <div style="margin-bottom: 10px;">
          <span style="font-weight: bold; color: #666;">Location:</span> ${
            mapPoint.location
          }<br>
          <span style="font-weight: bold; color: #666;">Building Type:</span> ${
            mapPoint.buildingType
          }
        </div>
        
        <div style="margin-bottom: 10px;">
          <span style="font-weight: bold; color: #666;">Total Cases:</span> ${
            mapPoint.totalIncidents
          }
        </div>
        
        <div style="margin-bottom: 10px;">
          <span style="font-weight: bold; color: #666;">Cases by Type:</span><br>
          ${Object.entries(mapPoint.incidentCounts)
            .filter(([, count]) => count > 0)
            .map(([type, count]) => {
              const typeIndex = parseInt(type);
              const typeData = typeInfo[typeIndex];
              return `<div style="margin: 2px 0; font-size: 12px;">
                <span style="color: ${typeData.color}; font-weight: bold;">●</span> 
                ${typeData.name}: ${count}
              </div>`;
            })
            .join("")}
        </div>
        
        <div style="margin-bottom: 10px;">
          <span style="font-weight: bold; color: #666;">Risk Score:</span> 
          <span style="color: ${riskColor}; font-weight: bold; font-size: 16px;">
            ${riskScore}/5
          </span>
          ${
            recentIncidents.length > 0
              ? `<br><span style="font-size: 12px; color: #666;">
              (${recentIncidents.length} recent case${
                  recentIncidents.length > 1 ? "s" : ""
                } in last 7 days)
            </span>`
              : '<br><span style="font-size: 12px; color: #28a745;">(No recent activity)</span>'
          }
        </div>
      </div>
    `;
  };

  return (
    <>
      <a href="../">
        <button className="buttion disc abs back">Back</button>
      </a>

      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(255, 255, 255, 0.9)",
            padding: "20px",
            borderRadius: "8px",
            zIndex: 1000,
          }}
        >
          Loading incident data...
        </div>
      )}

      {error && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#ca3c25",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            zIndex: 1000,
          }}
        >
          {error}
        </div>
      )}

      <div id="map"></div>
    </>
  );
}

export default Map;

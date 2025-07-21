import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import React from "react";

// 1. Define the interface for a single location object
interface CampusLocation {
  Dorm: string;
  latitude: number;
  longitude: number;
  location: "Notre Dame" | "Saint Mary's" | "Holy Cross"; // Using a union type for specific string values
}

// 2. Define the structure for the processed dormitory data
interface DormData {
  coordinates: [number, number]; // [latitude, longitude]
  totalIncidents: number;
  incidentTypeCounts: [number, number, number, number, number]; // Array to store counts for each type
}

// 3. Declare your raw NDHalls data (still an array of CampusLocation)
// This array will be transformed into a Record for easier lookup and aggregation
const RAW_NDHalls_Data: CampusLocation[] = [
  {
    Dorm: "Le Man's College",
    latitude: 41.7073021,
    longitude: -86.2572448,
    location: "Saint Mary's",
  },
  {
    Dorm: "Science Hall",
    latitude: 41.7082933,
    longitude: -86.2554595,
    location: "Saint Mary's",
  },
  {
    Dorm: "McGrath Institute For Church Life",
    latitude: 41.7028431,
    longitude: -86.2353977,
    location: "Notre Dame",
  },
  {
    Dorm: "St. Joseph Chapel",
    latitude: 41.6999412,
    longitude: -86.2532049,
    location: "Holy Cross",
  },
  {
    Dorm: "Grotto of Our Lady of Lourdes",
    latitude: 41.7030868,
    longitude: -86.2403638,
    location: "Notre Dame",
  },
  {
    Dorm: "Coleman-Morse Center",
    latitude: 41.7006394,
    longitude: -86.240573,
    location: "Notre Dame",
  },
  {
    Dorm: "Holy Cross College",
    latitude: 41.7000923,
    longitude: -86.2537078,
    location: "Holy Cross",
  },
  {
    Dorm: "Church of Our Lady of Loretto",
    latitude: 41.7046872,
    longitude: -86.2605608,
    location: "Saint Mary's",
  },
  {
    Dorm: "Alliance for Catholic Education",
    latitude: 41.7036684,
    longitude: -86.2398665,
    location: "Notre Dame",
  },
  {
    Dorm: "Holy Cross Hall",
    latitude: 41.7056222,
    longitude: -86.2593738,
    location: "Saint Mary's",
  },
  {
    Dorm: "The Graduate School",
    latitude: 41.7014004,
    longitude: -86.2419571,
    location: "Notre Dame",
  },
  {
    Dorm: "University of Notre Dame School of Architecture",
    latitude: 41.6950452,
    longitude: -86.2351332,
    location: "Notre Dame",
  },
  {
    Dorm: "Notre Dame Law School",
    latitude: 41.6986715,
    longitude: -86.2379551,
    location: "Notre Dame",
  },
  {
    Dorm: "Mendoza College of Business",
    latitude: 41.6971637,
    longitude: -86.2360776,
    location: "Notre Dame",
  },
  {
    Dorm: "Keough School of Global Affairs",
    latitude: 41.6958104,
    longitude: -86.2377301,
    location: "Notre Dame",
  },
  {
    Dorm: "Notre Dame College of Engineering",
    latitude: 41.6994719,
    longitude: -86.236722,
    location: "Notre Dame",
  },
  {
    Dorm: "Dunne Hall",
    latitude: 41.7045274,
    longitude: -86.2329434,
    location: "Notre Dame",
  },
  {
    Dorm: "Undergraduate Admissions",
    latitude: 41.6981031,
    longitude: -86.2379327,
    location: "Notre Dame",
  },
  {
    Dorm: "Hammes Notre Dame Bookstore",
    latitude: 41.696401,
    longitude: -86.2397479,
    location: "Notre Dame",
  },
  {
    Dorm: "Notre Dame Stadium",
    latitude: 41.6983981,
    longitude: -86.233916,
    location: "Notre Dame",
  },
  {
    Dorm: "Dillon Hall",
    latitude: 41.6996037,
    longitude: -86.2403852,
    location: "Notre Dame",
  },
  {
    Dorm: "Haggar College Center",
    latitude: 41.7074603,
    longitude: -86.2556776,
    location: "Saint Mary's",
  },
  {
    Dorm: "St Edwards Hall",
    latitude: 41.703349,
    longitude: -86.2381985,
    location: "Notre Dame",
  },
  {
    Dorm: "Early Childhood Development Center",
    latitude: 41.7036642,
    longitude: -86.2297151,
    location: "Notre Dame",
  },
  {
    Dorm: "Grace Hall",
    latitude: 41.7048337,
    longitude: -86.2339312,
    location: "Notre Dame",
  },
  {
    Dorm: "Spes Unica Hall",
    latitude: 41.7082812,
    longitude: -86.2542048,
    location: "Saint Mary's",
  },
  {
    Dorm: "Sorin Hall",
    latitude: 41.7017878,
    longitude: -86.2399094,
    location: "Notre Dame",
  },
  {
    Dorm: "Keenan Hall",
    latitude: 41.7042013,
    longitude: -86.2373552,
    location: "Notre Dame",
  },
  {
    Dorm: "DeBartolo Hall",
    latitude: 41.6982522,
    longitude: -86.2362484,
    location: "Notre Dame",
  },
  {
    Dorm: "Notre Dame Computer Store",
    latitude: 41.69635,
    longitude: -86.2399734,
    location: "Notre Dame",
  },
  {
    Dorm: "Carroll Hall",
    latitude: 41.7019811,
    longitude: -86.2478028,
    location: "Notre Dame",
  },
  {
    Dorm: "Saint Mary's Student Center",
    latitude: 41.7081947,
    longitude: -86.258363,
    location: "Saint Mary's",
  },
  {
    Dorm: "Huddle Mart Convenience Store",
    latitude: 41.7018394,
    longitude: -86.2374841,
    location: "Notre Dame",
  },
  {
    Dorm: "Lewis Hall",
    latitude: 41.7044552,
    longitude: -86.2396082,
    location: "Notre Dame",
  },
  {
    Dorm: "Badin Hall",
    latitude: 41.7006588,
    longitude: -86.2412167,
    location: "Notre Dame",
  },
  {
    Dorm: "Baumer Hall",
    latitude: 41.6970819,
    longitude: -86.2413698,
    location: "Notre Dame",
  },
  {
    Dorm: "Howard Hall",
    latitude: 41.7007478,
    longitude: -86.2418234,
    location: "Notre Dame",
  },
  {
    Dorm: "O'Neill Family Hall",
    latitude: 41.6980337,
    longitude: -86.2418805,
    location: "Notre Dame",
  },
  {
    Dorm: "Stanford Hall",
    latitude: 41.704471,
    longitude: -86.2374673,
    location: "Notre Dame",
  },
  {
    Dorm: "Ryan Hall",
    latitude: 41.697321,
    longitude: -86.2401144,
    location: "Notre Dame",
  },
  {
    Dorm: "Flaherty Hall",
    latitude: 41.7034216,
    longitude: -86.2329018,
    location: "Notre Dame",
  },
  {
    Dorm: "Lyons Hall",
    latitude: 41.7007967,
    longitude: -86.2434023,
    location: "Notre Dame",
  },
  {
    Dorm: "Johnson Family Hall",
    latitude: 41.7051344,
    longitude: -86.2322357,
    location: "Notre Dame",
  },
  {
    Dorm: "Siegfried Hall",
    latitude: 41.703517,
    longitude: -86.2349108,
    location: "Notre Dame",
  },
  {
    Dorm: "Keough Hall",
    latitude: 41.6980119,
    longitude: -86.2410978,
    location: "Notre Dame",
  },
  {
    Dorm: "Morrissey Hall",
    latitude: 41.7009489,
    longitude: -86.24263,
    location: "Notre Dame",
  },
  {
    Dorm: "Farley Hall",
    latitude: 41.7036468,
    longitude: -86.2361456,
    location: "Notre Dame",
  },
  {
    Dorm: "Walsh Hall",
    latitude: 41.7010014,
    longitude: -86.2400412,
    location: "Notre Dame",
  },
  {
    Dorm: "Duncan Hall",
    latitude: 41.697909,
    longitude: -86.2433368,
    location: "Notre Dame",
  },
  {
    Dorm: "University Village",
    latitude: 41.7123537,
    longitude: -86.2481859,
    location: "Notre Dame",
  },
  {
    Dorm: "Pasquerilla West Hall",
    latitude: 41.7038431,
    longitude: -86.2349545,
    location: "Notre Dame",
  },
  {
    Dorm: "Fischer Graduate Housing",
    latitude: 41.7051242,
    longitude: -86.229011,
    location: "Notre Dame",
  },
  {
    Dorm: "Welsh Family Hall",
    latitude: 41.698092,
    longitude: -86.2403468,
    location: "Notre Dame",
  },
  {
    Dorm: "Hesburgh Library",
    latitude: 41.7023892,
    longitude: -86.2341526,
    location: "Notre Dame",
  },
  {
    Dorm: "Moreau Seminary Library",
    latitude: 41.7075309,
    longitude: -86.2413558,
    location: "Notre Dame",
  },
  {
    Dorm: "Chemistry Physics Library",
    latitude: 41.7015402,
    longitude: -86.2366507,
    location: "Notre Dame",
  },
  {
    Dorm: "Music Library",
    latitude: 41.6972441,
    longitude: -86.2338908,
    location: "Notre Dame",
  },
  {
    Dorm: "Library Lawn",
    latitude: 41.7014918,
    longitude: -86.2340728,
    location: "Notre Dame",
  },
  {
    Dorm: "Raclin Murphy Museum of Art",
    latitude: 41.6938488,
    longitude: -86.2348584,
    location: "Notre Dame",
  },
  {
    Dorm: "Smith Center for Recreational Sports",
    latitude: 41.6984522,
    longitude: -86.2347681,
    location: "Notre Dame",
  },
  {
    Dorm: "North Dome",
    latitude: 41.6989078,
    longitude: -86.2313753,
    location: "Notre Dame",
  },
  {
    Dorm: "Saint Mary's College Angela Athletic Center",
    latitude: 41.7099386,
    longitude: -86.2569961,
    location: "Saint Mary's",
  },
  {
    Dorm: "Rolfs Aquatic Center",
    latitude: 41.6985583,
    longitude: -86.2302632,
    location: "Notre Dame",
  },
  {
    Dorm: "Purcell Pavilion",
    latitude: 41.6978278,
    longitude: -86.2313079,
    location: "Notre Dame",
  },
  {
    Dorm: "Pfeil Center",
    latitude: 41.6979537,
    longitude: -86.2548825,
    location: "Holy Cross",
  },
  {
    Dorm: "O'Neill Hall of Music",
    latitude: 41.6972107,
    longitude: -86.2339136,
    location: "Notre Dame",
  },
  {
    Dorm: "Legends",
    latitude: 41.6961149,
    longitude: -86.2349385,
    location: "Notre Dame",
  },
  {
    Dorm: "South Dining Hall",
    latitude: 41.699728,
    longitude: -86.2414702,
    location: "Notre Dame",
  },
  {
    Dorm: "Traditions",
    latitude: 41.6924119,
    longitude: -86.2334396,
    location: "Notre Dame",
  },
  {
    Dorm: "Garbanzo Mediterranean Fresh @ Hesburgh Center",
    latitude: 41.696418,
    longitude: -86.2379586,
    location: "Notre Dame",
  },
  {
    Dorm: "North Dining Hall",
    latitude: 41.7043644,
    longitude: -86.2360824,
    location: "Notre Dame",
  },
  {
    Dorm: "Flip Kitchen",
    latitude: 41.7020089,
    longitude: -86.2376002,
    location: "Notre Dame",
  },
  {
    Dorm: "Cafe commons",
    latitude: 41.7056815,
    longitude: -86.2353447,
    location: "Notre Dame",
  },
  {
    Dorm: "Main Building",
    latitude: 41.7030267,
    longitude: -86.2390726,
    location: "Notre Dame",
  },
  {
    Dorm: "Basilica of the Sacred Heart",
    latitude: 41.7026336,
    longitude: -86.2397856,
    location: "Notre Dame",
  },
  {
    Dorm: "University Health Services",
    latitude: 41.7043474,
    longitude: -86.2381191,
    location: "Notre Dame",
  },
];

interface Case {
  id: string;
  Dorm: string;
  Time: Date;
  Type: number;
}

function ReactMap() {
  const [Points, SetPoints] = useState<Case[]>([]);
  const [dormMetrics, setDormMetrics] = useState<Record<string, DormData>>({});

  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const initialDormMetrics: Record<string, DormData> = {};
    RAW_NDHalls_Data.forEach((hall) => {
      initialDormMetrics[hall.Dorm] = {
        coordinates: [hall.latitude, hall.longitude],
        totalIncidents: 0,
        incidentTypeCounts: [0, 0, 0, 0, 0],
      };
    });
    setDormMetrics(initialDormMetrics);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("https://reddot.report/api/import");
        const data = await response.json();
        const cases: Case[] = data.map((point: any) => ({
          id: point.id,
          Dorm: point.Dorm,
          Time: new Date(point.Time),
          Type: point.Type,
        }));

        SetPoints(cases);
      } catch (error) {
        console.error("Error fetching data:", error);
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
    if (
      !mapRef.current ||
      Points.length === 0 ||
      Object.keys(dormMetrics).length === 0
    )
      return;

    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Circle) {
        mapRef.current?.removeLayer(layer);
      }
    });
    const updatedDormMetrics = { ...dormMetrics };

    Points.forEach((point) => {
      const dormName = point.Dorm;
      if (updatedDormMetrics[dormName]) {
        try {
          updatedDormMetrics[dormName].totalIncidents++;
          let HallNum = updatedDormMetrics[dormName].totalIncidents;
          if (HallNum > 6) {
            HallNum = 6;
          }

          let TypeColor: string = "";
          if (point.Type === 0) {
            TypeColor = "#de9e36";
            updatedDormMetrics[dormName].incidentTypeCounts[0]++;
          } else if (point.Type === 1) {
            TypeColor = "#ca3c25";
            updatedDormMetrics[dormName].incidentTypeCounts[1]++;
          } else if (point.Type === 2) {
            TypeColor = "#701d52";
            updatedDormMetrics[dormName].incidentTypeCounts[2]++;
          } else if (point.Type === 3) {
            TypeColor = "#212475";
            updatedDormMetrics[dormName].incidentTypeCounts[3]++;
          } else if (point.Type === 4) {
            TypeColor = "#1d1a05";
            updatedDormMetrics[dormName].incidentTypeCounts[4]++;
          }

          L.circle(updatedDormMetrics[dormName].coordinates, {
            color: TypeColor,
            fillColor: TypeColor,
            fillOpacity: 0,
            radius: 5 * HallNum,
          }).addTo(mapRef.current!);
        } catch (e) {
          console.error(`Error processing point for dorm ${dormName}:`, e);
        }
      } else {
        console.warn(`Dorm "${dormName}" not found in RAW_NDHalls_Data.`);
      }
    });

    setDormMetrics(updatedDormMetrics);

    Object.keys(updatedDormMetrics).forEach((dormName) => {
      const dorm = updatedDormMetrics[dormName];
      L.circle(dorm.coordinates, {
        color: "black",
        fillColor: "black",
        fillOpacity: 0.9,
        radius: 3,
      })
        .addTo(mapRef.current!)
        .bindPopup(
          `<h3>${dormName}</h3>
          <p><b>Uncomfortable Situation:</b> ${dorm.incidentTypeCounts[0]} </br>
          <b>Sexual Harassment:</b> ${dorm.incidentTypeCounts[1]} </br>
          <b>Physical Aggression:</b> ${dorm.incidentTypeCounts[2]} </br>
          <b>Verbal Aggression:</b> ${dorm.incidentTypeCounts[3]} </br>
          <b>Discrimination:</b> ${dorm.incidentTypeCounts[4]} </p>`
        );
    });
  }, [Points, dormMetrics]);

  return (
    <>
      <a href="../">
        <button className="buttion disc abs back">Back</button>
      </a>
      <div id="map"></div>
    </>
  );
}

export default ReactMap;

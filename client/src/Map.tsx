import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import React from "react";

var NDHalls: {
  [key: string]: [
    [number, number],
    number,
    [number, number, number, number, number]
  ];
} = {
  Alumni: [[41.6994, -86.2392], 0, [0, 0, 0, 0, 0]],
  Badin: [[41.7006, -86.2412], 0, [0, 0, 0, 0, 0]],
  Baumer: [[41.6970931, -86.2410642], 0, [0, 0, 0, 0, 0]],
  "Breen-Phillips": [[41.7028, -86.2361], 0, [0, 0, 0, 0, 0]],
  Carroll: [[41.702, -86.2478], 0, [0, 0, 0, 0, 0]],
  Cavanaugh: [[41.7028288, -86.2374691], 0, [0, 0, 0, 0, 0]],
  Dillon: [[41.6996037, -86.2403852], 0, [0, 0, 0, 0, 0]],
  Duncan: [[41.6978944, -86.2433034], 0, [0, 0, 0, 0, 0]],
  Dunne: [[41.704546, -86.2328439], 0, [0, 0, 0, 0, 0]],
  Farley: [[41.7036468, -86.2361456], 0, [0, 0, 0, 0, 0]],
  Fisher: [[41.6996115, -86.2424719], 0, [0, 0, 0, 0, 0]],
  Zahm: [[41.7033848, -86.2375783], 0, [0, 0, 0, 0, 0]],
  Flaherty: [[41.7034216, -86.2329018], 0, [0, 0, 0, 0, 0]],
  Graham: [[41.7041491, -86.2319799], 0, [0, 0, 0, 0, 0]],
  Howard: [[41.7007478, -86.2418234], 0, [0, 0, 0, 0, 0]],
  "Johnson Family": [[41.7051344, -86.2322357], 0, [0, 0, 0, 0, 0]],
  Keenan: [[41.7042013, -86.2373552], 0, [0, 0, 0, 0, 0]],
  Keough: [[41.6980119, -86.2410978], 0, [0, 0, 0, 0, 0]],
  Knott: [[41.7036819, -86.2337332], 0, [0, 0, 0, 0, 0]],
  Lewis: [[41.7044552, -86.2396082], 0, [0, 0, 0, 0, 0]],
  Lyons: [[41.7007967, -86.2434023], 0, [0, 0, 0, 0, 0]],
  McGlinn: [[41.6979716, -86.2424967], 0, [0, 0, 0, 0, 0]],
  Morrissey: [[41.7009489, -86.24263], 0, [0, 0, 0, 0, 0]],
  "O'Neill": [[41.6980337, -86.2418805], 0, [0, 0, 0, 0, 0]],
  "Pasquerilla East": [[41.7040086, -86.2339066], 0, [0, 0, 0, 0, 0]],
  "Pasquerilla West": [[41.7038304, -86.2349481], 0, [0, 0, 0, 0, 0]],
  Ryan: [[41.697321, -86.2401144], 0, [0, 0, 0, 0, 0]],
  Siegfried: [[41.703517, -86.2349108], 0, [0, 0, 0, 0, 0]],
  Sorin: [[41.7017878, -86.2399094], 0, [0, 0, 0, 0, 0]],
  "St. Edward's": [[41.703349, -86.2381985], 0, [0, 0, 0, 0, 0]],
  Stanford: [[41.704471, -86.2374673], 0, [0, 0, 0, 0, 0]],
  Walsh: [[41.7010014, -86.2400412], 0, [0, 0, 0, 0, 0]],
  "Welsh Family": [[41.698092, -86.2403468], 0, [0, 0, 0, 0, 0]],
};

interface Case {
  id: string;
  Dorm: string;
  Time: Date;
  Type: number;
}

function ReactMap() {
  const [Points, SetPoints] = useState<Case[]>([]);
  var HallNum;
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://red-report.vercel.app/api/import"
        );
        const data = await response.json();
        const cases: Case[] = data.map((point: any) => ({
          id: point.id,
          Dorm: point.Dorm,
          Time: new Date(point.Time), // Ensure proper Date conversion
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
    if (!mapRef.current || Points.length === 0) return;

    Points.forEach((point) => {
      NDHalls[point.Dorm][1]++;
      if (NDHalls[point.Dorm][1] > 6) {
        HallNum = 6;
      } else {
        HallNum = NDHalls[point.Dorm][1];
      }
      var TypeColor;
      if (point.Type == 0) {
        TypeColor = "#de9e36";
        NDHalls[point.Dorm][2][0]++;
      } else if (point.Type == 1) {
        TypeColor = "#ca3c25";
        NDHalls[point.Dorm][2][1]++;
      } else if (point.Type == 2) {
        TypeColor = "#701d52";
        NDHalls[point.Dorm][2][2]++;
      } else if (point.Type == 3) {
        TypeColor = "#212475";
        NDHalls[point.Dorm][2][3]++;
      } else if (point.Type == 4) {
        TypeColor = "#1d1a05";
        NDHalls[point.Dorm][2][4]++;
      }
      L.circle(NDHalls[point.Dorm][0], {
        color: TypeColor,
        fillColor: TypeColor,
        fillOpacity: 0,
        radius: 5 * HallNum,
      }).addTo(mapRef.current!);
    });

    Object.keys(NDHalls).forEach((hall) => {
      L.circle(NDHalls[hall][0], {
        color: "black",
        fillColor: "black",
        fillOpacity: 0.9,
        radius: 3,
      })

        .addTo(mapRef.current!)
        .bindPopup(
          `<h3>${hall}</h3>
          <p><b>Uncomfortable Situation:</b> ${NDHalls[hall][2][0]} </br>
          <b>Sexual Harrasment:</b> ${NDHalls[hall][2][1]} </br>
          <b>Physical Agression:</b> ${NDHalls[hall][2][2]} </br>
          <b>Verbal Aggression:</b> ${NDHalls[hall][2][3]} </br>
          <b>Discrimination:</b> ${NDHalls[hall][2][4]} </p>`
        );
    });
  }, [Points]);

  return <div id="map"></div>;
}

export default ReactMap;

import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import { db } from "./firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";

const NDHalls: { [key: string]: [number, number] } = {
  Alumni: [41.6994, -86.2392],
  Badin: [41.7006, -86.2412],
  Baumer: [41.6970931, -86.2410642],
  "Breen-Phillips": [41.7028, -86.2361],
  Carroll: [41.702, -86.2478],
  Cavanaugh: [41.7028288, -86.2374691],
  Dillon: [41.7019832, -86.247836],
  Duncan: [41.6978944, -86.2433034],
  Dunne: [41.704546, -86.2328439],
  Farley: [41.7036468, -86.2361456],
  Fisher: [41.6996115, -86.2424719],
  Zahm: [41.7033848, -86.2375783],
  Flaherty: [41.7034216, -86.2329018],
  Graham: [41.7041491, -86.2319799],
  Howard: [41.7007478, -86.2418234],
  "Johnson Family": [41.7051344, -86.2322357],
  Keenan: [41.7042013, -86.2373552],
  Keough: [41.6980119, -86.2410978],
  Knott: [41.7036819, -86.2337332],
  Lewis: [41.7044552, -86.2396082],
  Lyons: [41.7007967, -86.2434023],
  McGlinn: [41.6979716, -86.2424967],
  Morrissey: [41.7009489, -86.24263],
  "O'Neill": [41.6980337, -86.2418805],
  "Pasquerilla East": [41.7040086, -86.2339066],
  "Pasquerilla West": [41.7038304, -86.2349481],
  Ryan: [41.697321, -86.2401144],
  Siegfried: [41.703517, -86.2349108],
  Sorin: [41.7017878, -86.2399094],
  "St. Edward's": [41.703349, -86.2381985],
  Stanford: [41.704471, -86.2374673],
  Walsh: [41.7010014, -86.2400412],
  "Welsh Family": [41.698092, -86.2403468],
};

interface Case {
  id: string;
  Dorm: string;
  Time: Timestamp;
  Type: number;
}

function ReactMap() {
  const [Points, SetPoints] = useState<Case[]>([]);
  var map: L.Map;
  useEffect(() => {
    const getData = async () => {
      const casesCollectionRef = collection(db, "Cases");
      const querySnapshot = await getDocs(casesCollectionRef);
      const cases: Case[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        Dorm: doc.data().Dorm, // Extract Dorm from doc.data()
        Time: doc.data().Time, // Extract Time from doc.data()
        Type: doc.data().Type, // Extract Type from doc.data()}
      }));

      SetPoints(cases);
    };
    getData();
    map = L.map("map", {
      maxZoom: 19,
    })
      .setView([41.7002, -86.2379], 15)
      .setMinZoom(15)
      .setMaxBounds([
        [41.7152, -86.2079],
        [41.6852, -86.2679],
      ]);
    new MaptilerLayer({
      style: "80390579-ac14-4623-ba3e-80bdbcb7bd5f",
      apiKey: "4XUdc4BtSv2psaIP6grE",
    }).addTo(map);
    return () => {
      map.remove(); // Cleanup the map
    };
  }, []);
  console.log(Points);
  Points.map((point) => {
    console.log(point.Dorm);
    L.circle(NDHalls[point.Dorm], {
      color: "blue",
      fillColor: "#0000FF",
      fillOpacity: 0.3,
      radius: 50,
    }).addTo(map);
  });
  return (
    <>
      <div id="map"></div>
      <ul>
        {Points.map((point) => (
          <li key={point.id}>{point.Dorm}</li>
        ))}
      </ul>
    </>
  );
}
export default ReactMap;

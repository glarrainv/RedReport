import L, { LatLngTuple } from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MaptilerLayer, MapStyle } from "@maptiler/leaflet-maptilersdk";
/** 
const NDHalls: { [key: string]: LatLngTuple } = {
  Alumni: [],
  Badin: [],
  Baumer: [],
  "Breen-Phillips": [],
  Carroll: [],
  Cavanaugh: [],
  Dillon: [],
  Duncan: [],
  Dunne: [],
  Farley: [],
  Fisher: [],
  Zahm: [],
  Flaherty: [],
  Graham: [],
  Howard: [],
  "Johnson Family": [],
  Keenan: [],
  Keough: [],
  Knott: [],
  Lewis: [],
  Lyons: [],
  McGlinn: [],
  Morrissey: [],
  "O'Neill": [],
  "Pasquerilla East": [],
  "Pasquerilla West": [],
  Ryan: [],
  Siegfried: [],
  Sorin: [],
  "St. Edward's": [],
  Stanford: [],
  Walsh: [],
  "Welsh Family": [],
};
*/
function ReactMap() {
  useEffect(() => {
    console.log("Map");
    var map = L.map("map", {
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
  });

  return (
    <>
      <div id="map"></div>
    </>
  );
}
export default ReactMap;

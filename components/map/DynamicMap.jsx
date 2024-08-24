import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { createRef, useEffect, useState } from "react";
import Drawer from "./Drawer";
import { useLeafletContext } from "@react-leaflet/core";

const DynamicMap = () => {
  const mapRef = createRef();
  // const map = useMap(mapRef);
  // const mapEvent = useMapEvent("draw:create", (d) => {
  //   console.log(d);
  // });

  const [editableFG, setEditableFG] = useState(null);

  const onFeatureGroupReady = (reactFGref) => {
    // store the ref for future access to content
    setEditableFG(reactFGref);
  };

  useEffect(() => {
    if (mapRef.current === null) return;
    mapRef.current.on("draw:create", function (e) {
      var layer = e.layer;
      setPupup(layer);
      layer.on("pm:update", function (e) {
        setPupup(e.layer);
      });
    });
  }, [editableFG]);

  const setPupup = (layer) => {
    var feature = layer.toGeoJSON();
    layer.bindPopup(feature.geometry.coordinates);
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      ref={mapRef}
      className="w-screen h-screen"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <FeatureGroup
        ref={(featureGroupRef) => {
          onFeatureGroupReady(featureGroupRef);
        }}
      >
        {/* <Drawer
          editable={editableFG}
          mapLayerCallback={(data) => {
            console.log(data);
          }}
        /> */}
      </FeatureGroup>
    </MapContainer>
  );
};

export default DynamicMap;

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
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectHidePanel,
  setMapPolygon,
  hidePanel,
} from "../../store/features/asset/assetSlice";

const DynamicMap = () => {
  const mapRef = createRef();
  const showEdit = useAppSelector(selectHidePanel);
  const dispatch = useAppDispatch();

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

  const handleCBDrawer = (data) => {
    if (data[0]?.latlngs !== undefined) {
      const newData = data[0]?.latlngs.map((item) => [item.lat, item.lng]);
      dispatch(setMapPolygon({ source: "map", coordinates: newData }));
      dispatch(hidePanel(false));
    }
  };

  return (
    <MapContainer
      center={[-3.4372166436660883, 115.679099575477]}
      zoom={11}
      ref={mapRef}
      className="w-screen h-screen"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <FeatureGroup
        ref={(featureGroupRef) => {
          onFeatureGroupReady(featureGroupRef);
        }}
      >
        {showEdit && (
          <Drawer editable={editableFG} mapLayerCallback={handleCBDrawer} />
        )}
      </FeatureGroup>
    </MapContainer>
  );
};

export default DynamicMap;

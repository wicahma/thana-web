import React, { createRef, forwardRef, useEffect, useState } from "react";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const Drawer = ({ editable, mapLayerCallback }) => {
  const [mapLayers, setMapLayers] = useState([]);

  const onCreated = (e) => {
    try {
      const { layerType, layer } = e;
      if (layerType === "polygon") {
        const { _leaflet_id } = layer;
        setMapLayers((layers) => [
          ...layers,
          { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onEdited = (e) => {
    try {
      const {
        layers: { _layers },
      } = e;
      Object.values(_layers).map(({ _leaflet_id, editing }) => {
        setMapLayers((layerData) =>
          layerData.map((l) =>
            l.id === _leaflet_id
              ? {
                  ...l,
                  latlngs: [
                    ...editing.latlngs[0][0].map((coord) => ({
                      lat: coord.lat,
                      lng: coord.lng,
                    })),
                  ],
                }
              : l
          )
        );
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    mapLayerCallback(mapLayers);
  }, [mapLayers]);

  return (
    <div>
      <EditControl
        draw={{
          polyline: false,
          marker: false,
          circle: false,
          circlemarker: false,
          rectangle: false,
        }}
        position="bottomright"
        onCreated={onCreated}
        onEdited={onEdited}
        edit={{ remove: false }}
      />
    </div>
  );
};

export default Drawer;

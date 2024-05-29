// src/components/Map.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ coordinates }) => {
  return (
    <MapContainer center={coordinates} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates}>
        <Popup>
          Emplacement de la ruche
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;

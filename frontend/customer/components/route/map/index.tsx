"use client";

import * as React from 'react';
import ReactMapGl, { GeolocateControl, Marker, Source, Layer, NavigationControl } from 'react-map-gl';
import { useState, useEffect } from "react"
import type { LineLayerSpecification  } from 'mapbox-gl';

const accessTokenMapBox = "pk.eyJ1IjoiZ2lhaHV5MjAwMjAyIiwiYSI6ImNtMHE4bmRmODA4dzgycnBzZTU1d2NsNXcifQ.lsuccu2uSdT83uYImY9Dxg";
const MapComponent = () => {

  const [viewState, setViewState] = useState({
    longitude: 106.6958,
    latitude: 10.7769,
    zoom: 10
  });

  const [start, setStart] = useState([107.1362, 10.4114]);
  const [end, setEnd] = useState([106.63, 10.735]);
  const [coords, setCoords] = useState([]);

  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${accessTokenMapBox}`;

  const getRoute = async () => {
    const res = await fetch(url);
    const data = await res.json();
    const coords = data.routes[0].geometry.coordinates;
    console.log("coords", coords);
    setCoords(coords);
  }

  useEffect(() => {
    getRoute();
  }, [end, start])

  const geojson = {
    type: 'FeatureCollection',
    features: [
      { type: 'feature', geometry: { type: 'LineString', coordinates: [...coords] } }
    ]
  };

  const layerStyle: any  = {
    id: 'roadLayer',
    type: 'line',
    layout: {
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      'line-color': "#4f46e5",
      'line-width': 4,
      'line-opacity': 0.75
    }
  };

  const handleClick = (e: any) => {
    const newEnd = e.lngLat
    const endPoint = Object.keys(newEnd).map((item, i) => newEnd[item]);
    console.log("endPoint", endPoint);
    setEnd(endPoint);
  }

  return <ReactMapGl
    {...viewState}
    onClick={handleClick}
    onMove={evt => setViewState(evt.viewState)}
    mapStyle="mapbox://styles/giahuy200202/cm0q9rty100l501qy39poeb5l"
    mapboxAccessToken={accessTokenMapBox}
    style={{ borderRadius: "1rem ", overflow: 'hidden', height: "32rem", marginBottom: "2rem", marginTop: "0.6rem" }}
    attributionControl={false}
  >
    <Source id="routeSource " type="geojson" data={geojson}>
      <Layer {...layerStyle} />
    </Source>

    <GeolocateControl />
    <NavigationControl />
    <Marker longitude={106.6958} latitude={10.7769} />
  </ReactMapGl>;
}

export default MapComponent;
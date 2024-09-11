"use client";

import * as React from 'react';
import ReactMapGl, { GeolocateControl, Marker, Source, Layer, NavigationControl } from 'react-map-gl';
import { useState, useEffect, useMemo, useCallback } from "react"
import mapboxgl from 'mapbox-gl';
import { layerStyle } from './map';

const accessTokenMapBox = "pk.eyJ1IjoiZ2lhaHV5MjAwMjAyIiwiYSI6ImNtMHE4bmRmODA4dzgycnBzZTU1d2NsNXcifQ.lsuccu2uSdT83uYImY9Dxg";

interface MapComponentProps {
  isShowDirection: boolean;
  departure: number[];
  arrival: number[];
  heightProps?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  isShowDirection,
  departure,
  arrival,
  heightProps
}) => {

  //  init view state is ho chi minh city
  const [viewState, setViewState] = useState({
    longitude: 106.660172,
    latitude: 10.762622,
    zoom: 10
  });

  const [coords, setCoords] = useState([]);

  const getRoute = async () => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${departure[0]},${departure[1]};${arrival[0]},${arrival[1]}?steps=true&geometries=geojson&access_token=${accessTokenMapBox}`;
    const res = await fetch(url);
    const data = await res.json();
    const coords = data.routes[0].geometry.coordinates;
    console.log("coords", coords);
    setCoords(coords);
    setViewState({
      longitude: departure[0],
      latitude: departure[1],
      zoom: 10
    })
  }

  useEffect(() => {
    if (isShowDirection && departure.length > 0 && arrival.length > 0) {
      getRoute();
    }
  }, [isShowDirection, departure, arrival]);

  const geojson = {
    type: 'FeatureCollection',
    features: [{
      type: 'feature',
      geometry: {
        type: 'LineString',
        coordinates: [...coords]
      }
    }]
  };

  const departurePoint = {
    type: 'FeatureCollection',
    features: [{
      type: 'feature',
      geometry: {
        type: 'Point',
        coordinates: [...departure]
      }
    }]
  };

  const layerDeparturePoint: any = {
    id: 'departure',
    type: 'circle',
    source: {
      type: "geojson",
      data: departure
    },
    paint: {
      'circle-radius': 5,
      'circle-color': '#22b8cf'
    }
  };

  return <ReactMapGl
    {...viewState}
    onMove={evt => setViewState(evt.viewState)}
    mapStyle="mapbox://styles/giahuy200202/cm0xb0dg000ys01que5h6hn0q"
    mapboxAccessToken={accessTokenMapBox}
    style={{
      borderRadius: "1rem ",
      overflow: 'hidden',
      height: heightProps ? heightProps : "32rem",
      marginBottom: "2rem",
      marginTop: "0.6rem"
    }}
    attributionControl={false}
  >
    {isShowDirection && (
      <Source id="departureSource" type="geojson" data={departurePoint}>
        <Layer {...layerDeparturePoint} />
      </Source>
    )}

    {isShowDirection && (
      <Source id="routeSource" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
    )}

    <GeolocateControl />
    <NavigationControl />

    {isShowDirection && (
      <Marker longitude={arrival[0]} latitude={arrival[1]} color="#fa5252" />
    )}

  </ReactMapGl>;
}

export default MapComponent;
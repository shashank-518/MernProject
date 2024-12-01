import React, { useRef, useEffect } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './Map.css';




export default function Map(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const {lat , long} = props.coordinate;
  console.log(props.coordinate.lat)

  const zoom = 14;
  maptilersdk.config.apiKey = process.env.REACT_APP_API_KEY;

  console.log(process.env.REACT_APP_API_KEY)

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [long, lat],
      zoom: zoom
    });

    new maptilersdk.Marker({color: "#FF0000"})
      .setLngLat([long,lat])
      .addTo(map.current);
  }, [long, lat, zoom]);

  return (
    <div className="map-wrap">
    <div ref={mapContainer} className="map" />
  </div>
  );
}

"use client";
import React, { useEffect, useRef, useState } from 'react';

const HereMap = ({ showMarkers }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [isClient, setIsClient] = useState(false); // State to track client rendering

  useEffect(() => {
    // Set the state to indicate the component has mounted
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // Exit if not on the client side

    const apiKey = "4yqspZLcHFx67Idvj0-rH8cVRldQIuPoddKOoS2PI_I";
    
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        document.body.appendChild(script);
      });
    };

    const initMap = async () => {
      await loadScript('https://js.api.here.com/v3/3.1/mapsjs-core.js');
      await loadScript('https://js.api.here.com/v3/3.1/mapsjs-service.js');
      await loadScript('https://js.api.here.com/v3/3.1/mapsjs-ui.js');
      await loadScript('https://js.api.here.com/v3/3.1/mapsjs-mapevents.js');

      if (!window.H) {
        console.error('HERE Maps API not loaded.');
        return;
      }

      const platform = new window.H.service.Platform({
        apikey: apiKey,
      });

      const defaultLayers = platform.createDefaultLayers();

      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        console.error('Map container not found.');
        return;
      }

      const map = new window.H.Map(mapContainer, defaultLayers.vector.normal.map, {
        center: { lat: 52.5159, lng: 13.3777 },
        zoom: 14,
        pixelRatio: window.devicePixelRatio || 1,
      });

      mapRef.current = map;

      new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
      window.H.ui.UI.createDefault(map, defaultLayers);

      window.addEventListener('resize', () => map.getViewPort().resize());
    };

    initMap();
  }, [isClient]); // Run effect when component is client-side

  useEffect(() => {
    if (mapRef.current && showMarkers) {
      // Clear existing markers
      markersRef.current.forEach(marker => mapRef.current.removeObject(marker));
      markersRef.current = [];

      // Add new markers
      const locations = [
        { lat: 52.5159, lng: 13.3777 }, // Brandenburg Gate
        { lat: 52.5200, lng: 13.4050 }, // Berlin Main Station
        { lat: 52.5232, lng: 13.4049 }, // Berlin TV Tower
      ];

      locations.forEach(({ lat, lng }) => {
        const marker = new window.H.map.Marker({ lat, lng });
        mapRef.current.addObject(marker);
        markersRef.current.push(marker);
      });
    }
  }, [showMarkers]);

  // Only render the map container on the client side
  if (!isClient) return null;

  return (
    <div id="map" style={{ width: '100%', height: '100%', background: 'grey' }}></div>
  );
};

export default HereMap;

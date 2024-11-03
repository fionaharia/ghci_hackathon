// components/HereMap.js
"use client"
import React, { useEffect } from 'react';

const HereMap = () => {
  useEffect(() => {
    const apiKey = '4yqspZLcHFx67Idvj0-rH8cVRldQIuPoddKOoS2PI_I'; // Replace with your actual HERE Maps API key

    // Load HERE Maps API scripts
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

      // Check if HERE Maps API is loaded
      if (!window.H) {
        console.error('HERE Maps API not loaded.');
        return;
      }

      // Initialize the platform object
      const platform = new window.H.service.Platform({
        apikey: apiKey,
      });

      const defaultLayers = platform.createDefaultLayers();

      // Ensure the map container is present
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

      // Make the map interactive
      new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
      window.H.ui.UI.createDefault(map, defaultLayers);

      // Resize the map when the window is resized
      window.addEventListener('resize', () => map.getViewPort().resize());

      const addMarker = (latitude, longitude) => {
        const marker = new window.H.map.Marker({ lat: latitude, lng: longitude });
        map.addObject(marker);
      };

      addMarker(52.5159, 13.3777); // Brandenburg Gate
      addMarker(52.5200, 13.4050); // Berlin Main Station
      addMarker(52.5232, 13.4049); // Berlin TV Tower
      addMarker(52.5149, 13.3747); // Brandenburg Gate
      addMarker(52.5110, 13.4020); // Berlin Main Station
      addMarker(52.5122, 13.3039); // Berlin TV Tower

      console.log('Map initialized successfully');
    };

    initMap();
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '100%', background: 'grey' }}></div>
  );
};

export default HereMap;
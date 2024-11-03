import React, { useEffect, useRef } from 'react';

const HereMap = ({ venues, showMarkers }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    const apiKey = '4yqspZLcHFx67Idvj0-rH8cVRldQIuPoddKOoS2PI_I';

    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => {
          console.log(`Loaded script: ${src}`);
          resolve();
        };
        script.onerror = (err) => {
          console.error(`Error loading script: ${src}`, err);
          reject(err);
        };
        document.head.appendChild(script);
      });
    };

    const initMap = async () => {
      try {
        // Load required scripts
        await Promise.all([
          loadScript('https://js.api.here.com/v3/3.1/mapsjs-core.js'),
          loadScript('https://js.api.here.com/v3/3.1/mapsjs-service.js'),
          loadScript('https://js.api.here.com/v3/3.1/mapsjs-ui.js'),
          loadScript('https://js.api.here.com/v3/3.1/mapsjs-mapevents.js')
        ]);

        console.log('Scripts loaded');

        // Check if H is defined
        if (!window.H) {
          throw new Error("HERE Maps API not loaded properly.");
        }

        // Initialize the platform
        const platform = new window.H.service.Platform({ apikey: apiKey });

        const defaultLayers = platform.createDefaultLayers();
        const mapContainer = document.getElementById('map');

        const map = new window.H.Map(
          mapContainer,
          defaultLayers.vector.normal.map,
          {
            center: { lat: 19.0760, lng: 72.8777 }, // Mumbai coordinates
            zoom: 12,
            pixelRatio: window.devicePixelRatio || 1
          }
        );

        mapRef.current = map;

        const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
        const ui = window.H.ui.UI.createDefault(map, defaultLayers);

        setTimeout(() => {
          map.getViewPort().resize();
        }, 1000);

        console.log('Map initialized');

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();
  }, []);

  useEffect(() => {
    if (showMarkers && mapRef.current && venues.length > 0 && window.H) {
      console.log('Adding markers');

      // Clear existing markers
      markersRef.current.forEach(marker => {
        mapRef.current.removeObject(marker);
      });
      markersRef.current = [];

      const svgMarkup = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#4A90E2" stroke="white" stroke-width="2"/>
      </svg>`;

      const icon = new window.H.map.Icon(svgMarkup, {
        size: { w: 24, h: 24 },
        anchor: { x: 12, y: 12 }
      });

      venues.forEach((venue, index) => {
        const marker = new window.H.map.Marker(
          { lat: venue.lat, lng: venue.lng },
          { icon: icon, data: venue.name }
        );

        marker.addEventListener('tap', (evt) => {
          const bubble = new window.H.ui.InfoBubble(evt.target.getGeometry(), {
            content: evt.target.getData()
          });
          mapRef.current.getViewModel().setLookAtData({
            position: evt.target.getGeometry()
          });
          const ui = mapRef.current.getUI();
          ui.addBubble(bubble);
        });

        mapRef.current.addObject(marker);
        markersRef.current.push(marker);
        console.log(`Added marker ${index + 1}:`, venue);
      });

      if (markersRef.current.length > 0) {
        const group = new window.H.map.Group();
        markersRef.current.forEach(marker => group.addObject(marker));
        mapRef.current.getViewModel().setLookAtData({
          bounds: group.getBoundingBox(),
          padding: { top: 50, right: 50, bottom: 50, left: 50 }
        });
      }
    }
  }, [showMarkers, venues]);

  return (
    <div className="relative w-full h-full" style={{ minHeight: '500px' }}>
      <div 
        id="map" 
        className="absolute inset-0 rounded-lg border border-gray-300"
        style={{ 
          width: '100%',
          height: '100%',
          minHeight: '500px',
          backgroundColor: '#e5e5e5'
        }} 
      />
    </div>
  );
};

export default HereMap;

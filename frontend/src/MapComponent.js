'use client';
import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

export default function MapComponent() {
  const position = { lat: 18.5204, lng: 73.8567 }; // Default center (e.g., Pune)

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '500px', width: '100%' }}>
        <Map
          defaultCenter={position}
          defaultZoom={13}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
        >
          {/* This marker represents a water zone */}
          <Marker position={position} onClick={() => alert("Zone A selected!")} />
        </Map>
      </div>
    </APIProvider>
  );
}

import React, { useEffect, useRef, useState, useContext } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ReportContext } from '../contexts/ReportContext';

// Fix for default marker icon path resolution in Vite/Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export const MapSelector = () => {
  const { draft, updateDraft } = useContext(ReportContext);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  
  // Default coordinates (Pune)
  const defaultLat = 18.5204;
  const defaultLng = 73.8567;

  const [address, setAddress] = useState(draft.location || 'Loading default location...');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  // Reverse geocoding helper using OpenStreetMap's free Nominatim API
  const reverseGeocode = async (lat, lng) => {
    setIsLoadingAddress(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en',
            'User-Agent': 'Describe-Issue-Report-Portal'
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        const displayName = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        setAddress(displayName);
        updateDraft({ location: displayName });
      } else {
        const fallback = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        setAddress(fallback);
        updateDraft({ location: fallback });
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      const fallback = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      setAddress(fallback);
      updateDraft({ location: fallback });
    } finally {
      setIsLoadingAddress(false);
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Use current draft location coordinate fallback if exists or default
    const initialLat = defaultLat;
    const initialLng = defaultLng;

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
    }).setView([initialLat, initialLng], 13);

    // Load OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Create Marker
    const marker = L.marker([initialLat, initialLng], {
      draggable: true,
    }).addTo(map);

    mapRef.current = map;
    markerRef.current = marker;

    // Run initial reverse geocoding
    reverseGeocode(initialLat, initialLng);

    // Map click handler to move marker
    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);
      reverseGeocode(lat, lng);
    });

    // Marker drag handler
    marker.on('dragend', () => {
      const position = marker.getLatLng();
      reverseGeocode(position.lat, position.lng);
    });

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-850 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
            Selected Address (Click map / Drag pin to change)
          </span>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block mt-0.5">
            {isLoadingAddress ? 'Resolving address...' : address}
          </span>
        </div>
        {isLoadingAddress && (
          <div className="h-4 w-4 border-2 border-[#4274d9] border-t-transparent rounded-full animate-spin shrink-0" />
        )}
      </div>

      <div 
        ref={mapContainerRef} 
        className="w-full h-[280px] rounded-2xl border border-slate-250 dark:border-slate-800 shadow-inner overflow-hidden z-10"
      />
    </div>
  );
};

export default MapSelector;

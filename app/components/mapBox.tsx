'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { usePathname } from 'next/navigation';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Feature, FeatureCollection, Point } from 'geojson';
import type { Shelter } from './../types/shelter';
import Spinner from './spinner';

type MapComponentProps = {
  spinnerColor?: string;
  selectedShelter?: Shelter;  
};


const MapComponent = (props: MapComponentProps) => {
  const { spinnerColor = 'border-green-600', selectedShelter } = props;
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [shelters, setShelters] = useState<Shelter[]>([]);

  const [loading, setLoading] = useState<boolean>(() => true);

      useEffect(() => {
    if (selectedShelter == null) {
      return;
    }
    if (mapRef.current == null) {
      return;
    }

    const longitude = Number(selectedShelter.lon);
    const latitude = Number(selectedShelter.lat);

    mapRef.current.flyTo({
      center: [longitude, latitude],
      zoom: 14,
    });
  }, [selectedShelter]);

  useEffect(() => {
    fetch('/api/shelter')
      .then((res) => res.json())
      .then((data) => setShelters(data))
      .catch((err) => console.error('Failed to fetch shelter data:', err));
  }, []);

  const pathname = usePathname();

  let basePath = pathname;
  if (basePath.endsWith('/map')) {
    basePath = basePath.replace('/map', '');
  }
  if (basePath === '') {
    basePath = '/';
  }


  useEffect(() => {
    if (!shelters.length) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-123.039970, 49.240449],
      zoom: 9,
      attributionControl: false,
    });

    mapRef.current = map;

    const getIconByRole = (role: Shelter['role']) => {
      switch (role) {
        case 'food':
          return 'restaurant';
        case 'overnight':
          return 'lodging';
        case 'women':
          return 'hospital';
        case 'distribution':
          return 'clothing-store';
        default:
          return 'marker';
      }
    };

    const getFakeInventoryBar = (label: string, percent: number, id: string) => {
      const clampedPercent = Math.max(0, Math.min(percent, 100));
      let color = '#f87171';

      if (clampedPercent >= 66) {
        color = '#22c55e';
      } else if (clampedPercent >= 33) {
        color = '#facc15';
      }

      return `
    <div style="display: flex; flex-direction: column; font-size: 13px; margin-bottom: 10px;">
      <span style="margin-bottom: 4px; color: #333;">${label}</span>
      <div style="background-color: #e5e7eb; height: 12px; border-radius: 6px; overflow: hidden; position: relative;">
        <div style="
          width: ${clampedPercent}%;
          height: 100%;
          background-color: ${color};
          border-radius: 6px;
          transform: scaleX(0);
          transform-origin: left;
          animation: barFillAnim 0.8s ease-out forwards;
        "></div>
      </div>
    </div>
  `;
    };


    const getPopupHTMLByRole = (shelter: Shelter) => {
      const inv = shelter.inv;
      const max = shelter.max;

      const calc = (key: string) => {
        if (!inv || !max) return 0;
        const v = inv[key] ?? 0;
        const m = max[key] ?? 1;
        return Math.min((v / m) * 100, 100);
      };

      let bar1 = '';
      let bar2 = '';

      switch (shelter.role) {
        case 'food':
          bar1 = 'Perishable food';
          bar2 = 'Non-perishable food';
          break;
        case 'overnight':
          bar1 = 'Available beds';
          bar2 = 'Bedding & linens';
          break;
        case 'women':
          bar1 = 'Hygiene products';
          bar2 = 'Clothing & footwear';
          break;
        case 'distribution':
          bar1 = 'Seasonal gear';
          bar2 = 'Clothing & footwear';
          break;
        default:
          return `<div style="font-family: sans-serif; font-size: 14px;">Unknown shelter type</div>`;
      }

      return `
  <div style="
    width: 240px;
    padding: 16px;
    font-family: 'Segoe UI', sans-serif;
    font-size: 14px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  ">
    <div style="margin-bottom: 12px;">
      <strong style="font-size: 1em; color: #111;">${shelter.name}</strong><br/>
      <span style="font-size: 0.85em; color: #666;">${shelter.address}</span>
    </div>

 <style>
@keyframes barFillAnim {
  to { transform: scaleX(1); }
}
</style>



   ${getFakeInventoryBar(bar1, calc(bar1), `bar1-${shelter._id}`)}
${getFakeInventoryBar(bar2, calc(bar2), `bar2-${shelter._id}`)}


    <a href="${basePath === '/' ? '' : basePath}/shelter/${shelter._id}"
       style="
         display: inline-block;
         width: 100%;
         padding: 8px 0;
         margin-top: 12px;
         text-align: center;
         background-color: #007ACC;
         color: white;
         text-decoration: none;
         border-radius: 6px;
         font-size: 0.9em;
         font-weight: 500;
       ">
      More Info
    </a>
  </div>
`;

    };


    map.on('load', () => {
      setLoading(false);
      const features: Feature<Point>[] = shelters.map((shelter) => {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [Number(shelter.lon), Number(shelter.lat)],
          },
          properties: {
            description: getPopupHTMLByRole(shelter),
            icon: getIconByRole(shelter.role),
          },
        };
      });


      //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      //Geolocation control
      //uses mapboxs built in geolocation to find and postion the map around the user showing nearby elements 
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      );
      //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


      const geoJson: FeatureCollection<Point> = {
        type: 'FeatureCollection',
        features,
      };

      map.addSource('places', {
        type: 'geojson',
        data: geoJson,
      });

      map.addLayer({
        id: 'places',
        type: 'symbol',
        source: 'places',
        layout: {
          'icon-image': ['get', 'icon'],
          'icon-allow-overlap': true,
          'icon-size': 3,
        },
      });

      map.on('click', 'places', (e) => {
        if (!e.features?.length) return;
        const feature = e.features[0];
        const coordinates = (feature.geometry as any).coordinates.slice();
        const description = feature.properties?.description;

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
      });

      map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
      });

      // const geocoder = new MapboxGeocoder({
      //   accessToken: mapboxgl.accessToken!,
      //   mapboxgl: mapboxgl as any,
      //   limit: 2,
      //   placeholder: 'Search...',
      // });

      // const geoDiv = document.getElementById('geocoder');
      // if (geoDiv) {
      //   geoDiv.appendChild(geocoder.onAdd(map));
      // }
    });

    return () => map.remove();
  }, [shelters]);


  let loadingOverlay = null;

  if (loading) {
    loadingOverlay = (
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
        <Spinner color={spinnerColor} />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {loadingOverlay}
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          minHeight: '70vh',
        }}
      />

    </div>
  );


};


export default MapComponent;

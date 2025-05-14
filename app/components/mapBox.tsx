'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Feature, FeatureCollection, Point } from 'geojson';
import type { Shelter } from './../types/shelter';



const MapComponent = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [shelters, setShelters] = useState<Shelter[]>([]);

  useEffect(() => {
    fetch('/api/shelter')
      .then((res) => res.json())
      .then((data) => setShelters(data))
      .catch((err) => console.error('Failed to fetch shelter data:', err));
  }, []);

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

    const getBar = (label: string, percent: number, color: string) => `
      <div style="margin-bottom:12px;">
        <div style="font-size:0.9em; margin-bottom:4px;">${label}</div>
        <div style="background:#eee; border-radius:4px; height:8px;">
          <div style="background:${color}; width:${percent}%; height:100%;"></div>
        </div>
      </div>
    `;

    const getPopupHTMLByRole = (shelter: Shelter) => {
      const inv = shelter.inv;
const max = shelter.max;


      const calc = (key: string) => {
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
          return `<div style="font-family:sans-serif;">Unknown shelter type</div>`;
      }

      return `
        <div style="width:220px; font-family: sans-serif; line-height:1.4;">
          <div style="margin-bottom:12px;">
            <strong>${shelter.name}</strong><br/>
            <span style="font-size:0.85em; color:#555;">${shelter.address}</span>
          </div>
          ${getBar(bar1, calc(bar1), '#7cc924')}
          ${getBar(bar2, calc(bar2), '#d41f0f')}
          <button style="width:100%; padding:6px 0; border:none; border-radius:4px; background:#007ACC; color:#fff; font-size:0.9em; cursor:pointer;">
            More Info
          </button>
        </div>
      `;
    };

    map.on('load', () => {
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

  return (
    <>
    <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
      {/* <div ref={mapContainerRef} style={
        { width: '100%', height: '100%' } */}
        {/* } /> */}
      {/* <div id="geocoder" style={
        { width: '100%', padding: '0.5rem' }
        } /> */}
    </>
  );
};

export default MapComponent;

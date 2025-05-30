// map component used on most of the home pages, takes in a location for flyto and a colour for its loading spinner

'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { usePathname } from 'next/navigation';
//no types so we ignore TypeScript warning
//@ts-ignore
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
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
  const directionsRef = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(() => true);

  //fly to the selected location from the search bar
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

  //fetch all the shelter on load
  useEffect(() => {
    fetch('/api/shelter')
      .then((res) => res.json())
      .then((data) => setShelters(data))
      .catch((err) => console.error('Failed to fetch shelter data:', err));
  }, []);

  const pathname = usePathname();

  //some pages are under /map and some are the base page and so the routing needs to be updated
  let basePath = pathname;
  if (basePath.endsWith('/map')) {
    basePath = basePath.replace('/map', '');
  }
  if (basePath === '') {
    basePath = '/';
  }

  //map logic
  useEffect(() => {
    if (!shelters.length) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

    //create the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-123.039970, 49.240449],
      zoom: 9,
      attributionControl: false,
    });

    //implement the directions plugin from mapbox
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken!,
      unit: 'metric',
      profile: 'mapbox/walking',
      interactive: false,
      controls: {
        inputs: false,
        instructions: true,
        profileSwitcher: false,
      },
    });
    directionsRef.current = directions;
    map.addControl(directions, 'top-left');

    //formatting and setup for directions box
    directionsRef.current.on('route', function () {
      const instructions = document.querySelector('.mapbox-directions-instructions');
      const existingBar = document.getElementById('directions-mode-bar');
      if (existingBar) existingBar.remove();

      if (instructions) {
        const bar = document.createElement('div');
        bar.id = 'directions-mode-bar';
        bar.style.cssText = 'display:flex;justify-content:center;align-items:center;padding:8px;background:#fff;border-bottom:1px solid #ccc;width:100%;z-index:9999';

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.style.cssText = 'flex:1;padding:10px 0;margin:0 4px;border:none;border-radius:4px;background:#e0e0e0;cursor:pointer;font-size:14px;font-weight:bold;color:#111';

        cancelBtn.addEventListener('click', function () {
          if (directionsRef.current) {
            directionsRef.current.removeRoutes();
            directionsRef.current.setOrigin('');
            directionsRef.current.setDestination('');
          }
          bar.remove();

          if (selectedShelter) {
            const lon = Number(selectedShelter.lon);
            const lat = Number(selectedShelter.lat);
            map.flyTo({ center: [lon, lat], zoom: 14 });
          }
        });

        bar.appendChild(cancelBtn);
        instructions.insertBefore(bar, instructions.firstChild);
      }
    });

    mapRef.current = map;

    //select the correct icon to display on the map from the role of the shelter 
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

    //generate the inv bar on the popup, "fake" since its a replica of our bar component
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

    //build the popup that is displayed upon clicking a location on the map
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
          bar1 = 'Beds available';
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

      //the HTML for the popup
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

 ${(shelter.inv && bar1 in shelter.inv && bar1 in shelter.max)
          ? getFakeInventoryBar(bar1, calc(bar1), `bar1-${shelter._id}`)
          : ''
        }
${(shelter.inv && bar2 in shelter.inv && bar2 in shelter.max)
          ? getFakeInventoryBar(bar2, calc(bar2), `bar2-${shelter._id}`)
          : ''
        }


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

  <button id="get-directions-btn" data-lat="${shelter.lat}" data-lon="${shelter.lon}"
    style="margin-top:8px;width:100%;padding:6px;background:#38a169;color:#fff;border:none;border-radius:4px;">
    Get Walking Directions
  </button>
</div>
`;
    };

    //add pins once the map is loaded in
    map.on('load', () => {
      setLoading(false);

      //turn the shelters location information to geoJSON for mapbox
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

      //add the points to the map
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
          'icon-size': 2.2,
        },
      });

      //show popup and enable direction when a location is clicked
      map.on('click', 'places', (e) => {
        if (!e.features?.length) return;
        const feature = e.features[0];
        const coordinates = (feature.geometry as any).coordinates.slice();
        const description = feature.properties?.description;


        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);

        setTimeout(function () {
          const btn = document.getElementById('get-directions-btn');
          if (!btn) return;

          const clone = btn.cloneNode(true) as HTMLElement;
          btn.replaceWith(clone);

          clone.addEventListener('click', function () {
            const lat = parseFloat(clone.getAttribute('data-lat') || '0');
            const lon = parseFloat(clone.getAttribute('data-lon') || '0');

            navigator.geolocation.getCurrentPosition(
              function (pos) {
                if (directionsRef.current) {
                  const userLon = pos.coords.longitude;
                  const userLat = pos.coords.latitude;
                  directionsRef.current.setOrigin([userLon, userLat]);
                  directionsRef.current.setDestination([lon + Math.random() * 0.00001, lat]);
                }
              },
              function () {
                alert("Couldn't access your location.");
              }
            );
          });
        }, 200);

      });

      map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
      });
    });

    return () => map.remove();
  }, [shelters]);


  let loadingOverlay = null;

  //spinner while waiting for map to load
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

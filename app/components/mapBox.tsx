import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!, 
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [ -123.039970, 49.240449 ],
      zoom: 9,
      attributionControl: false, 
    });
    const map = mapRef.current!; 

    mapRef.current.on('load', () => {
      map.addSource('places', {
        // This GeoJSON contains features that include an "icon"
        // property. The value of the "icon" property corresponds
        // to an image in the Mapbox Streets style's sprite.
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
                icon: 'theatre'
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.038659, 38.931567]
              }
            },
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
                icon: 'theatre'
              },
              geometry: {
                type: 'Point',
                coordinates: [-77.003168, 38.894651]
              }
            },
          ]
        }
      });

    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken!,
        mapboxgl: mapboxgl as any,
        limit: 2,            
        placeholder: 'Search...',
    });

    map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        })
      );

    const geoDiv = document.getElementById('geocoder');
    if (geoDiv) {
      geoDiv.appendChild(geocoder.onAdd(map));
      
    }
    
    
      map.addLayer({
        id: 'places',
        type: 'symbol',
        source: 'places',
        layout: {
          'icon-image': ['get', 'icon'],
          'icon-allow-overlap': true
        }
      });

      map.on('click', 'places', (e) => {
        if (!e.features || e.features.length === 0) return;
      
        const feature = e.features[0];
        const coordinates = (feature.geometry as any).coordinates.slice() as [number, number];
        const description = feature.properties?.description as string;
      
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
      
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
    });

    return () => map.remove();
  }, []);

  return (
    <>
      <div
        ref={mapContainerRef}
        style={{ width: '100%', height: '100%' }}
      />
      <div
        id="geocoder"
        style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
      />
    </>
  );
};

export default MapboxExample;
'use client';

import { useState, useEffect } from 'react';
import type { UserLocation } from '../../types/userLocation';

export default function getUserLocation(): UserLocation {
  const [userLocation, setUserLocation] = useState<UserLocation>(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  return userLocation;
}

import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { center, options, containerStyle } from '../../DefaultValues' 

function InitMap({setValues}) {
  const handleLocationChange = e => {
      setValues(e.latLng.toJSON());
      console.log(e.latLng.toJSON());
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAp4pZayMf69AHFrjOT8yBuIUJooCqVAmM"
  })

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
      >
        <Marker
          options={options}
          position={center}
          onDragEnd={handleLocationChange}
        />
      </GoogleMap>
    </>
  ) : <></>
}

export default React.memo(InitMap)
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { center, containerStyle } from '../../DefaultValues' 

function InitMap({lat, lng}) {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAp4pZayMf69AHFrjOT8yBuIUJooCqVAmM"
  })

  const onLoad = marker => {
    console.log('marker: ', marker)
  }

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
            lat: lat,
            lng: lng
        }}
        zoom={10}
        onLoad={onLoad}
      >
        <Marker
          onLoad={onLoad}
          position={{
            lat: lat,
            lng: lng
          }}
        />
      </GoogleMap>
    </>
  ) : <></>
}

export default React.memo(InitMap)
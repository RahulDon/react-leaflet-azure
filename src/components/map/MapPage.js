import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { carSenorsDatas } from "../../dummyData/dummySensorData";

function MapPage() {
  const [cars, setCars] = useState(null);
  useEffect(() => {
    // fetch(
    //   `https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=DHmL7ezZEbesjbXp3yu9wnbTiPyQWNpN84AdmFUv&location=Denver+CO`
    // )
    //   .then(response => response.json())
    //   .then(data => {
    //     setCrime(data);
    //   });
    setCars(carSenorsDatas());
  }, []);
  const [activePark, setActivePark] = useState(null);
  return (
    <>
      {cars ? (
        <Map className="map" center={[cars.latitude, cars.longitude]} zoom={17}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {cars.features.map(park => (
            <Marker
              key={park.properties.PARK_ID}
              position={park.geometry.coordinates}
              onClick={() => {
                setActivePark(park);
              }}
              icon={park.properties.myIcon}
            />
          ))}

          {activePark && (
            <Popup
              position={activePark.geometry.coordinates}
              onClose={() => {
                setActivePark(null);
              }}
            >
              <h2>List of sensors used in this car</h2>
              {activePark.properties.sensorData.map(sensor => (
                <div key={sensor.sensor_id}>
                  <h5>{sensor.title}</h5>
                </div>
              ))}
            </Popup>
          )}
        </Map>
      ) : null}
    </>
  );
}

export default MapPage;

import React from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import _ from "lodash";
import L from "leaflet";
import mapImg from "../../assets/motorbike.png";
let myIcon = L.icon({
  iconUrl: mapImg,
  iconSize: [50, 50],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

export default class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carSenorsData: {
        features: [
          {
            properties: {
              id: 1
            },
            sensorData: [
              {
                sensor_id: 1,
                title: "Pessenger Occupancy Sensor",
                description: "",
                Car_ID: 960
              }
            ],
            lat: 39.740566,
            long: -104.983613
          },
          {
            properties: {
              id: 2
            },
            sensorData: [
              {
                sensor_id: 1,
                title: "Bike Occupancy Sensor",
                description: "",
                Car_ID: 960
              }
            ],
            lat: 39.738653,
            long: -104.982058
          },
          {
            properties: {
              id: 3
            },
            sensorData: [
              {
                sensor_id: 1,
                title: "Sports Bike Occupancy Sensor",
                description: "",
                Car_ID: 960
              }
            ],
            lat: 39.738183,
            long: -104.988195
          },
          {
            properties: {
              id: 4
            },
            sensorData: [
              {
                sensor_id: 1,
                title: "Pulsor Occupancy Sensor",
                description: "",
                Car_ID: 960
              }
            ],
            lat: 39.736806,
            long: -104.986135
          },
          {
            properties: {
              id: 5
            },
            sensorData: [
              {
                sensor_id: 1,
                title: "Apache Occupancy Sensor",
                description: "",
                Car_ID: 960
              }
            ],
            lat: 39.737177,
            long: -104.982626
          },
          {
            properties: {
              id: 6
            },
            sensorData: [
              {
                sensor_id: 1,
                title: "Himalya Occupancy Sensor",
                description: "",
                Car_ID: 960
              }
            ],
            lat: 39.736608,
            long: -104.982616
          },
          {
            properties: {
              id: 7
            },
            sensorData: [
              {
                sensor_id: 1,
                title: "Splender Occupancy Sensor",
                description: "",
                Car_ID: 960
              }
            ],
            lat: 39.740022,
            long: -104.982315
          },
          {
            properties: {
              id: 8
            },
            sensorData: [
              {
                sensor_id: 1,
                title: "TVS Occupancy Sensor",
                description: "",
                Car_ID: 960
              }
            ],
            lat: 39.737894,
            long: -104.978667
          },
          {
            properties: {
              id: 9
            },
            sensorData: [
              {
                sensor_id: 1,
                title: "Bmw Occupancy Sensor",
                description: "",
                Car_ID: 960
              }
            ],
            lat: 39.739181,
            long: -104.983538
          },
          {
            properties: {
              id: 10
            },
            sensorData: [
              {
                sensor_id: 1,
                title: "R15 Occupancy Sensor",
                description: "",
                Car_ID: 960
              }
            ],
            lat: 39.73923,
            long: -104.990233
          }
        ]
      },
      activePark: null
    };
  }
  counter() {
    const that = this;
    function timer() {
      //clone
      const copy = _.cloneDeep(that.state.carSenorsData);

      for (let i = 0; i < that.state.carSenorsData.features.length; i++) {
        let currentLatValue = that.state.carSenorsData.features[i].lat;
        let currentLongValue = that.state.carSenorsData.features[i].long;

        currentLatValue -= 0.0001;
        currentLongValue -= 0.0001;

        copy.features[i].lat = currentLatValue;
        copy.features[i].long = currentLongValue;
      }
      that.setState({
        carSenorsData: copy
      });
    }
    setInterval(timer, 1000);
  }
  componentDidMount() {
    this.counter();
  }
  render() {
    return (
      <Map
        className="map"
        center={[
          this.state.carSenorsData.features[0].lat,
          this.state.carSenorsData.features[0].long
        ]}
        zoom={15}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {this.state.carSenorsData.features.map(bike => (
          <Marker
            key={bike.properties.id}
            onClick={() => {
              this.setState({ activePark: bike });
            }}
            position={[bike.lat, bike.long]}
            icon={myIcon}
          />
        ))}

        {this.state.activePark && (
          <Popup
            position={[this.state.activePark.lat, this.state.activePark.long]}
            onClose={() => {
              this.setState({ activePark: false });
            }}
          >
            <h2>List of sensors used in this car</h2>
            {this.state.activePark.sensorData.map(sensor => (
              <div key={sensor.sensor_id}>
                <h5>{sensor.title}</h5>
              </div>
            ))}
          </Popup>
        )}
      </Map>
    );
  }
}

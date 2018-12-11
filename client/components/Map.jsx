import React from "react";
// import { ReactLeaflet, LeafletMap, TileLayer, Marker, Popup } from 'leaflet'
import Button from "@material-ui/core/Button";
import { Map, Marker, Popup, TileLayer, leafletElement } from "react-leaflet";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import { connect } from "react-redux";

import { setCurrentProvider } from "../actions";

class AMap extends React.Component {
  constructor(props) {
    super(props);
  }

  //Might be used later -- keep for reminder/reference
  // handleZoomChange(params) {
  //   console.log("Has zoomed ", params);
  // }

  render() {
    const position = [this.props.location.lat, this.props.location.long];

    console.log("postion of the map is ", position);

    let zoomLevel = this.props.location.zoom;

    const icon = L.icon({
      // iconUrl: 'images/location.svg',
      // iconSize:     [40, 50],
      // iconAnchor:   [22, 94],
      // popupAnchor:  [-3, -76],

      iconUrl: "images/location.svg",
      iconSize: [40, 50],
      iconAnchor: [20, 25],
      popupAnchor: [0, -25]
    });

    const soupIcon = L.icon({
      iconUrl: "images/soup.svg",
      iconSize: [40, 50],
      iconAnchor: [20, 25],
      popupAnchor: [0, -25]
    });

    const foodBankIcon = L.icon({
      iconUrl: "images/foodbank.svg",
      iconSize: [40, 50],
      iconAnchor: [20, 25],
      popupAnchor: [0, -25]
    });

    const shelterIcon = L.icon({
      iconUrl: "images/bed.svg",
      iconSize: [40, 50],
      iconAnchor: [20, 25],
      popupAnchor: [0, -25]
    });

    const adviceIcon = L.icon({
      iconUrl: "images/advice.svg",
      iconSize: [40, 50],
      iconAnchor: [20, 25],
      popupAnchor: [0, -25]
    });

    const dropinIcon = L.icon({
      iconUrl: "images/dropin.svg",
      iconSize: [40, 50],
      iconAnchor: [20, 25],
      popupAnchor: [0, -25]
    });

    const medicalIcon = L.icon({
      iconUrl: "images/medical.svg",
      iiconSize: [40, 50],
      iconAnchor: [20, 25],
      popupAnchor: [0, -25]
    });

    const otherIcon = L.icon({
      iconUrl: "images/heart.svg",
      iconSize: [40, 50],
      iconAnchor: [20, 25],
      popupAnchor: [0, -25]
    });

    let markers = [];
    if (this.props.providers) {
      markers = this.props.providers.map((thePlace, i) => {
        let theIcon = icon;

        console.log("the place is ", thePlace);
        if (thePlace.services[0] && thePlace.services[0].service_type_id == 3) {
          theIcon = soupIcon;
        }
        if (thePlace.services[0] && thePlace.services[0].service_type_id == 2) {
          theIcon = foodBankIcon;
        }
        if (thePlace.services[0] && thePlace.services[0].service_type_id == 1) {
          theIcon = shelterIcon;
        }
        if (thePlace.services[0] && thePlace.services[0].service_type_id == 4) {
          theIcon = adviceIcon;
        }
        if (thePlace.services[0] && thePlace.services[0].service_type_id == 5) {
          theIcon = dropinIcon;
        }
        if (thePlace.services[0] && thePlace.services[0].service_type_id == 6) {
          theIcon = medicalIcon;
        }
        if (thePlace.services[0] && thePlace.services[0].service_type_id == 7) {
          theIcon = otherIcon;
        }

        let serviceStates = thePlace.services.map(s => {
          let hasQty = [1, 2, 3];
          if (hasQty.find(typeId => typeId == s.service_type_id)) {
            return (
              <span>
                {/* {s.service_type_name} : {s.status} - Remaining :{" "} */}
                {s.name} : {s.status} - Remaining :{" "}
                {s.qty_remaining}/{s.qty_default}
                <br />
              </span>
            );
          } else {
            return (
              <span>
                {s.service_type_name} : {s.status}
                <br />
              </span>
            );
          }
        });

        return (
          <div key={`mapMarker${i}`}>
            <Marker position={[thePlace.lat, thePlace.long]} icon={theIcon}>
              <Popup>
                <Link
                  to={`/profile/${thePlace.id}`}
                  onClick={() => {
                    this.props.dispatch(setCurrentProvider(thePlace));
                  }}
                >
                  Click for More Info
                </Link>
                <h3>{thePlace.name}</h3>
                {serviceStates}
                <span>{thePlace.address}</span>
              </Popup>
            </Marker>
          </div>
        );
      });
    }

    if (this.props.location.hasLocation) {
      markers.push(
        <div key={`mapMarker${markers.length}`}>
          <Marker position={position} icon={icon}>
            <Popup>
              <h3>You Are Here</h3>
            </Popup>
          </Marker>
        </div>
      );
    }

    // var legend = L.control({ position: 'bottomleft' });
    // legend.onAdd = function (Map) {

    //   var div = L.DomUtil.create('div', 'info legend');
    //   labels = ['<strong>Providers</strong>'],
    //     categories = ['Shellter', 'Soup Kitchen', 'Food bank', 'Drop in Center', 'Support Services', 'Other services'];

    //   for (var i = 0; i < categories.length; i++) {

    //     div.innerHTML +=
    //       labels.push(
    //         '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
    //         (categories[i] ? categories[i] : '+'));

    //   }
    //   div.innerHTML = labels.join('<br>');
    //   return div;
    // };

    // legend.addTo(Map);

    return (
      <div>
        {/* <Button color="secondary" onClick={this.getLocation}>Get location</Button> */}
        <Map
          center={position}
          onzoomend={this.handleZoomChange}
          zoom={this.props.location.zoom}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />

          {markers}
        </Map>
      </div>
    );
  }
}

// ReactDOM.render(<Map />, document.getElementById('container'))
const mapStateToProps = state => {
  return {
    providers: state.providers.providers,
    location: state.location
  };
};

export default connect(mapStateToProps)(AMap);

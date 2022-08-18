import axios from "axios"
import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet"
import { IonAlert, IonButton } from '@ionic/react';
import L from "leaflet"
import "leaflet/dist/leaflet.css";

const base = "https://api.weatherapi.com/v1/current.json?key=444f6a125e314ab392590227221208" 

const Home = ({comeatme, wack, geoLat, geoLon}) => {
  const [ dataLatLon, setDataLatLon ] = useState({ lat: geoLat, lon: geoLon }); {/* lat: geoLat, lon: geoLon */}
  const [ loading, setLoading ] = useState(true);
  const [ data, setData ] = useState({});
  const [ showAlert, setShowAlert ] = useState(false);
  const [ showAlert2, setShowAlert2 ] = useState(false);
  const [ myspot, setMyspot ] = useState("")
  const position = [56.41306112723902, 10.803491093554731];

  const Cordinates = () => {
    const map = useMapEvents({
      click: (e) => {
        setDataLatLon({lat: e.latlng.lat,  lon: e.latlng.lng} )
      }
    })
    return null
  }

  useEffect(() => {
    axios.get(base + "&q=" + dataLatLon.lat + "," + dataLatLon.lon + "&units=metric&lang=da")
    .then( res => {
      setData(res.data);
      setLoading(true);
    })
    .catch((error) => setShowAlert2(true));
  }, [dataLatLon]);

  useEffect (() => {
    setMyspot(L.icon({ 
      iconUrl: "/assets/icon/marker-icon.png", 
      iconSize: [20, 32],
      iconAnchor: [10, 35],
      popupAnchor: [0, -30],
    }));
  },[loading]);

  // localStorage.clear();
  // sessionStorage.clear();
  const handleSetData = (sessionData, country) => {
    var data = wack.filter((val) => val.latlon.includes(sessionData));
    if (!data.length) {
      wack.push({
        "latlon": sessionData,
        "country": country?.replace(/\s+/g, '-')?.toLowerCase()
       });
      comeatme(wack);
    } else {
      setShowAlert(true);
    }
  }

  return (
    <>
      { loading ? 
        <>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header="Hovsa!"
            subHeader="Du har allerede tilføjet dette sted!"
            mode="ios"
            message="Prøv et andet sted!"
            buttons={['OK']}
          />
          <IonAlert
            isOpen={showAlert2}
            onDidDismiss={() => setShowAlert2(false)}
            header="Hovsa!"
            subHeader="Du kan desværre ikke tilføje dette sted, det er ude fra frekvensen!"
            mode="ios"
            message="Prøv et andet sted!"
            buttons={['OK']}
          />
          <MapContainer center={position} zoom={7} scrollWheelZoom={true} >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
            <Marker position={dataLatLon} icon={myspot}>
              <Popup>
                <> 
                  <h1>{ data?.location?.name }</h1>
                  <p>Tempratur: { data?.current?.temp_c }°</p>
                  <p>Luftfugtighed: { data?.current?.humidity }</p>
                  <a href={ "/weather/" + data?.location?.lat + "/" + data?.location?.lon }>Gå til</a>
                  <IonButton onClick={e => handleSetData(data?.location?.lat + "/" + data?.location?.lon, data?.location?.country)}></IonButton>
                </> 
              </Popup>
            </Marker>
            <Cordinates/>
          </MapContainer>
        </>
        :
        <span>s</span>
      }
    </>
  );
};

export default Home;

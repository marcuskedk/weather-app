import { React, useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet"
import ExploreContainer from '../components/ExploreContainer';
import L, { popup } from "leaflet"
import './Home.scss';
import axios from "axios"
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';

const Home = ({comeatme, wack, geoLat, geoLon}) => {
  const [dataLatLon, setDataLatLon] = useState({ lat: geoLat, lon: geoLon }); {/* lat: geoLat, lon: geoLon */}
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [data, setData] = useState({});
  const Cordinates = () => {
    const map = useMapEvents({
      click: (e) => {
        setDataLatLon({lat: e.latlng.lat,  lon: e.latlng.lng} )
        console.log(dataLatLon)
        
      }
    })
    return null
  }
  // const base = ("https://api.openweathermap.org/data/2.5/weather?appid=2864c037ed39e8c864f7c0ab7e3d8a0a") 
  const base = ("https://api.weatherapi.com/v1/current.json?key=444f6a125e314ab392590227221208") 
  useEffect(() => {
    axios.get(base + "&q=" + dataLatLon.lat + "," + dataLatLon.lon + "&units=metric&lang=da")
    .then( res => {
      setData(res.data)

      console.log(res.data)
  })
    .catch((error) => console.error(error));
  }, [dataLatLon]);
  
  const [myspot, setMyspot] = useState("")
  
  const position = [56.41306112723902, 10.803491093554731];
  useEffect (() => {
    setMyspot(L.icon({ 
      iconUrl: "/assets/icon/marker-icon.png", 
      // iconSize: [20, 32]
      iconSize: [20, 32],
      iconAnchor: [10, 35],
      popupAnchor: [0, -30],
    }));
  },[]);

  // localStorage.clear();
  // sessionStorage.clear();
  const handleSetData = (sessionData) => {
    var a = wack;
    var data = wack.filter((val) => val.includes(sessionData));
    if (!data.length) {
      a.push(sessionData);
      comeatme(a);
    }
  }

  return (
    <div id="content">
      <MapContainer center={position} zoom={7} scrollWheelZoom={true} >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
        <Marker position={dataLatLon} icon={myspot}>
          <Popup>
            <> 
              <h1>{ data?.location?.name }</h1>
              <p>Tempratur: { data?.current?.temp_c }°</p>
              <p>Luftfugtighed: { data?.current?.humidity }</p>
              <a href={ "/weather/" + data?.location?.lat + "/" + data?.location?.lon }>Gå til</a>
              <IonButton onClick={e => handleSetData(data?.location?.lat + "/" + data?.location?.lon)}></IonButton>
            </> 
          </Popup>
        </Marker>
        <Cordinates/>
      </MapContainer>
    </div>
  );
};

export default Home;

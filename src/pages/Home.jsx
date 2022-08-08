import { React, useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet"
import ExploreContainer from '../components/ExploreContainer';
import L, { popup } from "leaflet"
import './Home.scss';
import axios from "axios"
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';

const Home = () => {
  const [dataLatLon, setDataLatLon] = useState({ lat: 0, lon: 0})
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false)
  const [data,setData] = useState({})
  const Cordinates = () => {
    const map = useMapEvents({
      click: (e) => {
        setDataLatLon({lat: e.latlng.lat,  lon: e.latlng.lng} )
        console.log(dataLatLon)
        
      }
    })
    return null
  }
  const base = ("https://api.openweathermap.org/data/2.5/weather?appid=2864c037ed39e8c864f7c0ab7e3d8a0a") 
  useEffect(() => {
    axios.get(base + "&lat=" + dataLatLon.lat + "&lon=" + dataLatLon.lon + "&units=metric")
    .then( res => setData(res.data))
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
  },[])

  return (
    <div id="content">
      <MapContainer center={position} zoom={7} scrollWheelZoom={true} >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
        <Marker position={dataLatLon} icon={myspot}>
          <Popup>
            <> 
              <h1>{data?.name}</h1>
              <p>Tempratur: {data?.main?.temp}°C</p>
              <p>Luftfugtighed: {data?.main?.humidity}</p>
              <a href={ dataLatLon.lat + "/" + dataLatLon.lon }>Gå til</a>
            </> 
          </Popup>
        </Marker>
        <Cordinates/>
      </MapContainer>
    </div>
  );
};

export default Home;

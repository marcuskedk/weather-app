import "leaflet/dist/leaflet.css";
import {MapContainer, Marker, Popup, TileLayer, useMapEvents,} from "react-leaflet"
import ExploreContainer from '../components/ExploreContainer';
import L, { popup } from "leaflet"
import React, { useEffect, useState } from "react";
import './Home.scss';
import axios from "axios"
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';

// const api = {
//     baseUrl: 'https://api.openweathermap.org/data/2.5/weather?appid=2864c037ed39e8c864f7c0ab7e3d8a0a',
//     contentType: "application/json; charset=utf-8",
//     apiKey: "2864c037ed39e8c864f7c0ab7e3d8a0a"
// }

const Home = () => {
    const [dataLatLon, setDataLatLon] = useState({ lat: 0, lon: 0})
    
    const Cordinates = () => {
      
    
      const map = useMapEvents({
        click: (e) => {
          setDataLatLon({lat: e.latlng.lat,  lon: e.latlng.lng} )
          console.log(dataLatLon)
          
        }
      })
      return null
    }
    
    
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false)
    const [data,setData] = useState({})
    
    
  
  
   const base = ("https://api.openweathermap.org/data/2.5/weather?appid=2864c037ed39e8c864f7c0ab7e3d8a0a") 
  
  
  
  
  
  
  
  useEffect(() => {
    
    axios.get(base + "&lat=" + dataLatLon.lat + "&lon=" + dataLatLon.lon + "&units=metric")
    .then( res => {
      
      console.log(data.name)
      setData(res.data)
      return res.data
    
    })
    
    .catch((error) => {
      console.error(error)
      return null
    })
  
    }, [dataLatLon])
  
  
  const [myspot, setMyspot] =useState("")
  
    const position = [56.52635293804066, 9.614244537563335];
    useEffect (() => {
  
      setMyspot(L.icon({ iconUrl: "/assets/icon/weatherIcon.svg", iconSize: [100, 100] }));
    },[])

    return (
      <MapContainer center={position} zoom={7} scrollWheelZoom={true} >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>


        <Marker position={dataLatLon} icon={myspot}>
      <Popup>
        
      
          <> 
          
        <h1>{data?.name}</h1>
      <p> Tempratur{data?.main?.temp}°C</p>
      <p> Luftfugtighed:{data?.main?.humidity}</p>
          </> 
      
        
      </Popup>
      </Marker>

    <Cordinates/>
  </MapContainer>
        // <IonPage>
        //     <IonHeader>
        //         <IonToolbar>
        //             <IonTitle>Vejr</IonTitle>
        //         </IonToolbar>
        //     </IonHeader>
        //     <IonContent fullscreen>
        //         <IonCard>
        //             <IonCardHeader>
        //                 <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
        //                 <IonCardTitle>Card Title</IonCardTitle>
        //             </IonCardHeader>
        //             <IonCardContent>
        //                 Keep close to Nature's heart... and break clear away, once in awhile,
        //                 and climb a mountain or spend a week in the woods. Wash your spirit clean.
        //             </IonCardContent>
        //         </IonCard>
        //     </IonContent>
        // </IonPage>
    );
};

export default Home;

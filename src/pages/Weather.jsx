import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import { OverlayEventDetail } from '@ionic/core/components'
import { useLocation, useParams, Link, Route } from 'react-router-dom';
import { IonGrid, IonRow, IonCol, IonContent, IonProgressBar, IonCardContent, IonFooter, IonIcon, IonModal, IonHeader, IonButtons, IonItem, IonToolbar, IonSearchbar, IonTitle, IonLabel, IonInput, IonTabButton, IonTabs, IonTabBar, IonRouterOutlet, IonCard } from '@ionic/react';
import { arrowBack, arrowDown, chevronDown, map, listOutline } from 'ionicons/icons';
import "./Weather.scss";
import '@ionic/react/css/ionic-swiper.css';

const base = {
    weatherAPI: "https://api.openweathermap.org/data/2.5/weather?appid=2864c037ed39e8c864f7c0ab7e3d8a0a",
    forecastAPI: "https://api.openweathermap.org/data/2.5/forecast?appid=2864c037ed39e8c864f7c0ab7e3d8a0a"
}

const Weather = () => {

  const params = useParams();
  const location = useLocation();

  const [currentLocation, setCurrentLocation] = useState();

  console.log(params)
  console.log(location)

  if (location.pathname === "/weather") {
    console.log("first")
  } else {
    console.log("second")
  }

  const [searchText, setSearchText] = useState('');
  const [weatherData, setWeather] = useState('');

  useEffect(() => {
    if (searchText.length > null) {
      axios.get(base.weatherAPI + "&q=" + searchText + "&units=metric&lang=da")
      .then( res1 => {
        setWeather(res1.data)
        console.log(res1.data)
      })
      .catch((error) => console.error(error));
    }
  }, [searchText]);

  return (
    <>
      <IonContent>
        <p>Searchbar in a Toolbar</p>
        <IonToolbar>
          <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value)}></IonSearchbar>
        </IonToolbar>
        <IonFooter>
          <IonToolbar>
            Search Text: {searchText ?? '(none)'} {weatherData?.name} {weatherData?.main?.feels_like}
          </IonToolbar>
        </IonFooter>
      </IonContent>
    </>
  )
}

export default Weather;
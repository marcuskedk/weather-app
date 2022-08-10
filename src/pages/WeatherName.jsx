import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import { useLocation, useParams, Link, Route } from 'react-router-dom';
import { IonGrid, IonRow, IonCol, IonContent, IonProgressBar, IonCardContent, IonFooter, IonIcon, IonModal, IonHeader, IonButtons, IonItem, IonToolbar, IonSearchbar, IonTitle, IonLabel, IonInput, IonTabButton, IonTabs, IonTabBar, IonRouterOutlet, IonCard } from '@ionic/react';
import { arrowBack, arrowDown, chevronDown, map, listOutline } from 'ionicons/icons';
import '@ionic/react/css/ionic-swiper.css';

const base = {
    weatherAPI: "https://api.openweathermap.org/data/2.5/weather?appid=2864c037ed39e8c864f7c0ab7e3d8a0a",
    forecastAPI: "https://api.openweathermap.org/data/2.5/forecast?appid=2864c037ed39e8c864f7c0ab7e3d8a0a"
}

const WeatherName = () => {
    const location = useParams();
    const weatherName = location.name;

    const [weatherData, setWeather] = useState();

    useEffect(() => {
        axios.get(base.weatherAPI + "&q=" + weatherName + "&units=metric&lang=da")
        .then( res1 => {
            setWeather(res1.data)
            console.log(res1.data)
        })
        .catch((error) => console.error(error));
    }, [location])

    return (
        <>
            {weatherData?.name}
        </>
    )
}

export default WeatherName;
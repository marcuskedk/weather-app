import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import { useLocation, useParams, Link, Route } from 'react-router-dom';
import { IonGrid, IonRow, IonCol, IonContent, IonProgressBar, IonList, IonCardContent, IonFooter, IonIcon, IonModal, IonHeader, IonButton, IonThumbnail, IonButtons, IonItem, IonToolbar, IonSearchbar, IonTitle, IonLabel, IonInput, IonTabButton, IonTabs, IonTabBar, IonRouterOutlet, IonCard } from '@ionic/react';
import { arrowBack, arrowDown, chevronDown, map, listOutline, cloudyNight, keyOutline } from 'ionicons/icons';
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const key = {
    weatherapi: "444f6a125e314ab392590227221208",
    openweatherapi: "2864c037ed39e8c864f7c0ab7e3d8a0a"
}

const base = {
    weatherAPI: "https://api.openweathermap.org/data/2.5/weather?appid=" + key.openweatherapi,
    forecastAPI: "https://api.openweathermap.org/data/2.5/forecast?appid=" + key.openweatherapi,
    weatherAPI_C: "https://api.weatherapi.com/v1/current.json?key=" + key.weatherapi,
    weatherAPI_F: "https://api.weatherapi.com/v1/forecast.json?key=" + key.weatherapi
}

const WeatherSlider = ({type, days, option}) => {
    const location = useParams();

    const [ WA_Forecast, setWA_Forecast ] = useState('');
    
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minute = currentDate.getMinutes();

    useEffect(() => {
        axios.get(base.weatherAPI_F + "&q=" + type + "&lang=da&days=" + days)
        .then( wap => {
            setWA_Forecast(wap.data);

            console.log("FORECAST: ", wap.data)
        })
        .catch((error) => console.error(error));
    }, [location])
    

    const slider = (
        <>
            <Swiper slidesPerView={6} className="custom-slider" mode="ios" initialSlide={0}>
                { WA_Forecast?.forecast?.forecastday[0]?.hour?.slice(0, 27).map((n, key) => (
                    new Date(n?.time).toLocaleTimeString( 'da-dk', { hour: "2-digit" }) > hours - 1 &&
                    <SwiperSlide key={key}> {/* 27 */}
                        <div className="weather-item">
                            <div className="litle-down2">{ new Date(n?.time).toLocaleTimeString( 'da-dk', { hour: "2-digit" }) == hours ? <span>Nu</span> : new Date(n?.time).toLocaleTimeString( 'da-dk', { hour: "2-digit", minute: "2-digit" }) }</div>
                            <img src={ n?.condition?.icon } alt="" />
                            <div className="litle-up">{ Math.round(n?.temp_c) }&deg;</div>
                        </div>
                    </SwiperSlide>
                ) ) }
            </Swiper>
        </>
    )

    const list = (
        <>
            { WA_Forecast?.forecast?.forecastday?.map((n, key) => (
                <IonItem className="bg-custom" color="transperent" key={key}>
                    <IonLabel>
                        <p className="big-letter-start fw-500">{ key == 0 ? <span>I dag</span> : <span>{ new Date(n?.date).toLocaleDateString( 'da-dk', { weekday: 'short' })}.</span>}</p>
                    </IonLabel>
                    <IonLabel>
                        <img src={ n?.day?.condition?.icon } height="30px" alt="" />
                    </IonLabel>
                    <IonLabel slot="end" className="d-flex custom-progressbar">
                        <p className="pe-3 d-inline-flex dont-text-overflow text-custom fw-500">{ Math.round(n?.day?.mintemp_c) }&deg;</p>
                        <IonProgressBar mode="ios" color="warning" value={"0." + Math.round(n?.day?.mintemp_c * 3.5)} buffer={"0." + Math.round(n?.day?.maxtemp_c * 3.5)}></IonProgressBar>
                        <p className="ps-3 d-inline-flex dont-text-overflow fw-500">{ Math.round(n?.day?.maxtemp_c) }&deg;</p>
                    </IonLabel>
                </IonItem>
            ) ) }
        </>
    )

    return (
        <>
            { option == "slider" && slider }
            { option == "list" && list }
        </>
    )
}

export default WeatherSlider
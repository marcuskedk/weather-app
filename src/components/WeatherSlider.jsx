import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import { useLocation, useParams, Link, Route } from 'react-router-dom';
import { IonGrid, IonRow, IonCol, IonContent, IonProgressBar, IonList, IonCardContent, IonFooter, IonIcon, IonModal, IonHeader, IonButton, IonThumbnail, IonButtons, IonItem, IonToolbar, IonSearchbar, IonTitle, IonLabel, IonInput, IonTabButton, IonTabs, IonTabBar, IonRouterOutlet, IonCard } from '@ionic/react';
import { arrowBack, arrowDown, chevronDown, map, listOutline, cloudyNight, keyOutline } from 'ionicons/icons';
import { useWindowSize } from "usehooks-ts";
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
    const { width, height } = useWindowSize()

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
            <Swiper slidesPerView={ width > 1100 ? 6 : width > 767 ? 3 : 5 } className="custom-slider" mode="ios" initialSlide={0}>
                { WA_Forecast?.forecast?.forecastday[0]?.hour?.slice(0, 27).map((n, key) => (
                    new Date(n?.time).toLocaleTimeString( 'da-dk', { hour: "2-digit" }) > hours - 1 &&
                    <SwiperSlide key={key}> {/* 27 */}
                        <div className="weather-item">
                            <div className="litle-down2 text-white">{ new Date(n?.time).toLocaleTimeString( 'da-dk', { hour: "2-digit" }) == hours ? <span>Nu</span> : new Date(n?.time).toLocaleTimeString( 'da-dk', { hour: "2-digit", minute: "2-digit" }) }</div>
                            <img src={ n?.condition?.icon } alt="" />
                            { n?.will_it_rain == 1 ? <div className="chance-for-rain">R: { n?.chance_of_rain } %</div> : n?.will_it_snow == 1 && <div className="chance-for-rain">S: { n?.chance_of_snow } %</div> }
                            <div className="litle-up text-white">{ Math.round(n?.temp_c) }&deg;</div>
                        </div>
                    </SwiperSlide>
                ) ) }
            </Swiper>
        </>
    )

    const list = (
        <>
            <div className="weather-for-days">
                { WA_Forecast?.forecast?.forecastday?.map((n, key) => (
                    <IonRow className="ion-align-center border-me" key={ key }>
                        <IonCol size-md="2" size="12" className="text-white d-flex align-items-center p-0 py-2">
                            <p className="big-letter-start fw-500">{ key == 0 ? <span>I dag</span> : <span>{ new Date(n?.date).toLocaleDateString( 'da-dk', { weekday: 'short' })}.</span>}</p>
                        </IonCol>
                        <IonCol size-md="2" size="12" className="d-flex align-items-center p-0 py-2">
                            <img src={ n?.day?.condition?.icon } height="30px" alt="" />
                            <span>{ n?.day?.daily_will_it_rain == 1 ? <div className="chance-for-rain">R: { n?.day?.daily_chance_of_rain } %</div> : n?.day?.daily_will_it_snow == 1 && <div className="chance-for-rain">S: { n?.day?.daily_chance_of_snow } %</div> }</span>
                        </IonCol>
                        <IonCol size-md="6" size="12" className="d-flex align-items-center p-0 py-2 ms-auto">
                            <p className="pe-3 d-inline-flex dont-text-overflow text-custom fw-500">{ Math.round(n?.day?.mintemp_c) }&deg;</p>
                            <div className="temperature-gauge">
                                <div className="bar" style={{width: `55.3%`, left: `22.35%`, right: `22.35%`}}></div>
                                <div className="dot" style={{left: `calc(22.35% + ${n?.day?.maxtemp_c}%)`}}></div>
                            </div>
                            <p className="ps-3 d-inline-flex dont-text-overflow fw-500 text-white">{ Math.round(n?.day?.maxtemp_c) }&deg;</p>
                        </IonCol>
                    </IonRow>
                ) ) }
            </div>
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
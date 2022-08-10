import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import { OverlayEventDetail } from '@ionic/core/components'
import { useLocation, useParams, Link, Route } from 'react-router-dom';
import { IonGrid, IonRow, IonCol, IonContent, IonProgressBar, IonCardContent, IonIcon, IonModal, IonHeader, IonButtons, IonItem, IonToolbar, IonTitle, IonLabel, IonInput, IonTabButton, IonTabs, IonTabBar, IonRouterOutlet, IonCard } from '@ionic/react';
import { arrowBack, arrowDown, chevronDown, map, listOutline } from 'ionicons/icons';
import "./WeatherLatLon.scss";
import '@ionic/react/css/ionic-swiper.css';

const key = "2864c037ed39e8c864f7c0ab7e3d8a0a";

const base = {
    weatherAPI: "https://api.openweathermap.org/data/2.5/weather?appid=" + key,
    forecastAPI: "https://api.openweathermap.org/data/2.5/forecast?appid=" + key
}

const WeatherLatLon = () => {
    
    const location = useParams();
    const lat = location.lat;
    const lon = location.lon;

    const [ weatherData, setWeather ] = useState();
    const [ forecastData, setForecast ] = useState();
    const [ error, setError ] = useState();

    useEffect(() => {
        axios.get(base.weatherAPI + "&lat=" + lat + "&lon=" + lon + "&units=metric&lang=da")
        .then( res1 => {
            setWeather(res1.data);

            axios.get(base.forecastAPI + "&lat=" + lat + "&lon=" + lon + "&units=metric&lang=da")
            .then( res2 => {
                setForecast(res2.data);
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    }, []);

    const [ modal, setModal ] = useState(false);

    const openModal = event => {
        if (modal == true) {
            setModal(false);
        } else {
            setModal(true);
        }
    }

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            { weatherData ? 
                <>
                    <IonContent className="clouds">
                        <div id="background-wrap">
                            <div className="x1">
                                <div className="cloud"></div>
                            </div>

                            <div className="x2">
                                <div className="cloud"></div>
                            </div>

                            <div className="x3">
                                <div className="cloud"></div>
                            </div>

                            <div className="x4">
                                <div className="cloud"></div>
                            </div>

                            <div className="x5">
                                <div className="cloud"></div>
                            </div>
                        </div>
                        <IonGrid className="weather-grid">
                            <IonRow>
                                <IonCol className="text-center text-white fs-3 fw-bold">{ weatherData?.name }</IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className="text-center text-white fs-1">{ Math.round(weatherData?.main.temp) }&deg;</IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className="text-center text-white fs-4">{ weatherData?.weather[0].description }</IonCol>
                            </IonRow>
                            <IonRow className="mt-3">
                                <IonCol size="3"></IonCol>
                                <IonCol size="6" className="fs-4">
                                    <IonCard className="bg-custom text-white rounded-custom">
                                        <IonCardContent>
                                            Delvist skyet vejr forventes omkring kl. 14.00.
                                            <hr className="bg-white" />
                                        </IonCardContent>
                                        <IonCardContent>
                                            <Swiper slidesPerView={7} loop={true} className="custom-slider">
                                                { forecastData?.list.map((n, key) => (
                                                    <SwiperSlide key={key}>
                                                        <div className="weather-item">
                                                            <div>{ new Date(n?.dt_txt).toLocaleTimeString( 'da-dk', { hour: "2-digit", minute: "2-digit" }) }</div>
                                                            <img src={"http://openweathermap.org/img/wn/" + n?.weather[0].icon + "@2x.png"} alt="" />
                                                            <div>{ Math.round(n?.main.temp) }&deg;</div>
                                                        </div>
                                                    </SwiperSlide>
                                                ) ) }
                                            </Swiper>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                                <IonCol size="3"></IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                </>
                : 
                <IonProgressBar color="primary" type="indeterminate"></IonProgressBar>
            }
        </>
    )
}

export default WeatherLatLon;
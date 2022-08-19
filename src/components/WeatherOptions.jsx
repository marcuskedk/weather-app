import axios from "axios";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { IonRow, IonCol } from '@ionic/react';
import { useWindowSize } from "usehooks-ts";
import CountUp from 'react-countup';
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css';

const key = {
    weatherapi: "444f6a125e314ab392590227221208"
}

const base = {
    weatherAPI_C: "https://api.weatherapi.com/v1/current.json?key=" + key.weatherapi,
    weatherAPI_F: "https://api.weatherapi.com/v1/forecast.json?key=" + key.weatherapi
}

const WeatherOptions = ({type, days, option}) => {
    const { width } = useWindowSize()
    const [ WA_Forecast, setWA_Forecast ] = useState('');
    const currentDate = new Date();
    const hours = currentDate.getHours();

    useEffect((days) => {
        axios.get(base.weatherAPI_F + "&q=" + type + "&lang=da&days=" + days + "&alerts=yes")
        .then( results => setWA_Forecast(results.data));
    }, [type]);
    

    const Slider = (
        <>
            <Swiper slidesPerView={ width > 1100 ? 6 : width > 767 ? 3 : 5 } className="custom-slider" mode="ios" initialSlide={0}>
                { WA_Forecast?.forecast?.forecastday[0]?.hour?.slice(0, 27).map((n, key) => (
                    new Date(n?.time).toLocaleTimeString( 'da-dk', { hour: "2-digit" }) > hours - 1 &&
                    <SwiperSlide key={key}>
                        <div className="weather-item">
                            <div className="litle-down2 text-white">{ new Date(n?.time).toLocaleTimeString( 'da-dk', { hour: "2-digit" }) === hours ? <span>Nu</span> : new Date(n?.time).toLocaleTimeString( 'da-dk', { hour: "2-digit", minute: "2-digit" }) }</div>
                            <img src={ n?.condition?.icon } alt={ n?.condition?.text } title={ n?.condition?.text } />
                            { n?.will_it_rain === 1 ? <div className="chance-for-rain">R: { n?.chance_of_rain } %</div> : n?.will_it_snow === 1 && <div className="chance-for-rain">S: { n?.chance_of_snow } %</div> }
                            <div className="litle-up text-white"><CountUp start={0} end={ Math.round(n?.temp_c) } duration={1} />&deg;</div>
                        </div>
                    </SwiperSlide>
                ) ) }
            </Swiper>
        </>
    )

    const List = (
        <>
            <div className="weather-for-days">
                { WA_Forecast?.forecast?.forecastday?.map((n, key) => (
                    <IonRow className="ion-align-center border-me" key={ key }>
                        <IonCol size-md="2" size="12" className="text-white d-flex align-items-center p-0 py-2">
                            <p className="big-letter-start fw-500">{ key === 0 ? <span>I dag</span> : <span>{ new Date(n?.date).toLocaleDateString( 'da-dk', { weekday: 'short' })}.</span>}</p>
                        </IonCol>
                        <IonCol size-md="2" size="12" className="d-flex align-items-center p-0 py-2">
                            <img src={ n?.day?.condition?.icon } height="30px" alt={ n?.day?.condition?.text } title={ n?.day?.condition?.text } />
                            <div>{ n?.day?.daily_will_it_rain === 1 ? <div className="chance-for-rain">R: { n?.day?.daily_chance_of_rain } %</div> : n?.day?.daily_will_it_snow === 1 && <div className="chance-for-rain">S: { n?.day?.daily_chance_of_snow } %</div> }</div>
                        </IonCol>
                        <IonCol size-md="6" size="12" className="d-flex align-items-center p-0 py-2 ms-auto">
                            <p className="pe-3 d-inline-flex dont-text-overflow text-custom fw-500"><CountUp start={0} end={ Math.round(n?.day?.mintemp_c) } duration={1} />&deg;</p>
                            <div className="temperature-gauge">
                                <div className="bar" style={{width: `55.3%`, left: `22.35%`, right: `22.35%`}}></div>
                                <div className="dot" style={{left: `calc(22.35% + ${n?.day?.maxtemp_c}%)`}}></div>
                            </div>
                            <p className="ps-3 d-inline-flex dont-text-overflow fw-500 text-white"><CountUp start={0} end={ Math.round(n?.day?.maxtemp_c) } duration={1} />&deg;</p>
                        </IonCol>
                    </IonRow>
                ) ) }
            </div>
        </>
    )

    return (
        <>
            { option === "slider" && Slider }
            { option === "list" && List }
        </>
    )
}

export default WeatherOptions;
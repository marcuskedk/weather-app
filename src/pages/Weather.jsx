import axios from "axios";
import React, { useState, useEffect } from "react";

import { useParams } from 'react-router-dom';
import { IonGrid, IonRow, IonCol, IonContent, IonCardContent, IonFooter, IonHeader, IonToolbar, IonSearchbar, IonTitle, IonCard } from '@ionic/react';
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css';
import WeatherSlider from "../components/WeatherSlider";

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

const Weather = () => {
  const location = useParams();
  const [ searchText, setSearchText ] = useState('');
  const [ weatherDataBySearch, setWeatherBySearch ] = useState('');
  const [ weatherDataByName, setWeatherByName ] = useState('');
  const [ WA_Current, setWA_Current ] = useState('');
  const [ WA_Forecast, setWA_Forecast ] = useState('');

  // const currentDate = new Date();
  // const day = currentDate.getDate();
  // const month = currentDate.getMonth() + 1;
  // const year = currentDate.getFullYear();
  // const hours = currentDate.getHours();
  // const minute = currentDate.getMinutes();

  var type = "";
  if (location.name) {
    type = location.name;
  } else {
    if (searchText.length > 0) {
      type = searchText;
    } else {
      type = "Grenaa";
    }
  }

  useEffect(() => {
      axios.get(base.weatherAPI + "&q=" + type + "&units=metric&lang=da")
      .then( res1 => {
        if (location.name) {
          setWeatherByName(res1.data)
        } else {
          setWeatherBySearch(res1.data)
        }

        {/* CURRENT */}
        axios.get(base.weatherAPI_C + "&q=" + type + "&lang=da")
        .then( wap1 => setWA_Current(wap1.data))
        .catch((error) => console.error(error));
        
        {/* FORECAST */}
        axios.get(base.weatherAPI_F + "&q=" + type + "&lang=da&days=1")
        .then( wap2 => setWA_Forecast(wap2.data))
        .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, [searchText, location]);

  // const sortedActivities = WA_Forecast?.forecast?.forecastday?.reduce((prev, curr) => {
  //   const existing = prev.find((p) => p.day..slice(0, 10) === curr.time.slice(0, 10));
  //   console.log(existing)
  //   if (existing) {
  //     // let exmax = existing.day.maxtemp_c;
  //     // let exmin = existing.day.mintemp_c;
  //     // if (exmax < curr.main.temp_max) {
  //     //   existing.day.maxtemp_c = curr.day.maxtemp_c;
  //     // }
  //     // if (exmin < curr.main.temp_min) {
  //     //   existing.main.temp_min = curr.main.temp_min;
  //     // }
  //   } else {
  //     prev.push(curr)
  //   }
  //   return prev;
  // }, []);

  const BySearch = (
    <>
      jer
    </>
  );

  const ByName = (
    <>
    <IonContent className="clouds">
        <div id="background-wrap">
            <div className="x1">
                <img src={ WA_Current?.current?.condition?.icon } alt="" />
            </div>

            <div className="x2">
                <img src={ WA_Current?.current?.condition?.icon } alt="" />
            </div>

            <div className="x3">
                <img src={ WA_Current?.current?.condition?.icon } alt="" />
            </div>

            <div className="x4">
                <img src={ WA_Current?.current?.condition?.icon } alt="" />
            </div>

            <div className="x5">
                <img src={ WA_Current?.current?.condition?.icon } alt="" />
            </div>
        </div>
        <IonGrid className="weather-grid">
            <IonRow className="ion-justify-content-center">
                <IonCol size-md="6">
                  <IonRow className="ion-justify-content-center">
                    <IonCol size="12">
                      <p className="text-center text-white fs-3 mb-0 mt-0 fw-400">
                        { WA_Current?.location?.name }
                      </p>
                      <p className="text-center text-white fs-1 mb-0 mt-0 fw-700">
                        { Math.round(WA_Forecast?.forecast?.forecastday[0]?.day?.maxtemp_c) }&deg;
                      </p>
                      <p className="text-center text-white fs-4 mt-0 big-letter-start">
                        { WA_Current?.current?.condition?.text }<br />
                        H: { Math.round(WA_Forecast?.forecast?.forecastday[0]?.day?.maxtemp_c) }&deg;  L: { Math.round(WA_Forecast?.forecast?.forecastday[0]?.day?.mintemp_c) }&deg;
                      </p>
                    </IonCol>
                    <IonCol size="12" className="fs-4">
                        <IonCard className="bg-custom text-white rounded-custom">
                            <IonCardContent className="text-custom fw-400">
                                VEJRUDSIGT FOR RESTEN AF DAGEN.
                                <hr className="bg-custom-2" />
                            </IonCardContent>
                            <WeatherSlider type={ type } days={ 1 } option="slider" />
                        </IonCard>
                    </IonCol>
                  <IonCol size="12" className="fs-4">
                    <IonCard className="bg-custom text-white rounded-custom">
                      <IonCardContent className="pb-0 text-custom fw-400">
                        VEJRUDSIGT FOR DE NÆSTE 10 DAGE.
                        <hr className="bg-custom-2" />
                      </IonCardContent>
                      <WeatherSlider type={ type } days={ 10 } option="list" />
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="fs-4">
                    <IonCard className="bg-custom text-white rounded-custom">
                      <IonCardContent className="">
                        UV-INDEKS
                        <p>{ WA_Current?.current?.uv }</p>
                        <img src={ WA_Current?.current?.condition?.icon } alt="" />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="fs-4">
                    <IonCard className="bg-custom text-white rounded-custom">
                      <IonCardContent className="">
                        SOLNEDGANG
                        <hr className="bg-white" />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="fs-4">
                    <IonCard className="bg-custom text-white rounded-custom">
                      <IonCardContent className="">
                        VIND
                        <hr className="bg-white" />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="fs-4">
                    <IonCard className="bg-custom text-white rounded-custom">
                      <IonCardContent className="">
                        REGN
                        <hr className="bg-white" />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="fs-4">
                    <IonCard className="bg-custom text-white rounded-custom">
                      <IonCardContent className="">
                        FØLES SOM
                        <hr className="bg-white" />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="fs-4">
                    <IonCard className="bg-custom text-white rounded-custom">
                      <IonCardContent className="">
                      LUFTFUGTIGHED
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="fs-4">
                    <IonCard className="bg-custom text-white rounded-custom">
                      <IonCardContent className="">
                        SIGTBARHED
                        <hr className="bg-white" />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="fs-4">
                    <IonCard className="bg-custom text-white rounded-custom">
                      <IonCardContent className="">
                        LUFTTRYK
                        <hr className="bg-white" />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="fs-4">
                    <IonCard className="bg-custom text-white rounded-custom">
                      <IonCardContent className="">
                        <h2>Rapporter et problem</h2>
                        <p>Du kan beskrive de...</p>
                        <hr className="bg-white" />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="fs-4">
                    <IonCard className="bg-custom text-white rounded-custom">
                      <IonCardContent className="">
                      Åben i kort
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="fs-4">
                    <IonCard className="bg-custom text-white rounded-custom">
                      <IonCardContent className="">
                      Vejroplysninger for Ydesvej 
                      <a href="">Læs mere om vejrdata og kortdata</a>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
        </IonGrid>
      </IonContent>
    </>
  )

  return (
    <>
        { weatherDataBySearch && 
          <>
            { BySearch }
            <IonContent>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Søg præcis efter hvilken by...</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonToolbar>
                <IonSearchbar mode="ios" value={searchText} placeholder="Søg efter by..." onIonChange={e => setSearchText(e.detail.value)}></IonSearchbar>
              </IonToolbar>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonCard>
                      <IonCardContent>
                        her
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              </IonGrid>
              <IonFooter>
                <IonToolbar>
                  Search Text: {searchText ?? '(none)'} {weatherDataBySearch?.name} {weatherDataBySearch?.main?.feels_like}
                </IonToolbar>
              </IonFooter>
            </IonContent>
          </>
        }
        { weatherDataByName && ByName }
    </>
  )
}

export default Weather;
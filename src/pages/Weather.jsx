import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import { OverlayEventDetail } from '@ionic/core/components'
import { useLocation, useParams, Link, Route } from 'react-router-dom';
import { IonGrid, IonRow, IonCol, IonContent, IonProgressBar, IonList, IonCardContent, IonFooter, IonIcon, IonModal, IonHeader, IonButton, IonThumbnail, IonButtons, IonItem, IonToolbar, IonSearchbar, IonTitle, IonLabel, IonInput, IonTabButton, IonTabs, IonTabBar, IonRouterOutlet, IonCard } from '@ionic/react';
import { arrowBack, arrowDown, chevronDown, map, listOutline, cloudyNight } from 'ionicons/icons';
import "./Weather.scss";
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const key = "2864c037ed39e8c864f7c0ab7e3d8a0a";

const base = {
    weatherAPI: "https://api.openweathermap.org/data/2.5/weather?appid=" + key,
    forecastAPI: "https://api.openweathermap.org/data/2.5/forecast?appid=" + key
}

const Weather = () => {
  const location = useParams();
  const [ searchText, setSearchText ] = useState('');
  const [ weatherDataBySearch, setWeatherBySearch ] = useState('');
  const [ weatherDataByName, setWeatherByName ] = useState('');
  const [ forecastData, setForecast ] = useState('');

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minute = currentDate.getMinutes();

  const mathDate = year + "-" + month + "-" + day + " " + hours + ":" + minute + ":00"; {/* 2022-08-11 09:00:00 */}

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
        var lat = res1.data.coord.lat;
        var lon = res1.data.coord.lon;
        
        axios.get(base.forecastAPI + "&lat=" + lat + "&lon=" + lon + "&units=metric&lang=da")
        .then( res2 => {
            setForecast(res2.data);

            // console.log(res2.data)
        })
        .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, [searchText, location]);

  const sortedActivities = forecastData?.list?.reduce((prev, curr) => {
    const existing = prev.find((p) => p.dt_txt.slice(0, 10) === curr.dt_txt.slice(0, 10))
    if (existing) {
      let exmax = existing.main.temp_max;
      let exmin = existing.main.temp_min;
      if (exmax < curr.main.temp_max) {
        existing.main.temp_max = curr.main.temp_max;
      }
      if (exmin < curr.main.temp_min) {
        existing.main.temp_min = curr.main.temp_min;
      }
    } else {
      prev.push(curr)
    }
    return prev;
  }, []);

  return (
    <>
        { weatherDataBySearch && 
          <>
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
        { weatherDataByName && 
          <>
          <IonContent className="clouds">
              <div id="background-wrap">
                  <div className="x1">
                      <img src={"http://openweathermap.org/img/w/" + weatherDataByName?.weather[0]?.icon + ".png"} alt="" />
                  </div>

                  <div className="x2">
                      <img src={"http://openweathermap.org/img/w/" + weatherDataByName?.weather[0]?.icon + ".png"} alt="" />
                  </div>

                  <div className="x3">
                      <img src={"http://openweathermap.org/img/w/" + weatherDataByName?.weather[0]?.icon + ".png"} alt="" />
                  </div>

                  <div className="x4">
                      <img src={"http://openweathermap.org/img/w/" + weatherDataByName?.weather[0]?.icon + ".png"} alt="" />
                  </div>

                  <div className="x5">
                      <img src={"http://openweathermap.org/img/w/" + weatherDataByName?.weather[0]?.icon + ".png"} alt="" />
                  </div>
              </div>
              <IonGrid className="weather-grid">
                  <IonRow className="ion-justify-content-center">
                      <IonCol size-md="6">
                        <IonRow className="ion-justify-content-center">
                          <IonCol size="12">
                            <p className="text-center text-white fs-3 mb-0 mt-0 fw-400">
                              { weatherDataByName?.name }
                            </p>
                            <p className="text-center text-white fs-1 mb-0 mt-0 fw-700">
                              { Math.round(weatherDataByName?.main.temp) }&deg;
                            </p>
                            <p className="text-center text-white fs-4 mt-0 big-letter-start">
                              { weatherDataByName?.weather[0].description }<br />
                              H: { Math.round(weatherDataByName?.main?.temp_max) }&deg;  L: { Math.round(weatherDataByName?.main?.temp_min) }&deg;
                            </p>
                          </IonCol>
                          <IonCol size="12" className="fs-4">
                              <IonCard className="bg-custom text-white rounded-custom">
                                  <IonCardContent>
                                      Delvist skyet vejr forventes omkring kl. 14.00.
                                      <hr className="bg-white" />
                                  </IonCardContent>
                                  <Swiper slidesPerView={6} className="custom-slider" mode="ios" initialSlide={1}>
                                      { forecastData?.list?.map((n, key) => (
                                          <SwiperSlide key={key} className={n?.dt_txt}>
                                              <div className="weather-item">
                                                  <div className="litle-down1">{ new Date(n?.dt_txt).toLocaleDateString( 'da-dk', { day: 'numeric' } ) == day ? <span>I dag</span> : <span>{ new Date(n?.dt_txt).toLocaleDateString( 'da-dk', { weekday: 'short' })}.</span> }</div>
                                                  <div className="litle-down2">{ new Date(n?.dt_txt).toLocaleTimeString( 'da-dk', { hour: "2-digit", minute: "2-digit" }) }</div>
                                                  <img src={"http://openweathermap.org/img/w/" + n?.weather[0].icon + ".png"} alt="" />
                                                  <div className="litle-up">{ Math.round(n?.main.temp) }&deg;</div>
                                              </div>
                                          </SwiperSlide>
                                      ) ) }
                                  </Swiper>
                              </IonCard>
                          </IonCol>
                        <IonCol size="12" className="fs-4">
                          <IonCard className="bg-custom text-white rounded-custom">
                            <IonCardContent className="pb-0 text-custom fw-400">
                              VEJRUDSIGT FOR DE NÆSTE 6 DAGE
                              <hr className="bg-custom-2" />
                            </IonCardContent>
                              { sortedActivities?.map((n, key) => (
                                <IonItem className="bg-custom" color="transperent" key={key}>
                                  <IonLabel>
                                    <p className="big-letter-start fw-500">{ key == 0 ? <span>I dag</span> : <span>{ new Date(n?.dt_txt).toLocaleDateString( 'da-dk', { weekday: 'short' })}.</span>}</p>
                                  </IonLabel>
                                  <IonLabel>
                                    <img src={"http://openweathermap.org/img/w/" + n?.weather[0].icon + ".png"} height="30px" alt="" />
                                  </IonLabel>
                                  <IonLabel slot="end" className="d-flex custom-progressbar">
                                    <p className="pe-3 d-inline-flex dont-text-overflow text-custom fw-500">{n?.main?.temp_min }&deg;</p>
                                    <IonProgressBar mode="ios" color="warning" value={"0." + Math.round(n?.main?.temp_min)} buffer={"0." + Math.round(n?.main?.temp_max)}></IonProgressBar>
                                    <p className="ps-3 d-inline-flex dont-text-overflow fw-500">{ n?.main?.temp_max }&deg;</p>
                                  </IonLabel>
                                </IonItem>
                              ) ) }
                          </IonCard>
                        </IonCol>
                        <IonCol size="6" size-md="6" className="fs-4">
                          <IonCard className="bg-custom text-white rounded-custom">
                            <IonCardContent className="">
                              UV-INDEKS
                              <hr className="bg-white" />
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
        }
    </>
  )
}

export default Weather;
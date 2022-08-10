import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import { OverlayEventDetail } from '@ionic/core/components'
import { useLocation, useParams, Link, Route } from 'react-router-dom';
import { IonGrid, IonRow, IonCol, IonContent, IonProgressBar, IonCardContent, IonFooter, IonIcon, IonModal, IonHeader, IonButtons, IonItem, IonToolbar, IonSearchbar, IonTitle, IonLabel, IonInput, IonTabButton, IonTabs, IonTabBar, IonRouterOutlet, IonCard } from '@ionic/react';
import { arrowBack, arrowDown, chevronDown, map, listOutline, cloudyNight } from 'ionicons/icons';
import "./Weather.scss";
import '@ionic/react/css/ionic-swiper.css';

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
    console.log(type)
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
        })
        .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, [searchText, location]);

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
                      {/* <div className="cloud"></div> */}
                      {/* <img src={} alt="" /> */}
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
                      <IonCol className="text-center text-white fs-3 fw-bold">{ weatherDataByName?.name }</IonCol>
                  </IonRow>
                  <IonRow>
                      <IonCol className="text-center text-white fs-1">{ Math.round(weatherDataByName?.main.temp) }&deg;</IonCol>
                  </IonRow>
                  <IonRow>
                      <IonCol className="text-center text-white fs-4">{ weatherDataByName?.weather[0].description }</IonCol>
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
                                      { forecastData?.list?.map((n, key) => (
                                          <SwiperSlide key={key} className={n?.dt_txt}>
                                              <div className="weather-item">
                                                  <div className="litle-down1">{ new Date(n?.dt_txt).toLocaleDateString( 'da-dk', { day: "numeric", month: "numeric" }) }</div>
                                                  <div className="litle-down2">{ new Date(n?.dt_txt).toLocaleTimeString( 'da-dk', { hour: "2-digit", minute: "2-digit" }) }</div>
                                                  <img src={"http://openweathermap.org/img/w/" + n?.weather[0].icon + ".png"} alt="" />
                                                  <div className="litle-up">{ Math.round(n?.main.temp) }&deg;</div>
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
        }
    </>
  )
}

export default Weather;
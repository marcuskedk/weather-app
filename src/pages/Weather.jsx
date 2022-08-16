import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { IonGrid, IonRow, IonCol, IonContent, IonCardContent, IonIcon, IonFooter, IonHeader, IonToolbar, IonSearchbar, IonTitle, IonCard, IonProgressBar } from '@ionic/react';
import { sunnyOutline } from "ionicons/icons";
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css';
import WeatherSlider from "../components/WeatherSlider";

const key = {
  weatherapi: "444f6a125e314ab392590227221208"
}

const base = {
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
  const [ loading, setLoading ] = useState(false);

  var type = "";
  var lat = "";
  var lon = "";
  if (location.lat) {
    type = location.lat + "," + location.lon;
    lat = location.lat;
    lon = location.lon;
  } else {
    if (searchText.length > 0) {
      type = searchText;
      lat = "56.4";
      lon = "10.89";
    } else {
      type = "Grenaa";
      lat = "56.4";
      lon = "10.89";
    }
  }

  useEffect(() => {
      axios.get(base.weatherAPI_C + "&q=" + lat + "," + lon + "&units=metric&lang=da")
      .then( res1 => {
        if (location.lat) {
          setWeatherByName(res1.data)
        } else {
          setWeatherBySearch(res1.data)
        }
        setLoading(true);

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

  const BySearch = (
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
  );

  var uv_data = "";
  var uv_description = "";
  var this_uv = WA_Current?.current?.uv;
  if (this_uv <= 2) {
    uv_data = "Lav";
    uv_description = "Ingen solbeskyttelse påkrævet";
  } else if (this_uv <= 5) {
    uv_data = "Moderat";
    uv_description = "Solbeskyttelse påkrævet";
  } else if (this_uv <= 7) {
    uv_data = "Høj";
    uv_description = "Solbeskyttelse påkrævet";
  } else if (this_uv <= 10) {
    uv_data = "Meget høj";
    uv_description = "Ekstra solbeskyttelse påkrævet";
  } else if (this_uv <= 11) {
    uv_data = "Ekstremt høj";
    uv_description = "Ekstra solbeskyttelse påkrævet";
  }

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
                    <p className="text-center text-white fs-5 mb-0 mt-0 fw-500">
                      { WA_Current?.location?.country + ", " + WA_Current?.location?.region }
                    </p>
                    <p className="text-center text-white fs-3 mb-0 mt-0 fw-400">
                      { WA_Current?.location?.name }
                    </p>
                    <p className="text-center text-white fs-1 mb-0 mt-0 fw-700">
                      { Math.round(WA_Forecast?.current?.temp_c) }&deg;
                    </p>
                    <p className="text-center text-white fs-4 mt-0 big-letter-start">
                      { WA_Current?.current?.condition?.text }<br />
                      H: { Math.round(WA_Forecast?.forecast?.forecastday[0]?.day?.maxtemp_c) }&deg;  L: { Math.round(WA_Forecast?.forecast?.forecastday[0]?.day?.mintemp_c) }&deg;
                    </p>
                  </IonCol>
                  <IonCol size="12" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="text-custom fw-400">
                        <h4 className="text-custom fw-400 d-flex">VEJRUDSIGT FOR RESTEN AF DAGEN. <span className="ms-auto">R = Regn, S = Sne</span></h4>
                        <div className="mt-auto">
                          <WeatherSlider type={ type } days={ 1 } option="slider" />
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="12" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="pb-0 text-custom fw-400">
                        <h4 className="text-custom fw-400 d-flex">VEJRUDSIGT FOR DE NÆSTE 10 DAGE.</h4>
                        <hr className="bg-custom-2 w-100" />
                        <WeatherSlider type={ type } days={ 10 } option="list" />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <h4 className="text-custom fw-400 d-flex"><IonIcon className="me-1" icon={ sunnyOutline } /> UV-INDEKS</h4>
                        <p className="fs-3">{ this_uv }</p>
                        <p>{ uv_data }</p>
                        <div className="uv-index-gauge">
                          <span className={ "dot index-" + Math.round(this_uv) } style={{left: `calc(9.09% * ${Math.round(this_uv)}%)`}}></span>
                        </div>
                        <p className="mt-auto fs-7">{ uv_description }</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <h4 className="text-custom fw-400 d-flex"><IonIcon className="me-1" icon={ sunnyOutline } />SOLNEDGANG</h4>
                        <p className="mt-auto fs-7">Sol op: { WA_Forecast?.forecast?.forecastday[0]?.astro?.sunrise.slice(0, 5) }</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <h4 className="text-custom fw-400">VIND</h4>
                        <div className="compass">
                          <div className="compass-circle">
                            <img src="../../assets/compass-circle.svg" alt="" />
                          </div>
                          <div className="circle">
                            <span className="N">N</span>
                            <span className="E">Ø</span>
                            <span className="S">S</span>
                            <span className="W">V</span>
                          </div>
                          <span className="incircle-text"><b>{ WA_Current?.current?.vis_miles }</b><span className="second">m/s</span></span>
                          <div className="arrow">
                            <img src="../../assets/arrow-n.png" className={ "direction-" + WA_Current?.current?.wind_dir } style={{transform: `rotate(${WA_Current?.current?.wind_degree}deg)`}} alt="" />
                          </div>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <h4 className="text-custom fw-400">REGN</h4>
                        <p className="fs-3">{ WA_Current?.current?.precip_mm } mm</p>
                        <p className="fs-7">i de sidste <br />24 timer</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <h4 className="text-custom fw-400">FØLES SOM</h4>
                        <p className="fs-3">{ Math.round(WA_Current?.current?.feelslike_c) }&deg;</p>
                        <p className="mt-auto fs-7">Svarende til den faktiske temperatur.</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                      LUFTFUGTIGHED
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        SIGTBARHED
                        <hr className="bg-white" />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        LUFTTRYK
                        <hr className="bg-white" />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <h2>Rapporter et problem</h2>
                        <p>Du kan beskrive de...</p>
                        <hr className="bg-white" />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                      Åben i kort
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="12" size-md="12" className="card-custom-h">
                    <IonCardContent className="text-center">
                      Vejroplysninger for Ydesvej<br />
                      <a href="">Læs mere om vejrdata og kortdata</a>
                    </IonCardContent>
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
      { loading ? weatherDataBySearch ? BySearch : weatherDataByName && ByName : <IonProgressBar color="primary" type="indeterminate"></IonProgressBar> }
    </>
  )
}

export default Weather;
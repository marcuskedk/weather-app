import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { IonGrid, IonRow, IonCol, IonContent, IonCardContent, IonIcon, IonCard, IonProgressBar } from '@ionic/react';
import { sunnyOutline } from "ionicons/icons";
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css';
import WeatherOptions from "../components/WeatherOptions";
import CountUp from 'react-countup';

const key = {
  weatherapi: "444f6a125e314ab392590227221208"
}

const base = {
  weatherAPI_C: "https://api.weatherapi.com/v1/current.json?key=" + key.weatherapi,
  weatherAPI_F: "https://api.weatherapi.com/v1/forecast.json?key=" + key.weatherapi
}

const Weather = () => {
  const location = useParams();
  const [ WA_Current, setWA_Current ] = useState('');
  const [ WA_Forecast, setWA_Forecast ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const type = location.lat + "," + location.lon;

  useEffect(() => {
    axios.get(base.weatherAPI_C + "&q=" + type + "&lang=da&alerts=yes")
    .then( WA1 => {
      setWA_Current(WA1.data);

      axios.get(base.weatherAPI_F + "&q=" + type + "&lang=da&days=1&alerts=yes")
      .then( WA2 => {
        setWA_Forecast(WA2.data);

        setLoading(true);
      });
    });
    return () => {
      
    }
  }, [location]);

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

  const WeatherView = (
    <>
      <IonContent className="clouds">
        <div className="background-wrap">
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
                          <WeatherOptions type={ type } days={ 1 } option="slider" />
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="12" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="pb-0 text-custom fw-400">
                        <h4 className="text-custom fw-400 d-flex">VEJRUDSIGT FOR DE NÆSTE 10 DAGE.</h4>
                        <hr className="bg-custom-2 w-100" />
                        <WeatherOptions type={ type } days={ 10 } option="list" />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <h4 className="text-custom fw-400 d-flex"><IonIcon className="me-1" icon={ sunnyOutline } /> UV-INDEKS</h4>
                        <p className="fs-3"><CountUp start={0} end={ this_uv } duration={1} /></p>
                        <p className="fs-5">{ uv_data }</p>
                        <div className="uv-index-gauge">
                          <span className={ "dot index-" + this_uv } style={{left: `calc(9.09% * ${this_uv})`}}></span>
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
                        <h4 className="text-custom fw-400 d-flex"><IonIcon className="me-1" icon={ sunnyOutline } />VIND</h4>
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
                          <div className="incircle-text">
                            <span className="first"><CountUp start={0} end={ WA_Current?.current?.vis_miles } duration={1} /></span>
                            <span className="second">m/s</span>
                          </div>
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
                        <h4 className="text-custom fw-400 d-flex"><IonIcon className="me-1" icon={ sunnyOutline } />REGN</h4>
                        <p className="fs-3"><CountUp start={0} end={ WA_Current?.current?.precip_mm } duration={1} /> mm</p>
                        <p className="fs-7">i de sidste <br />24 timer</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <h4 className="text-custom fw-400 d-flex"><IonIcon className="me-1" icon={ sunnyOutline } />FØLES SOM</h4>
                        <p className="fs-3"><CountUp start={0} end={ Math.round(WA_Current?.current?.feelslike_c) } duration={1} />&deg;</p>
                        <p className="mt-auto fs-7">Svarende til den faktiske temperatur.</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <h4 className="text-custom fw-400 d-flex"><IonIcon className="me-1" icon={ sunnyOutline } />LUFTFUGTIGHED</h4>
                        <p className="fs-3"><CountUp start={0} end={ WA_Current?.current?.humidity } duration={1} /> %</p>
                        <p className="mt-auto fs-7">Dugpunktet er 16&deg; lige nu.</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <h4 className="text-custom fw-400 d-flex"><IonIcon className="me-1" icon={ sunnyOutline } />SIGTBARHED</h4>
                        <p className="fs-3"><CountUp start={0} end={ WA_Current?.current?.gust_kph } duration={1} /> km</p>
                        <p className="mt-auto fs-7">Det klart lige nu.</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <h4 className="text-custom fw-400 d-flex"><IonIcon className="me-1" icon={ sunnyOutline } />LUFTTRYK</h4>
                        <p className="mt-auto fs-7">Det klart lige nu.</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="12" size-md="12" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <h2>Rapporter et problem</h2>
                        <p>Du kan beskrive de...</p>
                        <hr className="bg-white" />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="12" size-md="12" className="card-custom-h">
                    <div className="">
                      <hr className="bg-custom-2" />
                      <Link to="/map" className="w-100 d-block d-flex py-2 ion-align-items-center text-underline-none">Åben i kort<IonIcon className="ms-auto" icon={ sunnyOutline } /></Link>
                      <hr className="bg-custom-2" />
                    </div>
                  </IonCol>
                  <IonCol size="12" size-md="12" className="card-custom-h">
                    <div className="text-center">
                      Vejroplysninger for Ydesvej<br />
                      <Link to="/map" className="text-underline-none">Læs mere om vejrdata og kortdata</Link>
                    </div>
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
      { loading ? WeatherView : <IonProgressBar color="primary" type="indeterminate"></IonProgressBar> }
    </>
  )
}

export default Weather;
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { IonGrid, IonRow, IonCol, IonContent, IonCardContent, IonIcon, IonCard, IonButton } from '@ionic/react';
import { sunny, cloudyNight, thermometer, calendar, compass, rainy, ellipse, eye, rose, open, chevronForward, helpCircleOutline } from "ionicons/icons";
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css';
import WeatherOptions from "../components/WeatherOptions";
import CountUp from 'react-countup';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const key = {
  weatherapi: "444f6a125e314ab392590227221208"
}

const base = {
  weatherAPI_C: "https://api.weatherapi.com/v1/current.json?key=" + key.weatherapi,
  weatherAPI_F: "https://api.weatherapi.com/v1/forecast.json?key=" + key.weatherapi
}

const Weather = ({comeatme, wack, geoLat, geoLon, myCoords}) => {
  const location = useParams();
  const [ WA_Current, setWA_Current ] = useState('');
  const [ WA_Forecast, setWA_Forecast ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const type = location?.lat + "," + location?.lon;

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
  }, [type]);

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

  const deleteThis = (type) => {
    var data = [];
    if (wack.length === 1) {
      localStorage.clear();
    } else {
      data = wack.filter((val) => val.latlon !== type);
      localStorage.setItem("addedToList", JSON.stringify(data));
      if (data.length === 0) {
        localStorage.removeItem("addedToList");
        comeatme(data);
      }
    }
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
                  { !location?.mycoords &&
                    <IonCol size-md="12" size="12" className="card-custom-h">
                      <div className="d-flex w-100" style={{padding: "5px 10px"}}><IonButton href={ geoLat > 0 ? "/weather/" + geoLat + "/" + geoLon + "/mycoords" : "/list?status=success" } className="ms-auto" color="danger" onClick={() => deleteThis(type.replace(",", "/"))}>Slet { WA_Current?.location?.name }</IonButton></div>
                    </IonCol>
                  }
                  <IonCol size-md="12" size="12">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="text-custom fw-400">
                        <h4 className="text-custom fw-400 d-flex">VEJRUDSIGT FOR RESTEN AF DAGEN. <span className="ms-auto">R = Regn, S = Sne</span></h4>
                        <div className="mt-auto">
                          <WeatherOptions type={ type } days={ 1 } option="slider" />
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size-md="12" size="12">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="pb-0 text-custom fw-400">
                        <h4 className="text-custom fw-400 d-flex"><IonIcon className="me-1" icon={ calendar } /> VEJRUDSIGT FOR DE NÆSTE 10 DAGE.</h4>
                        <hr className="bg-custom-2 w-100" />
                        <WeatherOptions type={ type } days={ 10 } option="list" />
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <h4 className="text-custom fw-400 d-flex"><IonIcon className="me-1" icon={ sunny } /> UV-INDEKS</h4>
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
                        <h4 className="text-custom fw-400 d-flex"><IonIcon className="me-1" icon={ cloudyNight } /> SOLNEDGANG</h4>
                        <p className="mt-auto fs-7">Sol op: { WA_Forecast?.forecast?.forecastday[0]?.astro?.sunrise.slice(0, 5) }</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <h4 className="text-custom fw-400 d-flex"><IonIcon className="me-1" icon={ compass } /> VIND</h4>
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
                        <h4 className="text-custom fw-400 d-flex"><IonIcon className="me-1" icon={ rainy } /> REGN</h4>
                        <p className="fs-3"><CountUp start={0} end={ WA_Current?.current?.precip_mm } duration={1} /> mm</p>
                        <p className="fs-7">i de sidste <br />24 timer</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <h4 className="text-custom fw-400 d-flex"><IonIcon className="me-1" icon={ thermometer } /> FØLES SOM</h4>
                        <p className="fs-3"><CountUp start={0} end={ Math.round(WA_Current?.current?.feelslike_c) } duration={1} />&deg;</p>
                        <p className="mt-auto fs-7">Svarende til den faktiske temperatur.</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <h4 className="text-custom fw-400 d-flex"><IonIcon className="me-1" icon={ rose } /> LUFTFUGTIGHED</h4>
                        <p className="fs-3"><CountUp start={0} end={ WA_Current?.current?.humidity } duration={1} /> %</p>
                        <p className="mt-auto fs-7">Dugpunktet er 16&deg; lige nu.</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <h4 className="text-custom fw-400 d-flex"><IonIcon className="me-1" icon={ eye } /> SIGTBARHED</h4>
                        <p className="fs-3"><CountUp start={0} end={ WA_Current?.current?.gust_kph } duration={1} /> km</p>
                        <p className="mt-auto fs-7">Det klart lige nu.</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="6" size-md="6" className="card-custom-h">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <h4 className="text-custom fw-400 d-flex"><IonIcon className="me-1" icon={ ellipse } /> LUFTTRYK</h4>
                        <p className="fs-3">{ WA_Current?.current?.pressure_mb.toLocaleString(undefined, { maximumFractionDigits: 2 }) }<br /><span className="fs-4">hPa</span></p>
                        <p className="mt-auto fs-7">Lav til høj.</p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="12" size-md="12">
                    <IonCard className="bg-custom text-white rounded-custom card-custom-h-content">
                      <IonCardContent className="">
                        <IonRow>
                          <IonCol size="2" size-md="2"><IonIcon className="fs-1" icon={ helpCircleOutline } /></IonCol>
                          <IonCol size="10" size-md="10">
                            <h2>Rapporter et problem</h2>
                            <p>Du kan beskrive de...</p>
                            <hr className="bg-custom-2" />
                            <Link to="/" className="d-flex w-100">Se mere <IonIcon className="ms-auto" icon={ chevronForward } /></Link>
                          </IonCol>
                        </IonRow>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                  <IonCol size="12" size-md="12" className="card-custom-h">
                    <div className="">
                      <hr className="bg-custom-2" />
                      <Link to="/map" className="w-100 d-block d-flex py-2 ion-align-items-center text-underline-none">Åben i kort<IonIcon className="ms-auto" icon={ open } /></Link>
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
      { loading ? WeatherView : <Box sx={{ width: '100%' }}><LinearProgress /></Box> }
    </>
  )
}

export default Weather;
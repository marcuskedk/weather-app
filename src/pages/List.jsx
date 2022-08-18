import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from 'react-router-dom';
import { IonGrid, IonRow, IonCol, IonContent, IonCardContent, IonIcon, IonFooter, IonBackdrop, IonHeader, IonToolbar, IonSearchbar, IonTitle, IonCard, IonProgressBar } from '@ionic/react';
import { search, sunnyOutline } from "ionicons/icons";
import { useLocalStorage } from 'usehooks-ts'
import MapList from "../components/MapList"
import cities from 'cities.json';

const key = {
  weatherapi: "444f6a125e314ab392590227221208"
}

const base = {
  weatherAPI_C: "https://api.weatherapi.com/v1/current.json?key=" + key.weatherapi,
  weatherAPI_F: "https://api.weatherapi.com/v1/forecast.json?key=" + key.weatherapi
}

const List = () => {
  const [ listMenuItem, setListMenuItem ] = useLocalStorage('addedToList', []);
  const [ geoLat, setGeoLat] = useLocalStorage('geoLat', []);
  const [ geoLon, setGeoLon] = useLocalStorage('geoLon', []);
  const [ WA_Current, setWA_Current ] = useState('');
  const [ WA_Forecast, setWA_Forecast ] = useState('');
  const [ loadingWeather, setLoadingWeather ] = useState(false);
  const [ searchText, setSearchText ] = useState("");
  const [ backdrop, setBackdrop ] = useState(false);

  useEffect(() => {
    console.log("first")
    if (searchText.length > 0) {
      console.log("second")
    }
  //   axios.get(base.weatherAPI_C + "&q=" + searchText + "&lang=da&alerts=yes")
  //   .then( WA1 => {
  //     setWA_Current(WA1.data);

  //     // axios.get(base.weatherAPI_F + "&q=" + searchText + "&lang=da&days=1&alerts=yes")
  //     // .then( WA2 => {
  //     //   setWA_Forecast(WA2.data);

  //     //   setLoadingWeather(true);
  //     // });
  //   });
  }, [searchText]);

  console.log(backdrop)

  const toggleClass = () => {
    setBackdrop(!backdrop);
  };
  
  // document.querySelector(".searchbar-cancel-button").onclick = function() {
  //   setBackdrop(false);
  //   alert();
  // }
  
  const List = (
    <>
      <IonGrid className="list-grid">
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="6">
            <IonRow className="ion-justify-content-center">
              <IonCol size="12">
                <h1>Vejr</h1>
                <div className="search-box">
                  <IonSearchbar value={searchText} onIonFocus={() => setBackdrop(true)} onIonChange={e => setSearchText(e.detail.value)} mode="ios" placeholder="Filter Schedules" showCancelButton="focus" cancelButtonText="Annuller" onIonCancel={() => setBackdrop(false)} animated></IonSearchbar>
                  <div className="search-values">
                  </div>
                </div>
              </IonCol>
              { geoLat && <MapList latlon={ geoLat + "," + geoLon } type="myCorrds" /> }
              { listMenuItem && listMenuItem?.map((value, key) => <MapList key={ key } latlon={ value?.latlon } type="list" /> ) }
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
      <div className={ backdrop ? "backdrop show" : "backdrop" } onClick={() => setBackdrop(false)} ></div>
    </>
  )

  const Search = (
    <>

    </>
  )

  return (
    <>
      <IonContent className="clouds">
        { listMenuItem ? List : <IonProgressBar color="primary" type="indeterminate"></IonProgressBar> }
        {/* { loadingWeather ? Search : <IonProgressBar color="primary" type="indeterminate"></IonProgressBar> } */}
      </IonContent>
    </>
  )
}

export default List;
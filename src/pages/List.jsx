import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, Redirect, useHistory } from 'react-router-dom';
import { IonGrid, IonRow, IonCol, IonContent, IonAlert, IonCardContent, IonIcon, IonFooter, IonBackdrop, IonHeader, IonToolbar, IonSearchbar, IonTitle, IonCard, IonProgressBar } from '@ionic/react';
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

const List = ({comeatme, wack}) => {
  const [ listMenuItem, setListMenuItem ] = useLocalStorage('addedToList', []);
  const [ geoLat, setGeoLat] = useLocalStorage('geoLat', []);
  const [ geoLon, setGeoLon] = useLocalStorage('geoLon', []);
  const [ WA_Current, setWA_Current ] = useState('');
  const [ WA_Forecast, setWA_Forecast ] = useState('');
  const [ loadingWeather, setLoadingWeather ] = useState(false);
  const [ searchText, setSearchText ] = useState("");
  const [ backdrop, setBackdrop ] = useState(false);
  const [ data, setData ] = useState([]);
  const [ backgroundColor, setBackgroundColor ] = useState();
  const [ showAlert, setShowAlert ] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (searchText.length > 0) {
      setBackgroundColor('#121212');
      const newFilter = cities?.filter((value) => {
        return value.name.toLowerCase().includes(searchText.toLocaleLowerCase());
      });
      setData(newFilter);
    } else if (searchText === "") {
      setBackgroundColor('transparent');
      setData([]);
    }
  }, [searchText]);

  const handleSetData = (sessionData, country) => {
    var data = wack.filter((val) => val.latlon.toLowerCase().includes(sessionData.toLowerCase()));
    console.log(data)
    if (!data.length) {
      wack.push({
        "latlon": sessionData.toLowerCase(),
        "country": country.toLowerCase()
       });
      comeatme(wack);
      history.push("/weather/" + sessionData);
    } else {
      setShowAlert(true);
    }
  }
  
  const List = (
    <>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Hovsa!"
        subHeader="Du har allerede tilføjet dette sted!"
        mode="ios"
        message="Prøv et andet sted!"
        buttons={['OK']}
      />
      <IonGrid className="list-grid">
        <IonRow className="ion-justify-content-center">
          <IonCol size-md="6">
            <IonRow className="ion-justify-content-center">
              <IonCol size="12" style={{zIndex: "600"}}>
                <h1>Vejr</h1>
                <div className="search-box">
                  <IonSearchbar value={searchText} onIonFocus={() => setBackdrop(true)} onIonChange={e => setSearchText(e.detail.value)} mode="ios" placeholder="Søg efter by, men på engelsk..." showCancelButton="focus" cancelButtonText="Annuller" onIonCancel={() => setBackdrop(false)} animated></IonSearchbar>
                  <div className="search-values">
                    { data && backdrop && data?.slice(0, 25).map((val, key) => (
                        <Link className="search-r" to="#" key={ key } onClick={() => handleSetData(val?.name + "/" + val?.lng, val?.country.toLowerCase())} >{ val?.name + ", " + val?.country }</Link>
                    ))}
                  </div>
                </div>
              </IonCol>
              { geoLat && <MapList latlon={ geoLat + "," + geoLon } type="myCorrds" /> }
              { listMenuItem && listMenuItem?.map((value, key) => <MapList key={ key } latlon={ value?.latlon } type="list" /> ) }
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
      <div className={ backdrop ? "backdrop show" : "backdrop" } style={{backgroundColor}} onClick={() => setBackdrop(false)} ></div>
    </>
  )

  const Search = (
    <>

    </>
  )

  return (
    <>
      <IonContent className={ backdrop && "clouds active"}>
        { listMenuItem ? List : <IonProgressBar color="primary" type="indeterminate"></IonProgressBar> }
        {/* { loadingWeather ? Search : <IonProgressBar color="primary" type="indeterminate"></IonProgressBar> } */}
      </IonContent>
    </>
  )
}

export default List;
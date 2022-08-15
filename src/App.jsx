import axios from "axios";
import { Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonBadge,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { map, informationCircle, listOutline, navigateCircle } from 'ionicons/icons';
import Home from './pages/Home';
import Weather from './pages/Weather';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/myshit.scss';
import React, { useState, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts'
import { Geolocation } from "@capacitor/geolocation";

setupIonicReact();

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

const App = () => {
  const [ listMenuItem, setListMenuItem ] = useLocalStorage('addedToList', []);
  const [ loading, setLoading] = useState(true);
  const [ error, setError] = useState(null);
  const [ geoLat, setGeoLat] = useLocalStorage('geoLat', []);
  const [ geoLon, setGeoLon] = useLocalStorage('geoLon', []);
  const [myCoords, setMyCoords] = useState();

  useEffect(() => {
    (async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        setGeoLat(coordinates.coords.latitude);
        setGeoLon(coordinates.coords.longitude);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    })()
    axios.get(base.weatherAPI_C + "&q=" + geoLat + "," + geoLon + "&units=metric&lang=da")
    .then( res1 => {
      setMyCoords(res1.data)
    })
    .catch((error) => console.error(error));
  }, []);
  
  return (
    <>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/">
                <Home comeatme={setListMenuItem} wack={listMenuItem} geoLat={geoLat} geoLon={geoLon} /> {/* geoLat={myCoords?.latitude} geoLon={myCoords?.longitude} */}
              </Route>
              <Route exact path="/weather/:lat/:lon">
                <Weather />
              </Route>
              <Route exact path="/weather">
                <Weather />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/" mode="ios">
                <IonIcon icon={ map } />
                <IonLabel>Kort</IonLabel>
              </IonTabButton>
              { myCoords && 
                <IonTabButton tab={"list" + key} href={"/weather/" + myCoords?.location?.lat + "/" + myCoords?.location?.lon } className="custom-list" key={key} mode="ios">
                  <IonIcon color="secondary" icon={ navigateCircle } />
                </IonTabButton>
              }
              { listMenuItem && listMenuItem.map((n, key) => (
                <IonTabButton tab={"list" + key} href={"/weather/" + n} className="custom-list" key={key} mode="ios">
                  <IonIcon icon={ informationCircle } />
                </IonTabButton>
              )) }
              <IonTabButton tab="weather" href="/weather" mode="ios">
                <IonIcon icon={ listOutline } />
                <IonLabel>Vejr</IonLabel>
                <IonBadge>6</IonBadge>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </>
  )
}

export default App;

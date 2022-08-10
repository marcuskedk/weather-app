import axios from "axios";
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonItem,
  IonBadge,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { arrowBack, arrowDown, chevronDown, map, informationCircle, listOutline } from 'ionicons/icons';
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
import { useGeolocated } from "react-geolocated";
setupIonicReact();

const key = "2864c037ed39e8c864f7c0ab7e3d8a0a";

const base = {
  weatherAPI: "https://api.openweathermap.org/data/2.5/weather?appid=" + key,
  forecastAPI: "https://api.openweathermap.org/data/2.5/forecast?appid=" + key
}

const App = () => {
  const [listMenuItem, setListMenuItem] = useLocalStorage('addedToList', []);
  const [myCoords, setMyCoords] = useState();
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  useGeolocated({
      positionOptions: {
          enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
  });

  // console.log(coords.latitude)

  // useEffect(() => {
  //   axios.get(base.weatherAPI + "&lat=" + coords?.latitude + "&lon=" + coords?.longitude + "&units=metric&lang=da")
  //   .then( res1 => {
  //     setMyCoords(res1.data)
  //     console.log(res1.data)
  //   })
  //   .catch((error) => console.error(error));
  // }, [coords])
  
  return (
    <>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/">
                <Home comeatme={setListMenuItem} wack={listMenuItem} />
              </Route>
              <Route exact path="/weather/:name">
                <Weather />
              </Route>
              <Route exact path="/weather">
                <Weather />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/">
                <IonIcon icon={ map } />
                <IonLabel>Kort</IonLabel>
              </IonTabButton>
              {/* { myCoords && 
                  <IonTabButton tab={"list" + key} href={"/weather/" + myCoords?.main?.name?.toLowerCase()} className="custom-list" key={key}>
                    <IonLabel>&bull;</IonLabel>
                  </IonTabButton>
              } */}
              { listMenuItem && listMenuItem.map((n, key) => (
                  <IonTabButton tab={"list" + key} href={"/weather/" + n.toLowerCase()} className="custom-list" key={key}>
                    <IonLabel>&bull;</IonLabel>
                  </IonTabButton>
              )) }
              <IonTabButton tab="weather" href="/weather">
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

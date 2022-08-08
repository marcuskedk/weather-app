import axios from "axios";
import { React, useState, useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom';
import { IonGrid, IonRow, IonCol, IonContent, IonProgressBar, IonButton, useIonToast, IonToast, IonAlert } from '@ionic/react';
import { informationCircle, star } from 'ionicons/icons';

const Weather = () => {
    
    const location = useParams();
    const lat = location.lat;
    const lon = location.lon;

    const [ loading, setLoading ] = useIonToast();
    const [ data, setData ] = useState();
    const [ error, setError ] = useState();

    const base = ("https://api.openweathermap.org/data/2.5/weather?appid=2864c037ed39e8c864f7c0ab7e3d8a0a") 
    useEffect(() => {
        axios.get(base + "&lat=" + lat + "&lon=" + lon + "&units=metric")
        .then( res => setData(res.data))
        .catch((error) => console.error(error));
    }, []);

    const [present, dismiss] = useIonToast();
    return (
        <>
            { data ? 
                <>
                    <IonAlert
                        isOpen={data}
                        onDidDismiss={() => setData(false)}
                        header="Alert"
                        subHeader="Important message"
                        message="This is an alert!"
                        buttons={['OK']}
                    />
                </>
                : 
                <IonProgressBar color="primary" type="indeterminate"></IonProgressBar>
            }
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>{ data?.name }</IonCol>
                        <IonCol>{ data?.name }</IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="6">ion-col size="6"</IonCol>
                        <IonCol>ion-col</IonCol>
                        <IonCol>ion-col</IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="3">ion-col size="3"</IonCol>
                        <IonCol>ion-col</IonCol>
                        <IonCol size="3">ion-col size="3"</IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="3">ion-col size="3"</IonCol>
                        <IonCol size="3" offset="3">
                        ion-col size="3" offset="3"
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </>
    )
}

export default Weather
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from 'usehooks-ts'
import { IonCol, IonCardContent, IonIcon, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonProgressBarIonList, IonListHeader, IonSkeletonText, IonItem, IonThumbnail, IonLabel, IonList, IonRow } from '@ionic/react';

const key = {
    weatherapi: "444f6a125e314ab392590227221208"
}

const base = {
    weatherAPI_C: "https://api.weatherapi.com/v1/current.json?key=" + key.weatherapi,
    weatherAPI_F: "https://api.weatherapi.com/v1/forecast.json?key=" + key.weatherapi
}

const MapList = ({latlon, type}) => {
    const [ LatLonData, setLatLonData ] = useState();
    const [ geoLat, setGeoLat] = useLocalStorage('geoLat', []);
    const [ geoLon, setGeoLon] = useLocalStorage('geoLon', []);

    useEffect(() => {
        axios.get(base.weatherAPI_F + "&q=" + latlon?.replace("/", ",") + "&lang=da&alerts=yes")
        .then( result => {
            setLatLonData(result.data);
        });
    }, [])

    return (
        <>
            <IonCol size="12" className="">
                <IonCard href="" className="bg-custom text-white rounded-custom">
                    <Link style={{display: "flex", flexWrap: "wrap", textDecoration: "none", color: "#FFF"}} to={ type == "myCorrds" ? "/weather/" + geoLat + "/" + geoLon : type == "list" && "/weather/" + LatLonData?.location?.lat + "/" + LatLonData?.location?.lon }>
                        <IonCol size="12">
                            <IonCardHeader>
                                <IonCardTitle className="d-flex w-100"><div>{ type == "myCorrds" && "Min lokalitet" }{ type == "list" && LatLonData?.location?.name }<br /><span className="fs-7">{ type == "myCorrds" && LatLonData?.location?.name }{ type == "list" && new Date(LatLonData?.location?.localtime).toLocaleTimeString( 'da-dk', { hour: "2-digit", minute: "2-digit" }) }</span></div><span className="ms-auto fs-3">{ Math.round(LatLonData?.current?.temp_c) }&deg;</span></IonCardTitle>
                            </IonCardHeader>
                        </IonCol>
                        <IonCol size="12">
                            <IonCardContent>
                                <p className="d-flex w-100 mb-0"><span>{ LatLonData?.current?.condition?.text }</span> <span className="ms-auto fs-7">H: { Math.round(LatLonData?.forecast?.forecastday[0]?.day?.maxtemp_c) }&deg; &nbsp; L: { Math.round(LatLonData?.forecast?.forecastday[0]?.day?.mintemp_c) }&deg;</span></p>
                            </IonCardContent>
                        </IonCol>
                    </Link>
                </IonCard>
            </IonCol>
        </>
    );
}

export default MapList;
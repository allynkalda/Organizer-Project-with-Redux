import React, { useState } from 'react';
import { useFetch } from "../../hooks/hooks";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"; 
import Loader from 'react-loader-spinner'

export default function Weather() {

    const [location, setLocation] = useState([])

    const getCoords = () => {
        if (window.navigator.geolocation) { 
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation([position.coords.latitude, position.coords.longitude])
            })
        }
    }

    getCoords();

    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + 
        location[0] + '&lon=' + 
        location[1] + '&APPID=8e6150cf719d58fc8062d507eaba92c0&units=metric'

    const [ data, loading ] = useFetch(url);

    return (
        <div className="container center-align">
            <h3>Weather today</h3>
            { !data || !data.main || loading ? 
            (
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height="100"
                    width="100"
                />
            ) : (
                <div>
                <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}/>
                <p>{data.weather[0].description}</p>
                <p>{data.name}</p>
                <p>{Math.round(data.main.temp)}°</p>
                </div> )
            }
        </div>
    )
}

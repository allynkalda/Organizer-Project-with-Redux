import React, { useState, useEffect } from 'react';
import { useFetch } from "../../hooks/hooks";


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
        location[1] + '&APPID=8e6150cf719d58fc8062d507eaba92c0'

    const [data, loading] = useFetch(url);

    console.log(data.wind.speed)


    return (
        <div>
            <h3>Weather today</h3>
            {/* { loading ('Loading..') : (
            <div>
                
               <p>{data.name}</p>
               <p>{data.cod}</p>
               <p>{data.main.temp}</p>
            </div> )
            }
            {} */}
        </div>
    )
}

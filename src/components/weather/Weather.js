import React, { useState } from 'react';
import { useFetch } from "../../hooks/hooks";

const location = {
    lat: null,
    lon: null
}

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }
}

const showPosition = (position) => {
    location.lat = position.coords.latitude;
    location.lon = position.coords.longitude;
}

export default function Weather() {
    getLocation();
    
    const [loc] = useState(location)

    const [data, loading] = useFetch('api.openweathermap.org/data/2.5/weather?lat=41.4151242&lon=2.1785265&APPID=8e6150cf719d58fc8062d507eaba92c0')
    //     'api.openweathermap.org/data/2.5/weather?lat=' +
    //     `${data.lat}` +
    //     '&lon=' +
    //     `${data.lon}` +
    //     '&APPID=8e6150cf719d58fc8062d507eaba92c0'
    // )

    console.log('api.openweathermap.org/data/2.5/weather?lat=' +
    `${loc.lat}` +
    '&lon=' +
    `${loc.lon}`)

    return (
        <div>
            <h3>Weather today</h3>

        </div>
    )
}

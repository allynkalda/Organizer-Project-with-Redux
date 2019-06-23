import React from 'react'
import Weather from '../weather/Weather';
import NewsList from '../news/NewsList';

export default function Today() {
    return (
        <div>
            <Weather />
            <NewsList />
        </div>
    )
}

import React from 'react'
import { useFetch } from "../../hooks/hooks";
import uuid from 'uuid';
import Weather from '../weather/Weather'

var url = 'https://newsapi.org/v2/top-headlines?' +
          'sources=bbc-news&' +
          'apiKey=71c22fa0b02546d9b2b67f673e3d6a34';

function NewsList() {
  const [data, loading] = useFetch(url);
  return (
    <>
      <h1>News</h1>
      {loading ? (
        "Loading..."
      ) : (
        <ul>
          {data.articles.map(({ title, url, urlToImage, description }) => (
            <li key={uuid()}>
                <img className="news-images" src={urlToImage} />
                <a href={url}><p>{title}</p></a>
                <p>{description}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default NewsList;
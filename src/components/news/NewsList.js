import React from 'react'
import { useFetch } from "../../hooks/hooks";
import uuid from 'uuid';

var newsUrl = 'https://newsapi.org/v2/top-headlines?' +
          'sources=bbc-news&' +
          'apiKey=71c22fa0b02546d9b2b67f673e3d6a34';

function NewsList() {
  const [data, loading] = useFetch(newsUrl);
  return (
    <>
      <h2>News</h2>
      {loading ? (
        "Loading..."
      ) : (
        <div className="container">
        <div className="row">
        <ul>
          {data.articles.map(({ title, url, urlToImage, description }) => (
            <div class="col s6">
            <div class="card">
            <li key={uuid()}>
            <div class="card-image">
                <img className="news-images responsive-img" src={urlToImage} />
            </div>
            <div class="card-content">
                <a href={url}><p>{title}</p></a>
                <p>{description}</p>
            </div>
            </li>
            </div>
            </div>
          ))}
        </ul>
        </div>
        </div>
      )}
    </>
  );
}
export default NewsList;
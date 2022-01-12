import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PodRecommend from './PodRecommend';

const RandomPodcast = () => {
  const [randomPodData, setRandomPodData] = useState([]);
  const [Flip, setFlip] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { podcast },
        } = await axios.get(
          'https://listen-api.listennotes.com/api/v2/just_listen',
          {
            headers: { 'X-ListenAPI-Key': process.env.REACT_APP_Key },
          }
        );
        setRandomPodData(podcast);
      } catch {
        console.warn('failure to get API data');
      }
    };
    getData();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div>
          <h2 className="title has-text-centered">{randomPodData.title}</h2>
          <hr />
          <div className="columns">
            <div className="column is-half">
              <figure className="image is-1by1">
                <img src={randomPodData.image} alt={randomPodData.title}></img>
              </figure>
            </div>
            <div className="column is-half">
              <h4 className="title is-4">🎙 {randomPodData.publisher}</h4>
              <p className="is-size-5	has-text-weight-bold">
                {randomPodData.country}
              </p>
              <p className="is-size-6">{randomPodData.language}</p>
              <hr />
              <p>{randomPodData.description}</p>
              <hr />
              <button
                onClick={() => setFlip(true)}
                className="has-text-black button is-warning is-rounded mt-4"
              >
                Show more like this
              </button>
              <div>{Flip && <PodRecommend id={randomPodData.id} />}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RandomPodcast;

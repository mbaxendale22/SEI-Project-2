import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

const RandomPodcast = () => {
  const [searchPodData, setSearchPodData] = useState([]);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { results },
        } = await axios.get(
          `https://listen-api.listennotes.com/api/v2/search?q=%${location.state}&sort_by_date=0&type=episode&offset=0&len_min=10&len_max=30&genre_ids=68%2C82&published_before=1580172454000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=0`,
          {
            headers: { 'X-ListenAPI-Key': process.env.REACT_APP_Key },
          }
        );
        setSearchPodData(results);
      } catch {
        console.warn('failure to get API data');
      }
    };
    getData();
  }, []);

  return (
    <>
      <section className="section">
        <div className="container">
          <div>
            <h1 className="is-size-3 has-text-centered has-text-weight-bold mb-4">
              Your podcast recommendations
            </h1>
          </div>
          <div className="columns is-multiline">
            {searchPodData.map((item) => {
              return (
                <div
                  key={item.podcast.id}
                  className="column is-one-quarter-desktop is-one-third-tablet"
                >
                  <div
                    className="card"
                    onClick={() =>
                      history.push(`/podcastshow/${item.podcast.id}`)
                    }
                  >
                    <div className="card-image">
                      <figure className="image image-is-1by1">
                        <img
                          src={item.podcast.thumbnail}
                          alt={item.podcast.title_original}
                        ></img>
                      </figure>
                    </div>
                    <div className="card-content">
                      <h3 className="has-text-weight-bold has-text-centered">
                        {item.podcast.title_original}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default RandomPodcast;

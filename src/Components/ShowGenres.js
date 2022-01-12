import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ShowGenres = () => {
  const imageArray = [
    'assets/finance.jpg',
    '/assets/local.jpg',
    '/assets/TV.jpg',
    'assets/tech.jpg',
    'assets/crime.jpg',
    'assets/arts.jpg',
    '/assets/business.jpg',
    '/assets/comedy.jpg',
    '/assets/education.jpg',
    '/assets/fiction.jpg',
    '/assets/gov.jpg',
    '/assets/fitness.jpg',
    '/assets/history.jpg',
    '/assets/fam.jpg',
    '/assets/leisure.jpg',
    '/assets/music.jpg',
    '/assets/news.jpg',
    '/assets/religion.jpg',
    '/assets/science.jpg',
    '/assets/culture.jpg',
    '/assets/sports.jpg',
  ];

  const [genreData, setGenreData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { genres },
        } = await axios.get(
          'https://listen-api.listennotes.com/api/v2/genres?top_level_only=1',
          {
            headers: { 'X-ListenAPI-Key': process.env.REACT_APP_Key },
          }
        );
        setGenreData(genres);
      } catch {
        console.warn('failure to get API data');
      }
    };
    getData();
  }, []);

  return (
    <>
      {genreData.map((item, index) => {
        return (
          <div
            key={item.id}
            data-id={item.id}
            id="genre-cards"
            className="card"
          >
            <Link
              to={{ pathname: './GenreRecommendations', state: item.id }}
              className="has-text-black"
            >
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={imageArray[index]} alt={item.name} />
                </figure>
                <div className="card-footer">
                  <p className="card-footer-item">{item.name}</p>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default ShowGenres;

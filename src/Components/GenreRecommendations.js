import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'


const GenreRecommendations = () => {

  const location = useLocation()
  const history = useHistory()

  const [podcasts, setPodcasts] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        // eslint-disable-next-line no-undef
        const { data } = await axios.get(`https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${location.state}&page=2&publisher_region=us&sort=listen_score&safe_mode=0`,
          {
            headers: { 'X-ListenAPI-Key': process.env.REACT_APP_Key },
          })
        setPodcasts(data.podcasts)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <section className="section">
      <div className="container">
        <div>
          <h1 className="is-size-3 has-text-centered has-text-weight-bold">Your podcast recommendations</h1>
        </div>
        <div className="columns is-multiline">
          {podcasts.map(podcast => {
            return (
              <div key={podcast.id} className="column is-one-quarter-desktop is-one-third-tablet">
                <div className="card" onClick={() => history.push(`/podcastshow/${podcast.id}`)}>
                  <div className="card-image">
                    <figure className="image image-is-1by1">
                      <img src={podcast.image} alt={podcast.title}></img>
                    </figure>
                  </div>
                  <div className="card-content">
                    <h3 className="has-text-weight-bold">{podcast.title}</h3>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )

}

export default GenreRecommendations
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const PodRecommend = ({ id }) => {
  const history = useHistory()

  const [recommend, setRecommend] = useState([]) 

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: { recommendations } } = await axios.get(`https://listen-api.listennotes.com/api/v2/podcasts/${id}/recommendations?safe_mode=0`, {
          headers: { 'X-ListenAPI-Key': process.env.REACT_APP_Key },
        })
        setRecommend(recommendations)
      } catch {
        console.warn('failure to get API data')
      }
    }
    getData()
  },[])

  return (
    <section className='section'>
      <div className= 'container'>
        <div className='is-flex is-justify-content-center is-flex-wrap-wrap'>
          {recommend.map((item) => {
            return (
              <div 
                key={item.id} 
                data-id={item.id} 
                id='rec-cards' 
                className='card' 
                onClick={() =>{ 
                  history.push(`/podcastshow/${item.id}`)
                  window.location.reload(false)
                }}>
                <div className='card-image'>
                  <figure className='image is-4by3'>
                    <img src={item.thumbnail} alt={item.name} />
                  </figure>
                  <div className='card-footer'><p className='card-footer-item has-text-centered'>{item.title}</p></div>
                </div>
              </div>
            )
          }
          )}
        </div> 
      </div>
    </section>





  )


}


export default PodRecommend
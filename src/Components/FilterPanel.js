import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FilterPanel = () => {

  //Filter Panel Functions 

  const languages = ['Any language','Afrikaans','Arabic','Bengali','Chinese','Danish','Dutch','English','Farsi','French','Gaelic','German','Greek','Hindi','Indonesian','Irish','Italian','Japanese','Korean',
    'Lithuanian','Malay','Malayalam','Portuguese','Russian','Spanish','Swahili','Swedish','Tamil','Thai','Turkish','Ukranian','Urdu','Vietnamese'
  ]

  const [genre, setGenre] = useState('')
  const [country, setCountry] = useState('us')
  const [language, setLanguage] = useState('English')
  const [excludeExplicitContent, setExcludeExplicitContent] = useState(1)
  const [formData, setFormData] = useState(null)

  const handleSelect = (e) => {
    if (e.target.name === 'genres') {
      setGenre(e.target.value)
    } else if (e.target.name === 'countries') {
      setCountry(e.target.value)
    } else if (e.target.name === 'languages'){
      setLanguage(e.target.value)
    } else setExcludeExplicitContent(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await axios.get(`https://listen-api.listennotes.com/api/v2/best_podcasts?genre_id=${genre}&page=2&region=us&publisher_region=${country}&language=${language}&sort=listen_score&safe_mode=${excludeExplicitContent}`, {
      headers: { 'X-ListenAPI-Key': process.env.REACT_APP_Key } }
    )
    setFormData(data)
  }


  return (
    <form className='column is-half is-offset-one-quarter box' id="filterForm" onSubmit={handleSubmit}>
      <h2>Tailored Recommendations</h2>
      <div className='field'>
        <label className='label'>Genre</label>
        <div className='control'>
          <select 
            className='select is-fullwidth'
            onChange={handleSelect}
            name='genres'>
            <option>All</option>
            <option value='144'>Personal Finance</option>
            <option value='151'>Locally Focused</option>
            <option value='68'>TV & Film</option>
            <option value='127'>Technology</option>
            <option value='135'>True Crime</option>
            <option value='134'>Music</option>
            <option value='99'>News</option>
            <option value='69'>Religion & Spirituality</option>
            <option value='107'>Science</option>
            <option value='122'>Society & Culture</option>
            <option value='77'>Sports</option>
            <option value='93'>Business</option>
            <option value='133'>Comedy</option>
            <option value='111'>Education</option>
            <option value='168'>Fiction</option>
            <option value='117'>Government</option>
            <option value='88'>Health & Fitness</option>
            <option value='125'>History</option>
            <option value='132'>Kids & Family</option>
            <option value='82'>Leisure</option>
            <option value='100'>Arts</option>
          </select>
        </div>
        {/* {errors.name && <p className='help is-danger'>{errors.name}</p>} */}
      </div>
      <div className='field'>
        <label className='label'>Country</label>
        <div className='control'>
          <select 
            className='select is-fullwidth'
            onChange={handleSelect}
            name='countries'>
            <option value={'us'}>All</option>
            <option value={'ar'}>AR - Argentina</option>
            <option value={'au'}>AU - Australia</option>
            <option value={'br'}>BR - Brazil</option>
            <option value={'ca'}>CA - Canada</option>
            <option value={'cn'}>CN - China</option>
            <option value={'de'}>DE - Germany</option>
            <option value={'dk'}>DK - Denmark</option>
            <option value={'eg'} >EG - Egypt</option>
            <option value={'es'}>ES - Spain</option>
            <option value={'fr'} >FR - France</option>
            <option value={'gb'}>GB - United Kingdom</option>
            <option value={'gh'}>GH - Ghana</option>
            <option value={'gr'}>GR - Greece</option>
            <option value={'hk'}>HK - Hong Kong</option>
            <option value={'id'}>ID - Indonesia</option>
            <option value={'il'}>IL - Ireland</option>
            <option value={'in'}>IN - India</option>
            <option value={'it'}>IT - Italy</option>
            <option value={'jp'}>JP - Japan</option>
            <option value={'kr'}>KR - South Korea</option>
            <option value={'lt'}>LT - Lithuania</option>
            <option value={'mx'}>MX - Mexico</option>
            <option value={'my'}>MY - Malaysia</option>
            <option value={'ng'}>NG - Nigeria</option>
            <option value={'nl'}>NL - Netherlands</option>
            <option value={'nz'}>NZ - New Zealand</option>
            <option value={'ph'}>PH - Philippines</option>
            <option value={'ru'}>RU - Russia</option>
            <option value={'se'}>SE - Sweden</option>
            <option value={'tj'}>TJ - Tajikistan</option>
            <option value={'tr'}>TR - Turkey</option>
            <option value={'ua'}>UA - Ukraine</option>
            <option value={'us'}>US - United States</option>
            <option value={'vn'}>VN - Vietnam</option>
            <option value={'za'}>ZA - South Africa</option>
            <option value={'zw'}>ZW - Zimbabwe</option>
          </select>
        </div>
        {/* {errors.origin && <p className='help is-danger'>{errors.origin}</p>} */}
      </div>
      <div className='field'>
        <label className='label'>Languages</label>
        <div className='control'>
          <select 
            onChange={handleSelect} 
            className='select is-fullwidth'
            name='languages'>
            {languages.map(language => {
              return (
                <option key={language}>{language}</option>
              )
            })}
          </select>
        </div>
        {/* {errors.image && <p className='help is-danger'>{errors.image}</p>} */}
      </div>
      <div className='field'>
        <label className='label'>Exclude podcasts explicit content</label>
        <div className='control'>
          <select 
            onChange={handleSelect} 
            className='select is-fullwidth'
            name='exclude-explicit-content'>
            <option value='1'>Yes</option>
            <option value='0'>No</option>
          </select>
        </div>
        {/* {errors.tastingNotes && <p className='help is-danger'>{errors.tastingNotes}</p>} */}
      </div>
      <div className='field'>
        <button type='submit' className='button is-fullwidth is-warning'>Find Podcasts</button>
      </div>
    </form >
  )

}

export default FilterPanel
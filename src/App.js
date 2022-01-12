import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Homepage from './Components/Homepage'
import Recommendations from './Components/Recommendations'
import PodcastShow from './Components/PodcastShow'
import GenreRecommendations from './Components/GenreRecommendations'
import Navbar from './Components/Navbar'
import RandomPodcast from './Components/RandomPodcast'
import SearchResults from './Components/SearchResults'


const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/recommendations' component={Recommendations} />
          <Route exact path='/podcastshow/:id' component={PodcastShow}/>
          <Route exact path='/GenreRecommendations' component={GenreRecommendations}/>
          <Route exact path='/randompodcast' component={RandomPodcast}/>
          <Route exact path='/searchresults' component={SearchResults}/>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App



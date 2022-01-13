# Poddy 
Poddy was developed in fulfilment of General Assembly's Software Engineering Immersive Bootcamp. It was the second project on the course, immediately following an introduction to React module. It's core features were pair-coded with [Sapphire Paston](https://github.com/sapphire-p). 

The project is deployed via Netlify [here](https://frosty-shaw-45771e.netlify.app/)

## Technical Project Brief

The application must:

* Consume a public API 
* Have several components
* The app can have a router
* Include wireframes
* Be deployed online
* Timeframe: 48 hours

## User Stories

The user stories around which they project was planned and built are as follows: 

* Users can search for podcasts by genre
* Users can perform a general keyword search for podcasts
* Users can narrow the collection of podcasts available by a range of filters
* Users can request a random podcast
* Users can see detailed information about each podcast in the collection   
* Users are offered a selection of podcasts that they might enjoy based on the podcast they are currently viewing
sa

## Tech Stack

* React.js
* React Router Dom 
* JavaScript
* Bulma CSS
* Axios
* Insomnia
* Listen Notes API


## Planning

After cementing our agreed upon user stories for the project, we discussed the look and feel of the app. I tested the endpoints offered by the Listen Notes API and explored the structure of the data, while Sapphire produced wireframes for the key pages of the app. 


## App Snapshot

Landing page, where users have the option of how they would like to search for Podcasts, a global search, by using filters, by genre, or by requesting a random podcast:
![landing page](/readme_assets/poddy-lp.png)

Whichever search route is chosen, the user will given their results on a recommendations page:
![recommendations page](/readme_assets/results.png)

Users can then choose a podcast aboout which to receive more detailed information:
![show podcast page](/readme_assets/podcast-show.png)

And receive further recommendations based on the current podcast selected, these thumbnails can also be clicked to navigate to page displaying detailed information, creating a loop of recommendations
![show more podcasts]('/readme_assets/show-more.png)


## Featured Code Snippet

### Recommend 

```javascript

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

```

The structure of this code was a pattern repeated throughout our components for this app. 
* Hit a specific Listen notes endpoint using an Axios GET request, inside a useEffect
* store the returned data in a piece of state 
* map through the data to dynamically display what had been returned.  

The listen notes endpoint required the ID of a podcast that you wanted recommendations based on. This component was rendered on the main 
'podcast show' page so the ID of that podcast was already available to pass in as props. We went for a conditional render based on the user clicking a button to confirm they wanted to see recommendations: 

```javascript

<button onClick={() => setFlip(true)} className='has-text-black button is-warning is-rounded mt-4'>Show more like this</button>
                <div>
                  {Flip && <PodRecommend id={singlePod.id} />}
                </div>
```

## Wins & Challenges

Having just learnt some basic React patterns for consuming APIs and displaying the data, this project was a great way to cement my understanding of the process. It was also a win to implement some routing using React Router Dom, as well as learning how to pass state betwween components when using routing, by using a combination of the useHistory() and useLocation() hooks.

It was a challenge to navigate a public API for the first time, setting up API keys and storing them in a .env file.

## Known Bugs

The global search available in the nav bar works in the sense it returns podcasts based on the user input but those results can be hit and miss in terms of fidelity to the users actual input. I ran out of time to work on refining this process but would like to in the future

## Future Development

* as mentioned, fix the global search to give more accurate results
* allow the user to save their favourite podcasts to an account





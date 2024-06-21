import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ShowPage() {
  const { id } = useParams(); // get the show ID from the URL
  const [show, setShow] = useState(null);
  const [openSeasons, setOpenSeasons] = useState({}); // state to track open/close state of seasons
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || []);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`) // fetches specific show data from the api based on the id entered in the route
      .then(response => response.json())
      .then(data => setShow(data))
      .catch(error => console.error('Error fetching show:', error));
  }, [id]);

  if (!show) { // if the show data is not available, show a loading message
    return <div className="loading">Loading...</div>;
  }

  const showDate = (dateString) => { // function to convert date string to readable format
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const toggleSeason = (seasonId) => { // function to toggle the openSeasons state
    setOpenSeasons(prevState => ({ // set the openSeasons state to the opposite of the current state
      ...prevState, // spread the previous state into the new object 
      [seasonId]: !prevState[seasonId] //
    }));
  };

  const addFavourite = (episode) => { // function to add episode to favourites
    const newFavourite = { // create a new favourite object with episode data
        ...episode,
        showTitle: show.title,
        season: episode.season,
        addedAt: new Date().toISOString(),
    };
    const newFavourites = [...favourites, newFavourite]; // add the new episode to the favourites array
    setFavourites(newFavourites); 
    localStorage.setItem('favourites', JSON.stringify(newFavourites)); // update the local storage with the new favourites
};

const removeFavourite = (episode) => { // function to remove episode from favourites
    const newFavourites = favourites.filter(fav => fav.id !== episode.id);
    setFavourites(newFavourites);
    localStorage.setItem('favourites', JSON.stringify(newFavourites));
};

  return (
    <div className="show-page-wrapper"> {/* show info card */}
      <div className="card show-page d-flex flex-row gap-4 align-items-center p-3 my-3 w-100">
        <div className="d-flex">
          <img className='show-image' src={show.image} alt={show.title} />
        </div>
        <div className="d-flex flex-column justify-content-center flex-grow-1">
          <h2 className='show-title'>{show.title}</h2>
          <p className='show-date'><span className='fw-bold'>Last updated:</span> {showDate(show.updated)}</p>
          <p className='show-description'>{show.description}</p>
          <p className='show-seasons'><span className='fw-bold'>Seasons:</span> {show.seasons.length}</p>
        </div>
      </div>

      <div className="seasons-wrapper"> {/* list of seasons */}
        {show.seasons.map(season => (
          <div key={season.season} onClick={() => toggleSeason(season.season)} /*when season card is clicked, toggle the openSeasons state*/ 
          className="card season-card d-flex flex-column gap-4 p-3 my-3 w-100">

            <div className="d-flex flex-row align-items-center">
              <img className='season-image' src={season.image} alt={season.title} />
              <div className="season-info d-flex flex-column flex-grow-1">
                <h3 className='season-title'>
                    {season.title}
                </h3>
                <p className='season-episodes'><span className='fw-bold'>Episodes:</span> {season.episodes.length}</p>
              </div>
            </div>

            {openSeasons[season.season] && ( /* if the season is open, show the episodes list */
              <ul className='episodes-list'>
                {season.episodes.map(episode => ( /* for each episode in the season */
                  <li key={episode.episode} className='episode-item'>
                    <hr/> {/* add a horizontal line between each episode */}
                    <Link to={`/show/${id}/season/${season.season}/episode/${episode.episode}`}>
                      {episode.title}
                    </Link>
                    <p>{episode.description}</p>
                    <audio controls>
                      <source src={episode.file} type="audio/mp3" /> {/* audio for each episode */}
                      Your browser does not support the audio element.
                    </audio>
                    <button className='add-favourite' onClick={() => addFavourite({ ...episode, season: season.season })}>Add to Favourites</button>
                    <button className='remove-favourite' onClick={() => removeFavourite(episode)}>Remove from Favourites</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

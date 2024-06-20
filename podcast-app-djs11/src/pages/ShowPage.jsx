import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ShowPage() {
  const { id } = useParams(); // get the show ID from the URL
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`) // fetches specific show data from the api based on the id entered in the route
      .then(response => response.json())
      .then(data => setShow(data))
      .catch(error => console.error('Error fetching show:', error));
  }, [id]);


  if (!show) { // if the show data is not available, show a loading message
    return <div className="loading">Loading...</div>;
  }

  const showDate = (dateString) => {//function to convert date string to readable format
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  return (
    <div className="show-page-wrapper">
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
      <div className="seasons-wrapper">
        {show.seasons.map(season => (
          <div key={season.id} className="card season-card d-flex flex-row gap-4 align-items-center p-3 my-3 w-100">
            <div className="d-flex">
              <img className='season-image' src={season.image} alt={season.title} />
            </div>
            <div className="d-flex flex-column">
              <h3 className='season-title'>{season.title}</h3>
              <p className='season-episodes'><span className='fw-bold'>Episodes:</span> {season.episodes.length}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
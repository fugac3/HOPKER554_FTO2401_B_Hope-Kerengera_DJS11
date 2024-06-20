import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ShowPage() {
  const { id } = useParams(); // get the show ID from the URL
  const [show, setShow] = useState(null);
//   const [showGenres, setShowGenres] = useState([]);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`) // fetches specific show data from the api based on the id entered in the route
      .then(response => response.json())
      .then(data => setShow(data))
      .catch(error => console.error('Error fetching show:', error));
  }, [id]);

//   useEffect(() => {
//     fetch('https://podcast-api.netlify.app') // fetches genre data from the api
//     .then(response => response.json())
//     .then(genres => setShowGenres(genres))
//     .catch(error => console.error('Error fetching genres:', error));
//   }, []);

  if (!show) { // if the show data is not available, show a loading message
    return <div className="loading">Loading...</div>;
  }

  const genreOptions = {
    1: 'Personal Growth',
    2: 'Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family',
  };

  const getGenreNames = (genreIds) => {
    return genreIds.map((genreNum) => genreOptions[genreNum] || 'Unknown Genre').join(', ');
  };
  const date = new Date(show.publishedDate);
  console.log(date.toLocaleDateString());

  return (
    <div className="card show-page d-flex flex-row gap-4 align-items-center p-3 my-3 w-100"> 
    <div className="d-flex">
        <img className='show-image' src={show.image} alt={show.title} />
    </div>
    <div className="d-flex flex-column justify-content-center flex-grow-1">
        <h2 className='show-title'>{show.title}</h2>
        <p className='show-date'>{date.toLocaleDateString()}</p>
        <p className='show-description'>{show.description}</p>
        <p className='show-genres'><span className='fw-bold'>Genres:</span> {getGenreNames(show.genres)}</p>
        <p className='show-seasons'><span className='fw-bold'>Seasons:</span> {show.seasons.length}</p>
    </div>
</div>
  );
}


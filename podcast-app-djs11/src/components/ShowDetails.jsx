import { useState, useEffect } from 'react';

export default function ShowDetails() {

    const genreOptions = {
        1:	'Personal Growth',
        2:	'Investigative Journalism',
        3:	'History',
        4:	'Comedy',
        5:	'Entertainment',
        6:	'Business',
        7:	'Fiction',
        8:	'News',
        9:	'Kids and Family',
    }

    const [shows, setShows] = useState([]);
      
    useEffect(() => {
      fetch('https://podcast-api.netlify.app')
        .then(response => response.json())
        .then(data => {
          setShows(data);
        })
        .catch(error => console.error('Error fetching shows:', error)); 
    }, []);

   // Function to get genre names from IDs
   const getGenreNames = (genreIds) => {
    return genreIds.map((id) => genreOptions[id] || 'Unknown Genre').join(', ');
  };
  return (
    <div className="show-list">
      {shows.map(show => (
        <div key={show.id} className="show-item"> {/* create div for each unique show (determined by id) */}
            <img src={show.image} alt={show.title} />
            <h3>{show.title}</h3>
            <p className='genreNames'>{getGenreNames(show.genres)}</p>  {/* join show genres into a single string separated by commas */}
            <p>{show.seasons.length} seasons</p>
            <p>Last updated: {new Date(show.updatedAt).toLocaleDateString()}</p> 
        </div>
      ))}
    </div>
  );
}

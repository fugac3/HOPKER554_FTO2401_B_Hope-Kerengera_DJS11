import { useState, useEffect } from 'react';

export default function ShowDetails() {

    const [shows, setShows] = useState([]);
      
    useEffect(() => {
      fetch('https://podcast-api.netlify.app')
        .then(response => response.json())
        .then(data => {
          setShows(data);
        })
        .catch(error => console.error('Error fetching shows:', error)); 
    }, []);


  return (
    <div className="show-list">
      {shows.map(show => (
        <div key={show.id} className="show-item"> {/* create div for each unique show (determined by id) */}
            <img src={show.image} alt={show.title} />
            <h3>{show.title}</h3>
            <p>{show.genres.join(', ')}</p> {/* join show genres into a single string separated by commas */}
            <p>{show.seasons.length} seasons</p>
            <p>Last updated: {new Date(show.updatedAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

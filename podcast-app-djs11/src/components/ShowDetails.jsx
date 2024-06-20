import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function ShowDetails() {
  const { id } = useParams(); // get the show ID from the URL
  const [searchTerm, setSearchTerm] = useState(""); //state for search term
  const [show, setShow] = useState(null);
  const [shows, setShows] = useState([]);

  const showDate = (dateString) => {//function to convert date string to readable format
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (id) {
      fetch(`https://podcast-api.netlify.app/id/${id}`) //fetches specific show data from the api based on the id entered in the route
        .then(response => response.json())
        .then(data => setShow(data))
        .catch(error => console.error('Error fetching show:', error));
    }
  }, [id]);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app')//fetches all show data from the api
      .then(response => response.json())
      .then(data => {
        setShows(data);
      })
      .catch(error => console.error('Error fetching shows:', error));
  }, []);

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

  //function to get genre names from IDs
  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => genreOptions[id] || 'Unknown Genre').join(', ');
  };

  //filter shows based on the search term
  const filteredShows = shows.filter(show =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase()) //filter shows based on the search term (make all letters lower case first)
  );

  return (
    //SEARCH FUNCTION
    <>
      <div className="banner-section">
        <div className="banner container rounded-5 d-flex justify-content-between bg-white w-50 h-4 py-2 no-border">
          <input
            onChange={(e) => setSearchTerm(e.target.value)} //checking if the value in the input box matches any shows by setting the search term on change
            className="bg-transparent border-0 w-100 no-border"
            type="text"
            placeholder="Search shows..."
          />
          🔍
        </div>
        <div className="banner-overlay"></div>
      </div>

      {/* MAIN CONTENT */}
      <main>
        <div className="show-list">
          {filteredShows.map(show => (
            <div key={show.id} className="show-item">
              <img src={show.image} alt={show.title} />
              <h3>{show.title}</h3>
              <p className="genreNames">{getGenreNames(show.genres)}</p>
              <NavLink
                style={{ textDecoration: 'none', color: '#8e8a61', cursor: 'pointer', fontWeight: 'bold' }}
                to={`/show/${show.id}`}
              > 
                <p>Seasons: {show.seasons}</p> {/* link to go to show page and displays the number of seasons for the show */}
              </NavLink>
              <p className='show-deets'><span className='fw-bold'>Last updated:</span> {showDate(show.updated)}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

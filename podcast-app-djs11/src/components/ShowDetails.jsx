import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function ShowDetails() {
  const [searchTerm, setSearchTerm] = useState(""); //state for search term
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('A-Z');

  const showDate = (dateString) => {//function to convert date string to readable format
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    setIsLoading(true); //loading set to true initially until data is fetched then set to false
    fetch('https://podcast-api.netlify.app')//fetches all show data from the api
      .then(response => response.json())
      .then(data => {
        setShows(data); //set the "shows" data with the fetched data
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching shows:', error));
  }, []);

  if (isLoading) {
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

  //function to get genre names from IDs
  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => genreOptions[id] || 'Unknown Genre').join(', ');
  };

  //filter shows based on the search term
  const filteredShows = shows.filter(show =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase()) //filter shows based on the search term (make all letters lower case first)
  );

  const sortedShows = [...filteredShows].sort((a, b) => { //sort shows (filter shows based on the search term first)
    if (sortOrder === 'A-Z') { //if sort order is A-Z
        return a.title.localeCompare(b.title); //compare the titles of the shows (locale compare to sort alphabetically a-z)
    } else if (sortOrder === 'Z-A') { //if sort order is Z-A
        return b.title.localeCompare(a.title); //compare the titles of the shows (locale compare to sort alphabetically z-a)
    } else if (sortOrder === 'Recent') { //if sort order is Recent
        return new Date(b.updated) - new Date(a.updated); //compare the updated dates of the shows to sort by most recent
    } else {
        return new Date(a.updated) - new Date(b.updated); //compare the updated dates of the shows to sort by oldest
    }
});

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

      {/* SORTING */}
      <div className="sort-options">
        <label className='sort-label'>Sort by:</label>
          <select className="sort-order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}> {/* set the sort order on change*/}
            <option value="A-Z">Title: A-Z</option> {/* sorting options*/}
            <option value="Z-A">Title: Z-A</option>
            <option value="Recent">Most Recently Updated</option>
            <option value="Oldest">Oldest Updated</option>
          </select>
      </div>

      {/* MAIN CONTENT */}
      <main>
                <div className="show-list">
                    {sortedShows.map(show => (
                        <div key={show.id} className="show-item">
                            <img src={show.image} alt={show.title} />
                            <h3>{show.title}</h3>
                            <p className="genreNames">{getGenreNames(show.genres)}</p>
                            <NavLink
                                style={{ textDecoration: 'none', color: '#8e8a61', cursor: 'pointer', fontWeight: 'bold' }}
                                to={`/show/${show.id}`}
                            >
                                <p>Seasons: {show.seasons}</p>
                            </NavLink>
                            <p className='show-deets'><span className='fw-bold'>Last updated:</span> {showDate(show.updated)}</p>
                        </div>
                    ))}
                </div>
            </main>
    </>
  );
}

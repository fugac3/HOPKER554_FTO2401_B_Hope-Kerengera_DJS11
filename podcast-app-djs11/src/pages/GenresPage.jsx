import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function GenresPage() {
    const [selectedGenre, setSelectedGenre] = useState(''); // state to store the selected genre
    const [shows, setShows] = useState([]); // state to store the list of shows
    const [filteredShows, setFilteredShows] = useState([]); // State to store the filtered shows based on selected genre
    const [genreName, setGenreName] = useState(''); // State to store the name of the selected genre

    // Genre options mapping from id to name
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

    //fetch the list of shows from the API
    useEffect(() => {
        fetch('https://podcast-api.netlify.app')
            .then(response => response.json())
            .then(data => {
                setShows(data); // set shows data
            })
            .catch(error => console.error('Error fetching shows:', error));
    }, []);

    //update the filtered shows whenever the selected genre or shows list changes
    useEffect(() => {
        if (selectedGenre) {
            //filter shows that include the selected genre
            const filtered = shows.filter(show => show.genres.includes(parseInt(selectedGenre)));
            setFilteredShows(filtered);
            setGenreName(genreOptions[selectedGenre]); // set the name of the selected genre
        } else {
            //if no genre is selected, show all shows
            setFilteredShows(shows);
            setGenreName(''); //clear the genre name
        }
    }, [selectedGenre, shows]);

    return (
        <div className="genres-page">
            <h2 className="genres-title">Genres</h2>
            <div className="genre-select-container">
                <label htmlFor="genreSelect" className="genre-label">Select Genre:</label>
                <select 
                    className="genre-select" 
                    onChange={(e) => setSelectedGenre(e.target.value)} //update the selected genre when the selection changes
                >
                    <option>All Genres</option>
                    {Object.entries(genreOptions).map(([id, name]) => ( /* map the genre options to the select */
                        <option key={id} value={id}>{name}</option> 
                    ))}
                </select>
            </div>
            {genreName && <h3 className="selected-genre-heading">{genreName}</h3>} {/* display the selected genre name if it exists */}
            <div className="show-list">
                {filteredShows.map(show => (
                    <div key={show.id} className="show-item">
                        <img src={show.image} alt={show.title} />
                        <h3>{show.title}</h3>
                        <Link style={{ textDecoration: 'none', color: '#937193', fontStyle: 'italic', cursor: 'pointer' }} to={`/show/${show.id}`} className="view-show-link">View Show</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

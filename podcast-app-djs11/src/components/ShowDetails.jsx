import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function ShowDetails() {
    const { id } = useParams(); // get the show ID from the URL  
    const [show, setShow] = useState([]); 

    useEffect(() => {
        fetch(`https://podcast-api.netlify.app/id/${id}`)
            .then(response => response.json())
            .then(data => setShow(data))
            .catch(error => console.error('Error fetching show:', error));
    }, [id]);

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
                <div key={show.id} className="show-item">
                    <img src={show.image} alt={show.title} />
                    <h3>{show.title}</h3>
                    <p className="genreNames">{getGenreNames(show.genres)}</p>
                    <Link to={`/show/${show.id}`}><p>{show.seasons.length} seasons</p></Link>
                    <p>Last updated: {new Date(show.updatedAt).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
}

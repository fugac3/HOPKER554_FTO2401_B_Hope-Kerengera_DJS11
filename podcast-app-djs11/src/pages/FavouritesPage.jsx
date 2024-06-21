import { useState, useEffect } from 'react';

export default function FavouritesPage() {
    const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || []);
    const [sortOrder, setSortOrder] = useState('A-Z');

    //update local storage when favourites change
    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    //sort favourites based on selected sort order
    const sortedFavourites = [...favourites].sort((a, b) => {
        if (sortOrder === 'A-Z') {
            return a.title.localeCompare(b.title);
        } else if (sortOrder === 'Z-A') {
            return b.title.localeCompare(a.title);
        } else if (sortOrder === 'Recent') {
            return new Date(b.addedAt) - new Date(a.addedAt);
        } else {
            return new Date(a.addedAt) - new Date(b.addedAt);
        }
    });

    //group favourites by show and season
    const groupedFavourites = sortedFavourites.reduce((acc, fav) => {
        const showKey = fav.showTitle;
        const seasonKey = fav.season;
        if (!acc[showKey]) {
            acc[showKey] = {};
        }
        if (!acc[showKey][seasonKey]) {
            acc[showKey][seasonKey] = [];
        }
        acc[showKey][seasonKey].push(fav);
        return acc;
    }, {});

    //remove episode from favourites
    const removeFavourite = (episode) => {
        //filter by unique identifier which includes showTitle, season, and episode id
        const newFavourites = favourites.filter(fav => !(fav.showTitle === episode.showTitle && fav.season === episode.season && fav.id === episode.id));
        setFavourites(newFavourites);
    };

    return (
        <div className="favourites-page">
            <h2 className="favourites-title">Favourites</h2>
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
        
            {/* show list of favourites */}
            <div className="favourites-list">
                {Object.keys(groupedFavourites).map(showTitle => ( /* iterate through each show group */
                    <div key={showTitle} className="show-group"> {/* show group div */}
                        <h3 className='show-title'>{showTitle}</h3> 
                        {Object.keys(groupedFavourites[showTitle]).map(season => ( /* iterate through each season group */
                            <div key={season} className="season-group">
                                <h4 className='season-title'>Season {season}</h4>
                                {groupedFavourites[showTitle][season].map(fav => ( 
                                    <div key={`${fav.showTitle}-${fav.season}-${fav.id}`} className="favourite-item"> {/* episode div */}
                                        <div className="favourite-details">
                                            <h5 className='favourite-title'>{fav.title}</h5>
                                            <p className='favourite-show'>{fav.showTitle} - Season {fav.season}</p>
                                            <p className='favourite-date'>Added at: {new Date(fav.addedAt).toLocaleString()}</p>
                                            <button className="remove-favourite-button" onClick={() => removeFavourite(fav)}>Remove from Favourites</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

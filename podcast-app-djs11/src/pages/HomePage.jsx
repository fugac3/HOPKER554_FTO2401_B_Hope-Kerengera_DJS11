import SearchBar from "../components/SearchBar";
import ShowDetails from "../components/ShowDetails";


export default function HomePage() {

    return (
        <>
            <div className="banner-section">
                <div className="banner-overlay">
                <SearchBar />
                </div>
            </div>
            <main>
                <div><ShowDetails /></div>
            </main>
        </>
    );
}
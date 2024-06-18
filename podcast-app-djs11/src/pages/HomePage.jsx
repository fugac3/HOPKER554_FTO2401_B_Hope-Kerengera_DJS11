import ShowDetails from "../components/ShowDetails";


export default function HomePage() {

    return (
        <>
            <div className="banner-section">
                <div className="banner-overlay">
                <h3>Search Bar</h3>
                </div>
            </div>
            <main>
                <h1>Shows</h1>
                <div><ShowDetails /></div>
            </main>
        </>
    );
}
import ShowDetails from "../components/ShowDetails";


export default function HomePage() {

    return (
        <>
            <div className="banner-section">
            <div className="banner container rounded-5 d-flex justify-content-between bg-white w-50 h-4 py-2 no-border">
              <input className="bg-transparent border-0 w-100 no-border" type="text" placeholder="Search shows..." />
    🔍
</div>
                <div className="banner-overlay">
                  
                {/* <SearchBar /> */}
                </div>
            </div>
            <main>
                <div><ShowDetails /></div>
            </main>
        </>
    );
}
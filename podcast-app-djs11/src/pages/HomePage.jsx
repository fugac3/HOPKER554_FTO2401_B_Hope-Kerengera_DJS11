import ShowDetails from "../components/ShowDetails";
import { useState } from "react";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState(""); //state for search term

  return (
    <>
      <main>
        <ShowDetails searchTerm={searchTerm} />
      </main>
    </>
  );
}

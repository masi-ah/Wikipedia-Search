import { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import SearchResultItem from "./SearchResultItem";

const WikipediaSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!query) {
      setResults([]);
      return;
    }
    try {
      setError(null);
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`
      );
      const data = await res.json();
      setResults(data.query.search);
    } catch (err) {
      setError("There was a problem fetching data.");
      console.error("There is a problem:", err);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="wikipedia-search">
      <SearchInput query={query} setQuery={setQuery} />
     {error && <p className="error-message">{error}</p>}
      {results.length > 0 ? (
        <ul>
          {results.map((item) => (
            <SearchResultItem key={item.pageid} item={item} />
          ))}
        </ul>
      ) : (
        query && !error && <p>No result found</p>
      )}
    </div>
  );
};

export default WikipediaSearch;

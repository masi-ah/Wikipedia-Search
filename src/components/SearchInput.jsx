const SearchInput = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Write here"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchInput;

const SearchResultItem = ({ item }) => {
  const calculateReadingTime = (text) => {
    const wordCount = text.split(" ").length;
    const time = Math.ceil(wordCount / 200);
    return `${time} minute`;
  };

  return (
    <li className="search-result-item">
      <h3>
        <a
          href={`https://en.wikipedia.org/wiki/${item.title.replace(/ /g, "_")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="link-style"
        >
          {item.title}
        </a>
      </h3>
      <p dangerouslySetInnerHTML={{ __html: item.snippet }} />
      <p>
        ⏱ Approximate reading time: <span className="reading-time">{calculateReadingTime(item.snippet)}</span>
      </p>
    </li>
  );
};

export default SearchResultItem;
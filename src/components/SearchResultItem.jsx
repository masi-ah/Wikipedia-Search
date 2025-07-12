import { useEffect, useState } from "react";

const SearchResultItem = ({ item }) => {
  const [readingTime, setReadingTime] = useState(null);

  const calculateReadingTime = (text) => {
    const wordCount = text.split(" ").length;
    const time = Math.ceil(wordCount / 200);
    return `${time} minute${time > 1 ? 's' : ''}`;
  };

  useEffect(() => {
    const fetchFullText = async () => {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&titles=${item.title}&format=json&origin=*`
        );
        const data = await response.json();
        const pages = data.query.pages;
        const page = pages[Object.keys(pages)[0]];
        const fullText = page.extract;

        if (fullText) {
          setReadingTime(calculateReadingTime(fullText));
        } else {
          setReadingTime("Not Available");
        }
      } catch (error) {
        console.error("Failed to fetch full article:", error);
        setReadingTime("Not Available");
      }
    };

    fetchFullText();
  }, [item.title]);

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
      {readingTime && (
        <p>
          ⏱ Approximate reading time: <span className="reading-time">{readingTime}</span>
        </p>
      )}
    </li>
  );
};

export default SearchResultItem;
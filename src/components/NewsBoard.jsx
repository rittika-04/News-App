import { useState, useEffect } from "react";
import NewsItem from "./NewsItem";  // Ensure you have imported NewsItem correctly

const NewsBoard = ({category}) => {
  const [articles, setArticles] = useState([]);  // ✅ Fixed useState

  useEffect(() => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setArticles(data.articles))
      .catch((error) => console.error("Error fetching news:", error));  // ✅ Added error handling
  }, [category]);

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      <div className="container">
        <div className="row">
          {articles.length > 0 ? (
            articles.map((news, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={news.title || "No Title"}
                  description={news.description || "No Description"}
                  src={news.urlToImage || "https://via.placeholder.com/150"}
                  url={news.url}
                />
              </div>
            ))
          ) : (
            <p className="text-center">Loading news...</p>  // ✅ Added loading state
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsBoard;

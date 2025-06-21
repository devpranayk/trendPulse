import { useState, useEffect } from 'react';
import './Trendsection.css';

function Trendsection({ search, sortBy, lang, from, to }) {
  const category = search || 'india';
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams({
      category,
      sortBy,
      lang,
      page: 1,
    });
    if (from) params.append('from', from);
    if (to) params.append('to', to);

    setLoading(true);
    fetch(`http://localhost:5000/api/news?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.articles) && data.articles.length > 0) {
          setArticles(data.articles);
          setError(null);
        } else {
          setArticles([]);
          setError(`No recent news found for "${category}".`);
        }
      })
      .catch((err) => {
        setError('Failed to fetch news.');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [category, sortBy, lang, from, to]);

  return (
    <div className="trendsec">
      {loading && <p>Loading latest news...</p>}
      {!loading && error && <p className="error">{error}</p>}

      <div className="news-grid">
        {articles.map((article, i) => (
          <div className="articleCard" key={i}>
            {article.image && (
              <img src={article.image} className="articleImage" alt="news" />
            )}
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noreferrer">
              <button className="openBtn">Open Article</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trendsection;

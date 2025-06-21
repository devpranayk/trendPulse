const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/api/news", async (req, res) => {
  const category = req.query.category || "india";
  const sortBy = req.query.sortBy || "relevance";
  const lang = req.query.lang || "en";
  const from = req.query.from;
  const to = req.query.to;
  const page = req.query.page || 1;

  try {
    const params = {
      q: category,
      token: process.env.GNEWS_API_KEY,
      lang,
      sortby: sortBy,
      page,
    };

    if (from) params.from = from;
    if (to) params.to = to;

    const response = await axios.get("https://gnews.io/api/v4/top-headlines", {
      params,
    });

    res.json({ articles: response.data.articles });
  } catch (error) {
    console.error("❌ GNews Fetch Error:");
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Unable to fetch news from GNews." });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});

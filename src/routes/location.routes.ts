import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/search", async (req, res) => {
   console.log("📍 Location search hit:", req.query.q);

  try {
    const query = req.query.q as string;

    if (!query || query.length < 2) {
      res.status(400).json({ message: "Query too short" });
      return 
    }

    const response = await axios.get(
      "https://api.locationiq.com/v1/autocomplete",
      {
        
        params: {
          key: process.env.LOCATIONIQ_API_KEY,
          q: query,
          limit: 6,
          countrycodes: "in",
          format: "json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Location search error:", error);
    res.status(500).json({ message: "Location search failed" });
  }
});

export default router;

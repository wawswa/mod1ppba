import express from "express";
import serverless from "serverless-http";
import app from "../../src/index.js";

// Netlify memanggil function ini melalui rewrite ke "/.netlify/functions/api/:splat".
// Bergantung pada cara request dirutekan, function bisa menerima path asli dari client
// ("/api/loans") atau path internal function ("/.netlify/functions/api/loans").
// Keduanya dinormalisasi menjadi "/api/..." agar route Express selalu cocok.
const FUNCTION_PREFIX = "/.netlify/functions/api";

const handlerApp = express();

handlerApp.use((req, _res, next) => {
  if (req.url.startsWith(FUNCTION_PREFIX)) {
    req.url = `/api${req.url.slice(FUNCTION_PREFIX.length)}`;
  }
  next();
});

handlerApp.use(app);

export const handler = serverless(handlerApp);

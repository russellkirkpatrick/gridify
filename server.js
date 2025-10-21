import express, { response } from "express";
import dotenv from "dotenv";
import cors from "cors"
import querystring from "querystring"
import request from "request"

dotenv.config()

const app = express();
app.use(cors());

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

let access_token = null;

const generateRandomString = () => {
  let ret = ""
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  for (let i = 0; i < 16; i++) {
    ret += possible.charAt(Math.floor(Math.random() * possible.length))
  } 

  return ret
}

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  const scope = "user-modify-playback-state user-read-playback-state user-read-currently-playing user-follow-modify user-follow-read user-read-recently-played user-read-playback-position user-top-read playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private user-read-email user-read-private user-library-modify user-library-read"

  res.redirect("https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    })
  );
})

app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || state;

  if (state == null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
    }));
  } else {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code"
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + (new Buffer.from(client_id + ":" + client_secret).toString("base64"))
      },
      json: true
    };

    request.post(authOptions, (err, response, body) => {    
      if (err || body.error || !body.access_token) {
      return res.redirect('http://localhost:5173/?error=login_failed');
    }

    access_token = body.access_token;

    res.redirect("http://localhost:5173/connected")
  })
}})


app.get("/tracks/:range", (req, res) => {
  //todo: replace access token via refresh token
  if (!access_token) return res.redirect('http://localhost:5173/?error=login_failed');
 
  const range = req.params.range
  const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${range}&limit=50`
  const options = {
    headers: { Authorization: `Bearer ${access_token}` },
    json: true,
  };
  
  request.get(url, options, (err, response, body) => {
    if (err) return res.status(500).send(err);
    const {items} = body || {}
    
    if (!items) {
      return res.status(500).send({ error: "No items returned from Spotify" });
    }
    
    return res.json(items);
  });
});

app.use(express.json());


app.post("/playlist", (req, res) => {
  if (!access_token) return res.redirect('http://localhost:5173/?error=login_failed');

  const { name, description = "", public: isPublic = false, uris = [] } = req.body;

  // get user info
  request.get(
    "https://api.spotify.com/v1/me",
    { headers: { Authorization: `Bearer ${access_token}` }, json: true },
    (err, _, me) => {
      const userId = me?.id;

      // create playlist
      request.post(
        {
          url: `https://api.spotify.com/v1/users/${userId}/playlists`,
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          json: { name, description, public: isPublic },
        },
        (err2, _, playlist) => {
          const playlistId = playlist?.id;

          // add tracks
          request.post(
            {
              url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
              headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
              },
              json: { uris },
            },
            () => {
              res.json({
                playlist: {
                  id: playlistId,
                  name,
                  url: playlist?.external_urls?.spotify,
                },
              });
            }
          );
        }
      );
    }
  );
});

app.listen(4000)
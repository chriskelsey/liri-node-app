# liri-node-app
A language interpretation and command line node app

## Takes four arguments
* 'my-tweets' - passes last 20 tweets written by me
* 'spotify-this-song' + 'song name' - pulls information about a specific song from Spotify
* 'movie-this' + 'movie title' - pulls information about a movie from IMDB
* 'do-what-it-says' generates a predefined function and parameter

### Required Packages
Packages installed as part of this build are:
* dotenv
* require
* twitter
* node-spotify-api

This also uses process.env for security of storing the keys for the api's.

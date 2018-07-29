//Packages needed 
require('dotenv').config();
var fs = require('fs');
var keys = require('./keys.js');
var request = require('request');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

//Objects passed for the API Keys
var twitter = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);



//main function to pass commands to the app
function callLiri(command,param){
	if(command === 'my-tweets'){
		requestTweets();
	} else if (command === 'spotify-this-song'){
		whatsTheSong(param);
	} else if (command === 'movie-this'){
		whatsTheMovie(param);
	} else if (command === 'do-what-it-says'){
		fireRandom();
	} else{
		introText();
	}
}


//function run onload with a list of commands
function introText() {
  console.log('\n***************  - Welcome LiriBot - *************** \n\n - Here are your options, please select one of the commands to run below - \n');
  console.log('** Type \'my-tweets\' to see the last 20 Tweets I wrote **');
  console.log('** Type \'spotify-this-song\' \'Song Name\' to get information about a song from Spotify **');
  console.log('** Type\'movie-this\' \'movie title\' to get information about a movie from IMDB **');
  console.log('** Type \'do-what-it-says\' to generate a predefined function and parameter **');
  console.log('\n**************** - Thanks - ********************** \n');
}

//Function fires based off of 'my-tweets'
function requestTweets() {
	var delimeter = ('--------------------------------------------------');
	var params = {
		screen_name: 'DeveloperKelsey',
		count: 20
	}
	twitter.get('statuses/user_timeline', params, function(err, tweet, response) {
   		if (err) {
   			return console.log(err);
   		}
   		console.log('\n****************** Enjoy Some Tweets *******************\n');
      		for (var i = 0; i < tweet.length; i++) {
        		console.log('"' + tweet[i].text + '" \nCreated at: ' + tweet[i].created_at);
        		console.log(delimeter);
      		}
      	console.log('\n');
	});
}

//Function fires based off of 'spotify-this-song'
function whatsTheSong(song) {
		var params = {
			type: 'track',
			query: song,
			limit: 1
		}

	spotify.search(params, function(err, response) {
  		if (err) {
    		return console.log(err);
  		}
  		var responseData = response.tracks.items[0];
  		var preview = '';
  		if(responseData.preview_url != null){
 			preview = '\nPreview Url: ' + responseData.preview_url;
 		}else {
 			preview = '\nSorry, no Preview URL available for this song.';
 		}
  		console.log('\n****************** Enjoy Your Song Info *******************\n'
  		+'\nArtist: ' + responseData.album.artists[0].name 
  		+'\nSong: ' + responseData.name 
  		+ preview
 		+ '\nAlbum: ' +responseData.album.name + '\n\n');
	});
}

//Function fires based off of 'movie-this'
function whatsTheMovie(movie) {
	var url = '';
	if (!movie) {movie = 'Mr Nobody';}
  	request("http://www.omdbapi.com/?t=" + movie + "&plot=short&apikey=trilogy", function (err, response, body) {
	    if (JSON.parse(body).Response === 'False') {
	      console.log(err);
	    } else if (!err && response.statusCode === 200) {
	    	var jsonData = JSON.parse(body);
	    	console.log('\n****************** Enjoy Your Movie Info *******************\n'
		    + '\n* Movie Title: '+ jsonData.Title
		    + '\n* Release Date: '+ jsonData.Year
		    + '\n* IMDB Rating: '+ jsonData.Ratings[0].Value
		    + '\n* Rotten Tomatoes Rating: ' + jsonData.Ratings[1].Value
		    + '\n* Country Produced: ' + jsonData.Country
		    + '\n* Movie Language: ' + jsonData.Language
		    + '\n* Plot: ' + jsonData.Plot
		    + '\n* Starring: ' + jsonData.Actors + '\n\n');
	    }
  });
}

//Function fires based off of 'do-what-it-says'
function fireRandom(){
	fs.readFile('random.txt', 'utf-8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    dataArr = data.split(',');
    callLiri(dataArr[0], dataArr[1] || null);
  });
}

//callback
callLiri(process.argv[2] || null, process.argv[3] || null);

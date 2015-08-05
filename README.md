# Random Dilbert

This app simply gets a random Dilbert comic from [dilbert.com](http://www.dilbert.com)

dilbert.com doesn't have an api so there's some node magic going on in the backend to be able to get the comic.

All the Dilbert comics have their own page, the url to this page is the date that it was posted, after doing a little bit of research I found out the first Dilbert comic was posted April 16, 1989. 
I created a function to get a random date, and then used the node module Cheerio to parse the html returned from the random comic's page and then return the comic to the user. There is no need to refresh
the page because with a little AJAX magic I set it up to retrieve an image from the server.

You can view this project at [random-dilbert.herokuapp.com](http://random-dilbert.herokuapp.com).

# Random Dilbert

This app simply gets a random Dilbert comic from [dilbert.com](http://www.dilbert.com)

dilbert.com doesn't have an api so there's some node magic going on in the backend to be able to get the comic.

All the Dilbert comics have their own page, the url to this page is the date that it was posted, after doing a little bit of research I found out the first Dilbert comic was posted April 16, 1989.

This project uses [coolql.cool](https://github.com/dinubs/coolqlcool) to get comic information.

# Development

**Requirements**

- [Now CLI](https://zeit.co/now)

This is a `now` project, it's highly encouraged that you test everything through `now`. In your command line you can run `now` and it will deploy the app to your own URL. There's also automatic PR servers if you make a PR to this repo.

You can view this project at [random-dilbert.wtf](https://random-dilbert.wtf).

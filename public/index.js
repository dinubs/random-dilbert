const img = document.querySelector('.container img');
const title = document.querySelector('.title');
const date = document.querySelector('.date');

const reroll = document.querySelector('.reroll');
const permalink = document.querySelector('.permalink');
const loading = document.querySelector('.loading');

function getComic() {
  return fetch('actions/random-dilbert.js')
    .then((response) => response.json());
}

function updateComic(comic) {
  img.src = comic.image.src;
  img.alt = comic.image.alt;
  title.textContent = comic.title.name.text;
  date.textContent = comic.title.date.text;
  permalink.href = comic.permalink.href;
  loading.style.display = 'none';
}

function eventHandler() {
  loading.style.display = 'block';
  getComic().then(updateComic);
}

// Do this as soon as possible, if I'm correct in my hunch this will get called immediately
// and allow things to seem to load fast. Either way, it's nice to just do this now.
const firstComic = getComic();
(function() {
  firstComic.then(updateComic)
  reroll.addEventListener('click', eventHandler);
})();

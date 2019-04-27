const kinoApi = require('../lib/index.js');

const kinopoisk = new kinoApi.Kinopoisk();

(async () => {
  try {
    // Get movie kinopoisk id
    // const kpMovieId = await kinopoisk.getFilmId({
    //   title: Звёздные войны Пробуждение силы',
    //   // year: 2015, // optional
    //   // countries: ['США'], // optional
    // });
    // if (!kpMovieId) {
    //   throw '404';
    // }
    // console.log('kpMovieId', kpMovieId);

    // Get movie info
    // const kpMovieData = await kinopoisk.getFilmInfo(kpMovieId);
    // console.log('kpMovieData', kpMovieData);

    // Get soon films
    const kpSoonMovies = await kinopoisk.getSoonFilms();
    console.log('kpSoonMovies.items', kpSoonMovies.items);

  } catch (err) {
    err = err.message || err;
    err = (!err || err.match(/404/)) ? 'Movie not found' : err;
    console.error(err);
  }
})();
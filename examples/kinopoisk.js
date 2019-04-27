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
    // const kpSoonMovies = await kinopoisk.getSoonFilms();
    // console.log('kpSoonMovies.items', kpSoonMovies.items);

    // Get navigator films
    const kpNavigatorMovies = await kinopoisk.getNavigatorFilms({
      type: 'film',
      years: '2017:2018',
      rating: '8:9',
      order: 'year', // rating
    });
    console.log('kpNavigatorMovies.items', kpNavigatorMovies.items);
    console.log('kpNavigatorMovies.pages', kpNavigatorMovies.pages);
  } catch (err) {
    err = err.message || err;
    err = (!err || err.match(/404/)) ? 'Movie not found' : err;
    console.error(err);
  }
})();
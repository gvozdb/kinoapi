/* @flow */

import R from 'ramda';
import {imageUrlFromPath, parseRuntime} from './utils';
import type {
  KinopoiskApi$GetSoonFilmsItem,
  KinopoiskApi$GetSoonFilmsResponse,
} from './types';

const soonFilmListFromRes = ({
  previewFilms = [],
}: KinopoiskApi$GetSoonFilmsResponse) => ({
  items: R.flatten([
    ...previewFilms.map((list: Array) => {
      return list.map((item: KinopoiskApi$GetSoonFilmsItem) => {
        let kpRating = String(item.rating);
        if (kpRating.match('%')) {
          kpRating = parseFloat(kpRating) / 10;
        }
        kpRating = parseFloat(kpRating);

        return {
          kpId: parseInt(item.id, 10),
          title: item.nameRU,
          originalTitle: item.nameEN,
          posterUrl: item.posterURL ? imageUrlFromPath(item.posterURL) : null,
          year: parseInt(item.year, 10),
          productionCountries: (item.country || '')
            .split(', ')
            .map((country: string) => country.trim()),
          runtime: parseRuntime(item.filmLength),
          genres: (item.genre || '').split(', '),
          kpRating,
          kpRatingVoteCount: parseInt(
            String(item.ratingVoteCount || '').replace(' ', ''),
            10,
          ),
          premiereDate: String(item.premiereRU).trim(),
        };
      });
    }),
  ]),
});

export default soonFilmListFromRes;

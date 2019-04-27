/* @flow */

import {imageUrlFromPath} from './utils';
import type {
  KinopoiskApi$NavigatorFilmsItem,
  KinopoiskApi$GetNavigatorFilmsResponse,
} from './types';

export type NavigatorQuery = {
  type?: string,
  years?: string,
  rating?: string,
  order?: string,
  // year?: number,
  // countries?: Array<string>,
  // isTvShow?: boolean,
};

const navigatorFilmInfoFromRes = ({
  items = [],
  pagesCount = 1,
}: {
  items: KinopoiskApi$GetNavigatorFilmsResponse,
  pagesCount: number,
}) => ({
  items: items.map((item: KinopoiskApi$NavigatorFilmsItem) => ({
    kpId: parseInt(item.id, 10),
    title: item.nameRU,
    originalTitle: item.nameEN || '',
    posterUrl: item.posterURL ? imageUrlFromPath(item.posterURL) : null,
    year: parseInt(item.year, 10),
    productionCountries: (item.country || '')
      .split(', ')
      .map((country: string) => country.trim()),
    genres: (item.genre || '').split(', '),
    kpRating: parseFloat(item.rating),
    kpRatingVoteCount: parseInt(
      (item.ratingVoteCount || '').replace(' ', ''),
      10,
    ),
  })),
  pages: pagesCount,
});

export default navigatorFilmInfoFromRes;

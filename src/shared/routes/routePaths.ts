const appRoutes = {
  MAIN: '/',
  REGISTRATION: '/registration',
  SEARCH_PAGE: '/searchPage',
  FAVORITE_PAGE: '/favoritePage',
  BASE_NAME: '/youtubeSpa/',
} as const;

export const { MAIN, REGISTRATION, SEARCH_PAGE, FAVORITE_PAGE, BASE_NAME } =
  appRoutes;

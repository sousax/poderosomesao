export const SSR_ROUTES = ['shop', 'auth']

export const isSSREnableForPage = (page: string) =>
  SSR_ROUTES.some((prefix) => page.startsWith(prefix))

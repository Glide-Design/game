// List created from https://www.keycdn.com/blog/web-crawlers
export const SearchBotsUserAgents = [
  'Googlebot',
  'Bingbot',
  'Slurp',
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'Sogou',
  'Exabot',
  'facebot',
  'facebookexternalhit',
  'ia_archiver',
];

export const isSearchBot = userAgent =>
  SearchBotsUserAgents.some(bot => userAgent.indexOf(bot) > -1);

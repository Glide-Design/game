import fs from 'fs';
import Path from 'path';
import util from 'util';
import Hapi from 'hapi';
import Vision from 'vision';
import Inert from 'inert';
import Good from 'good';
import axios from 'axios';
import handlebars from 'handlebars';
import RequireHttps from 'hapi-require-https';
import { createSitemap } from 'sitemap';
import { flow, get, merge, pickBy, startsWith, first, find, map } from 'lodash/fp';
import MobileDetect from 'mobile-detect';
import acceptedLangageParser from 'accept-language-parser';
import appRoutes from 'xi-core/app/routes';
import sanitizeEnvVars from 'xi-core/utils/sanitizeEnvVars';
import { getSourcesByRatio, getMiddleItem } from 'xi-core/creatives/chooseCreativeByRatio';
import intl from './intl';
import addApiEndPoints from './api/endPoints';
import { getContentResources } from './api/cloudinary/cache';
import { getItemResponse } from './api/services/content/content';
import { getDataForSitemap } from './api/services/sitemap/sitemap';
import stars from './api/services/stars/stars';

import {
  rootPath,
  indexHtmlPath,
  contentPath,
  serviceWorkerPath,
  pingPath,
  starPath,
} from './routes';

import { isSearchBot } from './searchBots';

const fileAccess = util.promisify(fs.access);

const IndexCacheHeader = 'max-age=10, public';
const NonIndexCacheHeader = 'max-age=600, public';
const ServiceWorkerCacheHeader = 'no-cache, no-store, must-revalidate, max-age=0';

let server;

const routes = appRoutes({ paramStyle: 'node' });

if (process.env.LOCAL_HTTPS) {
  var tls = {
    key: fs.readFileSync(Path.join(__dirname, '../web/config/devHttpsCertificates/server.key')),
    cert: fs.readFileSync(Path.join(__dirname, '../web/config/devHttpsCertificates/server.crt')),
    ca: fs.readFileSync(Path.join(__dirname, '../web/config/devHttpsCertificates/rootCA.pem')),
  };
  server = new Hapi.server({ address: 'localhost', port: 8000, tls: tls });
} else {
  server = Hapi.server({
    port: process.env.PORT || 8000,
    host: '0.0.0.0',
  });
}

const envVars = sanitizeEnvVars(process.env);

const ssrPaths = [rootPath, indexHtmlPath, contentPath, starPath];

const ssrRouteHandler = fallBackRouteHandler => async (request, h) => {
  if (
    ssrPaths.some(path => server.match('GET', path).path === request.route.path) &&
    isSearchBot(request.headers['user-agent'])
  ) {
    console.log(request.url.path + ' requested by ' + request.headers['user-agent']);
    try {
      const { data: { markup = '' } = {} } = await axios.get(
        `${envVars.ssrMarkupGeneratorRoot}/get-markup?url=${request.url.path}`
      );
      return h
        .response(markup)
        .type('text/html')
        .takeover();
    } catch (e) {
      console.log(e);
    }
  }

  return await fallBackRouteHandler(request, h);
};

const getReqestLangauge = req =>
  flow(
    get('headers.accept-language'),
    acceptedLangageParser.parse,
    first,
    get('code')
  )(req);

const fetchContentMeta = async (id, req) => {
  try {
    const resources = await getContentResources(id);
    if (resources.length) {
      const data = await getItemResponse(id, resources, getReqestLangauge(req));
      const images = await getSourcesByRatio({
        creatives: get('creatives', data),
        targetRatio: 1.5,
      });
      const middleImage = getMiddleItem(get('srcSet', images));

      return {
        title: get('title', data),
        description: get('descriptionBrief', data),
        imageUrl: get('url', middleImage),
        imageWidth: get('width', middleImage),
        imageHeight: get('height', middleImage),
        thumbnail: get('url', middleImage),
      };
    }
  } catch (error) {
    console.error(error);
    return {};
  }
  throw new Error();
};

const fetchStarMeta = async (id, req) => {
  try {
    const starList = await stars();
    if (find({ seoCode: id })(starList)) {
      const star = find({ seoCode: id })(starList);
      const images = await getSourcesByRatio({
        creatives: get('creatives', star),
        targetRatio: 1.5,
      });
      const middleImage = getMiddleItem(get('srcSet', images));

      return {
        thumbnail: get('url', middleImage),
      };
    }
  } catch (error) {
    console.error(error);
    return {};
  }

  throw new Error();
};

const getPlayerShortKey = async (key = 'seoCode') => {
  try {
    const starList = await stars();
    return map(key)(starList);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const envVarsToPassToClient = pickBy((value, key) => startsWith('REACT_APP_', key), process.env);

const defaultPageContext = async (req, { is404 = false } = {}) => {
  const locale = getReqestLangauge(req);
  return {
    envVars: `window.env = ${JSON.stringify(envVarsToPassToClient)};`,
    ravenVars: `
    Raven.config('https://656c0e882ba745d7bdc822fe5a5f15be@sentry.io/1225792', {
      release: '0-0-0',
      environment: 'development-test',
    }).install();`,
    title: await intl(locale, 'meta.defaultTitle'),
    url: `${envVars.clientAppBaseUrl}${req.url.path}`,
    description: await intl(locale, 'meta.defaultDescription'),
    imageUrl: `${envVars.clientAppBaseUrl}/images/favicon/icon_rebranded.png`,
    imageWidth: 512,
    imageHeight: 512,
    is404: `window.is404 = ${is404.toString()};`,
    thumbnail: `${envVars.clientAppBaseUrl}/images/logo/OTRO-logo-shadowed-black@3x.png`,
  };
};

const loggingOptions = {
  reporters: {
    consoleReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*', error: '*' }],
      },
      {
        module: 'good-console',
      },
      'stdout',
    ],
    logglyReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*', error: '*' }],
      },
      {
        module: 'good-loggly',
        args: [
          {
            token: envVars.logglyKey,
            subdomain: 'otro',
            tags: ['hapi', 'web'],
            name: 'otro-node-server',
            hostname: envVars.clientAppBaseUrl,
            threshold: 40,
            maxDelay: 15000,
          },
        ],
      },
    ],
  },
};

const init = async () => {
  await server.register(Vision);
  await server.register(Inert);
  await server.register(RequireHttps);
  await server.register({
    plugin: Good,
    options: loggingOptions,
  });

  server.views({
    engines: {
      html: handlebars,
      json: handlebars,
    },
    defaultExtension: 'html',
    relativeTo: __dirname,
    path: '../web/build',
  });

  addApiEndPoints(server);

  server.route({
    method: 'GET',
    path: '/index.html',
    handler: ssrRouteHandler(async (request, h) => {
      const defaultContext = await defaultPageContext(request);
      return h.view('index', defaultContext).header('Cache-Control', IndexCacheHeader);
    }),
  });

  for (let name in routes) {
    const route = routes[name];
    switch (name) {
      case 'content':
        server.route({
          method: 'GET',
          path: route.path,
          handler: ssrRouteHandler(async (request, h) => {
            const defaultContext = await defaultPageContext(request);
            try {
              const contentItemContext = await fetchContentMeta(request.params.contentId, request);
              return h
                .view('index', merge(defaultContext, contentItemContext))
                .header('Cache-Control', IndexCacheHeader);
            } catch (error) {
              const defaultContext = await defaultPageContext(request, { is404: true });
              return h.view('index', defaultContext).code(404);
            }
          }),
        });
        break;
      case 'join':
        server.route({
          method: 'GET',
          path: route.path,
          handler: ssrRouteHandler(async (request, h) => {
            const defaultContext = await defaultPageContext(request);
            const locale = getReqestLangauge(request);
            const joinContext = {
              title: await intl(locale, 'meta.joinTitle'),
              description: await intl(locale, 'meta.joinDescription'),
            };

            return h
              .view('index', merge(defaultContext, joinContext))
              .header('Cache-Control', IndexCacheHeader);
          }),
        });
        break;
      case 'playerProfile':
        server.route({
          method: 'GET',
          path: route.path,
          handler: ssrRouteHandler(async (request, h) => {
            const defaultContext = await defaultPageContext(request);
            try {
              const starContext = await fetchStarMeta(request.params.starId, request);
              return h
                .view('index', merge(defaultContext, starContext))
                .header('Cache-Control', IndexCacheHeader);
            } catch (error) {
              const defaultContext = await defaultPageContext(request, { is404: true });
              return h.view('index', defaultContext).code(404);
            }
          }),
        });
        break;
      case 'playerProfileVanity':
        // Ignore this case now as we handle it below in the catch all
        break;
      default:
        server.route({
          method: 'GET',
          path: route.path,
          handler: ssrRouteHandler(async (request, h) => {
            const defaultContext = await defaultPageContext(request);
            return h.view('index', defaultContext).header('Cache-Control', IndexCacheHeader);
          }),
        });
        break;
    }
  }

  server.route({
    method: 'GET',
    path: '/manifest.json',
    handler: (request, h) => {
      const md = new MobileDetect(request.headers['user-agent']);
      const context = {
        display: md.os() === 'iOS' ? 'browser' : 'standalone',
        firebaseSenderId: envVars.firebaseSenderId,
      };
      return h.view('manifest.json', context).header('Cache-Control', NonIndexCacheHeader);
    },
  });

  server.route({
    path: serviceWorkerPath,
    method: 'GET',
    handler: function(request, h) {
      return h.file('service-worker.js').header('Cache-Control', ServiceWorkerCacheHeader);
    },
    options: {
      files: {
        relativeTo: Path.join(__dirname, '../web/build'),
      },
    },
  });

  server.route({
    method: 'GET',
    path: pingPath,
    handler: () => 'OK',
  });

  // iOS Universal Links
  server.route({
    method: 'GET',
    path: '/apple-app-site-association',
    handler: () => ({
      applinks: {
        apps: [],
        details: [{ appID: 'Q664YCW6NC.com.ourstarclub.otro', paths: ['*'] }],
      },
    }),
  });

  //Sitemap
  server.route({
    method: 'GET',
    path: '/sitemap.xml',
    handler: async (request, h) => {
      try {
        const { urls } = await getDataForSitemap();

        const sitemap = createSitemap({
          hostname: envVars.clientAppBaseUrl,
          cacheTime: 1000 * 60 * 60 * 4, // 4 hours
          urls: urls,
        });

        const xml = sitemap.toXML();
        return h.response(xml).header('Content-Type', 'application/xml');
      } catch (e) {
        console.log('Unable to generate sitemap - Reason => ', e.message);
        h.response('xml').header('Content-Type', 'application/xml');
      }
    },
  });

  // Android App Links
  server.route({
    method: 'GET',
    path: '/.well-known/assetlinks.json',
    handler: () => [
      {
        relation: ['delegate_permission/common.handle_all_urls'],
        target: {
          namespace: 'android_app',
          package_name: 'com.otro.app',
          sha256_cert_fingerprints: [
            '17:C2:5A:BC:14:B5:1B:C1:EA:43:F8:C4:4D:58:17:34:41:41:1A:50:91:41:65:A2:26:10:FD:87:7A:22:50:3E',
          ],
        },
      },
    ],
  });

  server.route({
    method: 'GET',
    path: '/static/js/{param*}',
    handler: async (request, h) => {
      try {
        await fileAccess('../web/build' + request.path, fs.F_OK);
        return h.file('web/build' + request.path).header('Cache-Control', NonIndexCacheHeader);
      } catch (e) {
        return h.file('server/chunk-missing-force-reload.js');
      }
    },
    options: {
      files: {
        relativeTo: Path.join(__dirname, '../'),
      },
    },
  });

  const playerShortCodes = await getPlayerShortKey();
  const playerShortUrls = await getPlayerShortKey('shortUrl');
  const catchAllRouteHandler = async (request, h) => {
    try {
      await fileAccess('../web/build' + request.path, fs.F_OK);
      return h.file(request.path.substring(1)).header('Cache-Control', NonIndexCacheHeader);
    } catch (e) {
      if (
        playerShortUrls.indexOf(request.params.param) > -1 &&
        playerShortCodes.indexOf(request.params.param) === -1
      ) {
        return h
          .redirect('/' + playerShortCodes[playerShortUrls.indexOf(request.params.param)])
          .permanent();
      } else if (playerShortCodes.indexOf(request.params.param) > -1) {
        const defaultContext = await defaultPageContext(request);
        return h.view('index', defaultContext).header('Cache-Control', IndexCacheHeader);
      } else {
        const defaultContext = await defaultPageContext(request, { is404: true });
        return h.view('index', defaultContext).code(404);
      }
    }
  };

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: catchAllRouteHandler,
    options: {
      files: {
        relativeTo: Path.join(__dirname, '../web/build'),
      },
    },
  });

  server.ext('onPreResponse', async (request, h) => {
    const response = request.response;
    const is404 = response.statusCode === 404;

    if (!is404) {
      if (request.response && request.response.header) {
        request.response.header('vary', 'accept-encoding');
      }
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();

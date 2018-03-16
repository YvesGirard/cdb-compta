'use strict';
var fallback = require('connect-history-api-fallback');

/*
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 */
module.exports = {
  port: 5050,
  injectChanges: true, // workaround for Angular 2 styleUrls loading
  files: ['./**/*.{html,htm,css,js}'],
  watchOptions: {
    ignored: 'node_modules'
  },
  proxy: {
    target:"localhost:8080",
    ws: true, // enables websockets
    middleware: [
      fallback({
        index: '/index.html',
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'] // systemjs workaround
      })
    ]
  },
  notify: {
    styles: {
        top: 'auto',
        bottom: '0'
    }
  }
};

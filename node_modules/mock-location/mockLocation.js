
'use strict';

var parse = require('url-parse');

module.exports = function mockLocation(url) {

  var location;
  var defaultProtocol = 'http:';

  function init(url) {

    location = parse(url);
    if (!location.protocol) {
      location.set('protocol', defaultProtocol);
    }

  }

  init(url);

  var api = {
    replace: function (url) {
      init(url);
    },
    toString: function () {
      return location.toString();
    }
  };

  Object.defineProperties(api, {

    hash: {
      get: function () {
        return location.hash;
      },
      set: function (hash) {
        if (hash[0] !== '#') {
          hash = '#' + hash;
        }
        location.set('hash', hash);
        if (!location.pathname) {
          location.set('pathname', '/');
        }
      }
    },


    href: {
      get: function () {
        return location.href;
      },
      set: function (href) {
        init(href);
      }
    },


    host: {
      get: function () {
        return location.host;
      },
      set: function (host) {
        location.set('host', host);
      }
    },


    hostname: {
      get: function () {
        return location.hostname;
      },
      set: function (hostname) {
        location.set('hostname', hostname);
      }
    },

    origin: {
      get: function () {
        return location.protocol + '//' + location.host;
      },
      set: function (origin) {
        return origin;
      }
    },

    pathname: {
      get: function () {
        return location.pathname || '/';
      },
      set: function (pathname) {
        if (!pathname && location.hash) {
          pathname = '/';
        }
        location.set('pathname', pathname);
      }
    },

    port: {
      get: function () {
        return location.port;
      },
      set: function (port) {
        location.set('port', port);
      }
    },

    protocol: {
      get: function () {
        return location.protocol;
      },
      set: function (protocol) {
        // ensure colon is present
        var colon = protocol[protocol.length-1] === ':' ? '' : ':';
        location.set('protocol', protocol+colon);
      }
    },


    search: {
      get: function () {
        return location.query;
      },
      set: function (search) {
        location.set('query', search);
      }
    }

  });

  return api;
};

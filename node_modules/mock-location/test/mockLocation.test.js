
'use strict';

var expect;
var chai = require('chai');
var mockLocation = require('../mockLocation');

expect = chai.expect;

describe('mockLocation', function () {

  var location;

  beforeEach(function () {
    location = mockLocation('http://example.com:3000/foo?bar=baz#qux');
  });


  describe('#replace()', function () {

    it('should replace the url', function () {

      location.replace('http://example.com');

      expect(location.toString()).to.equal('http://example.com');
    });

  });


  describe('#hash', function () {

    it('should read the hash portion of the url', function () {

      expect(location.hash).to.equal('#qux');
    });


    it('should set the hash portion of the url', function () {

      location.hash = '#corge';

      expect(location.href)
        .to.equal('http://example.com:3000/foo?bar=baz#corge');
    });


    it('should set the hash portion of the url without "#"', function () {

      location.hash = 'quux';

      expect(location.hash).to.equal('#quux');
    });

  });


  describe('#href', function () {

    it('should read the full url', function () {

      expect(location.href)
        .to.equal('http://example.com:3000/foo?bar=baz#qux');
    });


    it('should replace the internal location instance', function () {

      location.href = 'http://foo.com';

      expect(location.toString()).to.equal('http://foo.com');
    });


    it('should delimit hostname and hash with "/"', function () {
      location = mockLocation('www.example.com');
      location.hash = '#foo';

      expect(location.href).to.equal('http://www.example.com/#foo');
    });


    it('should always include the protocol', function () {
      location = mockLocation('www.example.com');

      expect(location.href).to.equal('http://www.example.com');
    });

  });


  describe('#host', function () {

    it('should read the host of the url', function () {

      expect(location.host).to.equal('example.com:3000');
    });


    it('should write the url host', function () {

      location.host = 'api.example.net:1337';

      expect(location.toString())
        .to.equal('http://api.example.net:1337/foo?bar=baz#qux');
    });

  });


  describe('#hostname', function () {

    it('should read the hostname of the url', function () {

      expect(location.hostname).to.equal('example.com');
    });


    it('should write the url hostname', function () {

      location.hostname = 'api.example.net';

      expect(location.toString())
        .to.equal('http://api.example.net:3000/foo?bar=baz#qux');
    });

  });

  describe('#origin', function () {

    it('should read the origin of the url', function () {

      expect(location.origin).to.equal('http://example.com:3000');
    });

    it('should not change the url origin', function () {

      location.origin = 'ftp://foo.bar.baz';

      expect(location.origin).to.equal('http://example.com:3000');
    });

  });

  describe('#pathname', function () {

    it('should read the url pathname', function () {

      expect(location.pathname).to.equal('/foo');
    });


    it('should return "/" if url has no path', function () {

      var location = mockLocation('example.com');

      expect(location.pathname).to.equal('/');
    });


    it('should write the url pathname', function () {

      location.pathname = '/foo/quux';

      expect(location.toString())
        .to.equal('http://example.com:3000/foo/quux?bar=baz#qux');
    });


    it('should override to "/" if there is a hash', function () {
      var location = mockLocation('www.example.com/#foo');

      location.pathname = '';

      expect(location.pathname).to.equal('/');
      expect(location.toString()).to.equal('http://www.example.com/#foo');
    });

  });


  describe('#search', function () {

    it('should read the url search', function () {

      expect(location.search).to.equal('?bar=baz');
    });


    it('should write the url search', function () {

      location.search = 'corge=grault';

      expect(location.toString())
        .to.equal('http://example.com:3000/foo?corge=grault#qux');
    });

  });


  describe('#protocol', function () {

    it('should read the url protocol', function () {

      expect(location.protocol).to.equal('http:');
    });


    it('should set the url protocol', function () {

      location.protocol = 'https:';

      expect(location.href)
        .to.equal('https://example.com:3000/foo?bar=baz#qux');
    });


    it('should permit omission of ":"', function () {

      location.protocol = 'https';

      expect(location.href)
        .to.equal('https://example.com:3000/foo?bar=baz#qux');
    });

  });


  describe('#port', function () {

    it('should read the url port number', function () {

      expect(location.port).to.equal('3000');
    });


    it('should set the url port', function () {

      location.port = 8080;

      expect(location.href)
        .to.equal('http://example.com:8080/foo?bar=baz#qux');
    });

  });

});

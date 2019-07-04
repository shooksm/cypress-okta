const cypressOkta = require('../src/index');
const pkg = require('../package');

const config = {
  issuer: 'https://example.okta.com',
  client_id: 'badf00d'
};

describe('cypress-okta', () => {
  describe('Initialization', () => {
    it('should throw when not provided a config', () => {
      expect(() => cypressOkta()).toThrow(
        `A configuration has not been provided to ${pkg.name}`
      );
    });

    it('should throw when issuer is not supplied', () => {
      expect(() => cypressOkta({})).toThrow(
        'Your Okta URL is missing. You can copy your domain from the Okta Developer Console. Follow these instructions to find it: https://bit.ly/finding-okta-domain'
      );
    });

    it('should throw when client_id is not supplied', () => {
      expect(() => cypressOkta({ issuer: 'https://example.okta.com' })).toThrow(
        'Your client ID is missing. You can copy it from the Okta Developer Console in the details for the Application you created. Follow these instructions to find it: https://bit.ly/finding-okta-app-credentials'
      );
    });

    it('should prepend the package name and version to the user agent', () => {
      expect(
        cypressOkta(config)
          .oktaAuthClient()
          .userAgent.startsWith(`${pkg.name}/${pkg.version}`)
      ).toBeTruthy();
    });
  });
});

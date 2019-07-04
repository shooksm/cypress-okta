const {
  assertIssuer,
  assertClientId,
  buildConfigObject
} = require('@okta/configuration-validation');
const OktaAuth = require('@okta/okta-auth-js');
const pkg = require('../package');

let authClient;

const oktaSignIn = () => {};

const oktaSignOut = () => {};

const oktaAuthClient = () => authClient;

module.exports = config => {
  if (!config) {
    throw new Error(`A configuration has not been provided to ${pkg.name}`);
  }

  assertIssuer(config.issuer);
  assertClientId(config.client_id);

  authClient = new OktaAuth(buildConfigObject(config));
  authClient.userAgent = `${pkg.name}/${pkg.version} ${authClient.userAgent}`;

  return {
    oktaSignIn,
    oktaSignOut,
    oktaAuthClient
  };
};

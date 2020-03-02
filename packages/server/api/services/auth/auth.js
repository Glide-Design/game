import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import sanitizeEnvVars from 'xi-core/utils/sanitizeEnvVars';

const envVars = sanitizeEnvVars(process.env);

export const isTokenValid = async token => {
  return new Promise((resolve, reject) => {
    if (!token) {
      resolve(false);
    }

    try {
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
      }

      var client = jwksClient({
        cache: true,
        cacheMaxEntries: 5,
        cacheMaxAge: 1000 * 60 * 60 * 24 * 30, // 1 * sec * min * hours * days
        jwksUri: `${envVars.apiBeRoot}/member/jwk/keySet`,
      });

      const getKey = (header, callback) => {
        client.getSigningKey(header.kid, function(err, key) {
          var signingKey = key.publicKey || key.rsaPublicKey;
          callback(null, signingKey);
        });
      };

      jwt.verify(token, getKey, {}, (err, decoded) => {
        if (err) {
          resolve(false);
        }

        if (!err && decoded) {
          resolve(true);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

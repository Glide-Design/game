const FBTestUsers = require('fb-test-users');
const nodeCleanup = require('node-cleanup');
const { first, last } = require('lodash');
const axios = require('axios');
const fbTestUsers = new FBTestUsers({
  appID: '201801764081327',
  secret: 'ca6f66e42856a8f600055ff95f07f710',
});
const Helper = codecept_helper; //eslint-disable-line

async function createTestUser({ installed = true }) {
  return new Promise((resolve, reject) => {
    fbTestUsers.create({ permissions: 'public_profile,email', installed }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

async function updateTestUser(id, firstName, lastName, password) {
  return new Promise((resolve, reject) => {
    fbTestUsers.update(id, { name: `${firstName} ${lastName}`, password }, (error, success) => {
      if (error) {
        reject(error);
      } else {
        resolve(success);
      }
    });
  });
}

async function deleteTestUser({ id }) {
  return new Promise((resolve, reject) => {
    fbTestUsers.delete(id, function(error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

async function getTestUser({ id }) {
  return new Promise((resolve, reject) => {
    fbTestUsers.getAccessToken((error, accessToken) => {
      axios
        .get(`https://graph.facebook.com/${id}?access_token=${accessToken}&scope=email`)
        .then(response => {
          resolve(response.data);
        })
        .catch(reject);
    });
  });
}

class FacebookUserHelper extends Helper {
  constructor() {
    super();
    this.fbTestUsers = [];

    // remove test user if we end up erroring or ctrl+c etc.
    nodeCleanup((exitCode, signal) => {
      this._cleanup().then(() => {
        process.kill(process.pid, signal);
      });
      nodeCleanup.uninstall();
      return false;
    });
  }

  async createFacebookTestUser(opts) {
    const user = await createTestUser(opts);
    this.fbTestUsers.push(user);
    const { id, email, password } = user;
    const { name } = await this.retrieveFacebookTestUser(user);
    return { id, name, email, password };
  }

  async retrieveFacebookTestUser(user) {
    return await getTestUser(user);
  }

  async updateFacebookTestUser({ id }, firstName, lastName, password) {
    return await updateTestUser(id, firstName, lastName, password);
  }

  async deleteFacebookTestUser(user) {
    return await deleteTestUser(user);
  }

  async _cleanup() {
    if (this.fbTestUsers.length) {
      await Promise.all(this.fbTestUsers.map(user => deleteTestUser(user)));
      this.fbTestUsers = [];
    }
  }
}

module.exports = FacebookUserHelper;

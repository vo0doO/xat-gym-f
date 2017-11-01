var axios = require('axios');

import router from '../router';

function checkSignInStatus() {
  return new Promise(done => {
    var token = window.localStorage.getItem('token');

    if (token == 'null') {
      return done(false);
    } else {
      axios.post('/checksigninstatus', {
          Token: token
        })
        .then(result => {
          if (result.data.Status == false) {
            alert('Error1 beforeEach: ' + result.data.Body.Message);

            window.localStorage.setItem('token', 'null');

            return done(false);
          } else {
            return done(true);
          }
        })
        .catch(err => {
          alert('Error2 beforeEach: ' + err);

          return done(false);
        });
    }
  })
}

const beforeEach = async(to, from, next) => {
  var login = await checkSignInStatus();

  if (to.path !== '/login' && login == false) {
    next('/login');
  } else {
    if (to.path == '/login' && login == true) {
        next('/');
    } else {
        next();
    }
  }
}

export default beforeEach
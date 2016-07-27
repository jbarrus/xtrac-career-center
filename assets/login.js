$(document).ready(function() {
  var lock = new Auth0Lock(
    // All these properties are set in auth0-variables.js
    AUTH0_CLIENT_ID,
    AUTH0_DOMAIN
  );

  var hash = lock.parseHash(window.location.hash);

  if (hash) {
    if (hash.error) {
      console.log("There was an error logging in", hash.error);
    } else {
      var id_token = hash.id_token;

      console.log('got token', id_token);
      //save the token in the session:
      localStorage.setItem('xcc.id_token', id_token);

      retrieveProfile(id_token);
    }
  } else {
    $('.wrapper').show();
    lock.show({
      authParams: {scope: 'openid'},
      container: 'login-content'
    });
  }

  function retrieveProfile(id_token) {
    //retrieve the profile:
    if (id_token) {
      lock.getProfile(id_token, function (err, profile) {
        if (err) {
          return console.log('There was an error geting the profile: ' + err.message);
        }
        localStorage.setItem('xcc.profile', JSON.stringify(profile));

        console.log('profile', profile);

        window.location.href = window.location.href.replace(/login\.html.*/, 'profile.html');
      });
    }
  }
});

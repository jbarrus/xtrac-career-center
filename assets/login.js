$(document).ready(function() {
  var lockOptions = {
    auth: {
      responseType: 'token',
      redirectUrl: window.location.href.replace(/[\w-]+\.html/, 'login-result.html'),
      params: {
        scope: 'openid'
      }
    },
    container: 'login-content',
    languageDictionary: {
      title: "Github Login"
    },
  };

  console.log('lock options', lockOptions);

  var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, lockOptions);

  $('.wrapper').show();

  lock.show();
});

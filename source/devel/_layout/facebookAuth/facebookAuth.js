window.fbAsyncInit = function() {
  FB.init({
    appId      : '2722005527823279',
    cookie     : true,
    xfbml      : true,
    version    : 'v4.0'
  });
};

function fbSignIn() {
  FB.login(function(response) {
    if (response.authResponse) {
      console.log('Welcome!  Fetching your information.... ',response);
      FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
      });
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  });
}

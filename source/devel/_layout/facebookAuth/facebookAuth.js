$(function () {
  FB.init({
    appId      : '2722005527823279',
    cookie     : true,
    xfbml      : true,
    version    : 'v4.0'
  });
  });

function fbSignIn() {
  FB.login(function(response) {
    if (response.authResponse) {
      console.log('Welcome!  Fetching your information.... ',response);
      FB.api('/me', function(response) {
        console.log('Good to see you, ' , response , '.');
var name = response.name;
var desc = response.id;
        FB.api(
          '/'+response.id+'/picture',
          'GET',
          {"redirect":"false"},
          function(response) {
            var avatar = response.data.url;
            userInfo(avatar,name,desc);

          }
        );


      });
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  });
  console.log(true);
}

function fbSignOut() {
  FB.logout(function(response) {
    // user is now logged out
    console.log(response);
    clearUserInfo();
  });
}


function fb__() {
  console.log(true);
  FB.getLoginStatus(function (resp) {
    console.log(resp);
  });
}




function userInfo(userAavatar,userName,userDesc) {
  var name = '<h2>'+(userName || "userName")+'</h2>';
  var avatar = '<img src="'+(userAavatar || "#")+'" alt="'+(userName || "userName")+'">';
  var desc = '<p>'+(userDesc || "userDesc")+'</p>';

  $('.userInfo').html($(avatar + name + desc));
}

function clearUserInfo() {
  $('.userInfo').html('<h1>Молви, друг, и войди!</h1>');
}

gapi.load('auth2', function() {
  window.googleAuth = auth2 = gapi.auth2.init({
    client_id: '30989400492-62vbas87b820qdfjl9idukhone5tjblh.apps.googleusercontent.com'
  });
});

function googleSingIn() {
  googleAuth.signIn().then(function () {
    window.googleUser = googleAuth.currentUser.get();
    console.log('User signed in');
    googleViewInfo();
  });
}

function googleSignOut() {
  googleAuth.signOut().then(function () {
    console.log(googleUser.isSignedIn(), 'User signed out.');
    googleViewInfo();
  });

}

function googleViewInfo() {
  if (googleAuth.isSignedIn.get() && googleUser.isSignedIn()){
    var name = googleUser.getBasicProfile().getName();
    var img = googleUser.getBasicProfile().getImageUrl();
    var email = googleUser.getBasicProfile().getEmail();

    userInfo(img,name,email);
  } else {
    clearUserInfo()
  }
}

function google__() {
  console.log(true);
}

$(function () {
  VK.init({apiId: 7122028});
});

function vkSignIn() {
  window.vkUsers = {};
  VK.Auth.login(function (response) {
    // console.log(response);


    VK.Api.call('users.get', {user_ids: response.session.mid,fields: "photo_max_orig,last_seen", v:"5.73"}, function(r) {
      if(r.response) {
        vkUsers.avatar = r.response[0].photo_max_orig;
        vkUsers.name = r.response[0].first_name + '' + r.response[0].last_name;
        vkUsers.desc = r.response[0].last_seen.time;
        vkViewInfo(response.status)
      }
    });


  });
}

function vkSignOut() {
  VK.Auth.logout(function (response) {
    // console.log(response);
    vkViewInfo(response.status);
  })
}


function vkViewInfo(status) {
  if (status !== 'connected') {
    clearUserInfo();
  } else {
    userInfo(vkUsers.avatar,vkUsers.name,vkUsers.desc);
  }
}

function vk__() {
  console.log(true);
}

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

function ghSingIn() {
  OAuth.initialize('ATBfZdbaUFfsJY_TDk82H87HbLE');

  OAuth.popup('github').then(function(github) {
    window.githubtoken = github.access_token;
    github.get('/user').then(function(data) {
      console.log('self data:', github);
      var avatar = data.avatar_url;
      var name = data.name;
      var desc = data.id;

      userInfo(avatar,name,desc);

    })
  });
}
//authorizations/result.access_token
function ghSignOut() {
  OAuth.popup('github')
       .done(function(result) {
         result.patch('/authorizations/'+result.access_token)
               .done(function (response) {
                 console.log(true);
                 console.log(response,111111111);
               })
               .fail(function (err) {
                 //handle error with err
               });
       })
       .fail(function (err) {
         //handle error with err
       });
}


function gh__() {
  console.log(true);
}



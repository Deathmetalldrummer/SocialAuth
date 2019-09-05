


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

// window.fbAsyncInit = function() {
//   FB.init({
//     appId      : '2722005527823279',
//     cookie     : true,
//     xfbml      : true,
//     version    : 'v4.0'
//   });
// };
//
// function vkSingIn() {
//   window.FB.getLoginStatus(function(response) {
//     console.log(true);
//     statusChangeCallback(response);
//   });
// }



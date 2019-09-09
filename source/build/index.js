


function userInfo(userAavatar,userName,userDesc) {
  var name = '<h2>'+(userName || "userName")+'</h2>';
  var avatar = '<img src="'+(userAavatar || "#")+'" alt="'+(userName || "userName")+'">';
  var desc = '<p>'+(userDesc || "userDesc")+'</p>';

  $('.userInfo').html($(avatar + name + desc));
}

function clearUserInfo() {
  $('.userInfo').html('<h1>Молви, друг, и войди!</h1>');
}

gapi.load('auth2', function () {
  window.GoogleAuth = gapi.auth2.init({
    client_id: '30989400492-62vbas87b820qdfjl9idukhone5tjblh.apps.googleusercontent.com'
  });
  GoogleAuth.then(function (response) {
      if (response.currentUser.get()) {
        window.GoogleUser = response.currentUser.get();
        googleViewInfo();
        console.log('User Signed', GoogleUser);
      }
    })
    .catch(function (error) {
      console.log('Нет пользователей.');
    });
});

function googleSignIn() {
  console.log(GoogleAuth.isSignedIn.get());
  if (!GoogleAuth.isSignedIn.get()) {
  GoogleAuth.signIn()
              .then(function (r) {
                console.log('User signed in', r);
                window.GoogleUser = r;
                googleViewInfo();
              })
              .catch(function (error) {
                console.log('Не удалось авторизоваться!');
              });
  } else {
    console.log('Пользователь вошел в систему');
  }

}

function googleSignOut() {
  GoogleAuth.signOut()
            .then(function () {
              console.log(GoogleAuth.isSignedIn(), 'User signed out.');
              clearUserInfo();
            });
}

function googleViewInfo() {
  var name  = GoogleAuth.getBasicProfile()
                        .getName();
  var img   = GoogleAuth.getBasicProfile()
                        .getImageUrl();
  var email = GoogleAuth.getBasicProfile()
                        .getEmail();

  userInfo(img, name, email);
}

function google__() {
  if (GoogleAuth.isSignedIn()) {
    console.log('true');
  } else {
    console.log('false');
  }

  // if (googleUser) {
  //   alert("User - " + googleUser.isSignedIn());
  //   console.log("User - " + googleUser.isSignedIn());
  // }
}

//##include("./vkAuth/vkAuth.js");
//##include("./facebookAuth/facebookAuth.js");
//##include("./gitHubAuth/gitHubAuth.js");


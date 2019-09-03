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


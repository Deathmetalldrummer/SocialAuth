function ghSingIn() {
  OAuth.initialize('ATBfZdbaUFfsJY_TDk82H87HbLE');

  OAuth.popup('github').then(function(github) {
window.githubtoken = github.access_token
    github.get('/user').then(function(data) {
      console.log('self data:', github);
      var avatar = data.avatar_url;
      var name = data.name;
      var desc = data.id;

      userInfo(avatar,name,desc);

    })
  });
}

function ghSignOut() {
  OAuth.popup('github')
       .done(function(result) {
         result.del(githubtoken)
               .done(function (response) {
                 console.log(true);
                 console.log(response);
                 //this will display true if the user was authorized to delete
                 //the picture
                 console.log(response);
               })
               .fail(function (err) {
                 //handle error with err
               });
       })
       .fail(function (err) {
         //handle error with err
       });
}

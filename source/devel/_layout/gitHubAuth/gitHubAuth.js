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

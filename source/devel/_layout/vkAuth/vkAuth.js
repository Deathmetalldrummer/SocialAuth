$(function () {
  VK.init({apiId: 7122028});
});

function vkSignIn() {
  VK.Auth.login(function (response) {
    // console.log(response);


    // VK.Api.call('users.get', {user_ids: response.session.mid,fields: "photo_50", v:"5.73"}, function(r) {
    //   if(r.response) {
    //     alert('Привет, ' + r.response[0].photo_50);
    //   }
    // });

    vkViewInfo(response.status)
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

  } else {

  }
}

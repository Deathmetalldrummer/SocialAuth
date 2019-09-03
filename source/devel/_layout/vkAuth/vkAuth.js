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

$(function () {
  VK.init({apiId: 7122028});
});

function vkSignIn() {
  window.vkUsers = {};
  VK.Auth.login(function (response) {
      vkViewInfo(response)
  });

}

function vkSignOut() {
  VK.Auth.logout(function (response) {
    vkViewInfo(response);
  })
}

function vkViewInfo(response) {
  console.log(VK.Auth.getLoginStatus());
  if (VK.Auth.getLoginStatus()) {
    VK.Api.call('users.get',
      {user_ids: response.session.mid, fields: "photo_max_orig,last_seen", v: "5.73"},
      function (r) {
        if (r.response) {
          var img  = r.response[0].photo_max_orig;
          var name = r.response[0].first_name + '' + r.response[0].last_name;
          var desc = r.response[0].last_seen.time;

          userInfo(img, name, desc);
        }
      });
  } else {
    clearUserInfo()
  }
}

function vk__() {
  VK.Auth.getLoginStatus(function (r) {
    console.log(r);
  });
}

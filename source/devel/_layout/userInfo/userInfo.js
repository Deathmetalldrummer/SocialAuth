
function userInfo(userAavatar,userName,userDesc) {
  var name = '<h2>'+(userName || "userName")+'</h2>';
  var avatar = '<img src="'+(userAavatar || "#")+'" alt="'+(userName || "userName")+'">';
  var desc = '<p>'+(userDesc || "userDesc")+'</p>';

  $('.userInfo').html($(avatar + name + desc));
}

function clearUserInfo() {
  $('.userInfo').html('<h1>Молви, друг, и войди!</h1>');
}

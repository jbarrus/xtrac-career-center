$(document).ready(function() {
  console.log('loaded', localStorage.getItem('xcc.profile'));
  if (localStorage.getItem('xcc.profile')) {
    $('.form-modal-login').text('Logout').on('click', function() {
      localStorage.clear();
      window.location.reload();
    });
  }
});
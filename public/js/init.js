$(document).ready(function () {
  $('.modal').modal();
});

function toggleModal() {
  console.log('function called');
  var instance = M.Modal.getInstance($('#modalSignup'));
  instance.open();
}

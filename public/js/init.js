$(document).ready(function () {
  $('.modal').modal();
});

function toggleModal() {
  var instance = M.Modal.getInstance($('#modal1'));
  instance.ope();
}

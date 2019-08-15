//валидация
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

//отправка данных
$("#send").click(function (event) {
    $.ajax({
    type: 'POST',
    url: 'http://codeit.ai/codeitCandidates/serverFrontendTest/user/registration',
    dataType: "json",
    data: {
       name: $('#name').val(),
       secondname: $('#secondname').val(),
       email: $('#email').val(),
       gender: $('#gender').val(),
       pass: $('#password').val()
    },
    success: function(data) { //Данные отправлены успешно
      alert(JSON.stringify(data, null, 4));
      var message = JSON.stringify(data);
      if(message == '{"message":"User created","status":"OK"}'){
        window.location.href = "../html/main.html";
      }
    },
    error: function(response) { // Данные не отправлены
      alert("textStatus");
    }
  });
});

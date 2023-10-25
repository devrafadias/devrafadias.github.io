jQuery(document).ready(function($) {
  "use strict";

  //Contact
  $('form.contactForm').submit(function(e) {
    e.preventDefault()
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var arrFormB = $(this).serializeArray(); 
    let nome = arrFormB[0].value
    let email = arrFormB[1].value
    let assunto = arrFormB[2].value
    let mensagem = arrFormB[3].value
    let dataHora = new Date()
    let cookies = document.cookie;

    $('#btnMandar').hide();
    $('form input').prop('disabled', true)
    $('form textarea').prop('disabled', true)

    const db = firebase.firestore();

    db.collection("contatos").add({
        nome,
        email,
        assunto,
        mensagem,
        dataHora,
        cookies
    })
    .then(function(docRef) {
        console.log("Documento salvo com ID: ", docRef.id);
        $("#sendmessage").show();
        $("#errormessage").hide();
    })
    .catch(function(error) {
        console.error("Erro ao salvar documento: ", error);
        $("#errormessage").val(error).show();
        $("#sendmessage").hide();
    }).finally(e => {
      $('form input').prop('disabled', false)
      $('form textarea').prop('disabled', false)
      $('#btnMandar').show();
    });
    
    return false;
  });

});

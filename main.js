$('#login').click(function(){
    var fname = document.getElementById('firstname').value;
    var lname = document.getElementById('lastname').value;

    if(!fname && !lname){
        fname = "Human"
    }
    var loginGreet = G$(fname, lname);

    $('#logindiv').hide();

    loginGreet.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();

    $('#initialgreet').hide();
});
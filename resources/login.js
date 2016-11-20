$(function() {
    $('input').eq(2).click(function() {
    checkInputs();
    });

});

function checkInputs() {
	if(!($('input').eq(0).val()) || !($('input').eq(1).val()) ) {
		alert('Type username and password!');
	}
}

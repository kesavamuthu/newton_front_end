function mobCheck(input){
    const patt = /^[6-9]\d{9}$/;
    input.value = patt.test(input.value) ? input.value : "";
}

function nameCheck(input){
    const patt = /[a-zA-Z][^0-9]/;
    input.value = patt.test(input.value) ? input.value : "";
}
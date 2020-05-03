function tipCalculator(){
    if(requireDataDenoter('fee'))
    return false;
    var fee = parseInt(document.getElementById("fee").value);
    var percentage = parseInt(document.getElementById("percentage").value);
    alert(fee + (fee * percentage/100));
}

function requireDataDenoter(id){
    let x = document.getElementsByClassName('alert')[0];
    if(document.getElementById(id).value){
    x.style.display ='none';
    return false;
    }   
    else
    x.style.display = 'block';
    return true;
}
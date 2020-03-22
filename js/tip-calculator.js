function tipCalculator(){
    var fee = parseInt(document.getElementById("fee").value);
    var percentage = parseInt(document.getElementById("percentage").value);
    alert(total = Math.floor(fee + (fee * percentage/100)));
}
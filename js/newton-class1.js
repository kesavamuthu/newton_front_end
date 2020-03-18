function factorial(a){
    if(a <= 1)
        return 1;
    return a * factorial(a - 1);
}


function hipHipArray(a){
    var even = 0, odd = 1;
    a.forEach((element, index) => {
        if(index % 2 == 0)
        even += element;
        else
        odd *= element;
    });
    console.log(even +" " +  odd);
}


function leapYear(a){
    if(a % 4 == 0 || (a % 100 == 0 && a % 400 == 0))
    return 'leap year';
    return 'Not a leap year';
}
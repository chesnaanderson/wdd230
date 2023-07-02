const rangevalue = document.getElementById("rangevalue");
const range = document.getElementById("r");

// RANGE event listener
range.addEventListener('change', displayRatingValue);
range.addEventListener('input', displayRatingValue);

function displayRatingValue() {
    rangevalue.innerHTML = range.value;
}

var today = new Date();
var dd = (today.getDate()).toString();
var mm = (today.getMonth()+1).toString(); 
var yy = (today.getFullYear()-2000).toString();
if(dd<10) 
{
    dd='0'+dd;
} 
if(mm<10) 
{
    mm='0'+mm;
} 
today = yy+mm+dd;


document.getElementById('timeStamp').value= today ; 
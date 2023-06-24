var counterContainer = document.querySelector(".website-counter");
var result = document.querySelector("result");
var visitCount = localStorage.getItem("page_view");
// milliseconds to days constant = 1000 ms/s * 60 s/m * 60 m/h * 24 h/day
const msToDays = 84600000;
// today's date
const theDateToday = new Date();
const todayElement = document.querySelector("#today");
const today = Date.now();
// Check if page_view entry is present
// function getNumberOfDays(start, end) {
//     const date1 = new Date(start);
//     const date2 = new Date(end);

//     // One day in milliseconds
//     const oneDay = 1000 * 60 * 60 * 24;

//     // Calculating the time difference between two dates
//     const diffInTime = date2.getTime() - date1.getTime();

//     // Calculating the no. of days between two dates
//     const diffInDays = Math.round(diffInTime / oneDay);

//     return diffInDays;
// }

// console.log(getNumberOfDays("page_view", "today"));
//   function lastVisited(){
//     let text = document.lastModified;
//     document.getElementById("lastVisited").innerHTML = text;
//   }
  
// lastVisited();
if (visitCount, today) {
  visitCount != Number(today) + 1;
  localStorage.setItem("page_view", "Welcome! Let us know if you have any questions.");
} 
if(visitCount, today) {
  visitCount > Number(today);
  localStorage.setItem("page_view", "you last visited", "lastVisited");
}
if(visitCount, today) {
    visitCount == Number(today) * 2;
    localStorage.setItem("page_view", "Back so soon? Awesome!");
  }
else{
    visitCount = 1;
    localStorage.setItem("page_view", "what's up?");
}
counterContainer.innerHTML = visitCount;





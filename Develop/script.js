// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  $(".saveBtn").click(function(){
    localStorage.setItem($(this).parent().closest('.hourCont').attr('id'),$(this).closest(".textCont").text());
    console.log($(this).parent().closest('.hourCont').attr('id'));
    console.log($(this).parent().children(".textCont").text());
  })
  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay").text("Today is " + dayjs().format("dddd") + ", " + dayjs().format("MMMM") + " " + dayjs().date() + ", " + dayjs().year())
});

function createHours() {
  let i;
  var $hourCreate = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
  var $hourCont = $("<div>").addClass("row time-block past hourCont"); 
  var $hourDiv = $("<div></div>").addClass("col-2 col-md-1 hour text-center py-3 hourDiv");
  var $textCont = $("<textarea></textarea>").addClass("col-8 col-md-10 description textCont").attr("rows", 3);
  var $btnCont = $("<button>").addClass("btn saveBtn col-2 col-md-1 btnCont").attr("aria-Label", "save");
  var $iCont = $("<i></i></button></div>").addClass("fas fa-save iCont").attr("aria-hidden", "true");
  for (i=0; i<$hourCreate.length; i++) {
    $(".hour-slots").append($hourCont.clone());
  }
  $(".hourCont").append($hourDiv);
  for (i=0; i<$hourCreate.length; i++) {
    $(".hourCont").children().eq(i).attr("id", $hourCreate[i]);
    $("#" + $hourCreate[i]).text($hourCreate[i]);  
  }
  $(".hourCont").append($textCont);
  $(".hourCont").append($btnCont);
  $(".btnCont").append($iCont);
}

createHours();

//Add an ID to each hour linked to dayjs conventions
//Call ID based on dayjs current hour, set class based on less than, equal to, or greater than ID
//Add event listener for specific save buttons
$(".saveBtn").click(function(){
  localStorage.setItem($(this).closest('.hourCont').attr('id'),$(this).closest(".textCont").text())
})
//Link save button to local storage
//Store a variable for date locally and if != on refresh, auto clear and date change?

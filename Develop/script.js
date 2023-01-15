// Wraps all code to prevent loading prior to HTML DOM element creation 
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // var e = $(".saveBtn").event("click");
  //   console.log(e);
  

  $(".saveBtn").click(function(){
    localStorage.setItem($(this).parent().children(".hourDiv").attr("id"),$(this).parent().children(".textCont").val());
    console.log($(this).parent().children(".hourDiv").attr("id"));
    console.log($(this).parent().children(".textCont").val());

  })
  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay").text("Today is " + dayjs().format("dddd") + ", " + dayjs().format("MMMM") + " " + dayjs().date() + " of " + dayjs().year())
});

//function to create all HTML elements, 
//assign them classes & ids, 
//and set time relative to dayjs API
function createHours() {
  let i;
//can add hours to the following array and they will load
//need to adjust loops further down if adding anything before 9AM
//anything added post 5PM will work as is
  var $hourCreate = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
  var $hourCont = $("<div>").addClass("row time-block hourCont"); 
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
  //the following if/else statements set current hour class
  //will work if any times are added to the end of $hourCreate array
  //will need to change the "9" below to "8" if starting at 8am, "7" if 7am, etc.
  if ($hourCreate[dayjs().hour() - 9] < 0) {
    $hourCont.addClass("future")
  } else if ($hourCreate[dayjs().hour() - 9] >= $hourCreate.length) {
    $hourCont.addClass("past")
  } else {
    $("#" + $hourCreate[dayjs().hour() - 9]).parent().addClass("present");
    for (i=dayjs().hour() - 9; i>=0; i--) {
      $("#" + $hourCreate[i-1]).parent().addClass("past")
    };
    for (i=dayjs().hour() - 9; i<=$hourCreate.length; i++) {
      $("#" + $hourCreate[i+1]).parent().addClass("future")
    };
  }
}

createHours();


//Add event listener for specific save buttons
// $(".saveBtn").click(function(){
//   localStorage.setItem($(this).closest('.hourCont').attr('id'),$(this).closest(".textCont").text())
// })
//Link save button to local storage
//Store a variable for date locally and if != on refresh, auto clear and date change?

//  Global variables
var $saveButton = $(".saveBtn");
var $currentDateDisplay = $("#currentDay");
var currentDate = dayjs().format("dddd MMMM DD, YYYY - h:mA");
var currentHour = dayjs().hour();
var $timeBlocks = $('.time-block')
var text

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.
$(function () {
  // setting the current date into the date display in the header using Day.js
  $currentDateDisplay.text(currentDate);

  // click listener for the save icons
  $saveButton.click(function() {
    // Finding the IDs of the button's parent elements
    var elementID = $(this).parent().attr("id")
    console.log(elementID)
    // Finding the text areas within the parent elements of the buttons and getting their text content
    var textValue = $(this).parent().children('.description').val();
    console.log(textValue)
    // saving the text content of the text areas to localStorage using the parent element IDs as keys
    localStorage.setItem(elementID, textValue)
  })

  $timeBlocks.each(function() {
    // select the blocks by their 'hour-#' ID
    var $hourBlock = $(this)
    // select the IDs of individual hour blocks
    var $hourBlockID = $hourBlock.attr('id')
    // extract just the hour number from the IDs and convert string to integer
    var $splitID = parseInt($hourBlock.attr('id').split('-')[1])
    // empty variable that will get assigned a class from the if statements
    var timeClass

    // compare current hour in dayjs against hour from element IDs
    if (currentHour === $splitID) {
      timeClass = "present"
    }
    else if (currentHour < $splitID) {
      timeClass = "future"
    }
    else {
      timeClass = "past"
    }
    // add the class to the block
    $hourBlock.addClass(timeClass)

    // Retrieving the saved text content from local storage using their keys, which match with the time block IDs
    text = localStorage.getItem($hourBlockID)
    // Setting the retrieved local storage text content into each text area as content upon page load
    $(this).find('.description').val(text)
  })
});
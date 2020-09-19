let time = document.getElementById('currentDay');
time.textContent = moment().format("MMMM Do YYYY");

let currentTime = moment().format("HH");

// Saving input values of user to local storage
let userInput = ["", "", "", "", "", "", "", "", ""];

let storeInput = localStorage.getItem("myScheduler");
if (storeInput != null) {
    userInput = storeInput.split(",");
}


// Creating for loop to generate time blocks
for (let i = 0; i < 9; i++) {

    let timeHour = i + 9;
    let formatTime;
    let currentHour;

    // Formatting the hour of day and adding "meridian values (AM-PM)"
    if (timeHour === 12) {
        formatTime = timeHour + "PM";
    }
    else if (timeHour > 12) {
        formatTime = timeHour - 12 + "PM";
    }
    else {
        formatTime = timeHour + "AM";
    }

    // Determine instance of timeblocks to display past, present or future class using if/ else if/ else
    if (timeHour < currentTime) {
        currentHour = "past";
        
    }
    else if (timeHour == currentTime) {
        currentHour = "present";
        
    }
    else {
        currentHour = "future";
        

    }


    // Creating new rows containing columns for the hour, timeblock and save button
    let newRow = $("<div class = 'row'>");
    let columnOne = $("<div class = 'hour col-sm-2'>");
    let columnTwo = $("<div class = 'timeblock col-sm-8'>");
    let columnThree = $("<div class = 'col-sm-2'>");

    columnOne.text(formatTime);

    let storedInput = $("<textarea class = 'w-100 h-100' id = 'inputText'>")
    columnTwo.append(storedInput);
    storedInput.text(userInput[i]);
    storedInput.attr("class", currentHour);

    let saveButton = $("<button class = 'saveBtn icon w-100 h-100'>")
    columnThree.append(saveButton);

    let icon = $('<i class="far fa-save fa-2x"></i>');
    saveButton.append(icon);

    // appends the new rows to the page
    newRow.append(columnOne, columnTwo, columnThree);
    $(".container").append(newRow);

    // creating an id to store the text into an array
    newRow.attr('rowData', i);

}

// Save button click event. 
$('.saveBtn').on("click", function () {
    textInput = $(this).parent().siblings('.timeblock').children().val();
    newRowInput = $(this).parent().parent().attr('rowData');

    console.log(textInput);
    console.log(newRowInput);

    userInput[newRowInput] = textInput

    localStorage.setItem("myScheduler", userInput);
});
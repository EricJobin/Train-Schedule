// Train Schedule

//Global Variables

var trainName;
var destination;
var firstTrainTime;
var frequency;


$(document).ready(function() {

    $('#addTrainButton').on("click", function(e) {
        e.preventDefault();
        var input = $('input');
        console.log('submit clicked');
        console.log(input);

        trainName=inputTrainName.value;
        destination=inputDestination.value;
        firstTrainTime=inputFirstTrainTime.value;
        frequency=inputFrequency.value;


        input.val('');

        // Train Name	Destination	Frequency (min)	Next Arrival (calculated)	Minutes Away (calculated)
        
        var newRow = `
            <tr><td>${trainName}</td>
            <td>${destination}</td>
            <td>${frequency}</td>
            <td>7:00 PM</td>
            <td>35</td> 
            </tr>`
        
          // Append the new row to the table
          $("#trainRef").append(newRow);







    });

});

//#addTrainButton trainRef
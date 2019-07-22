// Train Schedule

//Firebase

// Your web app's Firebase configuration



var database = firebase.database();
var clickCounter = 0;

database.ref().on("value", function(snapshot) {
    // console.log(snapshot.val());
    clickCounter = snapshot.val().clickCount;
    $("#click-value").text(snapshot.val().clickCount);
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

//Global Variables

var trainName;
var destination;
var firstTrainTime;
var frequency;
var nextArrival;
var timeAway;


// var testTime = "04:45";
// var testfreq = 12;

//Calculate time to next train
function calcTrainTimes(ftt, frq){
    var tFrequency = frq;
    var firstTrainTimeConverted = moment(ftt, "HH:mm")
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    nextArrival = nextTrain.format("hh:mm a");
    timeAway = tMinutesTillTrain;
    console.log("next Train: "+nextArrival);
    console.log("Time Left: "+timeAway);


}

// calcTrainTimes(testTime, testfreq)

// Train Name	Destination	Frequency (min)	Next Arrival (calculated)	Minutes Away (calculated)
function appendTrain(){ // Function to append the new train to the table

    calcTrainTimes(firstTrainTime, frequency)

    var newRow = `
        <tr><td>${trainName}</td>
        <td>${destination}</td>
        <td class ="time">${frequency}</td>
        <td class ="time">${nextArrival}</td>
        <td class ="time">${timeAway}</td> 
        </tr>`

    $("#trainRef").append(newRow);
}


// var testvar;
$(document).ready(function() {

    $('#addTrainButton').on("click", function(e) {
        e.preventDefault();
        var input = $('input');

        trainName=inputTrainName.value;
        destination=inputDestination.value;
        firstTrainTime=inputFirstTrainTime.value;
        frequency=inputFrequency.value;

        var newTrainObj = {
            name: trainName,
            destination: destination,
            trainTime: firstTrainTime,
            freq: frequency,
        };
        database.ref().push(newTrainObj);

        // console.log("firstTrainTime: "+firstTrainTime) //4:05 PM = '16:05' string

        input.val(''); // Blanks out inputs
    });

    database.ref().on("child_added", function(childSnapshot) { //Appends trains in Database to screen
        // console.log(childSnapshot.val());
    
        // Store everything into a variable.
        trainName = childSnapshot.val().name;
        destination = childSnapshot.val().destination;
        firstTrainTime = childSnapshot.val().trainTime;
        frequency = childSnapshot.val().freq;
    
        // Create the new row
        if (trainName != undefined){
            appendTrain()
        };
    }),
    function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    };
    

});
// Train Schedule

//Firebase
var database = firebase.database();

//Global Variables

var trainName;
var destination;
var firstTrainTime;
var frequency;
var nextArrival;
var timeAway;
var i=0;
var dbTrainObj=[];

//Calculate time to next train
function calcTrainTimes(ftt, frq){
    var tFrequency = frq;
    var firstTrainTimeConverted = moment(ftt, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextArrival = nextTrain.format("hh:mm a");
    timeAway = tMinutesTillTrain;
}

function appendTrain(){ // Function to append the new train to the table

    calcTrainTimes(firstTrainTime, frequency)

    var newRow = `
        <tr><td>${trainName}</td>
        <td>${destination}</td>
        <td class ="time" id="frq${i}">${frequency}</td>
        <td class ="time" id="nxArr${i}">${nextArrival}</td>
        <td class ="time" id="timeAway${i}">${timeAway}</td> 
        </tr>`

    $("#trainRef").append(newRow);
}

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
        input.val(''); // Blanks out inputs
    });

    database.ref().on("child_added", function(childSnapshot) { //Appends trains in Database to screen

        trainName = childSnapshot.val().name;
        destination = childSnapshot.val().destination;
        firstTrainTime = childSnapshot.val().trainTime;
        frequency = childSnapshot.val().freq;

        
        dbTrainObj[i] = {
            index: i,
            name: trainName,
            destination: destination,
            trainTime: firstTrainTime,
            freq: frequency,
        };

        if (trainName != undefined){
            appendTrain()
            i++
        };
        
    }),
    function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    };
});

//Function to updated trains
function updateTrains(){
    for (var x=0; x<dbTrainObj.length; x++){
        var a=dbTrainObj[x].trainTime;
        var b=dbTrainObj[x].freq;
        calcTrainTimes(a, b)
        $(`#nxArr${x}`).text(nextArrival);
        $(`#timeAway${x}`).text(timeAway);
    }
    nextArrival
}
setInterval(updateTrains, 6000); //Running update every 6 seconds
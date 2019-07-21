// Train Schedule

//Firebase

// Your web app's Firebase configuration



var database = firebase.database();
var clickCounter = 0;

database.ref().on("value", function(snapshot) {
    console.log(snapshot.val());
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

// var testTime = "04:45";
// var testfreq = 12;

//Calculate time to next train
function calcTrainTimes(ftt, frq){
    // var now = moment();
    // console.log("current time: "+now.format('LT'));
    // var b= moment(now).add(55, 'm');
    // console.log("current time + 55min: "+b.format('LT'));

    // console.log("first train: "+ftt);
    // console.log("frq: "+frq);
    // var now = moment();

    // if (now >= ftt){
    //     console.log("overdue")
    // }
    // else if (now == ftt){console.log("Due");}
    // else if(now <= ftt){console.log("early"); }
    // else{console.log("something fucky");}





    // var nextTrain;

    //console.log();

}

// calcTrainTimes(testTime, testfreq)

// Train Name	Destination	Frequency (min)	Next Arrival (calculated)	Minutes Away (calculated)
function appendTrain(){ // Function to append the new train to the table

    var newRow = `
        <tr><td>${trainName}</td>
        <td>${destination}</td>
        <td>${frequency}</td>
        <td>7:00 PM</td>
        <td>35</td> 
        </tr>`

        $("#trainRef").append(newRow);
        // $("#newTrains").append(newRow);
}


// var testvar;
//
$(document).ready(function() {

    $('#addTrainButton').on("click", function(e) {
        e.preventDefault();
        var input = $('input');
        // console.log('submit clicked');
        // console.log(input);

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

        appendTrain()

        // testvar=firstTrainTime;

        // clickCounter++           // Testing to see if connected to firebase properly
        // database.ref().set({
        //     clickCount: clickCounter
        // });

        // database.ref().push({
        //     description: input[0].value,
        //     time: Date.now()
        // });
    });

    // database.ref().on("value", function(snapshot) {
    //     var data = snapshot.val();
    //     // $('<td>').empty();
    //     console.log(data);

    //     var now = moment();
    //     var dbKeys = [];

    //     for (var prop in data) {
    //         dbKeys.push(prop);
    //     }

    //     for (var i = 0; i < dbKeys.length; i++) {
    //         console.log(data[dbKeys[i]]);

    //         // var date = moment(data[dbKeys[i]].time);

    //         console.log(moment(data.time).format());

    //         // var overdue = now.diff(date, 'minutes');

    //         // var newToDo = $('<div>')
    //         // newToDo.addClass('toDoItem');
    //         // var descDiv = $('<div>').text(data[dbKeys[i]].description);
    //         // newToDo.append(descDiv);
    //         // var overdueDiv = $('<div>').text(overdue + " minutes overdue");
    //         // newToDo.append(overdueDiv);

    //         // $('#trainRef').append(newToDo);



    //     }

    // }, function(errorObject) {
    //     console.log("Errors handled: " + errorObject.code);
    // });

    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
    
        // Store everything into a variable.
        trainName = childSnapshot.val().name;
        destination = childSnapshot.val().destination;
        firstTrainTime = childSnapshot.val().trainTime;
        frequency = childSnapshot.val().freq;
    
        // Employee Info
        console.log(trainName);
        console.log(destination);
        console.log(firstTrainTime);
        console.log(frequency);

    
        // Create the new row
        if (trainName != undefined){
            appendTrain()
        };
    });






});
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
}


// var testvar;
//
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

        console.log("firstTrainTime: "+firstTrainTime) //4:05 PM = '16:05' string

        input.val('');

        appendTrain()

        // testvar=firstTrainTime;


        clickCounter++
        database.ref().set({
            clickCount: clickCounter
          });

    });
});
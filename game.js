// copy and past firebase stuff
var config = {
    apiKey: "AIzaSyDDaHstj9wvcJxb6oS-NkEWRaNOQmihzvg",
    authDomain: "trainstuff-2b49e.firebaseapp.com",
    databaseURL: "https://trainstuff-2b49e.firebaseio.com",
    projectId: "trainstuff-2b49e",
    storageBucket: "",
    messagingSenderId: "165083585269"
  };
  firebase.initializeApp(config);


var database = firebase.database();


//all the variables 

var trainName = "";
var trainDestination = "";
var firstTrain = "";
var trainFrequency = 0;
var firstTrainConverted = 0;
var timeDifference = 0;
var remainder = 0;
var minutesAway = 0;
var nextTrain= "";

// arrival function 

function arrivalCalc() {

	firstTrainConverted = moment(firstTrain, "hh:mm");
	console.log(moment(firstTrainConverted).format('MMMM Do YYYY, h:mm:ss a'));
	


}

// what happens when the user clicks the submit button
$("#add-train").on("click", function (event) {
	// prevents the submit button from being added prematurely 
	event.preventDefault();
	// set the value of each input to the same variable 
	trainName = $("#train-input").val().trim();
	trainDestination = $("#destination-input").val().trim();
	firstTrain = $("#time-input").val().trim();
	trainFrequency = $("#frequency-input").val();
	// check the button is working normally
	console.log(trainName);
	console.log(trainDestination);
	console.log(firstTrain);
	console.log(trainFrequency);
	// run the function to run the calculation for the next train
	arrivalCalc();
	// push each of the variables into firebase for storage
	database.ref().push({
		name: trainName,
		destination: trainDestination,
		frequency: trainFrequency,
		first: firstTrain
		
	}); // end of firebase

});  //End of Submit 


//Initial Load  and on child added
database.ref().on("child_added", function(snap){

	firstTrain = snap.val().first;
	frequency = snap.val().frequency;
	arrivalCalc();

	$("#train-schedule").append("<tr><td>" + snap.val().name + 
		"</td><td>" + snap.val().destination +
		"</td><td>" + snap.val().frequency + 
		"</td><td>" + nextTrain +
		"</td><td>" + minutesAway + "</td></tr>");

// Handle the errors
}, function(errorObject){
	console.log("Errors handled: " + errorObject.code);
}); // end of on child added


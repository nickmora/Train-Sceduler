// Initialize Firebase
var config = {
  apiKey: "AIzaSyDeA0jWInRefJaB67YdLyKBJMvwKP3QLvY",
  authDomain: "tigglebiddies-274f8.firebaseapp.com",
  databaseURL: "https://tigglebiddies-274f8.firebaseio.com",
  projectId: "tigglebiddies-274f8",
  storageBucket: "tigglebiddies-274f8.appspot.com",
  messagingSenderId: "818348716667"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train").on("click", function(event){
    event.preventDefault();

    var trainName = $("#train-input").val().trim();
    var dest = $("#destination-input").val().trim();
    var trainOne = $("#first-train-input").val().trim();
    var freq = parseInt($("#train-frequency").val().trim());

    console.log(trainName);
    console.log(dest);
    console.log(trainOne);
    console.log(freq);

    var newTrain = {
        name: trainName,
        destination: dest,
        firstTrain: trainOne,
        frequency: freq,
    }

    database.ref().push(newTrain);

    $("#train-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#train-frequency").val("");

});

database.ref().on("child_added", function(donDraper) {
    var trainName = donDraper.val().name;
    var dest = donDraper.val().destination;
    var trainOne = donDraper.val().firstTrain;
    var freq = donDraper.val().frequency;

    var whatTimeIsItRightNow= moment().format("HH:mm");
    console.log(whatTimeIsItRightNow);


    var calcHr= parseInt(moment().format("HH"))*60 + parseInt(moment().format("mm"));


    var minAway = calcHr%parseInt(freq);
    console.log(calcHr);
    console.log(minAway);
    var next = moment().add(minAway, "minutes").format("HH:mm");
    
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(dest),
        $("<td>").text(freq),
        $("<td>").text(next),
        $("<td>").text(minAway),
    );
    $("#train-schedule > tbody").append(newRow);
})
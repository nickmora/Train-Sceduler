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

    var next;
    var minAway;
    var min;
    var goblin = trainOne.charAt(3)+trainOne.charAt(4);

    var calcCurrentA = moment().format("HH") * 60;
    var calcCurrentB = moment().format("mm");
    var calcCurrent = parseInt(calcCurrentA) + parseInt(calcCurrentB);
    var calcFirst = parseInt(moment().format(trainOne, "HH")) * 60 + parseInt(goblin);



    if(calcCurrent>calcFirst){
        var noodle = calcCurrent-calcFirst;
        min = noodle%parseInt(freq);
        minAway= parseInt(freq)-parseInt(min);
        next = moment().add(minAway, "minutes").format("h:mm a");
    }
    else {
        next = moment(trainOne, "HH:mm").format("h:mm a");
        minAway = calcFirst-calcCurrent;
    };


    
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(dest),
        $("<td>").text(freq),
        $("<td>").text(next),
        $("<td>").text(minAway),
    );
    $("#train-schedule > tbody").append(newRow);
})
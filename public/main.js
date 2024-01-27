const Status = {
    PROBLEM: 1,
    IDEATION: 2,
    PROTOTYPING: 3,
    PRESENTATION: 4,
    NONE: 5
};

let curProg = Status.PROBLEM;

let check1 = [false, false, false]
let check2 = [false, false, false]
let check3 = [false, false, false]
let check4 = [false, false, false]

document.getElementById('helpButton').addEventListener('click', function () {

    // const problem = document.getElementById('problem').value;
    // const track = document.getElementById('track').value;
    // const field = document.getElementById('field').value;

    const teamNumber = localStorage.getItem('teamNum');
    const progress = document.querySelector('input[name="progress"]:checked').getAttribute("value");
    const track = document.querySelector('input[name="track"]:checked').getAttribute("value");
    const hardware = getCheckedCheckboxes();
    const problem = document.getElementById('problemDescription').value;
    const field = document.querySelector('input[name="request"]:checked').getAttribute("value");;

    // // Create a message object with user inputs
    const message = { teamNumber, progress, track, hardware, problem, field };

    console.log(message);
    // Send the message as JSON to the WebSocket server
    ws.send(JSON.stringify(message));

    getCheckedCheckboxes()

    localStorage.setItem('check1', check1);
    localStorage.setItem('check2', check2);
    localStorage.setItem('check3', check3);
    localStorage.setItem('check4', check4);

});

// var checklistContainer = document.getElementById('progress-checklist');

function saveCheckBox(boxNum) {
    if (curProg == Status.PROBLEM) {
        check1[boxNum - 1] = !check1[boxNum - 1];
        if (check1.every(value => value === true)) {
            document.getElementById("img1").style.display = 'block';
        } else {
            document.getElementById("img1").style.display = 'none';
        }
        // document.getElementById(`box${boxNum}`).checked = true;
    } else if (curProg == Status.IDEATION) {
        check2[boxNum - 1] = !check2[boxNum - 1];
        if (check2.every(value => value === true)) {
            document.getElementById("img2").style.display = 'block';
        } else {
            document.getElementById("img2").style.display = 'none';
        }
    } else if (curProg == Status.PROTOTYPING) {
        check3[boxNum - 1] = !check3[boxNum - 1];
        if (check3.every(value => value === true)) {
            document.getElementById("img3").style.display = 'block';
        } else {
            document.getElementById("img3").style.display = 'none';
        }
    } else if (curProg == Status.PRESENTATION) {
        check4[boxNum - 1] = !check4[boxNum - 1];
        if (check4.every(value => value === true)) {
            document.getElementById("img4").style.display = 'block';
        } else {
            document.getElementById("img4").style.display = 'none';
        }
    }
}

function updateChecklistOptions(selectedOption) {

 // Add new checklist options based on the selected radio button
    if (selectedOption === 'Problem') {
        document.getElementById('prog-prob').style.display = 'block'
        document.getElementById('prog-idea').style.display = 'none'
        document.getElementById('prog-proto').style.display = 'none'
        document.getElementById('prog-presen').style.display = 'none'
        curProg = Status.PROBLEM;
    
    } else if (selectedOption === 'Ideation') {
        document.getElementById('prog-prob').style.display = 'none'
        document.getElementById('prog-idea').style.display = 'block'
        document.getElementById('prog-proto').style.display = 'none'
        document.getElementById('prog-presen').style.display = 'none'
        curProg = Status.IDEATION;
        
    } else if (selectedOption === 'Prototyping') {
        document.getElementById('prog-prob').style.display = 'none'
        document.getElementById('prog-idea').style.display = 'none'
        document.getElementById('prog-proto').style.display = 'block'
        document.getElementById('prog-presen').style.display = 'none'
        curProg = Status.PROTOTYPING;
        
    } else if (selectedOption === 'Presentation') {
        document.getElementById('prog-prob').style.display = 'none'
        document.getElementById('prog-idea').style.display = 'none'
        document.getElementById('prog-proto').style.display = 'none'
        document.getElementById('prog-presen').style.display = 'block'
        curProg = Status.PRESENTATION;
    }
}

let loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e)
    let teamNum = document.getElementById("teamNum");
    localStorage.setItem("teamNum", document.getElementById("teamNum").value)
    document.getElementById('loginDiv').style.display = 'none';
    document.getElementById('mainDiv').style.display = 'block';
    document.getElementById('teamNumTitle').innerHTML = `Team Number ${localStorage.getItem('teamNum')}`;
});

document.getElementById('signInAgain').addEventListener('click', function () {

    document.getElementById('loginDiv').style.display = 'block';
    document.getElementById('mainDiv').style.display = 'none';

});

function checkLogin() {
    // console.log(localStorage.getItem('teamNum'));
    if (localStorage.getItem('numLikes') == null) {
        localStorage.setItem("numLikes", 0);
    }

    document.getElementById('likes').innerHTML = 'likes: ' + localStorage.getItem('numLikes');
    if (localStorage.getItem('teamNum') == null){
        document.getElementById('loginDiv').style.display = 'block';
        document.getElementById('mainDiv').style.display = 'none';
    } else {
        document.getElementById('loginDiv').style.display = 'none';
        document.getElementById('mainDiv').style.display = 'block';
        document.getElementById('teamNumTitle').innerHTML = `Team Number ${localStorage.getItem('teamNum')}`;
    }
}

function getCheckedCheckboxes() {
    const checkboxes = document.getElementById('hardwareDiv').querySelectorAll('input[type="checkbox"]');
    const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
    const checkedValues = checkedCheckboxes.map(checkbox => checkbox.value);
    return checkedValues;
  }

// change to your ip address
const ws = new WebSocket('ws://10.29.183.155:8082');
const form = document.querySelector('form')

ws.onmessage = (e) => {
    const bufferData = e.data;
    // console.log(typeof bufferData);
    
    // console.log(JSON.parse(bufferData));

    // const dataArray = JSON.parse(bufferData).data;

    // // Convert numeric values to ASCII characters
    // const asciiString = String.fromCharCode(...dataArray);

    // // Parse the resulting string as JSON
    // const jsonData = JSON.parse(asciiString);
    // // console.log(jsonData.teamNumber);
    // // console.log("hi");

    // if (localStorage.getItem('teamNum') != null && localStorage.getItem('teamNum') == jsonData.teamNumber) {
    //    localStorage.setItem("numLikes", parseInt(localStorage.getItem("numLikes")) + 1);
    //    document.getElementById('likes').innerHTML = 'likes: ' + localStorage.getItem('numLikes');
    // }
};
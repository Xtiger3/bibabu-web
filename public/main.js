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

    const teamNumber = localStorage.getItem('teamNum');
    const progress = parseInt(document.querySelector('input[name="progress"]:checked').getAttribute("value"));
    const track = document.querySelector('input[name="track"]:checked').getAttribute("value");
    const hardware = parseInt(document.querySelector('input[name="hardware"]:checked').getAttribute("value"));
    const problem = document.getElementById('problemDescription').value;
    const field = document.querySelector('input[name="request"]:checked').getAttribute("value");;

    // // Create a message object with user inputs
    const message = { teamNumber, progress, track, hardware, problem, field };

    console.log(message);
    // Send the message as JSON to the WebSocket server
    ws.send(JSON.stringify(message));
    console.log(JSON.stringify(message));
});

function saveCheckBox(boxNum) {
    if (curProg == Status.PROBLEM) {
        check1[boxNum - 1] = !check1[boxNum - 1];
        if (check1.every(value => value === true)) {
            document.getElementById("img1").style.display = 'block';
        } else {
            document.getElementById("img1").style.display = 'none';
        }
        // document.getElementById(`box${boxNum}`).checked = true;
        localStorage.setItem('check1', check1);
    } else if (curProg == Status.IDEATION) {
        check2[boxNum - 1] = !check2[boxNum - 1];
        if (check2.every(value => value === true)) {
            document.getElementById("img2").style.display = 'block';
        } else {
            document.getElementById("img2").style.display = 'none';
        }
        localStorage.setItem('check2', check2);
    } else if (curProg == Status.PROTOTYPING) {
        check3[boxNum - 1] = !check3[boxNum - 1];
        if (check3.every(value => value === true)) {
            document.getElementById("img3").style.display = 'block';
        } else {
            document.getElementById("img3").style.display = 'none';
        }
        localStorage.setItem('check3', check3);
    } else if (curProg == Status.PRESENTATION) {
        check4[boxNum - 1] = !check4[boxNum - 1];
        if (check4.every(value => value === true)) {
            document.getElementById("img4").style.display = 'block';
        } else {
            document.getElementById("img4").style.display = 'none';
        }
        localStorage.setItem('check4', check4);
    }
}

function updateChecklistOptions(selectedOption) {

 // Add new checklist options based on the selected radio button
    if (selectedOption === 'Problem') {
        document.getElementById('op1').style.display = 'block'
        document.getElementById('op2').style.display = 'none'
        document.getElementById('op3').style.display = 'none'
        document.getElementById('op4').style.display = 'none'
        curProg = Status.PROBLEM;
    
    } else if (selectedOption === 'Ideation') {
        document.getElementById('op1').style.display = 'none'
        document.getElementById('op2').style.display = 'block'
        document.getElementById('op3').style.display = 'none'
        document.getElementById('op4').style.display = 'none'
        curProg = Status.IDEATION;
        
    } else if (selectedOption === 'Prototyping') {
        document.getElementById('op1').style.display = 'none'
        document.getElementById('op2').style.display = 'none'
        document.getElementById('op3').style.display = 'block'
        document.getElementById('op4').style.display = 'none'
        curProg = Status.PROTOTYPING;
        
    } else if (selectedOption === 'Presentation') {
        document.getElementById('op1').style.display = 'none'
        document.getElementById('op2').style.display = 'none'
        document.getElementById('op3').style.display = 'none'
        document.getElementById('op4').style.display = 'block'
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

function loadMain() {
    // load numLikes
    if (localStorage.getItem('numLikes') == null) {
        localStorage.setItem("numLikes", 0);
    }
    document.getElementById('likes').innerHTML = 'likes: ' + localStorage.getItem('numLikes');

    // load teamNum
    if (localStorage.getItem('teamNum') == null){
        document.getElementById('loginDiv').style.display = 'block';
        document.getElementById('mainDiv').style.display = 'none';
    } else {
        document.getElementById('loginDiv').style.display = 'none';
        document.getElementById('mainDiv').style.display = 'block';
        document.getElementById('teamNumTitle').innerHTML = `Team Number ${localStorage.getItem('teamNum')}`;
    }

    // load checklist
    if (localStorage.getItem('check1') != null) {
        check1 = localStorage.getItem('check1').split(',').map(value => value === 'true');;
        console.log(check1)
    }
    if (localStorage.getItem('check2') != null) {
        check2 = localStorage.getItem('check2').split(',').map(value => value === 'true');;
    }
    if (localStorage.getItem('check3') != null) {
        check3 = localStorage.getItem('check3').split(',').map(value => value === 'true');;
    }
    if (localStorage.getItem('check4') != null) {
        check4 = localStorage.getItem('check4').split(',').map(value => value === 'true');;
    }

    if (check1.every(value => value === true)) {
        document.getElementById("img1").style.display = 'block';
    } 
    if (check2.every(value => value === true)) {
        document.getElementById("img2").style.display = 'block';
    }
    if (check3.every(value => value === true)) {
        document.getElementById("img3").style.display = 'block';
    } 
    if (check4.every(value => value === true)) {
        document.getElementById("img4").style.display = 'block';
    }

    updateCheckboxes(check1, 'op1');
    updateCheckboxes(check2, 'op2');
    updateCheckboxes(check3, 'op3');
    updateCheckboxes(check4, 'op4');
}

function updateCheckboxes(array, group) {
    console.log("checking group: " + group);
    const checkboxes = document.getElementById(group).querySelectorAll(`input[type="checkbox"]`);
    // const checkboxes = document.querySelectorAll(`.${group} input[type="checkbox"]`);
    console.log(array);
    checkboxes.forEach((checkbox, index) => {
        console.log(array[index], index);
        checkbox.checked = (array[index]);
    });
}

// function getCheckedCheckboxes() {
//     const checkboxes = document.getElementById('hardwareDiv').querySelectorAll('input[type="checkbox"]');
//     const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
//     const checkedValues = checkedCheckboxes.map(checkbox => checkbox.value);
//     return checkedValues;
//   }

// change to your ip address
const ws = new WebSocket('ws://10.29.183.155:8082');
const form = document.querySelector('form')

ws.onmessage = (e) => {
    const blobData = e.data;
    const reader = new FileReader();
    reader.onload = function() {
        const textData = reader.result;
        const jsonData = JSON.parse(textData);
        if (jsonData['likedTeamNum'] != undefined) {
            if (localStorage.getItem('teamNum') != null && localStorage.getItem('teamNum') == jsonData['likedTeamNum']) {
                localStorage.setItem("numLikes", parseInt(localStorage.getItem("numLikes")) + 1);
                document.getElementById('likes').innerHTML = 'likes: ' + localStorage.getItem('numLikes');
            }
        }
    };
    reader.readAsText(blobData);
};
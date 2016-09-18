/**
* AUTHOR: EH
* VERSION: 1.0
* CREATED: 3.12.2015
* ASSIGNMENT: Ski Patrol Sign-In
 **/

"use strict";

/** @type {number} */
var teamNum = 1;
var patrollerNum = 1;

function getDate() {
    /** @type {Date} */
    var date = new Date(),
        month = date.getMonth()  +  1,
        day = date.getDate(),
        year = date.getFullYear(),
        weekDay = date.getDay(),
        fullDate = '<h3>'  +  month  +  '/'  +  day  +  '/'  +  year  +  '</h3>';
        document.getElementById("weekDay").innerHTML = getWeekDay(weekDay);
    return fullDate;
}

function getWeekDay(weekDay) {
    /** @type {Array.<string>} */
    var days = ["Sunday" , "Monday", "Tuesday" , "Wednesday", "Thursday" , "Friday" , "Saturday"]
    return '<h3>'  +  days[weekDay]  +  '</h3>';
}

function addPatrollers() {
    var addPatroller = document.getElementById("patroller" + teamNum  +  "."  +  patrollerNum);
    addPatroller.addEventListener('change', addRow);
    incrementCounters();
}

function addRow() {
    var newRow =
        '        <div class="small-2 medium-1 columns">'  +
        '        <label>-</label>'  +
        '        </div>'  +
        '        <div class="small-3 medium-2 columns">'  +
        '        <input type="number" required id="radioNum' + teamNum + "." + patrollerNum + '" min="1" max="20" placeholder="1-20">'  +
        '        </div>'  +
        '        <div class="small-7 medium-3 columns">'  +
        '        <input type="text" id="patroller' + teamNum + "." + patrollerNum + '" required maxlength="50" placeholder="Name">'  +
        '        </div>'  +
        '        <div class="small-3 medium-2 column">'  +
        '        <input type="time" required id="dateTime' + teamNum + "." + patrollerNum + '">'  +
        '        </div>'  +
        '        <div class="small-3 medium-2 column">'  +
        '        <select id="cert' + teamNum + "." + patrollerNum + '">'  +
        '        <option value="BAS">BAS</option>'  +
        '        <option value="CER">CER</option>'  +
        '        <option value="SEN">SEN</option>'  +
        '        </select>'  +
        '        </div>'  +
        '        <div class="small-6 medium-2 columns end">'  +
        '        <input type="text" required id="guestName' + teamNum + "." + patrollerNum + '" maxlength="20" placeholder="Name">'  +
        '        </div>';
    var addedRow = document.getElementById("newRow" + teamNum + "." + patrollerNum);
    addedRow.innerHTML = newRow;
}

function incrementCounters() {
    if (patrollerNum < 4) {
        patrollerNum++;
    } else if (patrollerNum == 4) {
        teamNum++;
        patrollerNum = 1;
    }
    alert(patrollerNum);
    alert(teamNum);
}

window.setInterval(function() {
    addPatrollers();
}, 1000);

window.onload = function() {
        document.getElementById("date").innerHTML = getDate();
        document.getElementById("newRow"  +  teamNum  +  "." + patrollerNum).innerHTML = addPatrollers();
};

/**
 *AUTHOR: EH (ethanhammond12099@gmail.com)
 *VERSION: 1.0
 *CREATED: 4.28.2015
 *ASSIGNMENT: PPS Staff Directory
 */

"use strict";

/** @type {Array}.<PersonClass> */
var staff = [];

function populateStaff() {
    alert("populateStaffSuccess");
    /** @type {Array.<string>} */
    var lines = [],
        person = [];
    $.ajax({
        url: 'data/staff2.csv',
        contentType: "text/csv",
        async: false,
        success: function(text) {
            lines = text.split(/\n/);
        }
    });
    for (var i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace(/(\r\n|\n|\r)/gm,"");
        person[i] = lines[i].split(",");
        staff[i] = new StaffMemClass(person[i][0], person[i][1], person[i][2], person[i][3], person[i][4], person[i][5], person[i][6], person[i][7]);
    }
    return staff;
}

window.onload = function() {
    populateStaff();
}
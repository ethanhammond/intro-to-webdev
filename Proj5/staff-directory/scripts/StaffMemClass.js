/**
 * AUTHOR: EH (ethanhammond12099@gmail.com)
 * VERSION: 1.0
 * CREATED: 4.21.2015
 * ASSIGNMENT: Staff Directory
 */

"use strict";

function StaffMemClass(building, lastName, firstName, job, subject, grade, phone, email) {
    this.building = building;
    this.lastName = lastName;
    this.firstName = firstName;
    this.job = job;
    this.subject = subject;
    this.grade = grade;
    this.phone = phone;
    this.email = email;
}

StaffMemClass.prototype = {
    constructor: StaffMemClass,
    getBuilding: function() {
        return this.building;
    },
    getLastName: function() {
        return this.lastName;
    },
    getFirstName: function() {
        return this.firstName;
    },
    getJob: function() {
        return this.job;
    },
    getSubject: function() {
        return this.subject;
    },
    getGrade: function() {
        return this.grade;
    },
    getPhone: function() {
        return this.phone;
    },
    getEmail: function() {
        return this.email;
    }
};
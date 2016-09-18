/**
 *AUTHOR: EH
 *VERSION: 1.0
 *CREATED: 4.4.2015
 *ASSIGNMENT: atBatSPA
 * TODO: undoBtn
 */

"use strict";

/** @type {Array}.<string> */
var players = [],
    presentPlayers = [],
    fielders = [],
    batters = [];

/** @type {boolean} */
var weScore, topOfInning;

/** @type {number} */
var strikes, outs, fouls, balls, runs, ourScore, theirScore, inning, playerNum;

function setPlayersArray() {
    /** @type {Array.<string>} */
    var lines = [];
    $.ajax({
        url: 'data/players.csv',
        contentType: "text/csv",
        async: false,
        success: function(text) {
            lines = text.split(/\n/);
        }
    });
    for (var i = 0; i < lines.length; i++) {
        players[i] = lines[i].split(",");
    }
}

function prepScreen() {
    $("#battingOrder").hide();
    $("#inning").hide();
    $("#defenseOrder").hide();
    $("#scoreboard").hide();
    $("#counters").hide();
    $("#preGame").show();
}

function setAvailablePlayers() {
    for (var i = 0; i < players.length; i++) {
        var playerDiv = '<div class="small-9 column" id="player.' + i + '">' +
            '<h2>' + players[i][1] + " " + players[i][0] + '</h2>' +
            '</div>' +
            '<div id="checkbox.' + i + '" class="switch round large small-3 columns">' +
            '<input id="present.' + i + '" type="checkbox" />' +
            '<label for="present.' + i + '"></label>' +
            '</div>';
        $('#attendance').append(playerDiv);
    }
    setPresentPlayers();
}

function setPresentPlayers() {
    presentPlayers = players;
    playerNum = 0;
    $("#attendance").change(function(event) {
        /** @type {Array}.<string> */
        var playerID = event.target.id.split(".");
        if ($(event.target).is(':checked')) {
            presentPlayers[playerNum] = players[playerID[1]][1] + ' ' + players[playerID[1]][0];
            playerNum++;
        } else {
            delete presentPlayers[playerID[1][0]];
        }
    });
    populatePresentPlayers();
}

function populatePresentPlayers() {
    batters = presentPlayers;
    fielders = presentPlayers;
}

function weBat() {
    weScore = true;
    setBattingOrder();
    $("#battingOrder").show();
    $("#inning").show();
    $("#defenseOrder").hide();
    $("#scoreboard").show();
    $("#counters").show();
    $("#preGame").hide();
}

function setBattingOrder() {
    /** type {string} */
    var shiftedValue = batters.shift();
    batters.push(shiftedValue);
    displayBattingOrder();
}

function displayBattingOrder() {
    /** @type {string} */
    var currentBatter = '<h3>' + batters[0] + '</h3>',
        onDeck = '<h3>' + batters[1] + '</h3>' +
            '<h3>' + batters[2] + '</h3>' +
            '<h3>' + batters[3] + '</h3>';
    $('#currentBatter').html(currentBatter);
    $('#onDeck').html(onDeck);
}

function weField() {
    weScore = false;
    setDefenseOrder();
    $("#battingOrder").hide();
    $("#inning").show();
    $("#defenseOrder").show();
    $("#scoreboard").show();
    $("#counters").show();
    $("#preGame").hide();
}

function setDefenseOrder() {
    /** type {string} */
    var shiftedValue = fielders.shift();
    fielders.push(shiftedValue);
    displayDefenseOrder();
}

function displayDefenseOrder() {
    var positions = '<h3> C = ' + fielders[0] + '</h3>' +
        '<h3> P = ' + fielders[1] + '</h3>' +
        '<h3> 1B = ' + fielders[2] + '</h3>' +
        '<h3> 2B = ' + fielders[3] + '</h3>' +
        '<h3> 3B = ' + fielders[4] + '</h3>' +
        '<h3> SS = ' + fielders[5] + '</h3>' +
        '<h3> LF = ' + fielders[6] + '</h3>' +
        '<h3> CF = ' + fielders[7] + '</h3>' +
        '<h3> RF = ' + fielders[8] + '</h3>';
    $('#positions').html(positions);
}

function setScore() {
    if (ourScore === undefined && theirScore === undefined) {
        ourScore = 0;
        theirScore = 0;
        $("#ourScore").text(ourScore);
        $("#theirScore").text(theirScore);
    } else if (weScore === true) {
        ourScore++;
        $("#ourScore").text(ourScore);
    } else if (weScore === false) {
        theirScore++;
        $("#theirScore").text(theirScore);
    }
}

function setInning() {
    /** @type{string} */
    var up = "↑";
    var down = "↓";
    if (!inning) {
        inning = 1;
    }
    if (topOfInning === undefined) {
        topOfInning = true;
        $("#inningTop").text(up);
        $("#inningNum").text(inning);
    } else if (topOfInning === true) {
        topOfInning = false;
        $("#inningTop").text(down);
    } else if (topOfInning === false) {
        topOfInning = true;
        inning++;
        $("#inningTop").text(up);
        $("#inningNum").text(inning);
    }
}

function homeBtnClick() {
    $("#homeTeam").click(function() {
        weField();
        weScore = false;
    });
}

function awayBtnClick() {
    $("#visitorTeam").click(function() {
        weBat();
        weScore = true;
    });
}

function strikeBtnClick() {
    $("#strikeBtn").click(function() {
        setStrikes();
    });
}

function setStrikes() {
    /** @constant */
    var MAX_STRIKES = 2;

    if (!strikes) {
        strikes = 0;
        $("#strikeCounter").text(strikes);
    }

    if (strikes < MAX_STRIKES) {
        strikes++;
        $("#strikeCounter").text(strikes);
    } else if (strikes >= MAX_STRIKES) {
        weScore === false;
        setOuts();

        strikes = 0;
        $("#strikeCounter").text(strikes);

        balls = 0;
        $("#ballCounter").text(balls);

        fouls = 0;
        $("#foulCounter").text(fouls);

        if (weScore === true) {
            setBattingOrder();
        }
    }
}

function ballBtnClick() {
    $("#ballBtn").click(function() {
        setBalls();
    });
}

function setBalls() {
    /** @constant */
    var MAX_BALLS = 3;

    if (!balls) {
        balls = 0;
    }

    if (balls < MAX_BALLS) {
        balls++;
        $("#ballCounter").text(balls);

    } else if (balls >= MAX_BALLS) {
        balls = 0;
        $("#ballCounter").text(balls);

        fouls = 0;
        $("#foulCounter").text(fouls);

        strikes = 0;
        $("#strikeCounter").text(strikes);
    }
}

function foulBtnClick() {
    $("#foulBtn").click(function() {
        setFouls();
    });
}

function setFouls() {
    /** @constant */
    var MAX_STRIKES = 2;
    if (!fouls) {
        fouls = 0;
        $("#foulCounter").text(fouls);
    }
    if (!strikes) {
        strikes = 0;
        $("#strikeCounter").text(strikes);
    }
    if (strikes < MAX_STRIKES) {
        strikes++;
        fouls++;
        $("#strikeCounter").text(strikes);
        $("#foulCounter").text(fouls);
    } else {
        fouls++;
        $("#foulCounter").text(fouls);
    }
}

function outBtnClick() {
    $("#outBtn").click(function() {
        setOuts();
    });
}

function setOuts() {
    /** @constant */
    var MAX_OUTS = 2;
    if (!outs) {
        outs = 0;
    }
    if (outs < MAX_OUTS) {
        outs++;
        $("#outCounter").text(outs);
    } else if (outs >= MAX_OUTS && weScore === true) {
        outs = 0;
        $("#outCounter").text(outs);
        runs = 0;
        $("#runCounter").text(runs);
        strikes = 0;
        $("#strikeCounter").text(strikes);
        fouls = 0;
        $("#foulCounter").text(fouls);
        balls = 0;
        $("#ballCounter").text(balls);
        setInning();
        weField();
        } else if (outs >= MAX_OUTS && weScore === false) {
        outs = 0;
        $("#outCounter").text(outs);
        runs = 0;
        $("#runCounter").text(runs);
        strikes = 0;
        $("#strikeCounter").text(strikes);
        fouls = 0;
        $("#foulCounter").text(fouls);
        balls = 0;
        $("#ballCounter").text(balls);
        setInning();
        weBat();
        }
}

function runBtnClick() {
    $("#runBtn").click(function() {
        setRuns();
    });
}

function setRuns() {
    if (!runs) {
        runs = 0;
    }
    runs++;
    $("#runCounter").text(runs);
    setScore();
}

function baseBtnClick() {
    $("#baseBtn").click(function() {
        strikes = 0;
        $("#strikeCounter").text(strikes);
        fouls = 0;
        $("#foulCounter").text(fouls);
        balls = 0;
        $("#ballCounter").text(balls);
        if (weScore = true) {
            setBattingOrder();
        }
    });
}

function undoBtnClick() {
    $("#undoBtn").click(function() {

    });
}

window.onload = function() {
    setPlayersArray(); //reads csv
    setAvailablePlayers(); //creates checkbox
    prepScreen(); //displays checkbox
    setScore();
    setInning();
    homeBtnClick();
    awayBtnClick();
    strikeBtnClick();
    ballBtnClick();
    foulBtnClick();
    outBtnClick();
    runBtnClick();
    baseBtnClick();
    undoBtnClick();
};
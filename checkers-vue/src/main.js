import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import RouterComp from '@/Router.vue'
import router from './router'
import $ from 'jquery'
import iziToast from 'izitoast'
import confetti from 'canvas-confetti'
import './registerServiceWorker'

Vue.config.productionTip = false

var app = new Vue({
    router,
    vuetify,
    render: h => h(RouterComp),
}).$mount('#app')
console.log(app)

var socket

//show hover effect on gamefield
function hover() {
    $("td").off("hover");
    $('#gameTable td').hover(function () {
        // Coordinates of current cell
        //const col = $(this).index();
        //const row = $(this).closest('tr').index();

        $(this).addClass("highlight-hover");
    }, function () {
        // Coordinates of current cell
        //const col = $(this).index();
        //const row = $(this).closest('tr').index();

        $(this).removeClass("highlight-hover");
    });
}

//save user clicks from gamefield
let jumps = []

function clickableCells() {
    $("td").off("click");
    $('td').click(function () {
        const row_index = $(this).parent().index();
        const col_index = $(this).index();

        console.log("clickableCells: " + row_index + " " + col_index)

        let position = {
            x: col_index,
            y: row_index
        }

        if ($(this).hasClass("highlight-click")) {
            removeClickedCell(position, this)
            socket.send(createSocketData("EVENT_CLICKED_CELL_REMOVE", position))
        } else {
            addClickedCell(position, this)
            socket.send(createSocketData("EVENT_CLICKED_CELL_ADD", position))
        }
    });
}

function removeClickedCell(position, cell) {

    console.log("removeClickedCell ++++++++++")

    const positionArray = jumps.at(-1);
    if (position.x == positionArray.x && position.y == positionArray.y) {

        console.log("removeClickedCell")

        $(cell).removeClass("highlight-click");
        jumps.pop();
        let jumpString = "";
        jumps.forEach(jmp => {
            jumpString = jumpString + jmp.y + " " + jmp.x + " ";
        });
        $("#input-text-field-jumps").val(jumpString);
    }
}

function addClickedCell(position, cell) {

    console.log("addClickedCell")

    jumps.push(position);
    let jumpString = "";
    jumps.forEach(jmp => {
        jumpString = jumpString + jmp.y + " " + jmp.x + " ";
    });

    $("#input-text-field-jumps").val(jumpString);
    $(cell).addClass("highlight-click");
}

function clearSelectedCells() {
    jumps = []
    $("td").each(function () {
        if ($(this).hasClass("highlight-click")) {
            $(this).removeClass("highlight-click");
        }
    });
}

//show alert
$(document).ready(async function () {
    if (window.location.pathname === "/") {
        const text = $("#textMessage").text();
        showToast(text)

        hover()
        clickableCells()

        console.log(text)

        //SOCKET
        socket = new WebSocket("ws://localhost:9000/websocket");
        socket.onopen = function () {
            iziToast.info({
                title: 'Connection established!',
                message: ""
            });
        }
        socket.onmessage = function (message) {
            const data = JSON.parse(message.data)
            const action = data.action
            if (action && action.includes("EVENT_CLICKED_CELL_ADD")) {
                console.log("EVENT_CLICKED_CELL_ADD")
                const trs = $("tr");
                const tr = trs[data.data.y]
                const tds = $(tr).find("td")
                const td = tds[data.data.x]
                addClickedCell(data.data, td)
            } else if (action && action.includes("EVENT_CLICKED_CELL_REMOVE")) {
                console.log("EVENT_CLICKED_CELL_REMOVE")
                const trs = $("tr");
                const tr = trs[data.data.y]
                const tds = $(tr).find("td")
                const td = tds[data.data.x]
                removeClickedCell(data.data, td)
            } else if (action && action.includes("EVENT_RESET_SELECTION")) {
                console.log("RESET!!!!!")
                clearSelectedCells()
                iziToast.info({
                    title: 'Selection reset',
                    message: ""
                });
            } else {
                handleResponse(message.data)
            }

        }
        socket.onerror = function () {
            iziToast.error({
                title: 'Websocket connection error occured!',
                message: ""
            });
        }
        socket.onclose = function () {
            iziToast.info({
                title: 'Connection closed!',
                message: ""
            });
        }
        initialLoading();
    }
});

function initialLoading() {
    console.log("")
    $.ajax({
        url: 'http://localhost:9000/gameJson',
        type: 'get',
        success: function (data) {
            console.log(data)
            const jsonData = JSON.parse(data)
            jsonData.message = "Initially loaded"
            handleResponse(JSON.stringify(jsonData))
            console.log("LAODED")
        }
    });
}

function showToast(message) {
    if (message.includes("MOVE FROM") || message.includes("Created a new field")) {
        if (message.includes("MOVE FROM")) {
            message = "STONE MOVED"
        }
        iziToast.success({
            title: 'Success!',
            message: message
        });
    } else if (message.includes("Undo") || message.includes("Redo") || message.includes("SAVED") || message.includes("LOADED")) {
        iziToast.info({
            title: message,
            message: ""
        });
    } else if (message !== "" && message !== "Initially loaded") {
        iziToast.error({
            title: 'OOPS!',
            message: message
        });
    }
}

/////////////////////////////////
/////////Winning Screen//////////
/////////////////////////////////
function initiateWinningScreen() {
    let whiteHasStone = false;
    let blackHasStone = false;
    $("td").each(function () {
        if ($(this).children("img").length > 0) {
            const src = $($(this).children("img")[0]).attr('src')
            if (src.includes("white")) {
                whiteHasStone = true;
            } else if (src.includes("black")) {
                blackHasStone = true;
            }
        }
    });

    if (whiteHasStone && !blackHasStone) {
        showWinningScreen("White has won!")
    } else if (blackHasStone && !whiteHasStone) {
        showWinningScreen("Black has won!")
    }
}

function showWinningScreen(text) {
    iziToast.info({
        title: text,
        message: "Do you want to start a new game? Select game size:",
        position: "center",
        timeout: false,
        icon: '🎉',
        iconText: '🎉',
        close: false,
        drag: false,
        overlay: true,
        inputs: [
            ['<select><option value="8">8</option><option value="10">10</option><option value="12">12</option></select>', 'change', function (instance, toast, select) {
                $("#iziToastCreateNewGame").val(select.options[select.selectedIndex].value);
            }, true]
        ],
        buttons: [
            ['<button id="winner_screen_button"><b>Create</b></button>', function (instance, toast) {
                $("#iziFormNewGame").submit();
                instance.hide({transitionOut: 'fadeOut'}, toast, 'button');
            }, false], // true to focus
        ]
    });

    var duration = 10 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = {startVelocity: 30, spread: 360, ticks: 60, zIndex: 0};

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 100 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: {x: randomInRange(0.1, 0.3), y: Math.random() - 0.2}
        }));
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: {x: randomInRange(0.7, 0.9), y: Math.random() - 0.2}
        }));
    }, 250);
}

///////////////////////////////////
/////Game reset button actions/////
///////////////////////////////////
$('#button-reset-jumps').on("click", function () {
    $("td").each(function () {
        if ($(this).hasClass("highlight-click")) {
            $(this).removeClass("highlight-click");
        }
    });

    //reset vars
    jumps = [];
    $("#input-text-field-jumps").val("");

    socket.send(createSocketData("EVENT_RESET_SELECTION", ""))

    iziToast.info({
        title: 'Selection reset',
        message: ""
    });
});

//Remove focus after button click
document.addEventListener('click', function () {
    if (document.activeElement.toString() == '[object HTMLButtonElement]') {
        document.activeElement.blur();
    }
});

///////////////////////////////////
/////SOCKET/////
///////////////////////////////////
$('a').click(function (event) {
    const url = $(this).attr('href')

    if (url.includes('new') || url.includes('load') || url.includes('save') || url.includes('undo') || url.includes('redo')) {
        event.preventDefault();
        //const attr = $(this).attr('href');

        var matches = url.match("\\/([A-z]+)(\\?.+=([0-9 ]+))?")

        if (url.includes('new')) {
            socket.send(createSocketData(matches[1], matches[3]))
        } else {
            socket.send(createSocketData(matches[1], ""))
        }
    }
    //populate
});

function createSocketData(actionValue, dataValue) {
    let socketData = {
        action: actionValue,
        data: dataValue
    }
    return JSON.stringify(socketData)
}

$('form').on('submit', function (e) {
    const form = $(this);
    e.preventDefault();
    const action = form.attr('action')
    console.log(action)
    if (action === "/move") {
        let jumpString = "";
        jumps.forEach(jmp => {
            jumpString = jumpString + jmp.y + " " + jmp.x + " ";
        });

        const string = form.attr('action') + "?" + "jumps=" + jumpString;

        var matches = string.match("\\/([A-z]+).+=([0-9 ]+)")

        let socketData = {
            action: matches[1],
            data: matches[2]
        }
        socket.send(JSON.stringify(socketData))
    } else if (action === "/new") {
        socket.send(createSocketData("new", $("#iziToastCreateNewGame").val()))
    }

});

function handleResponse(data) {
    jumps = []

    const jsonData = JSON.parse(data)

    constructTable(jsonData)

    showToast(jsonData.message)

    resetAllToastsIfWinningScreen()

    initiateWinningScreen();

}

function resetAllToastsIfWinningScreen() {
    if (document.getElementById("winner_screen_button")) {
        const allToasts = document.getElementsByClassName('iziToast');
        for (let i = 0; i < document.getElementsByClassName('iziToast').length; i++) {
            const toast = allToasts[i];
            iziToast.hide({}, toast);
        }
    }
}

function constructTable(data) {
    $('#gameTable td > img').remove();
    $('td').removeClass("highlight-click")

    const rows = data.field.rows
    const flatRows = []

    rows.forEach(row => {
        console.log(row)
        row.forEach(cell => flatRows.push(cell))
    })

    buildTable(rows)

    const tableCells = $('td.tableCellSize')

    for (let i = 0; i < flatRows.length; i++) {
        const cellValue = flatRows[i]
        const cellJQuery = tableCells[i]
        if (cellValue === 1) {
            $(cellJQuery).append('<img class="stone" src="/images/white.jpg">');
        } else if (cellValue === 2) {
            $(cellJQuery).append('<img class="stone" src="/images/whiteKing.png">');
        } else if (cellValue === 3) {
            $(cellJQuery).append('<img class="stone" src="/images/black.jpg">');
        } else if (cellValue === 4) {
            $(cellJQuery).append('<img class="stone" src="/images/blackKing.png">');
        } else {
            $(cellJQuery).append('<img class="stone" src="/images/transparent.png">');
        }
    }

    hover()
    clickableCells()
}

function buildTable(rows) {
    $('#gameTable > tr').remove()

    for (let indexRow = 0; indexRow < rows.length; indexRow++) {
        const row = rows[indexRow]

        $('#gameTable').append("<tr></tr>")

        for (let indexColumn = 0; indexColumn < row.length; indexColumn++) {
            if ((indexRow % 2 == 0 && indexColumn % 2 == 1) || (indexRow % 2 == 1 && indexColumn % 2 == 0)) {
                $('#gameTable').find("tr:last").append('<td class="whiteTile tableCellSize border"></td>')
            } else {
                $('#gameTable').find("tr:last").append('<td class="blackTile tableCellSize border"></td>')
            }
        }
    }
}

//show hover effect on gamefield
function hover(){
    $('#gameTable td').hover(function () {
        // Coordinates of current cell
        const col = $(this).index();
        const row = $(this).closest('tr').index();

        $(this).addClass("highlight-hover");
    }, function () {
        // Coordinates of current cell
        const col = $(this).index();
        const row = $(this).closest('tr').index();

        $(this).removeClass("highlight-hover");
    });
}

//save user clicks from gamefield
let jumps = []
function clickableCells(){
    $('td').click(function () {
        const row_index = $(this).parent().index();
        const col_index = $(this).index();

        let position = {
            x: col_index,
            y: row_index
        }

        if($(this).hasClass("highlight-click")){
            const positionArray = jumps.at(-1);
            if(position.x == positionArray.x && position.y == positionArray.y){
                $(this).removeClass("highlight-click");
                jumps.pop();
                let jumpString = "";
                jumps.forEach(jmp => {
                    jumpString = jumpString + jmp.y + " " + jmp.x + " ";
                });
                $("#input-text-field-jumps").val(jumpString);
            }
        } else {
            jumps.push(position);
            let jumpString = "";
            jumps.forEach(jmp => {
                jumpString = jumpString + jmp.y + " " + jmp.x + " ";
            });

            //console.log(jumpString)

            $("#input-text-field-jumps").val(jumpString);
            $(this).addClass("highlight-click");
        }
    });
}

//show alert
$(document).ready(async function() {
    const text = $("#textMessage").text();

    hover()
    clickableCells()

    console.log(text)

    showToast(text)

    initiateWinningScreen();
});

function showToast(message){
    if(message.includes("MOVE FROM") || message.includes("Created a new field")){
        if(message.includes("MOVE FROM")){
            message = "STONE MOVED"
        }
        iziToast.success({
            title: 'Success!',
            message: message
        });
    }else if(message.includes("Undo") || message.includes("Redo") || message.includes("SAVED") || message.includes("LOADED")){
        iziToast.info({
            title: message,
            message: ""
        });
    }else if(message === ""){

    } else {
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
    $("td").each(function() {
        if($(this).children("img").length > 0){
            const src = $($(this).children("img")[0]).attr('src')
            if(src.includes("white")){
                whiteHasStone = true;
            } else if(src.includes("black")){
                blackHasStone = true;
            }
        }
    });

    if(whiteHasStone && !blackHasStone){
        showWinningScreen("White has won!")
    } else if(blackHasStone && !whiteHasStone){
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
            ['<select><option value="8">8</option><option value="10">10</option><option value="12">12</option></select>', 'change', function (instance, toast, select, e) {
                $("#iziToastCreateNewGame").val(select.options[select.selectedIndex].value);
                }, true]
            ],
            buttons: [
                ['<button><b>Create</b></button>', function (instance, toast, button, e, inputs) {
                    $("#iziFormNewGame").submit();
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                }, false], // true to focus
            ]
    });

    var duration = 10 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 100 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

///////////////////////////////////
/////Game reset button actions/////
///////////////////////////////////
$('#button-reset-jumps').on("click", function () {
    $("td").each(function() {
        if($(this).hasClass("highlight-click")){
            $(this).removeClass("highlight-click");
        }
    });

    //reset vars
    jumps = [];
    $("#input-text-field-jumps").val("");

    iziToast.info({
        title: 'Selection reset',
        message: ""
    });
});

//Remove focus after button click
document.addEventListener('click', function(e) {
    if(document.activeElement.toString() == '[object HTMLButtonElement]'){
        document.activeElement.blur();
    }
});

///////////////////////////////////
/////AJAX/////
///////////////////////////////////
$('a').click(function(event) {
    const url = $(this).attr('href')

    if(url.includes('new') || url.includes('load') ||url.includes('save') ||url.includes('undo') ||url.includes('redo')){
        event.preventDefault();
        $.ajax({
            url: $(this).attr('href'),
            type: 'get',
            success: function (data, status)  {
                handleResponse(data)
            }
        });
    }
});

$('form').on('submit', function (e) {
    const form = $(this);
    const action = form.attr('action');
    e.preventDefault();

    $.ajax({
        url: action,
        type: form.attr('method'),
        data: form.serialize(),
        success: function (data, status) {
            handleResponse(data)
        },
        error: function (jqXHR, status, error) {
            console.log('ERROR SENDING POST: ' + error)
            showToast(jqXHR.responseText)
        }
    });
});

function handleResponse(data){
    console.log('SUCCESSFULLY SENT POST')

    jumps = []

    const jsonData = JSON.parse(data)

    constructTable(jsonData)
    console.log(data)
    showToast(jsonData.message)

    initiateWinningScreen();
}

function constructTable(data){
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
        if(cellValue === 1){
            $(cellJQuery).append( '<img src="/assets/images/white.jpg" width="100%" height="100%">' );
        }else if(cellValue === 2){
            $(cellJQuery).append( '<img src="/assets/images/whiteKing.png" width="100%" height="100%">' );
        }else if(cellValue === 3){
            $(cellJQuery).append( '<img src="/assets/images/black.jpg" width="100%" height="100%">' );
        }else if(cellValue === 4){
            $(cellJQuery).append( '<img src="/assets/images/blackKing.png" width="100%" height="100%">' );
        }
    }

    hover()
    clickableCells()
}

function buildTable(rows){
    $('#gameTable > tbody > tr').remove()

    for (let indexRow = 0; indexRow < rows.length; indexRow++) {
        const row = rows[indexRow]

        $('#gameTable > tbody').append("<tr></tr>")
        for (let indexColumn = 0; indexColumn < row.length; indexColumn++) {
            if((indexRow % 2 == 0 && indexColumn % 2 == 1) || (indexRow % 2 == 1 && indexColumn % 2 == 0)){
                $('#gameTable > tbody').find("tr:last").append('<td class="whiteTile tableCellSize border"></td>')
            }else{
                $('#gameTable > tbody').find("tr:last").append('<td class="blackTile tableCellSize border"></td>')
            }
        }
    }
}
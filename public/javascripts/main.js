$('#gameTable td').hover(function () {
    console.log('ADD HOVER')
    $(this).addClass("border-danger");
}, function () {
    console.log('REMOVE HOVER')
    $(this).removeClass("border-danger");

    // Coordinates of current cell
    //  const col = $(this).index() + 1;
//    const row = $(this).closest('tr').index();
});

let jumps = []
$('td').click(function () {
    const row_index = $(this).parent().index();
    const col_index = $(this).index();
    if (row_index != 0 && col_index != 0) {
        let position = {
            x: col_index - 1,
            y: row_index - 1
        }
        jumps.push(position);
        console.log("POSITION: " + position)
        console.log("JUMPS: " + jumps)
        let jumpString = "";
        jumps.forEach(jmp => {
            jumpString = jumpString + jmp.y + " " + jmp.x + " ";
        });

        console.log(jumpString)

        $("#input-text-field-jumps").val(jumpString);
    }
});
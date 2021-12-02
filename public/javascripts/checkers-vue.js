var app;

$.ajax({
    url: '/gameJson',
    type: 'get',
    success: function (data, status)  {
        const jsonData = JSON.parse(data)

        const field = jsonData.field

        //nested component for checkers-cell
        Vue.component('checkers-stone', {
            props: ['cellValue'],
            template: `
                    <img class="stone" v-if="cellValue === 1"src="/assets/images/white.jpg">
                    <img class="stone" v-else-if="cellValue === 2"src="/assets/images/whiteKing.png">
                    <img class="stone" v-else-if="cellValue === 3"src="/assets/images/black.jpg">
                    <img class="stone" v-else-if="cellValue === 4"src="/assets/images/blackKing.png">
                `
        })

        //nested component for game table
        Vue.component('checkers-cell', {
            props: ['indexRow','indexColumn','cellValue'],
            template: `
                <td v-if="(indexRow % 2 == 0 && indexColumn % 2 == 1) || (indexRow % 2 == 1 && indexColumn % 2 == 0)" class="whiteTile tableCellSize border">
                    <checkers-stone :cellValue=cellValue></checkers-stone>
                </td>
                <td v-else class="blackTile tableCellSize border">
                    <checkers-stone :cellValue=cellValue></checkers-stone>
                </td>
                `
        })

        //main component for the game
        Vue.component('game-table', {
          data() {
            return {
               field
            }
          },
          template: `
            <table id="gameTable" class="tableAlignment">
                <tr v-for="(row, indexRow) in field.rows">
                    <checkers-cell v-for="(cell, indexColumn) in row" :indexRow=indexRow :indexColumn=indexColumn :cellValue=cell></checkers-cell>
                </tr>
            </table>
            `
        })

        app = new Vue({
          el: '#game-table-div',
          data: {
            field
          }
        })

        hover();
        clickableCells();
    }
});
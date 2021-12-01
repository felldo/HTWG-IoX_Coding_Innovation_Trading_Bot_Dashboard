// Create a Vue application
//const app = Vue.createApp({})

/*
Vue.component('todo-item', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})


Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: 'Vegetables' },
      { id: 1, text: 'Cheese' },
      { id: 2, text: 'Whatever else humans are supposed to eat' }
    ]
  }
})
*/

const TodoList = {
  data() {
    return {
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ]
    }
  }
}

const app = Vue.createApp(TodoList)

/*app.component('todo-item', {
  props: ['todo'],
  template: `<li>{{ todo.text }}</li>`
})*/

app.mount('#todo-list-app')









app.component('checkers-stone', {
            props: ['cellValue'],
            template: `
                    <img class="stone" v-if="cellValue === 1"src="/assets/images/white.jpg">
                    <img class="stone" v-if="cellValue === 2"src="/assets/images/whiteKing.png">
                    <img class="stone" v-if="cellValue === 3"src="/assets/images/black.jpg">
                    <img class="stone" v-if="cellValue === 4"src="/assets/images/blackKing.png">
                `
        })

app.component('checkers-cell', {
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


app.component('game-table', {
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



/*
var app = new Vue({
  el: '#game-table-div',
  data: {
    field: {
        size : 10,
        fieldStatistic1 : 15,
        fieldStatistic2 : 0,
        fieldStatistic3 : 15,
        fieldStatistic4 : 0,
        rows : [ [ 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ], [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ], [ 0, 1, 0, 1, 0, 1, 0, 1, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 3, 0, 3, 0, 3, 0, 3, 0, 3, 0 ], [ 0, 3, 0, 3, 0, 3, 0, 3, 0, 3 ], [ 3, 0, 3, 0, 3, 0, 3, 0, 3, 0 ] ]
      }
  }
});*/














$.ajax({
    url: '/gameJson',
    type: 'get',
    success: function (data, status)  {
        const jsonData = JSON.parse(data)

        const field = jsonData.field
        //nested component from "checkers-cell"
        /*app.component('checkers-stone', {
            props: ['cellValue'],
            template: `
                    <img class="stone" v-if="cellValue === 1"src="/assets/images/white.jpg">
                    <img class="stone" v-if="cellValue === 2"src="/assets/images/whiteKing.png">
                    <img class="stone" v-if="cellValue === 3"src="/assets/images/black.jpg">
                    <img class="stone" v-if="cellValue === 4"src="/assets/images/blackKing.png">
                `
        })

        //nested component from "game-table"
        app.component('checkers-cell', {
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

        // Define a new global component called button-counter
        app.component('game-table', {
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

        app.mount('#game-table-div')
        */
        hover();
        clickableCells();
    }
});








































/*

// Create a Vue application
const app = Vue.createApp({})


Vue.component('todo-item', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})


Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: 'Vegetables' },
      { id: 1, text: 'Cheese' },
      { id: 2, text: 'Whatever else humans are supposed to eat' }
    ]
  }
})






$.ajax({
    url: '/gameJson',
    type: 'get',
    success: function (data, status)  {
        const jsonData = JSON.parse(data)

        const field = jsonData.field
        //nested component from "checkers-cell"
        app.component('checkers-stone', {
            props: ['cellValue'],
            template: `
                    <img class="stone" v-if="cellValue === 1"src="/assets/images/white.jpg">
                    <img class="stone" v-if="cellValue === 2"src="/assets/images/whiteKing.png">
                    <img class="stone" v-if="cellValue === 3"src="/assets/images/black.jpg">
                    <img class="stone" v-if="cellValue === 4"src="/assets/images/blackKing.png">
                `
        })

        //nested component from "game-table"
        app.component('checkers-cell', {
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

        // Define a new global component called button-counter
        app.component('game-table', {
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

        app.mount('#game-table-div')
        hover();
        clickableCells();
    }
});



*/
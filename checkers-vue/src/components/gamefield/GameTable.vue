<template>
    <table id="gameTable" class="tableAlignment">
      <tr v-for="(row, indexRow) in field.rows" :key="row.id">
        <Cell v-for="(cell, indexColumn) in row" :indexRow=indexRow :indexColumn=indexColumn :cellValue=cell
              :key="cell.id"></Cell>
      </tr>
    </table>
</template>


<script>
import Cell from "@/components/gamefield/Cell";

export default {
  name: 'GameTable',

  components: {
    Cell,
  },

  /*
  data() {
    return {
      field: {
        size: 0,
        fieldStatistic1: 0,
        fieldStatistic2: 0,
        fieldStatistic3: 0,
        fieldStatistic4: 0,
        rows: [[]]
      }
    };
  },*/

  props: ['field']
};


</script>

<style>
.tableAlignment {
  margin-left: auto;
  margin-right: auto;
  border-collapse: separate !important;
  border-spacing: 0px !important;
}
</style>
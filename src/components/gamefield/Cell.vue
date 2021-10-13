<template>
  <td v-if="(indexRow % 2 == 0 && indexColumn % 2 == 1) || (indexRow % 2 == 1 && indexColumn % 2 == 0)"
      class="whiteTile tableCellSize border">
    <Stone :cellValue=cellValue></Stone>
  </td>
  <td v-else class="blackTile tableCellSize border">
    <Stone :cellValue=cellValue></Stone>
  </td>
</template>

<script>
import Stone from "@/components/gamefield/Stone";

export default {
  name: 'Cell',

  components: {
    Stone,
  },

  props: ['indexRow','indexColumn','cellValue']
}
</script>

<style>
.tableCellSize {
  /*width: 8vh !important;*/
  /*width: 70px;
  height: 70px;*/
  width: 8vh;
}

.whiteTile {
  background-color: #a2a2a2 !important;
}

.blackTile {
  background-color: #3c3c3c !important;
}
</style>
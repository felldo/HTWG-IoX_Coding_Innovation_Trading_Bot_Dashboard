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
  max-width: 8vh;
}
.whiteTile {
  background-color: #a2a2a2;
}


.blackTile {
  background-color: #3c3c3c;
}
.highlight-hover {
  outline: solid 2px #f5a623;
  outline-offset: -2px;
}

.highlight-click {
  outline: solid 2px #ed0d32;
  outline-offset: -2px;
}
</style>
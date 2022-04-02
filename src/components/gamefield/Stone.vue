<template>
  <span>Stone</span>
  <!--<img class="stone" v-if="cellValue === 1" src="@/assets/images/white.jpg">-->
  <!--<img class="stone" v-else-if="cellValue === 2" src="@/assets/images/whiteKing.png">-->
  <!--<img class="stone" v-else-if="cellValue === 3" src="@/assets/images/black.jpg">-->
  <!--<img class="stone" v-else-if="cellValue === 4" src="@/assets/images/blackKing.png">-->
  <!--<img class="stone" v-else src="@/assets/images/transparent.png">-->
</template>

<script>
export default {
  name: 'Stone',

  props: ['cellValue'],

}
</script>

<style>
.stone {
  width: 100%;
  height: 100%;
}
</style>
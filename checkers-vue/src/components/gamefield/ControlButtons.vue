<template>
  <div class="text-center">
    <form action="/move" method="get">
      <input id="input-text-field-jumps" name="jumps" type="text" hidden>
      <v-btn elevation="2" class="ma-1 control-button" x-large type="submit">
        Jump
      </v-btn>
      <v-btn elevation="2" class="ma-1 control-button" x-large type="clear">
        Reset
      </v-btn>
    </form>

  </div>
</template>

<script>
export default {
  name: 'ControlButtons',
}
</script>
<style>
.control-button{
  background: #ed0d32 !important;
  color: #ededed !important;
  font-family: Montserrat,Roboto,sans-serif !important;
  font-size: medium !important;
  padding-left: 100px !important;
  padding-right: 100px !important;
}
</style>
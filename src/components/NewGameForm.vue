<template>
  <form id="iziFormNewGame" action="/new" hidden>
    <input id="iziToastCreateNewGame" name="gamesize" value="8" type="text" class="form-control" hidden>
  </form>
</template>

<script>
export default {
  name: 'NewGameForm',
}
</script>
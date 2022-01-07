<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Welcome to Checkers</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
              aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav justify-content-center me-auto mb-2 mb-lg-0">
          <li class="nav-item"><a href="#" class="nav-link" @click="redirectAccount()">Account</a></li>
          <li class="nav-item"><a href="/undo" class="nav-link" aria-current="page">Undo</a></li>
          <li class="nav-item"><a href="/redo" class="nav-link">Redo</a></li>
          <li class="nav-item"><a href="/save" class="nav-link">Save</a></li>
          <li class="nav-item"><a href="/load" class="nav-link">Load</a></li>
          <li class="nav-item">
            <div class="dropdown">
              <a class="btn dropdown-toggle nav-link" href="#" role="button" id="dropdownMenuLink"
                 data-bs-toggle="dropdown" aria-expanded="false">
                New Game
              </a>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li><a class="dropdown-item" href="/new?gamesize=8">Size: 8</a></li>
                <li><a class="dropdown-item" href="/new?gamesize=10">Size: 10</a></li>
                <li><a class="dropdown-item" href="/new?gamesize=12">Size: 12</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Router from "../router"

export default {
  name: "Header",
  methods: {
    redirectAccount: function () {
      Router.push('login')
    }
  }
}

</script>
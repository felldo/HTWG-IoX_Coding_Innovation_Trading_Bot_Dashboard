<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">IoX Coding Innovation - Interactive Trading Bot with Python</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
              aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav justify-content-center me-auto mb-2 mb-lg-0">
          <li class="nav-item"><a href="#" class="nav-link" @click="redirectAccount()">Account</a></li>
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
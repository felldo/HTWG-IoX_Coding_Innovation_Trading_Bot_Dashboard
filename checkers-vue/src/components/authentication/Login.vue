<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col cols="12">
        <div class="text-center">
          <h1 v-if="loggedIn" :key="loggedIn">
            Hello, {{name}}!
          </h1>
          <h1 v-else :key="loggedIn">
            Please use one of the following login methods
          </h1>
        </div>
      </v-col>
      <div v-if="loggedIn" class="text-center">
        <v-avatar size="75">
          <img :src="img" width="75">
        </v-avatar>
      </div>
      <v-col v-if="loggedIn" cols="1" sm="2" md="3" lg="4">
      </v-col>
      <div v-if="loggedIn" class="text-center">
        <p class="user-data">Username: {{name}}</p>
        <p class="user-data">E-Mail: {{email}}</p>
      </div>
      <v-col v-if="loggedIn" cols="1" sm="2" md="3" lg="4">
      </v-col>
      <v-col v-if="!loggedIn" cols="1" sm="2" md="3" lg="4">
      </v-col>
      <v-col v-if="!loggedIn" cols="10" sm="8" md="6" lg="4">
        <EmailAuthentication class="pb-5 pt-5"/>
      </v-col>
      <v-col v-if="!loggedIn" cols="1" sm="2" md="3" lg="4">
      </v-col>
      <v-col v-if="!loggedIn" cols="1" sm="1" md="2" lg="3">
      </v-col>
      <v-col v-if="!loggedIn" cols="10" sm="10" md="8" lg="6">
        <hr>
      </v-col>
      <v-col v-if="!loggedIn" cols="1" sm="1" md="2" lg="3">
      </v-col>
      <div class="text-center">
        <v-btn v-if="!loggedIn" elevation="2" class="ma-1 control-button" x-large @click="googleLogin">
          <img src="@/assets/google-icon.png" width="25">
          Sign in with Google
        </v-btn>
        <v-btn v-if="!loggedIn" elevation="2" class="ma-1 control-button" x-large @click="githubLogin">
          <img src="@/assets/github-icon.png" width="25">
          Sign in with GitHub
        </v-btn>
        <v-btn v-else elevation="2" class="ma-1 control-button" x-large @click="logout">
          <v-icon>mdi-logout-variant</v-icon>
          &nbsp;&nbsp;
          <span class="text-styling-button">Logout</span>
        </v-btn>
      </div>
    </v-row>
    <v-row>
      <v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {getAuth, GoogleAuthProvider,GithubAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import EmailAuthentication from "@/components/authentication/EmailAuthentication";
export default {
  name: "Login",
  components: {
    EmailAuthentication
  },
  data() {
    return {
      loggedIn: false,
      name: '',
      email: '',
      img: '',
      password: '',
    }
  },
  methods: {
    googleLogin() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
          .then(() => {
            this.$router.replace('/');
          }).catch(() => {}
      );
    },
    githubLogin() {
      const provider = new GithubAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
          .then(() => {
            this.$router.replace('/');
          }).catch(() => {}
      );
    },
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.loggedIn = false;
        this.$router.replace('login');
      });
    },
    reload() {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if(!currentUser) {
        this.loggedIn = false;
      } else {
        this.loggedIn = true;
        this.name = currentUser.displayName
        this.email = currentUser.email
        this.img = currentUser.photoURL
      }
    }
  },
  mounted () {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if(!currentUser) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
      this.name = currentUser.displayName
      this.email = currentUser.email
      this.img = currentUser.photoURL
    }
  },
  watch: {
    '$route': 'reload'
  },
}
</script>

<style scoped>
h1 {
  font-family: Montserrat,Roboto,sans-serif !important;
  color: #FFFFFF;
  padding: 15px 15px 15px 15px;
}
h2 {
  font-family: Montserrat,Roboto,sans-serif !important;
  color: #FFFFFF;
}
.user-data {
  font-family: Montserrat,Roboto,sans-serif !important;
  color: #FFFFFF;
  font-size: 18px;
}

.text-styling-button {
  font-family: Montserrat,Roboto,sans-serif !important;
  font-weight: bold !important;
}
.button {
  padding: 10px 15px 10px 15px;
  margin: 0 5px 0 5px;
  border: none;
  border-radius: 20px;
}
.button:hover {
  transform: scale(1.1);
  transition-duration: 0.3s;
  background-color: #CCCCCC;
}
.v-btn {
  text-transform:none !important;
}
</style>
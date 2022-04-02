<template>
  <v-card :elevation="0" dark>
    <v-tabs
        v-model="tab"
        color="#FFFFFF"
        grow
    >
      <v-tab autocapitalize="false">Register</v-tab>
      <v-tab autocapitalize="false">Login</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" dark>
      <v-tab-item>
        <v-card class="pt-10" :elevation="0">
          <v-text-field dark type="text" v-model="username" label="Username"></v-text-field>
          <v-text-field dark type="text" v-model="email" label="E-Mail"></v-text-field>
          <v-text-field dark type="password" v-model="password" label="Password"></v-text-field>
          <div class="text-center">
            <v-btn elevation="2" class="ma-1 control-button" x-large @click="signUp">
              Register
            </v-btn>
          </div>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card class="pt-10" :elevation="0">
          <v-text-field dark type="text" v-model="email" label="E-Mail"></v-text-field>
          <v-text-field dark type="password" v-model="password" label="Password"></v-text-field>
          <div class="text-center">
            <v-btn elevation="2" class="ma-1 control-button" x-large @click="login">
              Login
            </v-btn>
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

  </v-card>
</template>

<script>
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile} from "firebase/auth";

export default {
  name: "EmailAuthentication",
  data() {
    return {
      tab: null,
      username: '',
      email: '',
      password: '',
    }
  },
  methods: {
    signUp() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            updateProfile(auth.currentUser, {
              displayName: this.username,
              photoURL: 'https://picsum.photos/200/200'
            }).then(() => {
              //this.$router.replace('acc');
              this.$router.replace('/');
            }).catch((err) => {
              alert(err);
            });
          })
          .catch((err) => {
            alert(err);
          });
    },
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            this.$router.replace('/');
          })
          .catch(() => {
                alert('Sorry, there is a problem with the login!');
              }
          );
    }
  }
}
</script>

<style scoped>
.v-text-field {
  font-family: Montserrat, Roboto, sans-serif !important;
}

.text-styling-button {
  font-family: Montserrat, Roboto, sans-serif !important;
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
  text-transform: none !important;
}
.v-text-field{
  padding: 0vh 2vh 0vh 2vh;
}
.v-tab {
  font-family: Montserrat, Roboto, sans-serif !important;
  font-size: 18px;
  color: #FFFFFF !important;
  text-transform: none !important;
}
</style>
<template>
  <v-app class="v-app">
    <v-main>
      <div id="gamerules">
        <v-container>
          <v-row>
            <v-row>
              <h1>Game Rules</h1>
            </v-row>
          </v-row>
          <v-row>
            <v-col>
              <p>
                Draughts is played by two opponents, on opposite sides of the gameboard.
                One player has the dark pieces; the other has the light pieces.
                Players alternate turns.
                A player may not move an opponent's piece.
                A move consists of moving a piece diagonally to an adjacent unoccupied square.
                If the adjacent square contains an opponent's piece, and the square immediately beyond it is vacant, the
                piece may be captured (and removed from the game) by jumping over it.
                Only the dark squares of the checkered board are used.
                A piece may move only diagonally into an unoccupied square.
                When presented, capturing is mandatory in most official rules, although some rule variations make
                capturing
                optional.[3] In almost all variants, the player without pieces remaining, or who cannot move due to
                being
                blocked, loses the game.
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <b>Plays for all stones:</b>
              <ul>
                <li>One step diagonal forward.</li>
              </ul>
              <b>Strike possibilities for all stones:</b>
              <ul>
                <li>Any number of enemy stones, forward or backward.</li>
              </ul>
              <b>Impact compulsion:</b>
              <ul>
                <li>As many opposing stones as possible must be captured.</li>
              </ul>
              <b>Plays for the King:</b>
              <ul>
                <li>Any number of steps, forward or backward.</li>
              </ul>
              <b>Strike possibilities of the King:</b>
              <ul>
                <li>The King must move directly behind the stone that has been hit.</li>
              </ul>
            </v-col>
          </v-row>

          <div id="pictures">
            <h1>Standalone game:</h1>
            <v-row>
              <v-col>
                <div class="subheading">
                  Text UI
                </div>
                <img src="@/assets/images/tui.jpg" alt="TextUI in standalone application" height="300"/>
              </v-col>
              <v-col>
                <div class="subheading">
                  GUI
                </div>
                <img src="@/assets/images/gui.gif" alt="GUI in standalone application" height="300"/>
              </v-col>
              <v-col></v-col>
              <v-col></v-col>
            </v-row>
            <br>
          </div>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Rules',
};
</script>

<style>
#gamerules {
  margin: 10vh 20vh 10vh 20vh;
  font-family: Montserrat,Roboto,sans-serif !important;
  font-size: medium !important;
}

.v-app {
  background: #141414 !important;
  color: #ededed !important;
}
</style>
<template>
  <v-app>
    <!-- Navbar -->
<v-app-bar app color="primary" dark>
  <v-container>
    <v-row align="center" justify="space-between">
      <v-col cols="auto">
        <v-toolbar-title class="white--text">Movie</v-toolbar-title>
      </v-col>

      <!-- Boutons de navigation -->
      <v-col cols="auto">
        <v-btn text color="white" to="/" exact>Accueil</v-btn>
        <v-btn text color="white" to="/movies">Films</v-btn>
      </v-col>
    </v-row>
  </v-container>
</v-app-bar>

    <!-- Contenu -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Footer -->
    <v-footer app color="primary" dark>
      <v-col class="text-center py-4">
        © {{ new Date().getFullYear() }} MonSite. Tous droits réservés.
      </v-col>
    </v-footer>
  </v-app>
</template>

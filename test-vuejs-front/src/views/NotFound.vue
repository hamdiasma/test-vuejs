<template>
  <v-container
    class="full-height"
    fluid
  >
    <v-row
      class="full-height"
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        md="6"
        class="text-center"
      >
        <h1>404 - Page Not Found</h1>
        <p>La page que vous recherchez n'existe pas.</p>
        <v-btn
          color="primary"
          class="mt-4"
          @click="goHome"
        >
          Retour à l'accueil
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => router.push('/')
</script>

import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'
import Movies from '@/views/movies/Movies.vue'
import MovieDetails from '@/views/movies/MovieDetails.vue'

const routes = [
  {
    path: '/',
    component: AppLayout, // layout principal
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'movies', name: 'Movies', component: Movies },
      { path: 'movies/:id', name: 'MovieDetails', component: MovieDetails },
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

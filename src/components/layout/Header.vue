<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3">
      <div class="container">
        <a class="navbar-brand" href="#">Agenda</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/perfil">Perfil</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/usuários">Usuários</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/pessoas">Pessoas</router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/login"><ph-sign-out /> Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { PhSignOut } from '@phosphor-icons/vue'
export default {
  name: 'HeaderComponent',
  props: {},
  components: {
    PhSignOut
  }
}
</script>

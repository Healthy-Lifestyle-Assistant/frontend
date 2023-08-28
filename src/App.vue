<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">Fitness Tracker</a> -->
      <router-link to="/" class="navbar-brand">Fitness Tracker</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
            <router-link to="/" class="nav-link active" aria-current="page">Home</router-link>
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" href="#">Calendar</a> -->
            <router-link to="/calendar-menu" class="nav-link">Calendar</router-link>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Workouts</a>
            <ul class="dropdown-menu">
              <li><router-link to="/exercises-menu" class="dropdown-item">Exercises</router-link></li>
              <li><router-link to="/workouts-menu" class="dropdown-item">Workouts</router-link></li>
              <li><router-link to="/media-menu" class="dropdown-item">Media</router-link></li>
            </ul>
          </li>

          <li class="nav-item">
            <!-- <a class="nav-link" href="#">Supplements</a> -->
            <router-link to="/supplements-menu" class="nav-link">Supplements</router-link>
          </li>

          <li class="nav-item">
            <!-- <a class="nav-link" href="#">Settings</a> -->
            <router-link to="/settings-menu" class="nav-link">Settings</router-link>
          </li>

        </ul>

        <div class="d-flex">
          <router-link to="/login" class="btn btn-outline-success me-2" role="button">Login</router-link>
          <router-link to="/signup" class="btn btn-outline-success me-2" role="button">Sign-Up</router-link>
        </div>

      </div>
    </div>
  </nav>

  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style></style>

<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <transition name="app_a-fade" mode="out-in">
      <router-view :key="$route.path" />
    </transition>
  </div>
</template>

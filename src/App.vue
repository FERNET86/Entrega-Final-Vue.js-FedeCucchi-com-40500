<template>
  <div class="app">
    <HeaderBar />
    <router-view></router-view>
    <AppFooter />
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';
import AppFooter from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    HeaderBar,
    AppFooter,
  },
  
  data() {
    return {
      isLoggedIn: false, 
    };
  },
  
  created() {
    this.$root.$on('login', (isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isLoggedIn = isLoggedIn;
  },
};
</script>

<style scoped>
/* Estilos específicos de App.vue */
.app {
  background-image: url('https://www.futuremusic-es.com/wp-content/uploads/2016/03/HD_Vinyl_intro_750x400px.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  margin: 0 auto;
  padding: 20px;
}
</style>

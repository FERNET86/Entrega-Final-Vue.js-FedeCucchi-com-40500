<template>
    <ul class="header-bar">
    <p class="auth-button home-link"><router-link to="/">Home</router-link></p>
    <p v-if="!getIsLogged" class="auth-button myp"><router-link :to="{ name: 'LoginForm' }">Iniciar Sesion</router-link></p>
    <p v-if="!getIsLogged" class="auth-button myp"><router-link :to="{ name: 'RegisterForm' }">Registrar</router-link></p>
    <p v-if="getIsLogged" class="auth-button myp"><router-link :to="{ name: 'MyProfile' }">Mi Perfil</router-link></p>
    <p v-if="getIsLogged" class="auth-button myp"><router-link :to="{ name: 'MisPedidos' }">Mis Pedidos</router-link></p>
    <p v-if="getIsLogged && getIsAdmin" class="auth-button myp"><router-link :to="{ name: 'ListadoPedidos' }">Listado de Pedidos</router-link></p>
    <p v-if="getIsLogged && getIsAdmin" class="auth-button myp"><router-link :to="{ name: 'AdminStock' }">Administrar stock</router-link></p>
    </ul>
</template>

<script>
export default {
    name: "HeaderBar",
    computed: {
        getIsLogged() {
            return this.$store.getters.isLogged;
        },
        getIsAdmin() {
            return this.$store.getters.userLogged.admin;
        },
    },
};
</script>

<style scoped>
.header-bar {
display: flex;
justify-content: flex-end;
padding: 0;
margin: 0;
list-style: none;
}

.auth-button {
margin-left: 10px;
padding: 8px 12px;
background-color: #f0f0f0;
border: 1px solid #ccc;
border-radius: 4px;
text-decoration: none;
color: #333;
font-weight: bold;
text-transform: uppercase;
}

.auth-button:hover {
  background-color: #e0e0e0;
}

.auth-button a {
  text-decoration: none;
}

.home-link {
  margin-right: auto;
  margin-left: 25px;
}

.myp {
  margin-right: 25px;
}
</style>
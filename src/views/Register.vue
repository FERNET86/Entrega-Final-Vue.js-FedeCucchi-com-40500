<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <h2 class="Titulo">Registro de usuario</h2>
    <form @submit.prevent="registro" class="mb-3">
      <div class="mb-3">
        <label for="registroNombre" class="form-label">Nombre:</label>
        <input v-model="nombre" type="text" class="form-control" id="registroNombre" required>
      </div>
      <div class="mb-3">
        <label for="registroApellido" class="form-label">Apellido:</label>
        <input v-model="apellido" type="text" class="form-control" id="registroApellido" required>
      </div>
      <div class="mb-3">
        <label for="registroEmail" class="form-label">Email:</label>
        <input v-model="email" type="email" class="form-control" id="registroEmail" required>
      </div>
      <div class="mb-3">
        <label for="registroPassword" class="form-label">Contraseña:</label>
        <input v-model="password" type="password" class="form-control" id="registroPassword" required>
      </div>
      <button type="submit" class="btn btn-primary">Registrarse</button>
    </form>
    <p v-if="registroExitoso" class="registrosatisfactorio">Registro exitoso. ¡Bienvenido, {{ nombre }} {{ apellido }}!</p>
    <p v-if="registroError" class="text-danger">{{ registroErrorMessage }}</p>
    <p class="pie"> </p>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      registroExitoso: false,
      registroError: false,
      registroErrorMessage: '',
    };
  },
  methods: {
    registro() {
      fetch('https://64a246f4b45881cc0ae4f33d.mockapi.io/api/v1/users')
        .then(response => response.json())
        .then(users => {
          if (users.some(user => user.email === this.email)) {
            this.registroExitoso = false;
            this.registroError = true;
            this.registroErrorMessage = 'Error al registrar el usuario. El correo electrónico ya está registrado.';
          } else {
            fetch('https://64a246f4b45881cc0ae4f33d.mockapi.io/api/v1/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                nombre: this.nombre,
                apellido: this.apellido,
                email: this.email,
                password: this.password,
              }),
            })
              .then(response => response.json())
              .then(data => {
                if (data.id) {
                  this.registroExitoso = true;
                  this.registroError = false;
                  console.log('Usuario registrado:', data);
                  this.nombre = '';
                  this.apellido = '';
                  this.email = '';
                  this.password = '';
                  
                  // Redirigir a HomePage después de 3 segundos
                  setTimeout(() => {
                    this.$router.push({ name: 'home' });
                  }, 3000);
                } else {
                  this.registroExitoso = false;
                  this.registroError = true;
                  this.registroErrorMessage = 'Error al registrar el usuario. Por favor, inténtelo de nuevo.';
                }
              })
              .catch(error => {
                console.error('Error al registrar el usuario:', error);
                this.registroExitoso = false;
                this.registroError = true;
                this.registroErrorMessage = 'Error al registrar el usuario. Por favor, inténtelo de nuevo.';
              });
          }
        })
        .catch(error => {
          console.error('Error al verificar el correo electrónico:', error);
          this.registroExitoso = false;
          this.registroError = true;
          this.registroErrorMessage = 'Error al registrar el usuario. Por favor, inténtelo de nuevo.';
        });
    },
  },
};
</script>
  
  <style scoped>

  .container {
    max-width: 400px;
    margin: 0 auto;
    padding-top: 50px;
  }

  .Titulo{
    font-weight: bold;
    text-transform: uppercase;
    margin-block-end: 40px;
    margin-top: 20px;
    font-size: 2.1rem;
  }

  label{
    font-weight: bold;
    text-transform: uppercase;
  }

  .registrosatisfactorio{
    font-size: xx-large;
    font-style: unset;
    color: black;
    font-weight: bold;
  }

  .text-danger{
    background-color: rgba(255, 255, 255, 0.793);
    text-transform: uppercase;
    font-size: x-large;
    font-style: unset;
    color: red;
    font-weight: bold;
  }

  .pie{
    height: 110px; 
  }
  </style>

  
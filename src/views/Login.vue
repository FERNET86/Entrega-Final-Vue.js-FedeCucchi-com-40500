<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <h2 class="TituloSesion">Iniciar sesión</h2>
    <form @submit.prevent="login" class="mb-3">
      <div class="mb-3">
        <label for="loginEmail" class="form-label">Email:</label>
        <input v-model="email" type="email" class="form-control" id="loginEmail" required>
      </div>
      <div class="mb-3">
        <label for="loginPassword" class="form-label">Contraseña:</label>
        <input v-model="password" type="password" class="form-control" id="loginPassword" required>
      </div>
      <button type="submit" class="btn btn-primary">Iniciar sesión</button>
    </form>
    <button @click="olvidarContrasena" class="btn btn-link OlvidasteContraseña">Olvidaste la contraseña?</button>
    <p v-if="loginExitoso" class="text-success">¡Inicio de sesión exitoso!</p>
    <p v-if="loginError" class="text-danger">{{ loginErrorMessage }}</p>
    <p class="pie"> </p>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      loginExitoso: false,
      loginError: false,
      loginErrorMessage: '',
    };
  },
  methods: {
    login() {
      fetch('https://64a246f4b45881cc0ae4f33d.mockapi.io/api/v1/users')
        .then(response => response.json())
        .then(users => {
          const user = users.find(u => u.email === this.email && u.password === this.password);
          if (user) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', user.id);
            this.loginExitoso = true;
            this.loginError = false;
            setTimeout(() => {
              this.loginExitoso = false;
            }, 3000);
            console.log('Inicio de sesión exitoso:', user);
            this.email = '';
            this.password = '';
            this.updateLogin(user.id);
            this.$store.commit('setIsLogged', true);
            this.$router.push("/");
          } else {
            this.loginExitoso = false;
            this.loginError = true;
            this.loginErrorMessage = 'Email o contraseña incorrectos. Inténtelo de nuevo.';
            this.$store.commit('setIsLogged', false);
          }
        })
        .catch(error => {
          console.error('Error al iniciar sesión:', error);
          this.loginExitoso = false;
          this.loginError = true;
          this.loginErrorMessage = 'Error al iniciar sesión. Por favor, inténtelo de nuevo.';
        });
    },
    updateLogin(userId) {
      fetch(`https://64a246f4b45881cc0ae4f33d.mockapi.io/api/v1/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isloggedin: true }),
      })
        .then(response => response.json())
        .then(user => {
          this.$store.commit('setUserLogged', user);
        })
        .catch((error) => {
          console.error("Error al confirmar compra: ", error);
        });
    },
    olvidarContrasena() {
      Swal.fire({
        title: 'Nueva contraseña',
        html: '<input type="email" id="email" class="swal2-input" placeholder="Ingrese tu correo electrónico">',
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const email = Swal.getPopup().querySelector('#email').value;
          return email;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const email = result.value;
          fetch('https://64a246f4b45881cc0ae4f33d.mockapi.io/api/v1/users')
            .then(response => response.json())
            .then(users => {
              const user = users.find(u => u.email === email);
              if (user) {
                Swal.fire('Contraseña enviada', 'Se ha enviado un correo con las instrucciones para resetear tu contraseña.', 'success');
              } else {
                Swal.fire('Correo no registrado', 'El correo electrónico ingresado no está registrado en nuestra base de datos.', 'error');
              }
            })
            .catch(error => {
              Swal.fire('Error', 'Ha ocurrido un error al verificar el correo electrónico.', 'error');
              console.error('Error al verificar el correo electrónico:', error);
            });
        }
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

.TituloSesion {
  font-weight: bold;
  text-transform: uppercase;
  margin-block-end: 40px;
  margin-top: 20px;
  font-size: 2.5rem;
}

label {
  font-weight: bold;
  text-transform: uppercase;
}

.OlvidasteContraseña{
  display: contents;
}

.text-danger{
  background-color: rgba(255, 255, 255, 0.793);
  text-transform: uppercase;
  font-size: medium;
  font-style: unset;
  color: red;
  font-weight: bold;
  }

.pie {
  height: 280px;
}
</style>


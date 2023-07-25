<template>
  <b-modal v-model="modalVisible" :title="modalTitle" @ok="confirmarCompra" @cancel="cerrarModal">
    <form>
      <b-form-group class="modaltitulo" label="Email" label-for="email" :disabled="true">
        <b-form-input :value="userEmail" id="email" type="email" readonly></b-form-input>
      </b-form-group>

      <b-form-group class="modaltitulo" label="Nombre y Apellido del titular de la tarjeta" label-for="nombre">
        <b-form-input v-model="nombre" id="nombre" required></b-form-input>
      </b-form-group>

      <b-form-group class="modaltitulo" label="Número de tarjeta" label-for="tarjeta">
        <b-form-input v-model="tarjeta" id="tarjeta" required></b-form-input>
      </b-form-group>

      <b-form-group class="modaltitulo" label="Codigo seguridad tarjeta" label-for="codigo">
        <b-form-input v-model="codigo" id="codigo" required></b-form-input>
      </b-form-group>

      <b-form-group class="modaltitulo" label="Total a pagar" label-for="total" :disabled="true">
        <b-form-input :value="totalPrice" id="total" readonly></b-form-input>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  props: {
    mostrarModal: {
      type: Boolean,
      required: true,
    },
    pedido: {
      type: Object,
      required: true,
    },
    modalTitle: {
      type: String,
      default: 'Confirmar compra',
    },
    userEmail: {
      type: String,
      required: true,
    },
    userNombre: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    modalVisible: {
      required: false,
    }
    },
  },
  data() {
    return {
      modalVisible: false,
      nombre: this.userNombre,
      tarjeta: '',
      codigo: '',
    };
  },
  watch: {
    mostrarModal: {
      immediate: true,
      handler(newValue) {
        this.modalVisible = newValue;
      },
    },
  },
  methods: {
    cerrarModal() {
      this.modalVisible = false;
      this.$emit('cerrar');
    },
    isValidSecurityCode(codigo) {
      const securityCodeRegex = /^[0-9]{3,4}$/;
      return securityCodeRegex.test(codigo);
    },
    confirmarCompra() {
      if (!this.nombre || !this.userEmail || !this.tarjeta || !this.totalPrice || !this.codigo) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Todos los campos son obligatorios',
          allowOutsideClick: false, // Esto evita que se cierre haciendo clic fuera del modal
        });
        return;
      }

      if (!this.isValidSecurityCode(this.codigo)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El código de seguridad de la tarjeta debe contener 3 o 4 dígitos numéricos.',
        });
        return;
      }

      const numeroPedido = Math.floor(Math.random() * 100000); // Número de pedido aleatorio
      Swal.fire({
        icon: 'success',
        title: 'Compra exitosa',
        text: `Te estaremos enviando la información del envío a tu correo electrónico. Tu número de pedido es ${numeroPedido}`,
      });

      const datosCompra = {
        email: this.userEmail,
        nombre: this.nombre,
        tarjeta: this.tarjeta,
        codigo: this.codigo,
        pedido: this.pedido,
        total: this.totalPrice,
        numeroPedido: numeroPedido,
      };

      this.$emit('confirmar', datosCompra);

      this.modalVisible = false;
    },
  },
};
</script>



<style scoped>

form {
  margin: 0;
}
.modaltitulo {
  font-weight: bold;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.674);
}
</style>
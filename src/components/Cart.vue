<template>
  <div class="cart">
    <table class="table">
      <thead>
        <tr>
          <th>Nombre del producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Subtotal</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cartItemsSummary" :key="index">
          <td>{{ item.product.titulo }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.product.precio }}</td>
          <td>{{ item.quantity * item.product.precio }}</td>
          <td>
            <button @click="removeFromCart(item.product.id)" class="remove-button">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  props: ['cartItems'],
  computed: {
    cartItemsSummary() {
      const summary = {};
      this.cartItems.forEach((item) => {
        const key = `${item.id}-${item.name}-${item.price}`;
        if (summary[key]) {
          summary[key].quantity += 1;
        } else {
          summary[key] = {
            product: item,
            quantity: 1,
          };
        }
      });
      return Object.values(summary);
    },
  },
  methods: {
    removeFromCart(productId) {
      const index = this.cartItems.findIndex((item) => item.id === productId);
      if (index !== -1) {
        this.$emit('remove-from-cart', index);
      }
    },
  },
};
</script>

<style scoped>
table {
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 10px;
}

.remove-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 4px;
}

.remove-button:hover {
  background-color: #d32f2f;
}
</style>

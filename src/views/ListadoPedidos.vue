<template>
  <div class="list-pedidos">
    <h1 class="Titulo">Listado de Pedidos</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Mail</th>
          <th>Pedido</th>
          <th>Fecha</th>
          <th>Total</th>
          <th>Acciones</th> 
        </tr>
      </thead>
      <tbody>
        <tr v-for="pedido in pedidos" :key="pedido.id">
          <td>{{ pedido.email }}</td>
          <td>{{ pedido.pedido }}</td>
          <td>{{ pedido.fecha }}</td>
          <td>$ {{ pedido.total }}</td>
          <td class="table-actions"> 
            <button
              id="buttonRemove"
              title="Eliminar"
              @click="confirmarEliminarPedido(pedido.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="pie"> </p>
  </div>
</template>

<script>
import Swal from 'sweetalert2'; 

export default {
  name: 'ListadoPedidos',
  data() {
    return {
      pedidos: {},
    };
  },
  mounted() {
    this.cargarPedidos();
  },
  methods: {
    cargarPedidos() {
      fetch('https://64ac1f6f9edb4181202f21ff.mockapi.io/pedidos')
        .then(response => response.json())
        .then(pedidos => {
          this.pedidos = pedidos;
        })
        .catch(error => {
          console.error('Error al traer pedidos:', error);
        });
    },
    confirmarEliminarPedido(idPedido) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',  
        cancelButtonColor: '#6c757d',  
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then(result => {
        if (result.isConfirmed) {
          this.eliminarPedido(idPedido);
        }
      });
    },
    eliminarPedido(idPedido) {
      fetch(`https://64ac1f6f9edb4181202f21ff.mockapi.io/pedidos/${idPedido}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(() => {
          this.pedidos = this.pedidos.filter(pedido => pedido.id !== idPedido);
          Swal.fire('Eliminado', 'El pedido ha sido eliminado con éxito', 'success');
        })
        .catch(error => {
          console.error('Error al eliminar pedido:', error);
        });
    },
  },
};
</script>

<style scoped>

.Titulo {
  font-weight: bold;
  text-transform: uppercase;
  margin-block-end: 40px;
  margin-top: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}

.table thead th {
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
  padding: 8px;
  text-align: left;
}

.table tbody td {
  padding: 8px;
  border-bottom: 1px solid #cfd8dc;
}

.table tbody tr:nth-child(even) {
  background-color: #e3f2fd;
}

.table tbody tr:hover {
  background-color: #bbdefb;
}

.pie {
  height: 80px;
}

.table-actions button {
  margin-left: 5px;
  padding: 5px;
  border: none;
  background-color: #dc3545; 
  color: #fff;
  cursor: pointer;
}
</style>

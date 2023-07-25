<template>
  <div class="admin-stock">
    <h1 class="admtitulo">Administrador de Stock</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Título</th>
          <th>Descripción</th>
          <th>Url imagen</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th class="acciones">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.nombre }}</td>
          <td>{{ product.titulo }}</td>
          <td>{{ product.descripcion }}</td>
          <td>{{ product.imagen }}</td>
          <td>$ {{ product.precio }}</td>
          <td class="unidades">{{ product.cantidad }}</td>
          <td class="table-actions">
            <button
              id="buttonEdit"
              title="Editar"
              @click="editarProducto(product)"
            >
              Editar
            </button>
            <button
              id="buttonRemove"
              title="Eliminar"
              @click="eliminarProducto(product.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <form @submit.prevent="agregarProducto" v-if="!isEditing" class="form">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nombre" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="titulo">Título:</label>
        <input type="text" id="titulo" v-model="titulo" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" v-model="descripcion" class="form-control" required></textarea>
      </div>
      <div class="form-group">
        <label for="imagen">URL de la imagen:</label>
        <input type="text" id="imagen" v-model="imagen" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="precio">Precio:</label>
        <input type="number" id="precio" v-model="precio" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="cantidad">Cantidad:</label>
        <input type="number" id="cantidad" v-model="cantidad" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-success agregar-button">
        Agregar Producto
      </button>
    </form>

    <form @submit.prevent="actualizarProducto" v-if="isEditing" class="form">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nombre" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="titulo">Título:</label>
        <input type="text" id="titulo" v-model="titulo" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" v-model="descripcion" class="form-control" required></textarea>
      </div>
      <div class="form-group">
        <label for="imagen">URL de la imagen:</label>
        <input type="text" id="imagen" v-model="imagen" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="precio">Precio:</label>
        <input type="number" id="precio" v-model="precio" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="cantidad">Cantidad:</label>
        <input type="number" id="cantidad" v-model="cantidad" class="form-control" required>
      </div>
      <button type="submit" class="boton btn btn-primary">Guardar Cambios</button>
      <button @click="cancelarEdicion" class="boton btn btn-secondary">Cancelar</button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'AdminStock',
  data() {
    return {
      products: [],
      nombre: '',
      titulo: '',
      descripcion: '',
      imagen: '',
      precio: 0,
      cantidad: 0,
      refreshKey: 0,
      editingProductId: null,
      isEditing: false,
    };
  },
  methods: {
    fetchProducts() {
      fetch('https://64a246f4b45881cc0ae4f33d.mockapi.io/api/v1/Carrito')
        .then((response) => response.json())
        .then((products) => {
          this.products = products;
        })
        .catch((error) => {
          console.error('Error al traer productos:', error);
        });
    },
    agregarProducto() {
      const body = {
        nombre: this.nombre,
        titulo: this.titulo,
        descripcion: this.descripcion,
        imagen: this.imagen,
        precio: this.precio,
        cantidad: this.cantidad,
      };
      fetch('https://64a246f4b45881cc0ae4f33d.mockapi.io/api/v1/Carrito', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          this.refreshKey++;
          return res.json();
        })
        .then(() => {
          Swal.fire('Éxito', 'El producto ha sido agregado con éxito', 'success');
          this.fetchProducts();
        })
        .catch((error) => {
          console.error('Error al agregar producto: ', error);
        });
    },
    eliminarProducto(prop) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`https://64a246f4b45881cc0ae4f33d.mockapi.io/api/v1/Carrito/${prop}`, {
            method: 'DELETE',
          })
            .then((res) => {
              this.refreshKey++;
              return res.json();
            })
            .then(() => {
              Swal.fire('Eliminado', 'El producto ha sido eliminado con éxito', 'success');
              this.fetchProducts();
            })
            .catch((error) => {
              console.error('Error al eliminar producto: ', error);
            });
        }
      });
    },
    editarProducto(producto) {
      this.nombre = producto.nombre;
      this.titulo = producto.titulo;
      this.descripcion = producto.descripcion;
      this.imagen = producto.imagen;
      this.precio = producto.precio;
      this.cantidad = producto.cantidad;
      this.editingProductId = producto.id;
      this.isEditing = true;
    },
    cancelarEdicion() {
      this.isEditing = false;
      this.limpiarFormulario();
    },
    limpiarFormulario() {
      this.nombre = '';
      this.titulo = '';
      this.descripcion = '';
      this.imagen = '';
      this.precio = 0;
      this.cantidad = 0;
      this.editingProductId = null;
    },
    actualizarProducto() {
      const body = {
        nombre: this.nombre,
        titulo: this.titulo,
        descripcion: this.descripcion,
        imagen: this.imagen,
        precio: this.precio,
        cantidad: this.cantidad,
      };
      fetch(`https://64a246f4b45881cc0ae4f33d.mockapi.io/api/v1/Carrito/${this.editingProductId}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          this.refreshKey++;
          this.isEditing = false;
          this.limpiarFormulario();
          return res.json();
        })
        .then(() => {
          Swal.fire('Éxito', 'Los cambios han sido guardados con éxito', 'success');
          this.fetchProducts();
        })
        .catch((error) => {
          console.error('Error al actualizar producto: ', error);
        });
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>

.admtitulo{
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

.table-actions {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  height: 70px;
}

.table-actions button {
  padding: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.acciones{
  text-align-last: center;
}

#buttonRemove {
  background-color: #dc3545; 
  color: #fff;
}

#buttonEdit {
  background-color: #007bff; 
  color: #fff;
}

.unidades{
  text-align: center;
}

.form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
  text-transform: uppercase;
}

input[type="text"],
textarea,
input[type="number"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-success {
  background-color: #28a745;
}

.btn-primary {
  background-color: #007bff;
}

.btn-secondary {
  background-color: #6c757d;
}

.boton{
  margin-top: 10px;
  margin-left: 5px;
}

</style>

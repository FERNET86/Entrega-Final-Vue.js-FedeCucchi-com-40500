<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <footer class="footer">
      <div class="container">
        <p>© {{ currentYear }} Vynil Store. Todos los derechos reservados // Contacto: contacto@vynilstore.com </p>
        <p></p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentYear: new Date().getFullYear(),
      };
    },
  };
  </script>
  
  <style>
  .footer {
    background-color: transparent;
    text-align: center;
  }
  
  .container {
    color: black;
    margin-top: 30px; 
    text-transform: uppercase;
    font-weight: bold;
    font-style: normal;
    font-size: medium;
 }
  </style>
  
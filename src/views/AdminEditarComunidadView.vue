<template>
  <div class="container-main">
    <MenuAdmin></MenuAdmin>
    <div class="container-formulario">
      <form onsubmit="event.preventDefault()" class="container-form">
        <div class="container-separador">
          <label for="nombre" class="label-formulario">Nombre</label>
          <input v-model="nombre" type="text" name="nombre" required>
        </div>
        <div class="container-separador">
          <label for="direccion" class="label-formulario">Dirección</label>
          <input v-model="direccion" type="text" name="direccion" required>
        </div>

        <div class="container-separador">
          <label for="codigo_postal" class="label-formulario">Código Postal</label>
          <input v-model="codigoPostal" type="text" name="codigo_postal" maxlength="5" required>
        </div>

        <div class="container-separador">
          <label for="descripcion" class="label-formulario">Descripción</label>
          <textarea v-model="descripcion" cols="0" rows="7" type="text" name="descripcion" required></textarea>
        </div>

        <input type="submit" class="button" @click="crearUsuario" value="Crear comunidad">
      </form>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import MenuAdmin from '../components/MenuAdmin.vue'
import { mapState } from 'vuex'

export default {
  name: 'AdminEditarComunidadView',
  components: {
    MenuAdmin
  },
  data () {
    return {
      nombre: '',
      direccion: '',
      codigoPostal: '',
      descripcion: ''
    }
  },
  computed: {
    ...mapState(['idGlobal', 'loginGlobal'])
  },
  methods: {

  }
}
</script>

<style scoped>
  .container-main{
    height: 100%;
    width: 100%;
  }

  .container-formulario{
    height: 92%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container-form{
    width: 60%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container-separador{
    width: 50%;
    margin-top: 10px;
    justify-content: center;
    border-radius: .5rem;
    padding: .75rem 1rem .25rem;
    background-color: #E7EFFF;
    display: flex;
    flex-direction: column;
  }

  input, textarea{
    width: 100%;
    background-color: #E7EFFF;
    font-size: 18px;
    border: none;
    outline: none;
    padding: .25rem .5rem .5rem 0;
    resize: none;
  }

  .label-formulario{
    font-size: .813rem;
  }

  .button{
    width: 16rem;
    height: 4rem;
    margin: 2rem;
    border: 0.1px solid black;
    border-radius: 20px;
    font-size: 20px;
    background-color: rgb(13, 108, 252);
    color: white;
  }

  .button:hover{
    background-color: #3246fc;
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .30);
  }
  </style>

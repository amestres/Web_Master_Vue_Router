<template>
  <div class="container-main">
    <MenuAdmin></MenuAdmin>
    <div class="container-formulario">
      <form onsubmit="event.preventDefault()" class="container-form">
        <div class="container-separador">
          <label for="nombre" class="label-formulario">Nombre</label>
          <input v-model="nombre" type="text" name="nombre" id="input-nombre" required autofocus >
        </div>
        <div class="container-separador">
          <label for="direccion" class="label-formulario">Dirección</label>
          <input v-model="direccion" type="text" name="direccion" id="input-direccion" required>
        </div>

        <div class="container-separador">
          <label for="codigo_postal" class="label-formulario">Código Postal</label>
          <input v-model="codigo_postal" type="text" name="codigo_postal" maxlength="5"  id="input-codigoPostal" required>
        </div>

        <div class="container-separador">
          <label for="descripcion" class="label-formulario">Descripción</label>
          <textarea v-model="descripcion" cols="0" rows="7" type="text" name="descripcion" id="textArea-descripcion" required></textarea>
        </div>

        <input type="submit" class="button" @click="crearComunidad" value="Crear comunidad">
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MenuAdmin from '../components/MenuAdmin.vue'
import { mapState } from 'vuex'

export default {
  name: 'AdminCrearComunidadView',
  components: {
    MenuAdmin
  },
  data () {
    return {
      nombre: '',
      direccion: '',
      codigo_postal: '',
      descripcion: ''
    }
  },
  computed: {
    ...mapState(['idGlobal', 'loginGlobal'])
  },
  methods: {
    async crearComunidad () {
      if (this.validarCodigoPostal(this.codigo_postal)) { // Controlamos que el código postal sea válido
        const response = await axios.post('http://localhost/api/?servicio=alta_comunidad', {
          id_administrador: this.idGlobal,
          nombre: this.nombre,
          direccion: this.direccion,
          codigo_postal: this.codigo_postal,
          descripcion: this.descripcion
        })

        // Mostramos por consola que mensaje nos ha devuelto la api
        if (response.data.data.resultado === 'ok') {
          console.log('Comunidad creada')
          this.resetInputs()
          document.getElementById('input-nombre').focus()
        } else {
          if (response.data.data.resultado === 'administrador_no_existe') {
            console.log('No existe un administrador con ese id')
          }
        }
      } else {
        console.log('El código postal no es válido')
        document.getElementById('input-codigoPostal').focus()
      }
    },

    resetInputs () { // Cuando creamos una comunidad nueva, al finalizar el proceso limpiamos los imputs para que el administrador pueda crear una nueva.
      this.nombre = ''
      this.direccion = ''
      this.codigo_postal = ''
      this.descripcion = ''
    },

    validarCodigoPostal (codigoPostal) { // Controlamos que el código postal que obtenemos con el input sea válido. Si es válido devolvemos un true
      if (codigoPostal.length === 5 && parseInt(codigoPostal) >= 1000 && parseInt(codigoPostal) <= 52999) {
        return true
      } else {
        return false
      }
    }
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

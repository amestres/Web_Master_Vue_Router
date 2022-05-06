<template>
  <div class="container-main">
    <MenuAdmin></MenuAdmin>
    <div class="container-formulario">
      <h1 class="title">Administrar comunidad</h1>
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
          <input v-model="codigo_postal" type="text" name="codigo_postal" maxlength="5" id="input-codigoPostal" required>
        </div>

        <div class="container-separador">
          <label for="descripcion" class="label-formulario">Descripción</label>
          <textarea v-model="descripcion" cols="0" rows="7" type="text" name="descripcion" required></textarea>
        </div>

        <input type="submit" class="button" @click="editarComunidad" value="Guardar cambios">
      </form>
    </div>
    <div class="container-usuarios">
      <h1 class="title-vecinos">Vecinos</h1>
      <div class="container-lista-usuarios">
        <VecinoCard v-for="vecino in cantidadVecinos" :key="vecino.id" :info="vecinos[vecino-1]"></VecinoCard>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MenuAdmin from '../components/MenuAdmin.vue'
import VecinoCard from '../components/VecinoCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'AdminEditarComunidadView',
  components: {
    MenuAdmin,
    VecinoCard
  },
  data () {
    return {
      id_comunidad: '',
      nombre: '',
      direccion: '',
      codigo_postal: '',
      descripcion: '',
      vecinos: [],
      cantidadVecinos: ''
    }
  },
  async mounted () {
    const response = await axios.post('http://localhost/api/?servicio=obtener_comunidades', {
      id_comunidad: this.idComunidadEditar
    })

    if (response.data.data.resultado === 'ok') { // Si la consulta a la api nos devuelve un registro, mostramos la información del registro en los inputs
      this.nombre = response.data.data.datos[0].nombre_comunidad
      this.direccion = response.data.data.datos[0].direccion
      this.codigo_postal = response.data.data.datos[0].codigo_postal
      this.descripcion = response.data.data.datos[0].descripcion
    } else if (response.data.data.resultado === 'sin_resultados') {
      console.log('No se encuuentra ninguna comunidad con el índice indicado')
    }

    // Llamada a la api para mostrar los vecino que pertenecen a esa comunidad
    const responseVecinos = await axios.post('http://localhost/api/?servicio=obtener_asignaciones', {
      id_comunidad: this.idComunidadEditar
    })

    if (responseVecinos.data.data.resultado === 'ok') { // Si la consulta a la api nos devuelve un registro, mostramos la información del registro en los inputs
      this.cantidadVecinos = responseVecinos.data.data.datos.length

      for (let x = 0; x < responseVecinos.data.data.datos.length; x++) {
        this.vecinos[x] = responseVecinos.data.data.datos[x]
      }
    } else if (responseVecinos.data.data.resultado === 'sin_resultados') {
      console.log('Esta comunidad no tiene vecinos')
    }
  },
  computed: {
    ...mapState(['idGlobal', 'loginGlobal', 'idComunidadEditar'])
  },
  methods: {
    async editarComunidad () {
      if (this.validarCodigoPostal(this.codigo_postal)) {
        const response = await axios.post('http://localhost/api/?servicio=modificar_comunidad', {
          id_comunidad: this.idComunidadEditar,
          id_administrador: this.idGlobal,
          nombre: this.nombre,
          direccion: this.direccion,
          codigo_postal: this.codigo_postal,
          descripcion: this.descripcion
        })

        if (response.data.data.resultado === 'ok') {
          console.log('Información actualizada')
        } else if (response.data.data.resultado === 'id_comunidad_no_existe') { // Informamos por consola dependiendo del resultado que nos devuelve la llamada
          console.log('Hay un error con el id de la comunidad')
        } else if (response.data.data.resultado === 'administrador_no_existe') {
          console.log('El usuario actual no tiene permisos de edición')
        } else if (response.data.data.resultado === 'no_es_su_creador') {
          console.log('El administrador actual no tiene creó la comunidad')
        }
      } else {
        console.log('El código postal no es válido')
        document.getElementById('input-codigoPostal').focus()
      }
    },

    validarCodigoPostal (codigoPostal) { // Controlamos que el código postal que obtenemos con el input sea válido. Si es válido devolvemos un true.
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

  .title{
    margin-top: 30px;
    font-size: 28px;
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

  .container-usuarios{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title-vecinos{
    margin-top: 80px;
    font-size: 28px;
  }

  .container-lista-usuarios{
    width: 30rem;
    height: 30rem;
    margin-top: 10px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid grey;
    border-radius: .5rem;
    padding: .75rem 1rem .25rem;
    overflow-y: auto;
  }
  </style>

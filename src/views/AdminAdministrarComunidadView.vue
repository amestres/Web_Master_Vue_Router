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
      <div class="container-vecinos">
        <h1 class="title-vecinos">Vecinos</h1>
        <div class="container-lista-usuarios">
          <VecinoCard v-for="vecino in cantidadVecinos" :key="vecino.id" :info="vecinos[vecino-1]"></VecinoCard>
        </div>
      </div>
      <div class="container-vecinos">
        <h1 class="title-vecinos">Usuarios</h1>
        <div class="container-lista-usuarios">
          <UsuarioCard v-for="usuario in cantidadUsuarios" :key="usuario.id" :info="usuarios[usuario-1]"></UsuarioCard>
        </div>
      </div>
    </div>

    <div class="container-zonas">
      <h1 class="title">Zonas comunes</h1>
      <div class="container-lista-zonas">
        <form onsubmit="event.preventDefault()" class="container-crear-zona">
          <div class="container-separador-crearZona">
            <label for="nombreZona">Nombre: </label>
            <input v-model="nombreZonaNueva" type="text" name="nombreZona" placeholder="Nombre zona común" required>
          </div>
          <div class="container-separador-crearZona-2">
            <label for="descripcionZona">Descripción: </label>
            <textarea v-model="descripcionZonaNueva" cols="0" rows="7" type="text" name="descripcionZona" required></textarea>
          </div>
          <div class="container-separador-toggle">
            <label class="label-toggle">No Activa</label>
            <toggle-button  v-model="infoToggle" color="#3246fc"/>
            <label class="label-toggle">Activa</label>
          </div>
          <div class="container-separador-boton">
            <input type="submit" value="Crear zona" class="boton-crear-zona" @click="crearZona">
          </div>
        </form>
        <ZonaComunCard v-for="zonaComun in cantidadZonas" :key="zonaComun.id" :info="zonas[zonaComun-1]" tipo="admin"></ZonaComunCard>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import MenuAdmin from '../components/MenuAdmin.vue'
import VecinoCard from '../components/VecinoCard.vue'
import UsuarioCard from '../components/UsuarioCard.vue'
import ZonaComunCard from '../components/ZonaComunCard.vue'

export default {
  name: 'AdminEditarComunidadView',
  components: {
    MenuAdmin,
    VecinoCard,
    UsuarioCard,
    ZonaComunCard
  },
  data () {
    return {
      id_comunidad: localStorage.id_comunidad,
      id_administrador: localStorage.id_usuario,
      nombre: '',
      direccion: '',
      codigo_postal: '',
      descripcion: '',
      vecinos: [],
      cantidadVecinos: '',
      usuarios: [],
      cantidadUsuarios: '',
      zonas: [],
      cantidadZonas: '',
      nombreZonaNueva: '',
      descripcionZonaNueva: '',
      zonaActiva: '',
      infoToggle: true
    }
  },
  async mounted () {
    // Llamada a la api para obtener la info de esa comunidad y mostrarla por pantalla
    const response = await axios.post('http://localhost/api/?servicio=obtener_comunidades', {
      id_comunidad: this.id_comunidad
    })

    if (response.data.data.resultado === 'ok') { // Si la consulta a la api nos devuelve un registro, mostramos la información del registro en los inputs
      this.nombre = response.data.data.datos[0].nombre_comunidad
      this.direccion = response.data.data.datos[0].direccion

      this.codigo_postal = this.validarLongitud(response.data.data.datos[0].codigo_postal)
      this.descripcion = response.data.data.datos[0].descripcion
    } else if (response.data.data.resultado === 'sin_resultados') {
      console.log('No se encuuentra ninguna comunidad con el índice indicado')
    }

    // Llamada a la api para mostrar los vecinos que pertenecen a esa comunidad
    const responseVecinos = await axios.post('http://localhost/api/?servicio=obtener_asignaciones', {
      id_comunidad: this.id_comunidad
    })

    if (responseVecinos.data.data.resultado === 'ok') {
      this.cantidadVecinos = responseVecinos.data.data.datos.length

      for (let x = 0; x < responseVecinos.data.data.datos.length; x++) {
        this.vecinos[x] = responseVecinos.data.data.datos[x]
      }
    } else if (responseVecinos.data.data.resultado === 'sin_resultados') {
      console.log('Esta comunidad no tiene vecinos')
    }

    // Llamada a la api para mostrar todos los usuarios registrados y dar la opción de añadirlo a la comunidad
    const responseUsuarios = await axios.post('http://localhost/api/?servicio=obtener_usuarios', {
      id_rol: '1'
    })

    if (responseUsuarios.data.data.resultado === 'ok') {
      let posicion = 0

      for (let x = 0; x < responseUsuarios.data.data.datos.length; x++) { // bucla para recorrer los registros que nos devuelve la api
        let yaPertecene = false

        for (let y = 0; y < this.vecinos.length; y++) { // buscle para recorrer la array de vecinos y comparar el registro actual de la api
          if (this.vecinos[y].id_usuario === responseUsuarios.data.data.datos[x].id_usuario) {
            yaPertecene = true
          }
        }

        if (yaPertecene === false) { // Si al salir del bucle sale la variable yaPertenece sigue siendo false quiere decir que ese usuario no peretenece a la comunidad
          this.usuarios[posicion] = responseUsuarios.data.data.datos[x]
          posicion = posicion + 1
        }
      }
      this.cantidadUsuarios = responseUsuarios.data.data.datos.length - (responseUsuarios.data.data.datos.length - posicion) // Cálculo para extraer cuantas card mostrar
    } else if (responseUsuarios.data.data.resultado === 'sin_resultados') {
      console.log('No existen usuarios')
    }

    // Llamada a la api para mostrar las zonas comunes que pertenecen a esa comunidad
    const responseZonasComunes = await axios.post('http://localhost/api/?servicio=obtener_zonas', {
      id_comunidad: this.id_comunidad
    })

    if (responseZonasComunes.data.data.resultado === 'ok') {
      this.cantidadZonas = responseZonasComunes.data.data.datos.length

      for (let x = 0; x < responseZonasComunes.data.data.datos.length; x++) {
        this.zonas[x] = responseZonasComunes.data.data.datos[x]
      }
    } else if (responseZonasComunes.data.data.resultado === 'sin_resultados') {
      // console.log('Esta comunidad no tiene zonas comunes')
    }
  },
  methods: {
    async editarComunidad () {
      if (this.validarCodigoPostal(this.codigo_postal)) {
        console.log(this.id_comunidad)
        const response = await axios.post('http://localhost/api/?servicio=modificar_comunidad', {
          id_comunidad: this.id_comunidad,
          id_administrador: this.id_administrador,
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

    async crearZona () {
      if (this.infoToggle === true) {
        this.zonaActiva = '1'
      } else if (this.infoToggle === false) {
        this.zonaActiva = '0'
      }

      const response = await axios.post('http://localhost/api/?servicio=alta_zona', {
        id_comunidad: this.id_comunidad,
        nombre: this.nombreZonaNueva,
        descripcion: this.descripcionZonaNueva,
        activa: this.zonaActiva
      })

      if (response.data.data.resultado === 'ok') {
        console.log('Zona común creada')
        this.resetInputs()
        this.$router.go()
      } else {
        if (response.data.data.resultado === 'administrador_no_existe') {
          console.log('No existe un administrador con ese id')
        }
      }
    },

    resetInputs () { // Cuando creamos una comunidad nueva, al finalizar el proceso limpiamos los imputs para que el administrador pueda crear una nueva.
      this.nombreZonaNueva = ''
      this.descripcionZonaNueva = ''
    },

    validarCodigoPostal (codigoPostal) { // Controlamos que el código postal que obtenemos con el input sea válido. Si es válido devolvemos un true.
      if (codigoPostal.length === 5 && parseInt(codigoPostal) >= 1000 && parseInt(codigoPostal) <= 52999) {
        return true
      } else {
        return false
      }
    },

    validarLongitud (codigoPostal) { // Controlamos que se muestren 5 dígitos, ya que la api no detecta los primero ceros en un número
      if (codigoPostal.length < 5) {
        return '0' + codigoPostal
      } else if (codigoPostal.length === 5) {
        return codigoPostal
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
    width: 40rem;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container-separador{
    width: 70%;
    margin-top: 10px;
    justify-content: center;
    border-radius: .5rem;
    padding: .75rem 1rem .25rem;
    background-color: #E7EFFF;
    display: flex;
    flex-direction: column;
  }

  .container-separador:hover{
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .30);
  }

  input, textarea{
    width: 100%;
    background-color: #E7EFFF;
    font-size: 18px;
    border: none;
    outline: none;
    padding: .25rem .5rem .5rem 0;
    resize: none;
    font-family: Avenir, Helvetica, Arial, sans-serif;
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
    cursor: pointer;
  }

  .button:hover{
    background-color: #3246fc;
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .30);
  }

  .container-usuarios{
    display: flex;
  }

  .container-vecinos{
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

  .container-zonas{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container-lista-zonas{
    width: 90%;
    height: 65rem;
    margin-top: 10px;
    margin-bottom: 20px;
    display: grid;
    justify-items: center;
    grid-template-columns: 50% 50%;
    grid-template-rows: 36% 36%;
    padding: .75rem ;
    overflow-y: auto;
  }

  .container-crear-zona{
    height: 300px;
    width: 34rem;
    padding: 10px;
    background-color: #E7EFFF;
    border: 1px solid grey;
    border-radius: 15px;
    margin-top: 20px;
  }

  .container-separador-crearZona{
    display: flex;
    font-size: 20px;
  }

  .container-separador-crearZona-2{
    font-size: 20px;
  }

  .container-separador-toggle{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .label-toggle{
    padding-right: 10px;
    padding-left: 10px;
  }

  .container-radio-buttons{
    display: flex;
    flex-direction: row;
  }

  .container-radioButton{
    width: 50%;
  }

  .container-separador-boton{
    margin-top: 28px;
    display: flex;
    justify-content: flex-end;
  }

  .boton-crear-zona{
    width: 8rem;
    border: 0.1px solid black;
    border-radius: 20px;
    background-color: rgb(13, 108, 252);
    color: white;
  }

  .boton-crear-zona:hover{
    background-color: #3246fc;
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .30);
    cursor: pointer;
  }

  /************* Tablet *************/
  @media (max-width: 1280px) {
    .container-lista-zonas{
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .container-lista-usuarios{
      width: 20rem;
    }

    .container-crear-zona{
      margin-bottom: 20px;
    }

  }

  /************* Mobile *************/
  @media (max-width: 767px) {
    .container-lista-usuarios{
      width: 20rem;
    }

    .container-form{
      width: 100%;
    }

    .container-separador{
      width: 80%;
    }

    .container-lista-usuarios{
      width: 14rem;
    }

    .container-crear-zona{
      width: 18rem;
    }
  }

  </style>

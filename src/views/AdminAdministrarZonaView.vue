<template>
  <div class="container-main">
    <MenuAdmin></MenuAdmin>
    <div class="container">
      <h1 class="title">Administrar zona común</h1>
      <form onsubmit="event.preventDefault()" class="container-form">
        <div class="container-separador">
          <label for="nombre" class="label-formulario">Nombre</label>
          <input v-model="nombre" type="text" name="nombre" required>
        </div>

        <div class="container-separador">
          <label for="descripcion" class="label-formulario">Descripción</label>
          <textarea v-model="descripcion" cols="0" rows="7" type="text" name="descripcion" required></textarea>
        </div>

        <div class="container-separador">
          <div class="container-row">
            <label class="label-toggle">No Activa</label>
            <toggle-button v-if="renderComponent" v-model="infoToggle" color="#3246fc"/>
            <label class="label-toggle">Activa</label>
          </div>
        </div>

        <input type="submit" class="button" @click="editarZona" value="Guardar cambios">
      </form>
    </div>
    <div class="container">
      <h3 class="subtitle">Reservas</h3>
      <div class="container-reservas">
        <ReservaCard v-for="reserva in cantidadReservas" :key="reserva.id" :info="reservas[reserva-1]" tipo="admin"></ReservaCard>
      </div>
    </div>
    <MDBFooter></MDBFooter>
  </div>
</template>

<script>
import axios from 'axios'
import MenuAdmin from '../components/MenuAdmin.vue'
import ReservaCard from '../components/ReservaCard.vue'
import MDBFooter from '../components/Footer.vue'

export default {
  name: 'AdminEditarZonaView',
  components: {
    MenuAdmin,
    ReservaCard,
    MDBFooter
  },
  data () {
    return {
      id: '',
      id_comunidad: '',
      nombre: '',
      descripcion: '',
      activa: '',
      reservas: [],
      cantidadReservas: '',
      infoToggle: true,
      renderComponent: true
    }
  },
  async mounted () {
    // Llamada a la api para obtener la info de esa comunidad y mostrarla por pantalla
    const response = await axios.post('http://localhost/api/?servicio=obtener_zonas', {
      id_zona: localStorage.id_zona
    })

    if (response.data.data.resultado === 'ok') { // Si la consulta a la api nos devuelve un registro, mostramos la información del registro en los inputs
      this.id_comunidad = response.data.data.datos[0].id_comunidad
      this.nombre = response.data.data.datos[0].nombre
      this.descripcion = response.data.data.datos[0].descripcion
      if (response.data.data.datos[0].activa === '1') { // Dependiendo del valor, mostramos el botón toggle de un lado o de otro
        this.infoToggle = true
      } else {
        this.infoToggle = false
      }
      this.forceRerender() // Usamos esta funcion para actualizar el toggle
    } else if (response.data.data.resultado === 'sin_resultados') {
      console.log('No se encuuentra ninguna comunidad con el índice indicado')
    }

    // Llamada a la api para obtener todas las reservas de esa zona común
    const responseReservas = await axios.post('http://localhost/api/?servicio=obtener_reservas', {
      id_zona: localStorage.id_zona
    })

    let posicion = 0

    if (responseReservas.data.data.resultado === 'ok') {
      const fechaActual = new Date()
      fechaActual.setMinutes(fechaActual.getMinutes() - fechaActual.getTimezoneOffset())
      let fechaBuena = fechaActual.toISOString().slice(0, 16)
      fechaBuena = fechaBuena.substr(0, 4) + '-' + fechaBuena.substr(5, 2) + '-' + fechaBuena.substr(8, 2) + ' ' + fechaBuena.substr(11, 2) + ':' + fechaBuena.substr(14, 2)

      for (let x = 0; x < responseReservas.data.data.datos.length; x++) {
        if (responseReservas.data.data.datos[x].fecha_inicio >= fechaBuena) {
          this.reservas[posicion] = responseReservas.data.data.datos[x]
          posicion = posicion + 1
        }
      }

      this.cantidadReservas = responseReservas.data.data.datos.length - (responseReservas.data.data.datos.length - posicion)
    } else if (responseReservas.data.data.resultado === 'sin_resultados') {
      console.log('No se encuentra ninguna reserva')
    }
  },
  methods: {
    async editarZona () {
      if (this.infoToggle === true) {
        this.activa = '1'
      } else if (this.infoToggle === false) {
        this.activa = '0'
      }

      const response = await axios.post('http://localhost/api/?servicio=modificar_zona', {
        id_zona: localStorage.id_zona,
        id_comunidad: this.id_comunidad,
        nombre: this.nombre,
        descripcion: this.descripcion,
        activa: this.activa
      })

      if (response.data.data.resultado === 'ok') {
        console.log('Información actualizada')
      }
    },
    forceRerender () {
      this.renderComponent = false

      this.$nextTick(() => {
        this.renderComponent = true
      })
    }
  }
}
</script>

<style scoped>
  .container-main{
    height: 100%;
    width: 100%;
  }

  .container{
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

  .subtitle{
    margin-top: 30px;
    font-size: 22px;
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

  .container-row{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-bottom: 5px;
  }

  .label-toggle{
    margin-right: 10px;
    margin-left: 10px;
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
    cursor: pointer;
  }

  .container-reservas{
    width: 50%;
    height: 40rem;
    margin-top: 20px;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    border-radius: .5rem;
    overflow-y: auto;
  }

  /************* Tablet *************/
  @media (max-width: 1280px) {
    .container-lista-zonas{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .container-reservas{
      width: 40rem;
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
      width: 28rem;
    }

    .container-reservas{
      width: 84%;
    }
  }

  @media (max-width: 546px) {
    .container-separador{
      width: 80%;
    }
  }

  </style>

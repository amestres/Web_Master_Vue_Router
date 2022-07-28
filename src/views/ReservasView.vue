<template>
  <div class="container-main">
    <MenuNormal></MenuNormal>
    <div class="container-reservas">
      <h1 class="title">Reservas</h1>
      <ReservaCard v-for="reserva in cantidadReservas" :key="reserva.id" :info="reservas[reserva-1]"></ReservaCard>
    </div>
    <MDBFooter></MDBFooter>
  </div>
</template>

<script>
import axios from 'axios'
import MenuNormal from '../components/MenuNormal.vue'
import ReservaCard from '../components/ReservaCard.vue'
import MDBFooter from '../components/Footer.vue'

export default {
  name: 'ReservasView',
  components: {
    MenuNormal,
    ReservaCard,
    MDBFooter
  },
  data () {
    return {
      reservas: [],
      cantidadReservas: ''
    }
  },
  async mounted () {
    // Llamada a la api para obtener todas las reservas de esa zona común
    const responseReservas = await axios.post('http://localhost/api/?servicio=obtener_reservas', {
      id_usuario: localStorage.id_usuario
    })

    if (responseReservas.data.data.resultado === 'ok') {
      const fechaActual = new Date()
      fechaActual.setMinutes(fechaActual.getMinutes() - fechaActual.getTimezoneOffset())
      const fechaBuena = fechaActual.toISOString().slice(0, 16)

      const anyoInicio = fechaBuena.substr(0, 4) // Me guardo el año del inicio de la reserva
      const mesInicio = fechaBuena.substr(5, 2) // Me guardo el mes del inicio de la reserva
      const diaInicio = fechaBuena.substr(8, 2) // Me guardo el día del inicio de la reserva
      const horaInicio = fechaBuena.substr(11, 2) // Me guardo la hora del inicio de la reserva
      const minutoInicio = fechaBuena.substr(14, 2) // Me guardo los minutos del inicio de la reserva
      const fechaInicioFormulario = anyoInicio + '-' + mesInicio + '-' + diaInicio + ' ' + horaInicio + ':' + minutoInicio

      let posicion = 0
      for (let x = 0; x < responseReservas.data.data.datos.length; x++) {
        if (responseReservas.data.data.datos[x].fecha_fin >= fechaInicioFormulario) {
          this.reservas[posicion] = responseReservas.data.data.datos[x]
          posicion = posicion + 1
        }
      }

      this.cantidadReservas = responseReservas.data.data.datos.length - (responseReservas.data.data.datos.length - posicion)
    } else if (responseReservas.data.data.resultado === 'sin_resultados') {
      console.log('No se encuentra ninguna reserva')
    }
  }
}
</script>

<style scoped>
  .container-main{
    width: 100%;
  }

  .container-reservas{
    height: 92%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title{
    margin-top: 30px;
    font-size: 20px;
  }
</style>

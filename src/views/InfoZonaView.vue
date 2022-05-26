<template>
  <div class="container-main">
    <MenuNormal></MenuNormal>
    <div class="container-formulario">
      <h1 class="title">{{nombre}}</h1>
      <div class="container-form">
        <div class="container-separador">
          <textarea v-model="descripcion" cols="0" rows="7" type="text" name="descripcion" readonly="readonly"></textarea>
        </div>
        <form onsubmit="event.preventDefault()" class="container-separador">
          <input type="datetime-local" v-model="fechaInicio" name="fechaInicio">
          <input type="datetime-local" v-model="fechaFin" name="fechaFin">
          <input type="submit" class="button" @click="crearReserva" value="Reservar">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MenuNormal from '../components/MenuNormal.vue'

export default {
  name: 'InfoZonaView',
  components: {
    MenuNormal
  },
  data () {
    return {
      id_usuario: localStorage.id_usuario,
      id_comunidad: '',
      nombre: '',
      descripcion: '',
      fechaInicio: '',
      fechaFin: '',
      resultado: ''
    }
  },
  async mounted () {
    const fechaActual = new Date()
    fechaActual.setMinutes(fechaActual.getMinutes() - fechaActual.getTimezoneOffset())
    this.fechaInicio = fechaActual.toISOString().slice(0, 16) // muestra la fecha actual en el primer input

    fechaActual.setMinutes(fechaActual.getMinutes() + 60)
    this.fechaFin = fechaActual.toISOString().slice(0, 16) // muestra la fecha actual + 1h en el primer input

    // Llamada a la api para obtener la info de esa comunidad y mostrarla por pantalla
    const response = await axios.post('http://localhost/api/?servicio=obtener_zonas', {
      id_zona: localStorage.id_zona
    })

    if (response.data.data.resultado === 'ok') { // Si la consulta a la api nos devuelve un registro, mostramos la información del registro en los inputs
      this.id_comunidad = response.data.data.datos[0].id_comunidad
      this.nombre = response.data.data.datos[0].nombre
      this.descripcion = response.data.data.datos[0].descripcion
    } else if (response.data.data.resultado === 'sin_resultados') {
      console.log('No se encuuentra ninguna comunidad con el índice indicado')
    }
  },
  methods: {
    async crearReserva () {
      if (this.validarFechas(this.fechaInicio, this.fechaFin)) {
        if (this.validarReserva(this.fechaInicio, this.fechaFin)) {
          const response = await axios.post('http://localhost/api/?servicio=alta_reserva', {
            id_zona: localStorage.id_zona,
            id_usuario: this.id_usuario,
            fecha_inicio: this.fechaInicio,
            fecha_fin: this.fechaFin
          })

          // Mostramos por consola que mensaje nos ha devuelto la api
          if (response.data.data.resultado === 'ok') {
            console.log('Reserva creada')
          } else {
            if (response.data.data.resultado === 'zona_no_activa') {
              console.log('La zona común no está activa')
            }
          }
        } else {
          console.log('No se puede reservar en esta franja horaria')
        }
      } else {
        console.log('Las fechas nos son válidas')
      }
    },
    validarFechas (inicio, fin) {
      const fechaActual = new Date()
      fechaActual.setMinutes(fechaActual.getMinutes() - fechaActual.getTimezoneOffset())
      const fechaBuena = fechaActual.toISOString().slice(0, 16)
      if (fechaBuena <= inicio) {
        if (inicio < fin) {
          return true
        }
      }
      return false
    },
    async validarReserva (inicio, fin) {
      const response = await axios.post('http://localhost/api/?servicio=obtener_reservas', { // Buscamos todas las reservas de esa zona
        id_zona: localStorage.id_zona
      })

      if (response.data.data.resultado === 'ok') {
        for (let x = 0; x < response.data.data.datos.length; x++) {
          const fechaInicioRegistro = response.data.data.datos[x].fecha_inicio.substr(0, 16) // fecha inicio del registro en formato 2022-05-26 11:24:40
          const fechaFinRegistro = response.data.data.datos[x].fecha_fin.substr(0, 16) // fecha inicio del fin en formato 2022-05-26 11:24:40

          const anyoInicio = inicio.substr(0, 4) // Me guardo el año del inicio de la reserva
          const mesInicio = inicio.substr(5, 2) // Me guardo el mes del inicio de la reserva
          const diaInicio = inicio.substr(8, 2) // Me guardo el día del inicio de la reserva
          const horaInicio = inicio.substr(11, 2) // Me guardo la hora del inicio de la reserva
          const minutoInicio = inicio.substr(14, 2) // Me guardo los minutos del inicio de la reserva

          const anyoFin = fin.substr(0, 4) // Me guardo el año del final de la reserva
          const mesFin = fin.substr(5, 2) // Me guardo el mes del final de la reserva
          const diaFin = fin.substr(8, 2) // Me guardo el día del final de la reserva
          const horaFin = fin.substr(11, 2) // Me guardo la hora del final de la reserva
          const minutoFin = fin.substr(14, 2) // Me guardo los minutos del final de la reserva

          const fechaInicioFormulario = anyoInicio + '-' + mesInicio + '-' + diaInicio + ' ' + horaInicio + ':' + minutoInicio
          const fechaFinFormulario = anyoFin + '-' + mesFin + '-' + diaFin + ' ' + horaFin + ':' + minutoFin

          // console.log('Fecha inicio formulario: ' + fechaInicioFormulario)
          // console.log('Fecha fin formulario: ' + fechaFinFormulario)

          // console.log('Fecha inicio registro: ' + fechaInicioRegistro)
          // console.log('Fecha fin registro: ' + fechaFinRegistro)

          if (fechaInicioRegistro <= fechaInicioFormulario && fechaInicioFormulario <= fechaFinRegistro) { // Si la fecha inicial se encuentra entre las fechas del registro
            console.log('1')
            return false
          } else if (fechaInicioRegistro <= fechaFinFormulario && fechaFinFormulario <= fechaFinRegistro) { // Si la fecha final se encuentra entre las fechas del registro tratado
            console.log('2')
            return false
          } else if (fechaInicioFormulario <= fechaInicioRegistro && fechaInicioRegistro <= fechaFinFormulario) { // La fecha inicial del registro se encuentra entre las fechas
            console.log('3')
            return false
          } else if (fechaInicioFormulario <= fechaFinRegistro && fechaFinRegistro <= fechaFinFormulario) { // Si la fecha final del registro se encuentra entre las fechas
            console.log('4')
            return false
          }
        }
        console.log('bien')
        return true
      } else if (response.data.data.resultado === 'sin_resultados') {
        console.log('No tiene reservas')
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

  .container-radio-buttons{
    display: flex;
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
    padding: .75rem ;
    overflow-y: auto;
  }

  /************* Tablet *************/
  @media (max-width: 1280px) {
    .container-lista-zonas{
      display: flex;
      flex-direction: column;
      align-items: center;
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
  }

  </style>

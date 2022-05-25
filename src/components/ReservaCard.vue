<template>
  <div class="reserva-card" >
    <div class="container-nombre-eliminar">
      <div class ="anchura-perfecta" >
        <p>{{nombre_usuario}}  {{apellidos_usuario}}</p>
      </div>
      <i class="uil uil-trash-alt icono-eliminar" @click="openAlert(info.id)" style="font-size: 1.5em"></i>
    </div>
    <div class="anchura-perfecta altura-perfecta" >
      <p>Inicio: {{fechaInicioFormated}}</p>
      <p>Fin: {{fechaFinFormated}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ReservaCard',
  data () {
    return {
      id_reserva: this.info.id,
      id_usuario: this.info.id_usuario,
      nombre_usuario: '',
      apellidos_usuario: '',
      fechaInicioFormated: '',
      fechaFinFormated: ''
    }
  },
  props: {
    info: {
      id: String,
      id_usuario: String,
      id_zona: String,
      fecha_inicio: String,
      fecha_fin: String
    }
  },
  async mounted () {
    const response = await axios.post('http://localhost/api/?servicio=obtener_usuarios', {
      id_usuario: this.id_usuario
    })

    if (response.data.data.resultado === 'ok') {
      this.nombre_usuario = response.data.data.datos[0].nombre
      this.apellidos_usuario = response.data.data.datos[0].apellidos
    } else if (response.data.data.resultado === 'sin_resultados') {
      console.log('No existe ningún usuario con ese id')
    }

    const anyoInicio = this.info.fecha_inicio.substr(0, 4) // Me guardo el año del inicio de la reserva
    const mesInicio = this.info.fecha_inicio.substr(5, 2) // Me guardo el mes del inicio de la reserva
    const diaInicio = this.info.fecha_inicio.substr(8, 2) // Me guardo el día del inicio de la reserva
    const horaInicio = this.info.fecha_inicio.substr(11, 2) // Me guardo la hora del inicio de la reserva
    const minutoInicio = this.info.fecha_inicio.substr(14, 2) // Me guardo los minutos del inicio de la reserva

    const anyoFin = this.info.fecha_fin.substr(0, 4) // Me guardo el año del final de la reserva
    const mesFin = this.info.fecha_fin.substr(5, 2) // Me guardo el mes del final de la reserva
    const diaFin = this.info.fecha_fin.substr(8, 2) // Me guardo el día del final de la reserva
    const horaFin = this.info.fecha_fin.substr(11, 2) // Me guardo la hora del final de la reserva
    const minutoFin = this.info.fecha_fin.substr(14, 2) // Me guardo los minutos del final de la reserva

    this.fechaInicioFormated = diaInicio + '/' + mesInicio + '/' + anyoInicio + ' ' + horaInicio + ':' + minutoInicio
    this.fechaFinFormated = diaFin + '/' + mesFin + '/' + anyoFin + ' ' + horaFin + ':' + minutoFin
  },
  methods: {
    openAlert (id) {
      localStorage.id_reserva = id
      this.$confirm('¿Desea eliminar la reserva?', '', 'question').then(() => {
        this.eliminarReserva()
      })
    },

    async eliminarReserva () {
      const response = await axios.post('http://localhost/api/?servicio=eliminar_reserva', {
        id_reserva: localStorage.id_reserva
      })

      if (response.data.data.resultado === 'ok') {
        console.log('Reserva eliminada con éxito')
        this.$router.go()
      } else if (response.data.data.resultado === 'id_comunidad_no_existe') {
        console.log('No existe ninguna reserva con este id')
      }
    }
  }
}
</script>

<style scoped>
  .reserva-card{
    height: 120px;
    width: 60%;
    margin-top: 20px;
    padding: 20px;
    background-color: #E7EFFF;
    border: 1px solid grey;
    border-radius: 15px;
  }

  .reserva-card:hover{
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .30);
  }

  .container-nombre-eliminar{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .anchura-perfecta{
    width: 99%;
  }

  .altura-perfecta{
    height: 85%;
  }

  .nombre{
    font-size: 20px;
  }

  .icono-eliminar:hover{
    color:red
  }

  /************* Tablet *************/
  @media (max-width: 1280px) {
    .reserva-card{
      width: 80%;
    }
  }

  /************* Mobile *************/
  @media (max-width: 767px) {
    .reserva-card{
      width: 80%;
    }
  }
</style>

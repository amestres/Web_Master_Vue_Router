<template>
  <div class="container-main">
    <MenuNormal></MenuNormal>
    <div class="container-formulario">
      <h1 class="title">{{nombre}}</h1>
      <div class="container-separador">
        <label for="direccion" class="label-formulario">Dirección: {{direccion}}</label>
        <label for="codigo_postal" class="label-formulario">Código Postal: {{codigo_postal}}</label>
        <textarea v-model="descripcion" cols="0" rows="7" type="text" name="descripcion" readonly="readonly"></textarea>
      </div>
    </div>

    <div class="container-zonas">
      <h1 class="title">Zonas comunes</h1>
      <div class="container-lista-zonas">
        <ZonaComunCard v-for="zonaComun in cantidadZonas" :key="zonaComun.id" :info="zonas[zonaComun-1]"></ZonaComunCard>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import MenuNormal from '../components/MenuNormal.vue'
import ZonaComunCard from '../components/ZonaComunCard.vue'

export default {
  name: 'InfoComunidadView',
  components: {
    MenuNormal,
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
      zonas: [],
      cantidadZonas: '',
      nombreZonaNueva: '',
      descripcionZonaNueva: '',
      zonaActiva: ''

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

  .container-separador{
    width: 78%;
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

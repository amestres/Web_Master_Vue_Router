<template>
  <div class="container-main">
    <MenuNormal></MenuNormal>
    <div class="container-formulario">
      <h1 class="title">{{nombre}}</h1>
      <div class="container-form">
        <div class="container-separador">
          <textarea v-model="descripcion" cols="0" rows="7" type="text" name="descripcion" readonly="readonly"></textarea>
        </div>
        <div class="container-separador">
          <input type="datetime-local" :value="fechaInicio" name="fechaInicio">
          <input type="datetime-local" :value="fechaFin" name="fechaFin">
        </div>
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
      id: '',
      id_comunidad: '',
      nombre: '',
      descripcion: '',
      fechaInicio: '',
      fechaFin: ''
    }
  },
  watch: {
    // whenever question changes, this function will run
    fechaInicio (newQuestion, oldQuestion) {
      if (newQuestion !== oldQuestion) {
        console.log('hola')
      }
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
    } else if (response.data.data.resultado === 'sin_resultados') {
      console.log('No se encuuentra ninguna comunidad con el índice indicado')
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

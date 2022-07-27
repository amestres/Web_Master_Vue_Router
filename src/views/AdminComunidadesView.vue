<template>
  <div class="container-main">
    <MenuAdmin></MenuAdmin>
    <div class="container-comunidades">
      <ComunidadCard v-for="comunidad in cantidadComunidades" :key="comunidad.id_administrador" :info="comunidades[comunidad-1]"></ComunidadCard>
    </div>
    <MDBFooter></MDBFooter>
  </div>
</template>

<script>
import axios from 'axios'
import MenuAdmin from '../components/MenuAdmin.vue'
import ComunidadCard from '../components/ComunidadCard.vue'
import MDBFooter from '../components/Footer.vue'

export default {
  name: 'AdminComunidadesView',
  components: {
    MenuAdmin,
    ComunidadCard,
    MDBFooter
  },
  data () {
    return {
      comunidades: [],
      cantidadComunidades: '',

      // GLOBAL
      login: localStorage.login,
      id: localStorage.id_usuario
    }
  },
  async mounted () {
    const idAdministrador = this.id

    const response = await axios.post('http://localhost/api/?servicio=obtener_comunidades', {
      idAdministrador
    })

    // Creamos un nuevo div y mostramos la información de cada comunidad devuelta
    if (response.data.data.resultado === 'ok') {
      this.cantidadComunidades = response.data.data.datos.length // Guardamos el número de registros que nos ha devuelto la consulta para usarlo en el v-for

      for (let x = 0; x < response.data.data.datos.length; x++) { // Sabiendo el número máximo de registros, guardamos la info de cada registro en una array
        this.comunidades[x] = response.data.data.datos[x]
      }
    } else {
      if (response.data.data.resultado === 'sin_resultados') {
        console.log('Este administrador no tiene ningúna comunidad creada')
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

  .container-comunidades{
    height: 92%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4rem;
  }
</style>

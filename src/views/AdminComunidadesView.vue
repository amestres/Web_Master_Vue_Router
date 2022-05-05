<template>
  <div class="container-main">
    <MenuAdmin></MenuAdmin>
    <div class="container-comunidades">
      <ComunidadCard v-for="comunidad in cantidadComunidades" :key="comunidad.id_administrador"></ComunidadCard>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MenuAdmin from '../components/MenuAdmin.vue'
import ComunidadCard from '../components/ComunidadCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'AdminComunidadesView',
  components: {
    MenuAdmin,
    ComunidadCard
  },
  data () {
    return {
      comunidades: {},
      cantidadComunidades: ''
    }
  },
  async mounted () {
    const idAdministrador = this.idGlobal
    const response = await axios.post('http://localhost/api/?servicio=obtener_comunidades', {
      idAdministrador
    })

    // Creamos un nuevo div y mostramos la información de cada comunidad devuelta
    if (response.data.data.resultado === 'ok') {
      this.cantidadComunidades = response.data.data.datos.length
      for (let x = 0; x < response.data.data.datos.length; x++) {
        this.comunidades[x] = response.data.data.datos[x]
      }
      console.log(this.comunidades)
    } else {
      if (response.data.data.resultado === 'sin_resultados') {
        console.log('Este administrador no tiene ningúna comunidad creada')
      }
    }
  },
  computed: {
    ...mapState(['idGlobal', 'loginGlobal'])
  },
  methods: {
    async obtenerComunidades () {

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
  }
</style>

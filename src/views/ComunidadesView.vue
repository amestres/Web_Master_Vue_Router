<template>
  <div class="container-main">
    <MenuNormal></MenuNormal>
    <div class="container-comunidades">
      <ComunidadCardUsuario v-for="comunidad in cantidadComunidades" :key="comunidad.id_comunidad" :info="comunidades[comunidad-1]"></ComunidadCardUsuario>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MenuNormal from '../components/MenuNormal.vue'
import ComunidadCardUsuario from '../components/ComunidadCardUsuario.vue'

export default {
  name: 'ComunidadesView',
  components: {
    MenuNormal,
    ComunidadCardUsuario
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
    const response = await axios.post('http://localhost/api/?servicio=obtener_asignaciones', {
      id_usuario: this.id
    })

    if (response.data.data.resultado === 'ok') {
      this.cantidadComunidades = response.data.data.datos.length // Miramos a cuantas comunidades pertenece ese usuario

      for (let x = 0; x < response.data.data.datos.length; x++) { // Por cada comunidad hacemos una llamada a la api pasando el id de esa comunidad para así extraer su información
        const responseComunidad = await axios.post('http://localhost/api/?servicio=obtener_comunidades', {
          id_comunidad: response.data.data.datos[x].id_comunidad // Este id lo conseguimos en la conulta anterior
        })

        if (responseComunidad.data.data.resultado === 'ok') {
          this.comunidades[x] = responseComunidad.data.data.datos[0] // Pasamos a la array de comunidades los datos del registro que nos devuelve la api
        } else if (responseComunidad.data.data.resultado === 'sin_resultados') {
          console.log('No existe ninguna comunidad con ese id')
        }
      }
      console.log(this.comunidades)
    } else if (response.data.data.resultado === 'sin_resultados') {
      console.log('Este usuario no tiene ninguna comunidad creada')
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

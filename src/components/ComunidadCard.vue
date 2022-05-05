<template>
  <div class="container-card" @click="goTo">
      <p>{{info.nombre_comunidad}}</p>
      <p>{{info.direccion}}</p>
      <p>{{info.codigo_postal}}</p>
      <p>{{info.descripcion}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ComunidadCard',
  data () {
    return {
      string: ''
    }
  },
  props: ['info'],
  computed: {
    ...mapState(['loginGlobal'])
  },
  methods: {
    goTo () {
      this.$router.push(`/ADMIN/${this.loginGlobal}/editarComunidad`)
    }
  }
}
</script>

<style scoped>
  .container-card{
    height: 200px;
    width: 60%;
    margin-top: 20px;
    background-color: #E7EFFF;
    border: 1px solid grey;
    border-radius: 15px;
  }
  .container-card:hover{
    height: 200px;
    width: 62%;
    margin-top: 20px;
    background-color: #E7EFFF;
    border-radius: 15px;
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .30);
  }
</style>

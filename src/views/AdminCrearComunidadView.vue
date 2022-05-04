<template>
  <div class="container-main">
    <MenuAdmin></MenuAdmin>
    <p>2</p>
  </div>
</template>

<script>
import MenuAdmin from '../components/MenuAdmin.vue'
import { mapState } from 'vuex'

export default {
  name: 'AdminCrearComunidadView',
  components: {
    MenuAdmin
  },
  computed: {
    ...mapState(['idGlobal', 'loginGlobal'])
  }
}
</script>

<style scoped>
  .container-main{
    width: 100%;
  }
</style>

<template>
  <div class="container-main">
    <MenuNormal></MenuNormal>
    <p>2</p>
  </div>
</template>

<script>
import MenuNormal from '../components/MenuNormal.vue'
import { mapState } from 'vuex'

export default {
  name: 'ReservasView',
  components: {
    MenuNormal
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

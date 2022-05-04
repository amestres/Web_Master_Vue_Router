<template>
  <div id="container-main">
    <MenuNormal></MenuNormal>
    <router-view/>
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

</style>

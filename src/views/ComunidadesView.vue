<template>
  <div id="container-main">
    <MenuNormal></MenuNormal>
    <router-view/>
  </div>
</template>

<script>
import MenuNormal from '../components/MenuNormal.vue'

export default {
  name: 'ComunidadesView',
  components: {
    MenuNormal
  },
  data () {
    return {
      login: this.$route.params.userLogin
    }
  }
}
</script>

<style scoped>

</style>

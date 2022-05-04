<template>
  <div id="container-main">
    <MenuNormal></MenuNormal>
    <router-view/>
  </div>
</template>

<script>
import MenuNormal from '../components/MenuNormal.vue'

export default {
  name: 'ReservasView',
  components: {
    MenuNormal
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>

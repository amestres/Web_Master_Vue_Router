<template>
  <div id="container">
      <p>{{info}}</p>
  </div>
</template>

<script>

export default {
  name: 'PerfilView',
  data () {
    return {
      info: ''
    }
  },
  mounted () {
    this.info = this.$route.params.loginUsuario
  }
}
</script>

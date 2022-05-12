<template>
  <div class="container-zona">

  </div>
</template>

<script>

export default {
  name: 'ZonaComunCard',
  data () {
    return {
      id: '',
      nombre: '',
      descripcion: '',
      activa: ''
    }
  },
  props: ['info']
}
</script>

<style scoped>
  .container-zona{
    height: 300px;
    width: 100%;
    border: 1px solid black;
  }
</style>

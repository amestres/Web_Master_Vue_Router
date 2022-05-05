<template>
  <div class="container-card">

  </div>
</template>

<script>

export default {
  name: 'ComunidadCard',
  data () {
    return {
      string: ''
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

<template>
  <div>
    <button class="button" @click="goTo">Volver</button>
  </div>

</template>

<script>

export default {
  name: 'ErrorView',
  methods: {
    goTo () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .container-botones{
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .button{
    width: 16rem;
    height: 4rem;
    margin: 2rem;
    border: 0.1px solid black;
    border-radius: 20px;
    font-size: 20px;
    background-color: rgb(13, 108, 252);
    color: white;
  }

  .button:hover{
    background-color: #3246fc;
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .30);
  }
</style>

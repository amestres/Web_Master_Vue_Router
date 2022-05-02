<template>
  <div class="container-formularios">
    <form onsubmit="event.preventDefault()">
      <div class="container-separador">
        <label for="login" class="label-formulario">Login</label>
        <input v-model="formData.login" type="text" name="login" required>
      </div>

      <div class="container-separador">
        <label for="password" class="label-formulario">Password</label>
        <input v-model="formData.password" type="password" name="password" required>
      </div>

      <input type="submit" id="boton" @click="logearUsuario" value="Entrar">
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginView',
  data () {
    return {
      formData: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    // Funcion para ver si existe un registro con login y la password que se han introducido
    async logearUsuario () {
      const response = await axios.post('http://localhost/api/?servicio=login', {
        login: this.formData.login,
        password: this.formData.password
      })

      // Mostramos por consola que mensaje nos ha devuelto la api
      if (response.data.data.resultado === 'ok') {
        console.log('Usuario encontrado')
        this.resetInputs()
      } else {
        if (response.data.data.resultado === 'no_ok') {
          console.log('Usuario no encontrado')
        }
      }
    },
    resetInputs () {
      this.formData.login = ''
      this.formData.password = ''
    }
  }
}
</script>

<style scoped>

  .container-formularios{
    display: flex;
    justify-content: center;
  }

  .container-separador{
    margin-top: 10px;
    justify-content: center;
    border-radius: .5rem;
    padding: .75rem 1rem .25rem;
    background-color: #E7EFFF;
  }

  input{
    width: 100%;
    background-color: #E7EFFF;
    font-size: var(--normal-font-size);
    border: none;
    outline: none;
    padding: .25rem .5rem .5rem 0;
  }

  .label-formulario{
    font-size: .813rem;
  }

  #boton{
    width: 16rem;
    height: 4rem;
    margin: 2rem;
    border: 0.5px solid black;
    border-radius: 20px;
    font-size: 20px;
    background-color: rgb(13, 108, 252);
    color: white;
  }

  #boton:hover{
    background-color: #3246fc;
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .30);
  }
</style>

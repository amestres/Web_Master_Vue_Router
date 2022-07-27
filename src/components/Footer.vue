<template>
  <div class="container-main-footer">
    <div class="container-copyright">
      <p>© 2022 Copyright: Adrià Mestres</p>
    </div>

    <div class="container-contact">
      <a href="https://www.linkedin.com/in/adri%C3%A0-mestres-herrero-966514163/" class="uil uil-linkedin" target="_blank" style="font-size: 1.5em"></a>
      <a href="https://github.com/amestres"  class="uil uil-github" target="_blank" style="font-size: 1.5em"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
  .container-main-footer{
    position: fixed;
    width: 100%;
    height: 40px;
    bottom:0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid black;
    background-color: rgb(13, 108, 252);
    color: white
  }

  .link-github{
    color: white;
    text-decoration: none;
  }

  .container-copyright{
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .container-contact{
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  p{
    margin-left: 10px;
  }

  a{
    margin-left: 20px;
    cursor: pointer;
    color: white;
    text-decoration: none;
  }

  /************* Tablet *************/
  @media (max-width: 1280px) {

  }

  /************* Mobile *************/
  @media (max-width: 767px) {
    p{
      font-size: 12px;
    }
  }
</style>

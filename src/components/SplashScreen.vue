<template>
<div id="newSplash">
  <div class="splashscreen-wrapper">
    <transition @leave="leaveEl" v-on:after-appear="leaveEl"  appear>
      <div class="logo-wrapper">
      </div>
     </transition>
    <div class="logo-letters-group">
      <span class="logo-letter" v-for="(item, index) in logoName" :key="index" v-if="item !== 'img'">{{item}}</span>
      <span class="logo-letter" v-else > <img src="https://www.siwca.com.ar/wp-content/uploads/2018/06/idata-logo.svg" /> </span>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'SplashScreen',
  data () {
    return {
      show: true,
      logoName: ['img',' ',' ','j','o','i','n',' ','u','p']
    }
  },
  methods: {
    leaveEl (el) {
     this.$router.push('/ingresar')
    }
  }
}
</script>

<style lang="scss" scoped>
#newSplash {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 5%;
  text-align: center;
  background-repeat: no-repeat;
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  background-size:cover;
 // background-position: -663px -6px;
  // background-size: 100% 100%;
  filter: grayscale(30%);
  .component-wrapper {
    box-shadow: 5px 5px 5px 5px rgba(0,0,0,0.2);
    height: 100%;
    background: white;
    overflow: hidden;
  }
}
</style>

<style lang="scss" scoped>
@import '../assets/sass/splashScreen.scss'
</style>

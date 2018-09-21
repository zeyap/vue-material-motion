<template>
  <div id="app">
    <TweenWrapper color="#8236ed" position="bottom-right"><Card/></TweenWrapper>
  </div>
</template>

<script>
import {TweenWrapper, Card} from '../src/index.js'

export default {
  name: 'app',

  components: {TweenWrapper,Card}
}
</script>

<style>

</style>

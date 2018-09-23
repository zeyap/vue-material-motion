<template>
  <div id="app">
    <TweenWrapper color="#8236ed" position="bottom-right"><Card/>
    </TweenWrapper>
    <FAB/>
  </div>
</template>

<script>
import {TweenWrapper, Card, FAB} from '../src/index.js'

export default {
  name: 'app',

  components: {TweenWrapper,Card,FAB}
}
</script>

<style>

</style>

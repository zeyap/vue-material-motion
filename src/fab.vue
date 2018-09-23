<template>
  <div class="fab" v-on:click="rotate">
    <div ref="icon_out" class="fa-icon out">
      <v-icon name="bars"/>
    </div>
    <div ref="icon_in" class="fa-icon in">
      <v-icon name="times"/>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/times'
import 'vue-awesome/icons/bars'
import Icon from 'vue-awesome/components/Icon'
import Fade from '../src/fade.js'
export default {
  name: 'FAB',
  components: {
    'v-icon': Icon
  },
  props:{

  },
  methods: {
    rotate(){
      if(this.getState()===0){//clockwise
      // console.log('clockwise')
        this.setStateAfter();
      }else{//counter
      // console.log('counter')
        this.setStateBefore();
      }
    },
  },
  mounted(){
    this.icon_out = this.$refs.icon_out;
    this.icon_in = this.$refs.icon_in;
    let anim= new Fade(this.icon_out,this.icon_in,'fade',{
      out:"transform 0.4s",
      in:"transform 0.4s"
    });
    [this.setSpeed, this.setStateBefore, this.setStateAfter, this.getState]
     = [anim.setSpeed,
     function(){
       anim.setStateBefore();
       this.icon_out.style.transform = "rotate(0)";
       this.icon_in.style.transform = "rotate(-0.25turn)";
     },
     function(){
       anim.setStateAfter();
       this.icon_out.style.transform = "rotate(0.25turn)";
      this.icon_in.style.transform = "rotate(0)";
     },
     anim.getState];
     this.setSpeed();
     
  }

}
</script>

<style>

.fab{
  width: 56px;
  height: 56px;
  background: blueviolet;
  border-radius: 50%;
  position: absolute;
  top: 0px;

  display: flex;
  flex-flow:row nowrap;
  justify-content: center;
  align-items: center;

  color: white;
}
.fa-icon{
  position: absolute;
  height: 18px;
  width: 18px;
}

</style>

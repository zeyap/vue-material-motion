<template>
  <div class="fab" ref="fab" v-on:click="rotate">
    <div ref="icon_out" class="fab-icon out">
      <v-icon name="bars"/>
    </div>
    <div ref="icon_in" class="fab-icon in">
      <v-icon name="times"/>
    </div>
    <div ref="tooltip0" class="tooltip" v-bind:style="'color:'+color"><B><slot></slot></B></div>
    <div ref="tooltip1" class="tooltip"/>
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
    color: String,
    border: String,
    position: Object
  },
  methods: {
    rotate(){
      if(this.getState()===0){//clockwise
      // console.log('clockwise')
        this.setStateAfter();
        window.setTimeout(this.rotate,1500);
      }else{//counter
      // console.log('counter')
        this.setStateBefore();
      }
    },
  },
  mounted(){
    //animation of button
    let fab= this.$refs.fab;
    if(this.border=='true'){
      fab.style.border="solid 2px #ffffff";
    }
    if(this.position){
      if(this.position.left){
        fab.style.left = this.position.left;
      }
      if(this.position.top){
        fab.style.top = this.position.top;
      }
    }
    
    this.tooltip = this.$refs.tooltip0;
    //animation of tooltip
     let tooltipAnim = new Fade(this.$refs.tooltip1,this.$refs.tooltip0,'fade-through',{
       out:"left 0.4s",
       in:"left 0.4s"
     });
     [this.setTooltipBefore, this.setTooltipAfter]=[
       tooltipAnim.setStateBefore, tooltipAnim.setStateAfter
     ]
    
    fab.style.background = this.color||'blueviolet';
    this.icon_out = this.$refs.icon_out;
    this.icon_in = this.$refs.icon_in;
    let anim= new Fade(this.icon_out,this.icon_in,'fade-through',{
      out:"transform 0.4s",
      in:"transform 0.4s"
    });
    [this.setSpeed, this.setStateBefore, this.setStateAfter, this.getState]
     = [function(){
       anim.setSpeed();
       this.setStateBefore();
     },
     function(){
       anim.setStateBefore();
       this.icon_out.style.transform = "rotate(0)";
       this.icon_in.style.transform = "rotate(-0.25turn)";
     
       this.tooltip.style.left = "0";

       this.setTooltipBefore();
     },
     function(){
       anim.setStateAfter();
       this.icon_out.style.transform = "rotate(0.25turn)";
      this.icon_in.style.transform = "rotate(0)";

      this.tooltip.style.left = "84px";
      
      this.setTooltipAfter();
     },
     anim.getState];
     this.setSpeed();
    //  this.setTooltipSpeed();
     
     
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
  
  display: flex;
  flex-flow:row nowrap;
  justify-content: center;
  align-items: center;

  color: white;
}
.fab-icon{
  position: absolute;
  height: 18px;
  width: 18px;

  display: flex;
  flex-flow:row nowrap;
  justify-content: center;
  align-items: center;
}

.tooltip{
  position: absolute;
  transition:opacity 0.2s, transform 0.4s;
  transition-delay: 0.2s, 0s;
  min-width: 300px;
  text-shadow:
    -1px -1px 0 #fff,
    1px -1px 0 #fff,
    -1px 1px 0 #fff,
    1px 1px 0 #fff;  
}

</style>

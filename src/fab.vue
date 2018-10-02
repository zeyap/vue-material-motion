<template>
  <div class="fab" ref="fab" v-on:click="rotate">
    <div ref="icon_out" class="fab-icon out">
      <v-icon v-bind:name="name"/>
    </div>
    <div ref="icon_in" class="fab-icon in">
      <v-icon v-bind:name="name_after"/>
    </div>
    <div ref="tooltip0" class="tooltip" v-bind:style="'color:'+color"><slot></slot></div>
    <div ref="tooltip1" class="tooltip"/>
  </div>
  
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import Fade from '../src/fade.js'
import { setTimeout } from 'timers';
export default {
  name: 'FAB',
  components: {
    'v-icon': Icon
  },
  props:{
    color: String,
    border: String,
    position: Object,
    name: String,
    name_after: String
  },
  data(){
    return {
      
    };
  },
  methods: {
    rotate(){
      if(this.getState()===0){//clockwise
        this.setStateAfter();
        this.$refs.fab.style['pointer-events'] = 'none';
        setTimeout((function(){

          this.rotate();
          this.$refs.fab.style['pointer-events'] = 'auto';
        }).bind(this),1000)
        
      }else{//counter
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
      }else if(this.position.right){
        fab.style.right = this.position.right;
      }
      if(this.position.top){
        fab.style.top = this.position.top;
      }else if(this.position.bottom){
        fab.style.bottom = this.position.bottom;
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
     if(this.position.left){
       this.tooltip.style.left = "0";
     }else{
       this.tooltip.style.right = "0";
     }
       
       this.tooltip.style['pointer-events'] = 'none';

       this.setTooltipBefore();
     },
     function(){
       anim.setStateAfter();
      this.icon_out.style.transform = "rotate(0.25turn)";
      this.icon_in.style.transform = "rotate(0)";
      if(this.position.left){
        this.tooltip.style.left = "84px";
      }else{
        this.tooltip.style.right = "84px";
      }
      
      this.tooltip.style['pointer-events'] = 'auto';
      
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
}

</style>

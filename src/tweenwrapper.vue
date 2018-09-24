<template>
  <div ref ="container" class="tween-container">
    <div v-for="item in btnList" v-bind:key="item" ref="roundButton" class="tween-button" v-on:click="expand(item)"></div>
    <div class="tween-slot"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TweenWrapper',
  props:{
    color: Array,
    position: Object,
    radius: String,
    button_number: String,
    border: String
  },
  data(){
    return {
      btnList: ((function(){
        let list = [];
        for(let i=0;i<this.button_number;i++){
          list.push(i);
        }
        return list;
      }).bind(this))(this),
      spacing: this.radius||"65px"
    }
  },
  methods:{
    expand(id){
      this.enlarge(id)

      window.setTimeout((function(){
        this.reduce(id);
      }).bind(this),500)
    },
    enlarge(id){
      let btn = this.btn[id];
      let rad = "100vw";
      if(window.matchMedia("(min-aspect-ratio: 1/1)").matches){//width-to-height
        rad = "100vw";
      }else{
        rad = "100vh";
      }
      btn.style.width=rad;
      btn.style.height=rad;
      btn.style["border-radius"]="0";
      btn.style.opacity=1;
      btn.style.transform ="translateX(0) translateY(0)";
      btn.style.border="none";

      this.$refs.container.style.background = this.color===undefined?'blueviolet':this.color[id];
      
    },
    reduce(i){
      this.btn[i] = this.$refs.roundButton[i];
      this.btn[i].style.background = this.color===undefined?'blueviolet':this.color[i];
      this.btn[i].style.width=this.radius||"65px";
      this.btn[i].style.height=this.radius||"65px";
      this.btn[i].style["border-radius"]="50%";
      if(this.position&&this.position.bottom){
        this.btn[i].style.transform = "translateX("+parseInt(this.spacing)*(2*i-(parseInt(this.button_number)-1))+"px)"
      +"translateY(calc(50vh - "+this.position.bottom+"))";
      }else if(this.position&&this.position.top){
        this.btn[i].style.transform = "translateX("+parseInt(this.spacing)*(2*i-(parseInt(this.button_number)-1))+"px)"
      +"translateY(calc(-50vh + "+this.position.top+"))"
      }
      
      if(this.border=="true"){
        if(this.color[i]!=='#ffffff')
          this.btn[i].style.border="solid 2px #ffffff";
        else
          this.btn[i].style.border="solid 2px #dddddd";
      }
    }

  },
  mounted(){
    let len = parseInt(this.button_number);
    this.btn=[];
    for(let i=0;i<len;i++){
      this.reduce(i);
    }
  }
}
</script>

<style>
body{
  /* background: beige; */
  margin: 0;
  /* height: 100%; */
  
}

.tween-container{
  position: relative;
  /* background: white; */

  width: 100%;
  height: 100vh;
  transition-delay: 0.4s;

  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;

  overflow: hidden;
}
.tween-button{
  background: blueviolet;
  position: absolute;
  transition-property: width, height, border-radius, transform, border;
  transition-duration: 0.4s, 0.4s, 0.1s, 0.4s, 0s;
  transition-delay: 0s, 0s, 0.3s, 0s, 0.4s;
  pointer-events: auto;
}

.tween-slot{
  position: relative;
  pointer-events: none;
}

</style>

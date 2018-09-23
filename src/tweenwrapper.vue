<template>
  <div ref ="container" class="tween-container">
    <div ref="roundBtn" class="tween-button" v-on:click="expand"></div>
    <div class="tween-slot"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'Background',
  props:{
    color: String,
    position: String,
    radius: String
  },
  methods:{
    expand(){
      let btn = this.btn;
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

      this.$refs.container.style.background = this.color;
    }
  },
  mounted(){
    this.btn = this.$refs.roundBtn;
    this.btn.style.background = this.color;
    switch(this.position){
      case "top-left":
        this.btn.style.left=0;
        this.btn.style.top=0;
        break;
      case "top-right":
        this.btn.style.right=0;
        this.btn.style.top=0;
        break;
      case "bottom-left":
        this.btn.style.left=0;
        this.btn.style.bottom=0;
        break;
      case "bottom-right":
        this.btn.style.right=0;
        this.btn.style.bottom=0;
        break;
      default:
        break;
    }
    this.btn.style.width=this.radius||"100px";
    this.btn.style.height=this.radius||"100px";
  }
}
</script>

<style>
body{
  background: beige;
  margin: 0;
  /* height: 100%; */
}

.tween-container{
  position: relative;
  background: white;

  width: 100%;
  height: 100vh;
  transition-delay: 1s;

  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}

.tween-button{
  position: absolute;
  border-radius: 50%;
  transition-property: width, height, border-radius;
  transition-duration: 0.4s, 0.4s, 0.1s;
  transition-delay: 0s, 0s, 0.3s;
  pointer-events: auto;
}

.tween-slot{
  position: relative;
  pointer-events: none;
}

</style>

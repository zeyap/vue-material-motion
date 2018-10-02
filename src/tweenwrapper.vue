<template>
  <div ref ="container" class="tween-container">
    <div v-for="(item,id) in btnList" v-bind:key="id" ref="roundButton" class="tween-button" 
    v-on:click="expand(item)" v-on:mouseover="on_mouseover_fns[id]"><router-link v-bind:to="urls[id]"><div ref="roundButtonLink"></div></router-link></div>
    
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
    border: String,
    urls: Array,
    on_mouseover_fns: Array
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

      btn.style['transition-property']= 'width, height, border-radius, transform, border';
      btn.style['transition-duration']= '0.5s, 0.5s, 0.1s, 0.5s, 0.5s';
      btn.style['transition-delay']= '0s, 0s, 1s, 0s, 0.5s';

      this.$refs.container.style.background = this.color===undefined?'blueviolet':this.color[id];
      
    },
    reduce(i){
      this.btn[i].style.background = this.color===undefined?'blueviolet':this.color[i];
      this.btn[i].style.width=this.radius||"65px";
      this.btn[i].style.height=this.radius||"65px";
      this.btn[i].style["border-radius"]="50%";
      let x,y;
      x = parseInt(this.spacing)*(2*i-(parseInt(this.button_number)-1))+"px";
      if(this.position&&this.position.left){
        let totallen = parseInt(this.position.left) + parseInt(this.spacing)*(2*i+1/2);
        x="calc(-50vw + "+totlalen+"px)";
        
      }else if(this.position&&this.position.right){
        let totallen = parseInt(this.position.right) + parseInt(this.spacing)*(2*(parseInt(this.button_number)-i-1)+1/2);
        x="calc(50vw - "+totallen+"px)";
      }
      console.log(x)
      if(this.position&&this.position.bottom){
        y = "calc(50vh - "+this.position.bottom+")";
      }else if(this.position&&this.position.top){
        y = "calc(-50vh + "+this.position.top+")";
      }
      this.btn[i].style.transform = "translateX("+x+") "+"translateY("+y+")";
      
      if(this.border=="true"){
        if(this.color[i]!=='#ffffff')
          this.btn[i].style.border="solid 2px #ffffff";
        else
          this.btn[i].style.border="solid 2px #dddddd";
      }

      this.btn[i].style['transition-property']= 'width, height, border-radius, transform, border';
      this.btn[i].style['transition-duration']= '0s, 0s, 0s, 0s, 0s';
      this.btn[i].style['transition-delay']= '0s, 0s, 0s, 0s, 0s';
    }

  },
  created(){
    this.on_mouseover_fns = this.on_mouseover_fns||[];
  },
  mounted(){
    
    let len = parseInt(this.button_number);
    this.btn=[];
    for(let i=0;i<len;i++){
      let radius =this.radius||"65px"
      this.$refs.roundButtonLink[i].style="width:"+radius+"; height: "+radius;
      this.btn[i] = this.$refs.roundButton[i];
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
  
  transition: background 0.5s;
  transition-delay: 0s;

  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;

  overflow: hidden;
}
.tween-button{
  background: blueviolet;
  position: absolute;
  pointer-events: auto;
}

.tween-slot{
  position: relative;
  pointer-events: none;
}

</style>

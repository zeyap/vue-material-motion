export default class Fade{
    constructor(out_comp,in_comp,type,transition){
        this.out = out_comp;
        this.in =in_comp;
        this.type=type;
        this.motionStarted = false;
        this.additionalTransition = transition;
        switch(type){
            case 'fade-through':
            this.fadeOutTime = "0.2s linear 0.2s";
            this.fadeInTime = "0.2s";
            break;
            default://cross-dissolve
            this.fadeOutTime = "0.4s";
            this.fadeInTime = "0.4s";
            break;
        }
        let self = this;
        this.setSpeed = this.setSpeed.bind(self);
        this.setStateBefore = this.setStateBefore.bind(self);
        this.setStateAfter = this.setStateAfter.bind(self);
        this.getState = this.getState.bind(self);
        this.setSpeed();
        this.setStateBefore();
        this.motionStarted=true;
    }
    setStateBefore(){
        this.out.style.opacity = "1";
        this.in.style.opacity = "0";
        this.exchangeFadeTime();
    }
    setStateAfter(){
        this.out.style.opacity = "0";
        this.in.style.opacity = "1";
        this.exchangeFadeTime();
    }
    exchangeFadeTime(){
        if(this.type==='fade-through'&&this.motionStarted===true){
            // console.log('exchange')
            let temp = this.fadeInTime;
            this.fadeInTime = this.fadeOutTime;
            this.fadeOutTime = temp;
            this.setSpeed();
        }
    }
    setSpeed(){
            this.out.style.transition = "opacity "+this.fadeOutTime+", "+this.additionalTransition.out;
            this.in.style.transition = "opacity "+this.fadeInTime+", "+this.additionalTransition.in;
        
    }
    getState(){
        return this.out.style.opacity != "0"?0:1;
    }
}
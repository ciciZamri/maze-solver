export default class Controller{
    constructor(){
        this.controllerButton = document.getElementById("control-btn");

        this.isPlaying = false;

        this.controllerButton.addEventListener('click', (e)=>{
            const startIndex = parseInt(document.getElementById("start").value);
            const endIndex = parseInt(document.getElementById("end").value);
            console.log(`${startIndex} -> ${endIndex}`);
            this.isPlaying = !this.isPlaying;
            this.controllerButton.innerText = this.isPlaying ? "Pause" : "Play";
        });
    }

    pause(){
        this.isPlaying = false;
        this.controllerButton.innerText = "Play";
    }

    play(){
        this.isPlaying = true;
        this.controllerButton.innerText = "Pause";
    }
}
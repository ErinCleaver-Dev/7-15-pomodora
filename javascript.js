
class Settings {
    constructor() {
        this.menu_continer = document.querySelector(".menu_continer");
        this.pomodoro = 25;
        this.short_breake = 5;
        this.long_break = 15;
        this.setTimer(this.pomodoro, this.short_breake, this.long_break);
    }

    

    accessSettings () {
        let settings_button = document.getElementById("settings_button");
        settings_button.addEventListener("click", (ev) => {
            ev.preventDefault();
            this.menu_continer.style.display = 'flex';
        }) 
    }

    applyChanges () {
        let apply = document.getElementById("apply");
        apply.addEventListener("click", (ev) => {
            ev.preventDefault();
            this.pomodoro = document.getElementById("pomodoro").value;
            this.short_breake = document.getElementById("short_breake").value;
            this.long_break = document.getElementById("long_break").value;
            console.log(this.pomodoro)
            this.setTimer(this.pomodoro, this.short_breake, this.long_break);
            this.menu_continer.style.display = 'none';
        })
    }

    setTimer(pomodoro, short_breake, long_break) {
        this.pomodoro = pomodoro;
        this.short_breake = short_breake;
        this.long_break = long_break;
        this.stoppedTimer = false;
        this.restartTimer = false;
        document.getElementById("pomodoro").value = pomodoro;
        document.getElementById("short_breake").value = short_breake;
        console.log(document.getElementById("long_break"))
        document.getElementById("long_break").value = long_break;
    }

}

class Timer {
    constructor(settings) {
        this.pomodoro = settings.pomodoro;
        this.short_breake = settings.short_breake;
        this.long_break = settings.long_break;
        this.start = document.getElementById('start');
        this.dashoffset = 1000;
    }

    loadButtons() {
        this.pomodoroButton();
        this.shortBreakeButton();
        this.longBreakButton();
    }

    pomodoroButton() {
        let pomodoro = document.getElementById("pomodoro_button");
        pomodoro.addEventListener("click", (ev) => {
            ev.preventDefault();
            this.buttonSilder('0%');
        })
    }

    shortBreakeButton() {
        let pomodoro = document.getElementById("short_breake_button");
        pomodoro.addEventListener("click", (ev) => {
            ev.preventDefault();
            this.buttonSilder('33%');
        })
    }

    longBreakButton() {
        let pomodoro = document.getElementById("long_break_button");
        pomodoro.addEventListener("click", (ev) => {
            ev.preventDefault();
            this.buttonSilder('66%');
        })
    }

    buttonSilder(percentage) {
        let indicator = document.getElementById("indicator");
        indicator.style.marginLeft = `calc(${percentage})`
    }

    timer() {

        document.addEventListener("click", (ev) => {
            ev.preventDefault();
            if(ev.target && ev.target.id == 'start') {
                ev.target.id = "stop";
                ev.target.innerText = "stop";
                console.log("testing timer")
                this.startTimer() 
            } else if(ev.target && ev.target.id == 'stop') {
                ev.target.id = "start";
                ev.target.innerText = "start";
                stop = ev.target
                this.stopTimer = true;
            } else if (ev.target && ev.target.id == 'restart') {
                ev.target.id = "start";
                ev.target.innerText = "start"
                this.dashoffset = 1000;
            }

        })
    }

    startTimer() {
        let timerCircle = document.getElementById('timer_circle');
        const timer = setInterval(() => {
            this.dashoffset--;

            if(this.dashoffset == 0) {
                this.restartTimer();
            }
            timerCircle.style.strokeDashoffset = this.dashoffset;
            console.log(this.dashoffset)
            if(this.dashoffset < 1 || this.getStopTimmer()) {
                clearInterval(timer);
                this.stopTimer = false;
            }  
        }, 1000);
    }

    getStopTimmer() {
        return this.stopTimer;
    }
    restartTimer() {
        let restart = document.getElementById('stop');      
        restart.id = 'restart'
        restart.innerText = 'restart'
    }

}


settings = new Settings();

settings.accessSettings();
settings.applyChanges();
timer = new Timer(settings);
timer.loadButtons();
timer.timer();
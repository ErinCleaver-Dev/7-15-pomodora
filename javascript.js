function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function setCookie(name, value) {
    const date = new Date();
    date.setFullYear(date.getFullYear() +1);
    document.cookie = `${name}=${value}; expires=${date.toGMTString()}`;
}

let btnAcceptCookies = document.getElementById('btn-accept-cookies');
let overlay = document.getElementById('overlay');
let wrapper = document.querySelector('.wrapper');
btnAcceptCookies.addEventListener('click', (ev)=>{
    document.cookie = "cookieAgreement=greenbackend.com; max-age=" + 60*60*24*30;
    if(document.cookie) {
        overlay.style.display = 'none';
        wrapper.style.display = 'none';
    } else {
        alert("Cookie can't be sent! Please unlock this site from the cookie settings in your borwser.")
    }
})

overlay.addEventListener('click', (ev)=>{

    overlay.style.display = 'none';
    wrapper.style.display = 'none';
   
})

let = checkCookie = document.cookie.indexOf("cookieAgreement");

if(checkCookie != -1) {
    overlay.style.display = 'none';
    wrapper.style.display = 'none';
} else {
    overlay.style.display = 'block';
    wrapper.style.display = 'flex';
}



// Settings Class begins 
class Settings {
    constructor() {
        this.menu_continer = document.querySelector(".menu_continer");
        this.overlay = document.getElementById('overlay');
        this.pomodoro = 25;
        this.short_breake = 1;
        this.long_break = 15;
        this.settingsCockies()
        this.setTimer(this.pomodoro, this.short_breake, this.long_break);
    }

    settingsCockies(){
        if(getCookie("settings_pomodoro")) {
            this.pomodoro = getCookie("settings_pomodoro");
            this.short_breake = getCookie("settings_short_breake");
            this.long_break = getCookie("settings_long_break");
        }

        

        if(getCookie("selected_font") == "large") {
            this.setFont("1.8em", "1em", "3em", "40px", "1em")
        } else if(getCookie("selected_font")== "medium") {
            this.setFont("1.6em", ".9em", "2.7em", "40px", ".9em")

        } else if(getCookie("selected_font")== "small") {
            this.setFont("1.4em", ".7em", "2.5em", "37px", ".7em")
        }

        if(getCookie("selected_color") == "pink_button") {
            this.setColor("#F87070");
        } else if(getCookie("selected_color") == "blue_button") {
            this.setColor("#70F3F8", "#757988")
        } else if(getCookie("selected_color") == "purple_button"){
            this.setColor("#D881F8")
        }
      
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
        this.selectFontRadioOption();
        this.selectColorRadioOption();

        apply.addEventListener("click", (ev) => {
            this.pomodoro = document.getElementById("pomodoro").value;
            this.short_breake = document.getElementById("short_breake").value;
            this.long_break = document.getElementById("long_break").value;
            console.log(this.pomodoro)
            this.setTimer(this.pomodoro, this.short_breake, this.long_break);
            this.menu_continer.style.display = 'none';
        })
    }


    selectFontRadioOption() {
        let fontSettings = document.querySelector(".font_settings");
        let large = document.getElementById("large");
        let small = document.getElementById("small");
        let medium = document.getElementById("medium");

        fontSettings.addEventListener("click", (ev) => {
            if(ev.target && ev.target.id == "large") {
                
                this.setFont("1.8em", "1em", "3em", "40px", "1em")

                setCookie("selected_font", 'large');
                large.checked = true;
                medium.checked = false;
                small.checked = false;             
            } else if(ev.target && ev.target.id == "medium") {
                console.log("Testing medium click event")

                this.setFont("1.6em", ".9em", "2.7em", "40px", ".9em")
                setCookie("selected_font", 'medium');

                large.checked = false;
                medium.checked = true;
                small.checked = false;
            } else if(ev.target && ev.target.id == "small") {
                console.log("Testing small click event")
                this.setFont("1.4em", ".7em", "2.5em", "37px", ".7em")
                setCookie("selected_font", 'small');
                large.checked = false;
                medium.checked = false;
                small.checked = true;
            }
        })
    }

    setFont(pomodoroFont, buttonFont, timerFount, indicatorFount, timerButtonFount) {
        document.querySelector(".pomodoro").style.height = pomodoroFont;
        document.querySelector(".button_container").style.fontSize =buttonFont
        document.querySelector("#timer").style.fontSize = timerFount
        document.querySelector("#indicator").style.height = indicatorFount;
        document.querySelector(".timer_button").style.fontSize =timerButtonFount
    }
    

    selectColorRadioOption() {
        let color_settings = document.querySelector(".color_settings");
        let pinkButton = document.getElementById("pink_button");
        let blueButton = document.getElementById("blue_button");
        let purpleButton = document.getElementById("purple_button");

        color_settings.addEventListener("click", (ev) => {
            if(ev.target && ev.target.id == "pink_button") {
                
            
                setCookie("selected_color", 'pink_button');
                this.setColor("#F87070")

                pinkButton.checked = true;
                blueButton.checked = false;
                purpleButton.checked = false;             
            } else if(ev.target && ev.target.id == "blue_button") {
                console.log("Testing medium click event")
                setCookie("selected_color", 'blue_button');
                this.setColor("#70F3F8")

                pinkButton.checked = false;
                blueButton.checked = true;
                purpleButton.checked = false;
            } else if(ev.target && ev.target.id == "purple_button") {
                setCookie("selected_color", 'purple_button');
                this.setColor("#D881F8")
                pinkButton.checked = false;
                blueButton.checked = false;
                purpleButton.checked = true;
            }
        })

    }

    setColor(color) {
        document.getElementById("indicator").style.background = color;
        document.getElementById("timer_circle").style.stroke = color;
    }

    setTimer(pomodoro, short_breake, long_break) {
        this.pomodoro = pomodoro;
        this.short_breake = short_breake;
        this.long_break = long_break;
        setCookie("settings_pomodoro", this.pomodoro)
        setCookie("settings_short_breake", this.short_breake)
        setCookie("settings_long_break", this.long_break)

        document.getElementById("pomodoro").value = this.pomodoro;
        document.getElementById("short_breake").value = this.short_breake;
        document.getElementById("long_break").value = this.long_break;

    }

}

// setting class ends 

class Timer {
    constructor(settings) {
        this.pomodoro = settings.pomodoro;
        this.short_breake = settings.short_breake;
        this.long_break = settings.long_break;
        this.start = document.getElementById('start');
        this.setTime = document.getElementById('timer');
        this.selectedMode = this.pomodoro;
        this.mintues = 0;
        this.totalSecounds;
        this.secounds;
        this.currentSecounds = 0;
        this.dashoffset = 1024;
        this.offset;
        this.timerCircle = document.getElementById('timer_circle');
        this.pomodoro_button = document.getElementById('pomodoro')
        this.short_breake_button= document.getElementById("short_breake");
        this.long_break_button = document.getElementById("long_break_button");
    }

    

    loadButtons(settings) {
        console.log(getCookie("buttonSelected"))


        this.pomodoroButton(settings);
        this.shortBreakeButton(settings);
        this.longBreakButton(settings);
        if(getCookie("buttonSelected") == 0) {
            this.pomodoro_button.click();
        } else if(getCookie("buttonSelected")== 1) {
            this.short_breake_button.click();
        } else if(getCookie("buttonSelected")== 2) {
            this.long_break_button.click();
        }
        
    }

    pomodoroButton(settings) {
        pomodoro_button.addEventListener("click", (ev) => {
            ev.preventDefault();
            this.currentTime(settings.pomodoro, "00");
            setCookie("buttonSelected", 0);
            this.selectedMode = settings.pomodoro;
            this.dashoffset = 1024;
            this.buttonSilder('0%');
        })
    }

    currentTime(mintues, secounds) {
        this.setTime.innerText = mintues + ":" + secounds;
    }

    shortBreakeButton(settings) {
            this.short_breake_button= document.getElementById("short_breake_button");
            this.short_breake_button.addEventListener("click", (ev) => {
            this.currentTime(settings.short_breake, "00");
            setCookie("buttonSelected", 1);
            this.selectedMode = settings.short_breake;
            this.dashoffset = 1024;
            ev.preventDefault();
            this.buttonSilder('33%');
        })
    }

    longBreakButton() {
        
        this.long_break_button.addEventListener("click", (ev) => {
            ev.preventDefault();
            setCookie("buttonSelected", 2);
            this.currentTime(settings.long_break, "00");
            this.selectedMode = settings.long_break;
            setCookie("selectedMode", this.selectedMode);
            this.dashoffset = 1024;
            this.buttonSilder('66%');
        })
    }

    buttonSilder(percentage) {
        let indicator = document.getElementById("indicator");
        indicator.style.marginLeft = `calc(${percentage})`
    }


    timer() {
            if(getCookie("lastOffset")) {
                console.log("indside test cookies")
                this.selectedMode = getCookie("selectedMode");
                this.dashoffset = parseInt(getCookie("lastOffset"));
                console.log(this.dashoffset);
                this.currentSecounds = parseInt(getCookie("lastTime"));
                this.totalSecounds = parseInt(getCookie("totalSecounds"));
                this.mintues = Math.floor(this.currentSecounds/60);
                this.secounds = this.currentSecounds%60;
                this.currentTime(this.getTimeString(this.mintues), this.getTimeString(this.secounds));
                this.timerCircle.setAttribute("stroke-dashoffset", this.dashoffset);
            } 

            

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
                this.reset();
            }

        })
    }

    reset () {
        this.dashoffset = 1024;
        this.currentSecounds = 0;
        this.currentTime(this.selectedMode, "00");
        this.timerCircle.style.strokeDashoffset = this.dashoffset;
    }

  
    startTimer() {
        if(this.dashoffset == 1024) {
          this.totalSecounds  = (this.selectedMode *  60);
          this.currentSecounds = this.totalSecounds;
        }  
    

        
        this.timerCircle.setAttribute("stroke-dashoffset", this.dashoffset)

        const timer = setInterval(() => {
            this.currentSecounds--;
            if(this.currentSecounds == 0) {
                this.currentTime("00", "00");
                this.restartTimer();
                clearInterval(timer);
            }        
            
            this.mintues = Math.floor(this.currentSecounds/60);
            this.secounds = this.currentSecounds%60;

            
            let precent =((this.currentSecounds%this.totalSecounds)/this.totalSecounds)*100;

            console.log("Dashoffset: " + this.dashoffset);
            this.dashoffset = Math.ceil((precent/100) * 1024);
            
            // console.log(this.currentSecounds)
            console.log("Value listed: " + this.dashoffset)
            this.timerCircle.setAttribute("stroke-dashoffset", this.dashoffset);


            this.currentTime(this.getTimeString(this.mintues), this.getTimeString(this.secounds));
            setCookie("lastOffset", this.dashoffset)
            setCookie("lastTime", this.currentSecounds)
            setCookie("totalSecounds", this.totalSecounds)

            if(this.getStopTimmer()) {
                clearInterval(timer);
                this.stopTimer = false;
            }  

        }, 1000);
    }

    getTimeString(timeIntervalue) {
        if(timeIntervalue > 9) {
            return timeIntervalue;
        } else if(timeIntervalue <= 9) {
            return "0" + timeIntervalue;
        } else if(timeIntervalue == 0) {
            return "00"
        } 
    }

    getStopTimmer() {
        return this.stopTimer;
    }
    restartTimer() {
        console.log("Testing reset")
        let restart = document.getElementById('stop');      
        restart.id = 'restart'
        restart.innerText = 'restart'
    }
    getCookie() {

    }

}




settings = new Settings();
settings.accessSettings();
settings.applyChanges();

timer = new Timer(settings);
timer.loadButtons(settings);
timer.timer();

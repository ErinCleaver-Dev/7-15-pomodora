
class Settings {
    constructor() {
        this.menu_continer = document.querySelector(".menu_continer");
    }

    accessSettings () {
        let settings_button = document.getElementById("settings_button");
        settings_button.addEventListener("click", () => {
            this.menu_continer.style.display = 'flex';
        }) 

    }

    applyChanges () {
        let apply_button = document.getElementById("apply");
        apply.addEventListener("click", () => {
            this.menu_continer.style.display = 'none';
        })
    }

}

settings = new Settings();

settings.accessSettings();
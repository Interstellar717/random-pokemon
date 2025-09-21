class Team {
    static v = "";

    constructor(a, b, c, d, e, f) {
        this.array = [];
        this.text = "";
        if (Array.isArray(a)) {
            this.array = a;
        } else if (a) {
            this.array.push(a);
            this.array.push(b);
            this.array.push(c);
            this.array.push(d);
            this.array.push(e);
            this.array.push(f);
        }

        this.text = this.arrayToText();
    }

    addPokemon(name, form = 1) {
        if (this.array.length == 6) return false;
        this.array.push(dexData[dexData.nameToNo[name]].forms[form - 1].showdownName);
        this.text = this.arrayToText();
        return true;
    }

    arrayToText() {
        var text = "";
        for (let pokemon of this.array) {
            text += pokemon + "\nTera Type: \n\n";
        }

        qs(".team-display textarea").value = text;
        return text;
    }

    textToArray() {
        var array = [];
        for (let pokemon of this.text.split("\nTera Type: \n\n")) {
            pokemon && array.push(pokemon);
        }
        return array;
    }

    clear() {
        this.array = [];
        this.text = "";
    }
}

const team = new Team();

qs(".team-display button").addEventListener("click", e => {
    toggleTeamDisplay();
})

qs(".team-display textarea").addEventListener("keyup", e => {
    team.text = e.target.value;
    team.array = team.textToArray();
})
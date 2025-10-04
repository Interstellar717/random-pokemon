class Team {
    static v = "";

    constructor(a, b, c, d, e, f) {
        this.array = [];
        this.text = "";
        this.nicknames = [];
        if (Array.isArray(a)) {
            this.array = a.slice();
            this.nicknames = a.slice();
        } else if (a) {
            this.array.push(a);
            this.array.push(b);
            this.array.push(c);
            this.array.push(d);
            this.array.push(e);
            this.array.push(f);

            this.nicknames.push(a);
            this.nicknames.push(b);
            this.nicknames.push(c);
            this.nicknames.push(d);
            this.nicknames.push(e);
            this.nicknames.push(f);
        }

        this.text = this.arrayToText();
    }

    addPokemon(name, form = 1) {
        if (this.array.length == 6) return false;
        var formData = dexData[dexData.nameToNo[name]].forms[form - 1];
        this.array.push(formData.showdownName);
        this.nicknames.push((formData.name != "Base" ? dexData[dexData.nameToNo[name]].forms[form - 1].name + " " : "") + name);
        this.text = this.arrayToText();
        return true;
    }

    arrayToText() {
        var text = "";
        for (let i in this.array) {
            text += this.nicknames[i] + " (" + this.array[i] + ")\nTera Type: \n\n";
        }

        qs(".team-display textarea").value = text;
        return text;
    }

    textToArray() {
        var array = [];
        var nicknames = [];
        for (let pokemon of this.text.split(")\nTera Type: \n\n")) {
            pokemon && array.push(pokemon.split("(")[1]);
            pokemon && nicknames.push(pokemon.split("(")[0]);
        }
        this.array = array;
        this.nicknames = nicknames;
        for (let i in this.nicknames) {
            while (this.nicknames[i].endsWith(" "))
                this.nicknames[i] = this.nicknames[i].substring(0, this.nicknames[i].length - 1);
            while (this.nicknames[i].startsWith(" "))
                this.nicknames[i] = this.nicknames[i].substring(1, this.nicknames[i].length);
        }
        return array;
    }

    clear() {
        this.array = [];
        this.text = "";
        this.arrayToText();
    }

    setNickname(index, nick) {
        this.nicknames[index] = nick;
        this.arrayToText();
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
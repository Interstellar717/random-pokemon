sessionStorage.setItem('hasChangedType', 'false');

const qs = (e) => document.querySelector(e);
const qsa = (e) => document.querySelectorAll(e);


var click_listeners = {
    "#help": help,
    "#custom": custom,
    "#typeChange": typeChange,
    "#showLog": showLog,
    "#clearLog": clearLog,
    "#activator": random_pokemon,
    "#evo": () => evolution(1),
    "#prevo": () => evolution(-1),
    "#shiny": shiny,
    "#rand-mult": () => random_multiple(prompt('How Many Pokemon? Currently works up to 9')),
    "#toggle-sidebar": toggle_sidebar,
    ".msg button": () => msg(false)
}

for (let [key, value] of Object.entries(click_listeners)) {
    qs(key).addEventListener('click', value)
}



/* setTimeout(() => {
    for (let i = 0; i < base_total; i++) {
        images.push(new Image()),
            images[i].src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${zeroes(i)}.png`,
            images[i].onload = () => {
                loaded_count++,
                loaded.push(images.indexOf(images[i]) + 1)
                qs('#loading-bar').style.width = (loaded_count / total) * 98 + "%"
            }
    }
    for (let [k, v] of Object.entries(x)) {
        for (let i = 2; i < v.forms + 1; i++) {

            forms.push(new Image());
            var i2 = forms.length - 1;
            forms[i2].src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${zeroes(parseInt(k))}_f${i}.png`,

                forms[i2].onload = () => {
                    loaded_count++,
                    loaded.push(forms.indexOf(forms[i2]) + 1)
                    qs('#loading-bar').style.width = (loaded_count / total) * 98 + "%"
                    if (1200 < loaded_count && loaded_count <= total) {
                        setTimeout(() => {
                            clearInterval(progress)
                            qs('#loading').style.visibility = "hidden"
                            qs('#loading-bar').style.visibility = "hidden"
                            qs('#loading-bar-container').style.visibility = "hidden"
                            document.getElementsByTagName('html')[0].style.overflowY = "auto"
                        }, 1000)

                    }
                }
        }
    }
}, 400); */

/* setTimeout(() => {
    qs('#arrow').style.visibility = 'hidden';
}, 5000); */

addEventListener('keydown', (e) => {

    // console.log(e.key);

    switch (e.key) {
        case '`': {
            toggle_sidebar()
        }
        break;
        case 'Q': {
            help()
        }
        break;
        case 'S': {
            showLog()
        }
        break;
        case 'C': {
            clearLog()
        }
        break;
        case 'X': {
            random_multiple(prompt('How Many Pokemon? Currently works up to 9'))
        }
        break;
        case 'T': {
            typeChange()
        }
        break;
        case 'ArrowRight': {
            evolution(1)
        }
        break;
        case 'ArrowLeft': {
            evolution(-1)
        }
        break;
        case 'ArrowDown': {
            get_current().split(',').length == 1 &&
                set_pokemon(x.nameToNo[get_current()] + 1)
        }
        break;
        case 'ArrowUp': {
            get_current().split(',').length == 1 &&
                set_pokemon(x.nameToNo[get_current()] - 1)
        }
        break;
        case 'R': {
            random_pokemon()
        }
        break;
        case 'E': {
            custom()
        }
        break;
        case 'F1': {
            e.preventDefault()
            spotlight(1)
        }
        break;
        case 'F2': {
            e.preventDefault()
            spotlight(2)
        }
        break;
        case 'F3': {
            e.preventDefault()
            spotlight(3)
        }
        break;
        case 'F4': {
            e.preventDefault()
            spotlight(4)
        }
        break;
        case 'F5': {
            e.preventDefault()
            spotlight(5)
        }
        break;
        case 'F6': {
            e.preventDefault()
            spotlight(6)
        }
        break;
        case 'F7': {
            e.preventDefault()
            spotlight(7)
        }
        break;
        case 'F8': {
            e.preventDefault()
            spotlight(8)
        }
        case '1': {
            spotlight(1)
        }
        break;
        case '2': {
            spotlight(2)
        }
        break;
        case '3': {
            spotlight(3)
        }
        break;
        case '4': {
            spotlight(4)
        }
        break;
        case '5': {
            spotlight(5)
        }
        break;
        case '6': {
            spotlight(6)
        }
        break;
        case '7': {
            spotlight(7)
        }
        break;
        case '8': {
            spotlight(8)
        }
        break;
        case "Z": {
            shiny()
        }
        break;
    }
});


/*function similarity(a, b) {
    var count = (a, b)=>{return a.split(b).length-1},
        characters = [],
        b_score = 0;
    for (let letter of a.split('')) 
        !characters.includes(letter) && characters.push(letter)
    for (let letter of characters) 
        b_score += count(b, letter) && 1
    b_score /= a.length, b_score *= 100
    return b_score
}*/

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength) * 100;
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

function zeroes(n, name = "", place = 3) {

    if (n == undefined) {
        var scores = [{
                name: "",
                score: 1e-1
            }],
            semi_compatible = [],
            failed = [];
        for (const key of Object.keys(x.nameToNo)) {
            var sim = similarity(key, name.toLowerCase()),
                i = scores.length - 1;
            if (sim > scores[i].score) {
                semi_compatible = semi_compatible.concat(scores)
                scores = [{
                    name: key,
                    score: sim
                }]
            } else if (sim === scores[i].score) scores.push({
                name: key,
                score: sim
            })
            else {
                failed.push({
                    name: key,
                    score: sim
                })
            }
        }

        var insert = "";
        if (scores.length === 1 && scores[0].name) {
            insert = "\n\nDid you mean " + capitalize(scores[0].name) + `?` // \n${capitalize(scores[0].name)} had ${parseInt(scores[0].score*1000)/1000}% accuracy.`;
            return x.nameToNo[scores[0].name]
        } else if (scores.length > 1) {
            var contestants = [];
            scores.forEach(e => {
                contestants.push(capitalize(e.name))
            })
            insert = "\n\nDid you mean " + contestants.join(', or ') + `?` + (contestants.length > 3 ? `\n\nAll had ${parseInt(scores[0].score*1000)/1000}% accuracy.` : "")
        }
        console.log(scores)
        alert(`error: bad pokemon name "${name}". ${insert || ""}`);
        //console.log("Scores:", scores)
        //console.log("Semi-Compatible:", semi_compatible)
        //console.log("Fails:", failed)
        //console.log("----------------------")
        return 201;
    }

    var input = n.toString(),
        changed,
        z = (n) => {
            var res = '';
            for (let i of new Array(n)) res += "0";
            return res
        };
    input.length < place ? (changed = z(place - input.length) + input) : (changed = input);


    return changed;
}
//update capitalize later
function capitalize(str) {
    var sections = str.toString().split(' ');
    res = "",
        count = 0;

    sections.forEach(e => {
        count++
        var list = e.toString().split(''),
            capital = list[0].toUpperCase();
        list.splice(0, 1);
        res += (count != 1 ? " " : "") + capital + list.join('');
    })

    return res;
}

function typeGen() {
    var n = Math.floor(Math.random() * 17) + 1;
    switch (n) {
        case 1:
            return "Fire"
        case 2:
            return "Water"
        case 3:
            return "Grass"
        case 4:
            return "Electric"
        case 5:
            return "Ice"
        case 6:
            return "Rock"
        case 7:
            return "Ground"
        case 8:
            return "Steel"
        case 9:
            return "Poison"
        case 10:
            return "Fighting"
        case 11:
            return "Flying"
        case 12:
            return "Bug"
        case 13:
            return "Psychic"
        case 14:
            return "Dark"
        case 15:
            return "Ghost"
        case 16:
            return "Dragon"
        case 17:
            return "Fairy"
    }
}

function special(c) {
    switch (c) {
        case 0: {
            window.open('https://media.tenor.com/NnXvZLXX7UoAAAAd/pichu-pokemon.gif');
            return Math.floor(Math.random() * 1010) + 1;
        }
        case 479:
            return 479;
        case 646:
            return 646;
        default:
            return c;
    }
}

function imageFormat() {
    const reset = () => {
        var source = qs('#pkmn').src;
        qs('#pkmn').src = '';
        qs('#pkmn').src = source;
        var onlineTest = qs("#pkmn").naturalWidth;
        if (onlineTest == 0) {
            setTimeout(function () {
                reset()
            }, 2000);
        }
    }
    var onlineTest = qs("#pkmn").naturalWidth;
    if (onlineTest == 0) {
        setTimeout(function () {
            reset()
        }, 1000);
    }
}

function typeChange() {
    if (qs('div#info h1').textContent != 'Random Pokémon') {
        if (sessionStorage.getItem('hasChangedType') != 'true') {

            sessionStorage.setItem('hasChangedType', 'true');

            var dex = localStorage.getItem('dex');
            var type = typeGen();
            var name = x[parseInt(dex)].pokemon;
            name = capitalize(name)

            qs("div#info h1").innerHTML = name + "... but it's " + type + " type!";
            toLog(name, type, dex);
        } else {
            let c = prompt('You\'ve already changed the type of this Pokémon!\n\nDon\'t wear the poor thing out lol');
            if (c == 'its flying type') {
                alert('Well then sweetie why didn\'t you say so.\nChanging type........');
                sessionStorage.setItem('hasChangedType', 'false');
                typeChange(dex);
            }
        }
    }

}

function help() {
    var helpWindow = window.open("", "_blank", "width=500, height=500");
    helpWindow.document.write(`<style src='"+getSeason()+" Theme.css'></style><body 
    style='font-family:cursive;font-size: 15px;' contenteditable='false' spellcheck='false'>
    <b style='font-size:20px;'>Here's a tour of the Pokémon Type Swaps and Team Generator!<br></b>
    <br>        I originally created this webpage because 
    I loved to create my own Fakemon. That turned into a love of drawing existing Pokémon as a 
    different type, as if it was always supposed to be that type.<br>By pressing the <b>Random Pokémon</b>
     button, the site will generate a Pokémon for you to draw as another type, or just draw it normally.
    <br>Note: it won't always say Random Pokémon, but it will always be in the same location.<br><br>
    Now, I understand those of you who don't enjoy drawing as much, or maybe it's just not your area of skill.
     <div><br></div><div>For you guys, I included a button on the side that generates 6 Pokémon 
    for a team on <b><i>Pokémon Showdown</i> (<a href='https://play.pokemonshowdown.com'>
    https://play.pokemonshowdown.com</a>)!</b><br><br><b>Now for the other buttons:</b><br><br>
     - <b>Type Change</b>: If the type assigned to the Pokémon is one of the types that the Pokémon
     already has, you can press this button to get another type. Another Note: Don't just press this
     until you get a type you like! ;)<br><br> - <b>Custom Pokémon</b>: This button lets you type in
     the Pokédex Number of a Pokémon, and it will show up on the primary image slot. But wait - what
     if you don't know the Dex number?<br><br> - The <b>Dex Number</b> Button (bottom) prompts the user
     for a Pokémon's name, and will look up its Dex No on Google!<br><br> - <b>Show Log</b>: 
    If you want to see a history of what you have generated, press the Show Log button. If it's too
     long for the alert box, you can open the console, where it is also logged after you press it.
    <br><br>For those of you who want to make teams to battle with, you can generate them with the
     previously mentioned <b>Generate Team</b> button and then the <b>Team Code</b> button copies
     the team code to your clipboard (to paste in <b><i>Pokémon Showdown</i></b>).<br><br>I hope
     you enjoy the <b>Pokémon Type Swaps and Team Generator!</b><br><b>The Developer, </b>
    <div><b>Nimbus Shadow</b></div></div><br><button style='background-color: red;border-color:
     blueviolet; color:white;font-family:cursive;font-style:bold;font-size:20px;height:35px;
    border-radius: 10px;border-width:3px;text-align: left;margin:5px; position:fixed; right:0; bottom:0;'class='function'>Thanks!</button></body>`);
    helpWindow.document.getElementsByTagName('button')[0].addEventListener('click', () => helpWindow.close())
}
//Log
function showLog() {
    var log = qs('#logContainer');
    if (log.style.transform == 'translateY(100%)') {
        log.style.transform = 'translateY(0px)';
        log.style.borderBottomLeftRadius = '50px';
        log.style.borderLeft = 'solid black 0px';
    } else {
        log.style.transform = 'translateY(100%)';
        log.style.borderBottomLeftRadius = '0px';
        log.style.borderLeft = 'solid black 10px';
    }
}

function clearLog() {
    qs('#log').innerHTML = '';
}

function toLog(name, type, dex) {
    qs('#log').innerHTML += "<li id='logItem'>[" + name + " (" + dex + ")" + (type ? ", " + type : "") + "]</li>";
}
//Image changing
function spotlight(n) {
    if (n > qsa('.form-button').length) return; //keyboard shortcuts prevent selecting non-existent forms

    var img = qs('#pkmn'),
        end = (n == 1 ? '.png' : `_f${n}.png`);
    if (img.src.split('_').length > 1) source = img.src.split('_')[0] + end;
    else source = img.src.split('.png')[0] + end;
    img.src = '';
    img.src = source;
}
//Generating
function random_pokemon() {

    var dex = Math.floor(Math.random() * 1011);
    set_pokemon(dex, 1, /*true*/ false)
}

function set_pokemon(dex, form = 1, show_type = false) {
    sessionStorage.setItem('hasChangedType', 'false');
    qs('#image-container').innerHTML = `<img id="pkmn" draggable="false">`
    qs('#image-container').classList.remove('multiple')
    qs('#image-container').style.marginTop = '';

    var name, type;

    !parseInt(dex) ? (dex = x.nameToNo[dex.toLowerCase()]) : (dex = parseInt(dex)) //for names

    dex = special(zeroes(dex));
    localStorage.setItem('dex', dex);

    form > 1 ? (form = "_f" + form) : (form = "")

    qs('#pkmn').src = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + dex + form + '.png';

    setTimeout(imageFormat, 100);

    name = x[parseInt(dex)].pokemon;
    name = capitalize(name)
    type = typeGen();

    qs('div#info h1').textContent = name + " #" + x.nameToNo[name.toLowerCase()] // + (show_type ? "... but it's " + type + " type!" : "");

    // toLog(name, show_type ? type : null, dex);

    qs('#form-bar').innerHTML = "",
        dex = parseInt(dex)
    form_buttons(x[dex].forms)

}

function custom() {
    sessionStorage.setItem('hasChangedType', 'false');

    var dex = prompt("Enter Pokémon Name or Number:", "Gengar");
    var msg;

    msg = x.nameToNo[dex.toLowerCase()] || "failed"
    msg = parseInt(dex).toString() != 'NaN' ? x[dex].pokemon : msg

    toLog(`Search Query: ${dex}`, null, msg);

    if (dex != null) {
        set_pokemon(dex)
    }

}

function form_buttons(n) {
    n === 1 && (n = 0)
    var btns = ``;
    for (let i = 1; i <= n; i++) {
        btns += `<button class="function form-button">Form ${i}</button>`
    }
    qs('#form-bar').innerHTML = btns;
    const btnHTML = qsa('.form-button');
    for (let i = 1; i <= btnHTML.length; i++) {
        qsa('.form-button')[i - 1].addEventListener('click', () => spotlight(i))
    }
}

const
    get_current = () => {
        return qs('div#info h1').textContent.split(' #')[0].toLocaleLowerCase()
    },
    get_form = () => {
        return parseInt(qs('#pkmn').src.split('.png')[0].split('full/')[1].split('_f')[1]) || 1
    }


function evolution(n) {
    var data = x[x.nameToNo[get_current()]];

    if (!data) return false;

    var next = data.next.pokemon;
    var previous = data.previous.pokemon;


    if (n === -1 && previous) {
        if (data.previous.type === "parallel") {
            set_pokemon(previous, get_form())
        } else {
            set_pokemon(previous, data.previous.form || 1)
        }
    }
    if (n === 1 && next) {
        if (typeof next === "string") {
            if (get_current() != "pikachu") {
                set_pokemon(data.next.pokemon, get_form())
            } else set_pokemon(data.next.pokemon)
        } else {
            if (data.next.type === "multiple") {
                set_multiple_pokemon(next)
                form_buttons(0)
            } else if (data.next.type === "regional") {
                var form = get_form()
                next[form - 1] && set_pokemon(next[form - 1])
            } else if (data.next.type === "meowth") {
                if (get_form() < 3) set_pokemon("persian", get_form())
                else set_pokemon('perrserker')
            }
        }
    }
}

function set_multiple_pokemon(arr) {
    let HTML = ``;
    for (let i = 0; i < arr.length; i++) {
        let n = Math.ceil(arr.length / 3);
        let m;

        switch (n) {
            case 1: {
                n = "335px",
                    m = "125px"
            }
            break;
            case 2: {
                n = "190px",
                    m = "85px"
            }
            break;
            case 3: {
                n = "135px",
                    m = "60px"
            }
            break;
        } //${Math.sqrt((650*650)/(arr.length*1.15)) - 45}
        qs('#image-container').style.marginTop = m;
        HTML += `<img id="pkmn" class="pkmn" draggable="false" style="width:${n};">`
        if (i % 3 === 2) HTML += `<br>`
    }
    qs('#image-container').innerHTML = HTML,
        qs('#image-container').classList.add('multiple'),
        qs('div#info h1').textContent = capitalize(arr.join(', '))

    for (let p in arr) {
        qsa('.pkmn')[p].src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${zeroes(x.nameToNo[arr[p]])}.png`;
        qsa('.pkmn')[p].addEventListener('click', () => set_pokemon(arr[p]));
    }

}

function shiny() {

    if (get_current().split(',').length != 1)
        return alert('You may not change multiple Pokemon to their shiny forms at once.')


    var img = qs('#pkmn'),
        is_shiny = img.src.toLowerCase().split('shiny').length > 1;

    switch (is_shiny) {
        case false: {
            img.src = `https://db.pokemongohub.net/images/pokemon-home-renders/Shiny/poke_capture_${zeroes(x.nameToNo[get_current()], null, 4)}_000_mf_n_00000000_f_r.png`
        }
        break;
        case true: {
            set_pokemon(get_current())
        }
        break;
    }
}

function random_multiple(q) {
    if (q > 9) return alert('Sorry, the maximum number of Pokémon you can generate at once is 9.')
    if (!q) return alert('Please enter a number of Pokémon to generate.')

    var arr = [];
    for (let i = 0; i < q; i++) {
        arr.push(x[Math.floor(Math.random() * 1025) + 1].pokemon)
    }
    set_multiple_pokemon(arr)
    form_buttons(1) //no form buttons
}


const resize_function = () => {
    /* var centerPadding = (window.innerHeight / 2) - (qs('#sidebar').offsetHeight / 2) + 30;
    console.log(window.innerHeight);
    console.log(qs('#sidebar').clientHeight);
    console.log(centerPadding);
    
    var arrowPad = centerPadding - 500;
    qs('#sidebar').style.paddingTop = centerPadding + 'px';
    qs('#arrow').style.paddingTop = arrowPad + 'px'; */

    qs("html").style.height = window.innerHeight + 'px';
    qs("body").style.height = window.innerHeight + 'px';
    qs("html").style.width = window.innerWidth + 'px';
    qs("body").style.width = window.innerWidth + 'px';

}

window.addEventListener('resize', resize_function);
resize_function();

var enabled = false;

function toggle_sidebar() {
    var s = qs('#sidebar-new');
    var ts = qs('#toggle-sidebar');

    if (!enabled) {
        s.style.transform = 'translateX(0px)';
        ts.style.color = "white";
        ts.style.border = "solid white 1px";

        enabled = true
    } else {
        s.style.transform = ''
        ts.style.color = "black";
        ts.style.border = "solid black 1px";

        enabled = false
    }
}


function msg(str, time = 0) {

    if (str == false) return (qs('.msg').style.transform = "");

    qs('.msg').style.transform = "translateX(-20px)";
    qs('.msg span').textContent = str;

    time && setTimeout(() => {
        qs('.msg').style.transform = ""
    }, time)
}

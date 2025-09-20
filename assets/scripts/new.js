sessionStorage.setItem('hasChangedType', 'false');

var dexData;

var selected_result = -1;

var centerbar = true;


var click_listeners = {
    "#help": help,
    "#custom": /* custom */showSearch,
    "#typeChange": typeChange,
    "#showLog": showLog,
    "#clearLog": clearLog,
    "#activator": randomPokemon,
    "#evo": () => evolution(1),
    "#prevo": () => evolution(-1),
    "#inc-dex": () => dexNum(1),
    "#dec-dex": () => dexNum(-1),
    // "#shiny": shiny,
    // "#rand-mult": () => random_multiple(prompt('How Many Pokemon? Currently works up to 9')),
    "#rand-mult": () => randomMultiple(3),
    // "#toggle-sidebar": toggle_sidebar,
    ".msg button": () => msg(false),
    "#img-bkg": toggleImgBkg,
    "#close-center-bar": closeCenterBar
}

for (let [key, value] of Object.entries(click_listeners)) {
    qs(key).addEventListener('click', value)
}

const search = e => {
    var y = []
    for (let [ki, vi] of Object.entries(dexData)) {
        if (!vi.pokemon || !e.target.value) continue;

        if (vi.pokemon.includes(e.target.value.toLowerCase())) {
            y.push(vi.pokemon)
        }
    }

    y.sort((a, b) => a.toLowerCase().indexOf(e.target.value.toLowerCase()) - b.toLowerCase().indexOf(e.target.value.toLowerCase()));

    qs('.results').innerHTML = "";

    for (let i of y) {
        let el = document.createElement('span');
        el.textContent = capitalize(i);
        el.classList.add("result");
        el.addEventListener('click', () => { showSearch(false); setPokemon(el.textContent); });

        qs('.results').appendChild(el);
    }
}

qs('.search-bar').addEventListener('keypress', (e) => {
    if (!["ArrowDown"].includes(e.key)) {
        search(e)
    }
});
qs('.search-bar').addEventListener('keyup', (e) => {
    if (!["ArrowDown"].includes(e.key)) {
        search(e)
    }
});


addEventListener('keydown', (e) => {

    if (e.target.classList.contains('search-bar')) {
        if (e.key == "Escape") showSearch();
        else if (e.key == "Enter") {
            e.target.parentElement.querySelectorAll('.result')[
                selected_result >= 0 ? selected_result : 0
            ].click();
        } else if (e.key == "ArrowDown") {
            selected_result++;
            e.target.parentElement.querySelectorAll('.result').forEach(el => {
                el.classList.remove('hovered');
            });
            selected_result = selected_result % e.target.parentElement.querySelectorAll('.result').length;
            console.log(e.target.parentElement.querySelectorAll('.result')[selected_result])
            e.target.parentElement.querySelectorAll('.result')[selected_result].classList.add('hovered');
        }
        return;
    }

    switch (e.key) {
        case '`': {
            toggleSidebar()
        }
            break;
        case 'Q': {
            help()
        }
            break;
        case 'W': {
            toggleImgBkg()
        }
            break;
        case 'E': {
            showSearch()
        }
            break;
        case 'R': {
            randomPokemon()
        }
            break;
        case 'T': {
            typeChange()
        }
            break;
        case 'Y': {

        }
            break;
        case 'U': {

        }
            break;
        case 'I': {

        }
            break;
        case 'O': {

        }
            break;
        case 'P': {

        }
            break;
        case 'A': {

        }
            break;
        case 'S': {
            showLog()
        } break;
        case 'D': {

        }
            break;
        case 'F': {

        }
            break;
        case 'G': {

        }
            break;
        case 'H': {

        }
            break;
        case 'J': {

        }
            break;
        case 'K': {

        }
            break;
        case 'L': {

        }
            break;
        case "Z": {
            // shiny()
        }
            break;
        case 'X': {
            // random_multiple(prompt('How Many Pokemon? Currently works up to 9'))
            randomMultiple(3);
        }
            break;
        case 'C': {
            clearLog()
        }
            break;
        case 'V': {

        }
            break;
        case 'B': {

        }
            break;
        case 'N': {

        }
            break;
        case 'M': {

        }
            break;

        case 'ArrowRight': {
            dexNum(1)
        }
            break;
        case 'ArrowLeft': {
            dexNum(-1)
        }
            break;
        case 'ArrowDown': {
            evolution(-1)
        }
            break;
        case 'ArrowUp': {
            evolution(1)
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

    }
});



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
    /* const reset = () => {
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
    } */
}

function typeChange() {
    if (qs('div#name-num h1').textContent != 'Random Pokémon') {
        if (sessionStorage.getItem('hasChangedType') != 'true') {

            sessionStorage.setItem('hasChangedType', 'true');

            // var dex = localStorage.getItem('dex');
            // var name = x[parseInt(dex)].pokemon;

            var name = getCurrent();
            var dex = dexData.nameToNo[name];
            var type = typeGen();

            name && (name = capitalize(name));

            qs("div#name-num h1").innerHTML = name + "... but it's " + type + " type!";
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
function showLog(state) {
    var log = qs('#logContainer');
    var col = qs('.search-column');

    const buggedY = 110;

    // if (log.style.transform == 'translateY(110vh)' || state == false) {
    if (log.style.transform == 'translateY(' + buggedY + 'vh)' || state == false) {
        // !state | state != true | state == false || state == undefined
        if (!state) {
            log.style.transform = 'translateY(0px)';
            log.style.borderBottomLeftRadius = '50px';

            // if (col.style.transform != "translateY(110vh)") {
            if (col.style.transform != "translateY(' + buggedY + 'vh)") {
                qs('#info').style.transform = "translateY(0vh)";
            }
        }
        if (state == false) return;

    } else {
        // log.style.transform = 'translateY(110vh)';
        log.style.transform = 'translateY(' + buggedY + 'vh)';
        log.style.borderBottomLeftRadius = '0px';

        qs('#info').style.transform = "translateY(150vh)";


        // if (col.style.transform == "translateY(110vh)") {
        if (col.style.transform == "translateY(' + buggedY + 'vh)") {
            showSearch(false)
        }

        if (state == true) return;
    }
}

function showSearch(state) {
    var col = qs('.search-column');
    var log = qs('#logContainer');

    const buggedY = 110;

    // if (col.style.transform == 'translateY(110vh)' || state == false) {
    if (col.style.transform == 'translateY(' + buggedY + 'vh)' || state == false) {
        // !state | state != true | state == false || state == undefined
        if (!state) {
            col.querySelector('.search-bar').blur();

            col.querySelector('.search-bar').value = "";
            col.querySelector('.results').textContent = "";
            col.style.transform = 'translateY(0px)';
            col.style.borderBottomLeftRadius = '50px';
            // col.style.borderLeft = 'solid black 0px';

            // if (log.style.transform != "translateY(110vh)") {
            if (log.style.transform != "translateY(' + buggedY + 'vh)") {
                qs('#info').style.transform = "translateY(0vh)";
            }
        }

        if (state == false) return;

    } else {
        // col.style.transform = 'translateY(110vh)';
        col.style.transform = 'translateY(' + buggedY + 'vh)';
        col.style.borderBottomLeftRadius = '0px';
        // col.style.borderLeft = 'solid black 10px';
        selected_result = -1
        setTimeout(() => {
            col.querySelector('.search-bar').select();
        }, 100)

        qs('#info').style.transform = "translateY(150vh)";


        // if (log.style.transform == "translateY(110vh)") {
        if (log.style.transform == "translateY(' + buggedY + 'vh)") {
            showLog(false)
        }

        if (state == true) return;
    }
}

function clearLog() {
    qs('#log').innerHTML = '';
}

function toLog(name, dex, form, type) {
    var string = "[" + name + " (" + dex + ")" + (type ? ", " + type : "") + "]";
    var li = document.createElement("li");
    li.classList.add("logItem");
    li.textContent = string;
    qs('#log').appendChild(li);
    qs("#log .logItem:nth-last-child(1)").addEventListener("click", () => { showLog(false); setPokemon(name, form || 1, false, false) });
}

function toLogMultiple(arr, forms) {
    var string = "[";
    for (let i in arr) {
        string += arr[i] + "(" + dexData.nameToNo[arr[i].toLowerCase()] + ")" + (i != arr.length - 1 ? ", " : "");
    }
    string += "]";
    var li = document.createElement("li");
    li.classList.add("logItem");
    li.textContent = string;
    qs('#log').appendChild(li);
    qs("#log .logItem:nth-last-child(1)").addEventListener("click", () => { showLog(false); setMultiplePokemon(arr, forms, false) });
}

//Image changing
function spotlight(n) {
    if (n > qsa('.form-button').length) return; // keyboard shortcuts prevent selecting non-existent forms

    var img = qs('#pkmn'),
        h1 = qs('#info-name'),
        end = (n == 1 ? '.png' : `_f${n}.png`);
    if (img.src.split('_').length > 1) source = img.src.split('_')[0] + end;
    else source = img.src.split('.png')[0] + end;
    // img.src = '';
    img.src = source;
    h1.textContent = getFormName(getCurrent(), n) + " #" + dexData.nameToNo[getCurrent()];
    infoBox(dexData.nameToNo[getCurrent()], n, true);
}


function getFormName(name, n) {
    if (n > dexData[dexData.nameToNo[name.toLowerCase()]].forms.length) return false;
    try {
        var fname = dexData[dexData.nameToNo[name.toLowerCase()]].forms[n - 1]?.name || "Base";
    } catch (e) {
        console.log(dexData[dexData.nameToNo[name.toLowerCase()]])
        console.log(n)
        console.error(e);

    }

    if (fname == "Base") fname = "";
    else fname += " ";

    return fname + capitalize(name)
}


function setPokemon(dex, form = 1, show_type = false, log = true) {

    showLog(false);
    showSearch(false);

    const form_num = form;

    sessionStorage.setItem('hasChangedType', 'false');
    qs('#image-container').innerHTML = `<img id="pkmn" draggable="false">`
    qs('#image-container').classList.remove('multiple')
    qs('#image-container').style.marginTop = '';

    var name, type;

    !parseInt(dex) ? (dex = dexData.nameToNo[dex.toLowerCase()]) : (dex = parseInt(dex)) //for names

    dex = special(zeroes(dex));
    localStorage.setItem('dex', dex);

    form > 1 ? (form = "_f" + form) : (form = "")

    qs('#pkmn').src = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + dex + form + '.png';

    setTimeout(imageFormat, 100);

    name = dexData[parseInt(dex)].pokemon;
    name = capitalize(name)
    type = typeGen();


    qs('div#image-container').style.transform = "translateY(0vh)";

    // + (show_type ? "... but it's " + type + " type!" : "");
    // qs('div#name-num').style.display = "";
    qs('div#name-num').style.display = "none";
    qs('div#name-num').style.textContent = "";
    // qs('div#name-num h1').textContent = name + " #" + x.nameToNo[name.toLowerCase()];


    qs('#info').style.display = "block";
    setTimeout(() => qs('#info').style.transform = "translateY(0%)", 10);

    infoBox(parseInt(dex));


    // toLog(name, show_type ? type : null, dex);

    qs('#form-bar').innerHTML = "",
        dex = parseInt(dex)


    formButtons(dexData[dex].forms.length);

    qs('.form-button') && qsa('.form-button')[form_num - 1].click();

    centerbar && closeCenterBar();

    log && toLog(name, dex);


}

function custom() {
    sessionStorage.setItem('hasChangedType', 'false');

    var dex = prompt("Enter Pokémon Name or Number:", "Gengar");
    var msg;

    if (!dex) return false;

    msg = dexData.nameToNo[dex.toLowerCase()] || "failed"
    msg = parseInt(dex).toString() != 'NaN' ? dexData[dex].pokemon : msg

    toLog(`Search Query: ${dex}`, msg);

    if (dex != null) {
        setPokemon(dex)
    }

}

function formButtons(n) {
    n === 1 && (n = 0)
    var btns = ``;
    for (let i = 1; i <= n; i++) {
        btns += `<button class="function form-button">${dexData[dexData.nameToNo[getCurrent()]].forms[i - 1].name}</button>`
    }
    qs('#form-bar').innerHTML = btns;
    const btnHTML = qsa('.form-button');
    for (let i = 1; i <= btnHTML.length; i++) {
        qsa('.form-button')[i - 1].addEventListener('click', () => spotlight(i))
    }
}

const
    getCurrent = () => {
        // return qs('div#name-num h1').textContent.split(' #')[0].toLocaleLowerCase()

        // parseInt() to get rid of preceding zeroes
        var res = dexData[parseInt(qs('#pkmn').src.split('.png')[0]?.split('/full/')[1]?.split("_")[0])]?.pokemon;
        !res && msg('No Pokémon generated!', 1000);
        if (qs('#image-container').classList.contains('multiple')) {
            msg('Multiple Pokémon generated!', 1000);
            return undefined
        }
        return res;
    },
    getForm = () => {
        return parseInt(qs('#pkmn').src.split('.png')[0].split('full/')[1].split('_f')[1]) || 1
    }


function evolution(n) {
    var data = dexData[dexData.nameToNo[getCurrent()]];

    if (!data) return false;

    var next = data.next.pokemon;
    var previous = data.previous.pokemon;


    if (n === -1 && previous) {
        if (data.previous.type === "parallel") {
            setPokemon(previous, getForm())
        } else if (data.previous.type === "shifted") {
            setPokemon(previous, getForm() + data.previous.shift)
        } else {
            setPokemon(previous, data.previous.form || 1)
        }
    } else if (n === -1 && !previous) {
        msg('This Pokémon cannot devolve!', 1000);
    }

    if (n === 1 && next) {
        if (typeof next === "string") {
            if (data.next.type != "ignore-forms") {
                setPokemon(data.next.pokemon, getForm())
            } else setPokemon(data.next.pokemon)
        } else {
            if (data.next.type === "multiple") {
                setMultiplePokemon(next)
                formButtons(0)
            } else if (data.next.type === "regional") {
                var form = getForm()
                next[form - 1] && setPokemon(next[form - 1])
            } else if (data.next.type === "irregular") {
                setPokemon(next[getForm() - 1], data.next.map[getForm()])
            } else if (data.next.type === "irregular-multiple") {
                setMultiplePokemon(next, data.next.map[getForm()])
                formButtons(0)
            }
        }
    } else if (n === 1 && !next) {
        msg('This Pokémon cannot evolve!', 1000);
    }
}

function setMultiplePokemon(arr, forms = "", log = true) {

    showLog(false);
    showSearch(false);

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
    qs('#image-container').innerHTML = HTML;
    qs('#image-container').classList.add('multiple');

    var og_names = arr.slice();
    for (let i in og_names) og_names[i] = og_names[i].toLowerCase();

    for (let i in arr) {
        arr[i] = getFormName(arr[i], forms[i])
    }

    qs('div#name-num h1').textContent = capitalize(arr.join(', '));


    for (let p in arr) {
        // console.log(og_names, p);
        qsa('.pkmn')[p].src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${zeroes(dexData.nameToNo[og_names[p]])}${forms[p] > 1 ? "_f" + forms[p] : ""}.png`;
        qsa('.pkmn')[p].addEventListener('click', () => setPokemon(og_names[p].toLowerCase(), forms ? forms[p] : 1));
        qsa('.pkmn')[p].title = infoBox(dexData.nameToNo[og_names[p]], forms[p], false).text
    }

    qs('div#name-num').style.display = "";
    qs('div#image-container').style.transform = "translateY(0vh)";

    if (arr.length > 3) {
        qs("div#name-num").style.marginTop = "-5vh";
    } else {
        qs("div#name-num").style.marginTop = "";
    }


    centerbar && closeCenterBar();

    log && toLogMultiple(arr, forms);
}

function shiny() {

    if (getCurrent().split(',').length != 1)
        return alert('You may not change multiple Pokemon to their shiny forms at once.')


    var img = qs('#pkmn'),
        is_shiny = img.src.toLowerCase().split('shiny').length > 1;

    switch (is_shiny) {
        case false: {
            img.src = `https://db.pokemongohub.net/images/pokemon-home-renders/Shiny/poke_capture_${zeroes(dexData.nameToNo[getCurrent()], null, 4)}_000_mf_n_00000000_f_r.png`
        }
            break;
        case true: {
            setPokemon(getCurrent())
        }
            break;
    }
}

//Generating
function randomPokemon() {

    var dex = Math.floor(Math.random() * 1011);
    var form = 1;
    setPokemon(dex, form, /*true*/ false)
}

function randomMultiple(q) {
    if (q > 9) return alert('Sorry, the maximum number of Pokémon you can generate at once is 9.')
    if (!q) return alert('Please enter a number of Pokémon to generate.')

    var arr = [];
    var forms = [];
    for (let i = 0; i < q; i++) {
        let rn = Math.floor(Math.random() * 1025) + 1;
        arr.push(dexData[rn].pokemon);

        var rf;
        do {
            rf = Math.floor(Math.random() * dexData[rn].forms.length) + 1;
        } while (dexData[rn].forms[rf - 1].name.includes('Gigantamax'));

        forms.push(rf);
    }
    setMultiplePokemon(arr, forms)
    formButtons(1) //no form buttons
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

function toggleSidebar() {
    var s = qs('#sidebar-new');
    var ts = qs('#toggle-sidebar');

    if (!enabled) {
        s.style.transform = 'translateX(0px)';
        // ts.style.color = "white";
        // ts.style.border = "solid white 1px";
        ts.classList.add('invert');

        enabled = true;
    } else {
        s.style.transform = ''
        // ts.style.color = "black";
        // ts.style.border = "solid black 1px";
        ts.classList.remove('invert');

        enabled = false;
    }
}


function msg(str, time = 0) {

    if (str == false) return (qs('.msg').style.transform = "");

    qs('.msg').style.transform = "translateX(-20px)";
    qs('.msg span').innerHTML = str;

    time && setTimeout(() => {
        qs('.msg').style.transform = ""
    }, time)
}

function dexNum(n) {
    if (getCurrent()?.split(',')?.length == 1 &&
        dexData.nameToNo[getCurrent()] + n > 0 &&
        dexData.nameToNo[getCurrent()] + n <= 1025) {
        setPokemon(dexData.nameToNo[getCurrent()] + n)
    } else if (dexData.nameToNo[getCurrent()] + n <= 0) {
        msg('No Pokémon with number 0!', 1000);
    } else if (dexData.nameToNo[getCurrent()] + n > 1025) {
        msg('No Pokémon with number 1026 yet!', 1000);
    }
}

function toggleImgBkg() {

    if (!getCurrent()) return false;

    if (qs('#pkmn').style.backgroundColor == "white") {
        qs('#pkmn').style.backgroundColor = "";
        qs('#pkmn').style.border = "";
    } else {
        qs('#pkmn').style.border = "solid #81eddf 3px";
        qs('#pkmn').style.backgroundColor = "white";
    }
}

function closeCenterBar() {
    qs('#sidebar').style = "text-align: center; transform: translateX(-10%); width: 100%; font-size: 16px; padding: 8vh 4vw 0vh 2vw;";
    qs('#close-center-bar').style.display = "none";

    qs('#toggle-sidebar').style.transform = "";

    setTimeout(() => {
        qs('#sidebar').style = "font-size: 16px; padding: 8vh 4vw 0vh 2vw;";
        qs('#sidebar').parentElement.classList.remove("center");
        qs("#sidebar").parentElement.classList.add("sidebar");

        qsa("#sidebar *").forEach(e => {
            e.style.display = ""
        });

        qsa("br.delete").forEach(e => {
            e.remove();
        });

        const sidebar = qs(".sidebar");

        sidebar.addEventListener("click", e => {

            if (e.target != sidebar && !sidebar.contains(e.target)) return;

            if (sidebar.classList.contains("hidden")) {
                sidebar.classList.remove("hidden");
            }
        });

        document.addEventListener("click", e => {
            if (e.target != sidebar && !sidebar.contains(e.target)) {
                if (!sidebar.classList.contains("hidden")) {
                    sidebar.classList.add("hidden");
                }
            }
        })

    }, 600);

    centerbar = false;
}

const gen = n => {
    n = parseInt(n)
    if (n <= 151) {
        return 1
    } else if (n <= 251) {
        return 2
    } else if (n <= 386) {
        return 3
    } else if (n <= 493) {
        return 4
    } else if (n <= 649) {
        return 5
    } else if (n <= 721) {
        return 6
    } else if (n <= 809) {
        return 7
    } else if (n <= 905) {
        return 8
    } else if (n <= 1025) {
        return 9
    } else {
        return -1
    }
}



function infoBox(n, form = 1, set = true) {
    var name = dexData[parseInt(n)].pokemon;
    var fname = getFormName(name, form);

    /* var type;
    if (form == 1) {
        type = x[x.nameToNo[name.toLowerCase()]].type;
    } else if (x[x.nameToNo[name.toLowerCase()]].form_types[form]) {
        type = x[x.nameToNo[name.toLowerCase()]].form_types[form.toString()]
    } else {
        type = x[x.nameToNo[name.toLowerCase()]].type;
    } */

    type = dexData[dexData.nameToNo[name.toLowerCase()]].forms[form - 1].type

    // console.log(type);

    var next = dexData[dexData.nameToNo[name.toLowerCase()]].next.pokemon;
    if (typeof next == "string")
        next = capitalize(dexData[dexData.nameToNo[name.toLowerCase()]].next.pokemon, "none");
    else if (typeof next == "object")
        next = capitalize(dexData[dexData.nameToNo[name.toLowerCase()]].next.pokemon.join(', '), "none");

    var generation;

    // if(!fname.includes('Alolan') && !fname.includes('Galarian') && !fname.includes('Hisuian') && !fname.includes('Paldean'))
    switch (name != fname ? fname.split(' ')[0] : "") {
        case "Alolan": generation = 7; break;
        case "Galarian": generation = 8; break;
        case "Hisuian": generation = 8; break;
        case "Paldean": generation = 9; break;
        default: generation = gen(dexData.nameToNo[name.toLowerCase()]);
    }

    var html = `<div id="info" style="display: block; transform: translateY(0%);">
			<h1 id="info-name">${capitalize(fname) + " #" + dexData.nameToNo[name.toLowerCase()]}<button class="function add-btn" title="Add to team">+</button></h1>
			<span id="info-gen"><b>${"<b>Generation " + generation + "</b>"}</b></span>
			<span id="info-type" style="gap: 0.25vw;">${"<b>Type: </b>" + `<span class="type">${capitalize(type[0])}</span><span class="type">${capitalize(type[1]) || ""}</span>`}</span>
			<span id="info-forms"><b>Forms: </b>${dexData[dexData.nameToNo[name.toLowerCase()]].forms.length}</span>
			<span id="info-prev"><b>Prevolution: </b>${capitalize(dexData[dexData.nameToNo[name.toLowerCase()]].previous.pokemon, "none")}</span>
			<span id="info-next"><b>Evolution: </b>${next}</span>
		</div>`;
    var text = `${capitalize(fname) + " #" + dexData.nameToNo[name.toLowerCase()]}\n${"Generation " + generation}\n${"Type: " + `${capitalize(type[0])} ${capitalize(type[1]) ? "/" : ""} ${capitalize(type[1]) || ""}`}\n${"Forms: " + dexData[dexData.nameToNo[name.toLowerCase()]].forms.length}\n${"Prevolution: " + capitalize(dexData[dexData.nameToNo[name.toLowerCase()]].previous.pokemon, "none")}\n${"Next: " + next}`;

    if (set) {
        qs('#info').style.display = "block";
        qs('#info').outerHTML = html;
        qs(".function.add-btn").addEventListener("click", () => {
            var success = team.addPokemon(dexData[n].pokemon, form);
            if (success) {
                msg("Added " + capitalize(team.array[team.array.length - 1]) + " to your team!", 1000);
            } else {
                msg("Couldn't add " + capitalize(team.array[team.array.length - 1]) + " to your team!<br>Reason: Team is full", 1000);
            }
        });
    }
    else {
        qs('#info').style.display = "none";
        qs('#info').innerHTML = "";
    }

    setTimeout(updateTypeColors, 100);

    return { html, text }
}

function getByTags(q = [], b = true) {
    const res = [];
    const data_res = [];

    if (typeof q == "string") {
        q = [q]
    }

    for (let i of Object.keys(dexData)) {
        if (parseInt(i)) {
            var match = true;

            for (let j of q) {
                if (b === true) {
                    if (!dexData[i].tags.includes(j)) {
                        match = false;
                    }
                } else if (b === false) {
                    if (dexData[i].tags.includes(j)) {
                        match = false;
                    }
                }
            }

            if (match) {
                res.push(dexData[i].pokemon)
                data_res.push(dexData[i])
            }

        }
    }

    return data_res
}
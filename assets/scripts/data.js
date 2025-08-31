const qs = (e) => document.querySelector(e);
const qsa = (e) => document.querySelectorAll(e);


const typeColor = {
    nor: "#ADA594",
    fir: "#F75231",
    wat: "#399CFF",
    gra: "#7BCE52",
    ele: "#FFC631",
    ice: "#5ACEE7",
    roc: "#BDA55A",
    gro: "#D6B55A",
    ste: "#ADADC6",
    poi: "#B55AA5",
    fig: "#A55239",
    fly: "#9CADF7",
    bug: "#ADBD21",
    psy: "#FF73A5",
    gho: "#6363B5",
    dar: "#735A4A",
    fai: "#FF65D5",
    dra: "#7B63E7"
}

function zeroes(n, name = "", place = 3) {

    /* if (n == undefined) {
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
            insert = "\n\nDid you mean " + contestants.join(', or ') + `?` + (contestants.length > 3 ? `\n\nAll had ${parseInt(scores[0].score * 1000) / 1000}% accuracy.` : "")
        }
        console.log(scores)
        alert(`error: bad pokemon name "${name}". ${insert || ""}`);

        return 201;
    } */


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
function capitalize(str, def) {
    if (!str) return def


    var sections = str.toString().split(' '),
        res = "",
        count = 0;



    sections.forEach(e => {
        count++
        var list = e.toString().split(''),
            capital = list[0]?.toUpperCase();
        list.splice(0, 1);
        res += (count != 1 ? " " : "") + capital + list.join('');
    })

    return res;
}

const head = document.head;
const preloadContainer = document.createElement("div");
preloadContainer.id = "subhead";
for (let i = 1; i <= 1025; i++) {
    const number = String(i).padStart(3, '0');
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`;
    preloadContainer.appendChild(link);
}
head.appendChild(preloadContainer);


async function getJSON() {
    var n = location.pathname.includes(".") ? "/" : location.pathname,
        s = await fetch(location.origin + n + "/assets/json/evo.json"),
        r = await s.json();
    return (r)
}
var dexData,
    base_total = 1025,
    total = 1025;

getJSON().then(data => dexData = data).then(() => {
    Object.keys(dexData).forEach(k => {
        dexData[k].forms > 1 && (total += (dexData[k].forms - 1))
    });
    // form images
    for (let [k, v] of Object.entries(dexData)) {
        for (let i = 2; i < v.forms + 1; i++) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${k.padStart(3, "0")}_f${i}.png`;
            head.appendChild(link);
        }
    }
});



document.addEventListener("DOMContentLoaded", function () {

    if (qsa('link').length - 4 === 1025) {
        msg("Extra form images failed to preload", 5000);
    }

});

function getSeason() {
    var month = Date().split('')[4] + Date().split('')[5] + Date().split('')[6];
    var season;

    switch (month) {
        case "Dec":
            season = "Winter"
            break;
        case "Jan":
            season = "Winter"
            break;
        case "Feb":
            season = "Winter"
            break;
        case "Mar":
            season = "Spring"
            break;
        case "Apr":
            season = "Spring"
            break;
        case "May":
            season = "Spring"
            break;
        case "Jun":
            season = "Summer"
            break;
        case "Jul":
            season = "Summer"
            break;
        case "Aug":
            season = "Summer"
            break;
        case "Sep":
            season = "Autumn"
            break;
        case "Oct":
            season = "Autumn"
            break;
        case "Nov":
            season = "Autumn"
            break;
    }

    return season;
}

// var season = getSeason();
// document.getElementsByTagName('head')[0].innerHTML += '<link rel="stylesheet" href="assets/styles/' + season + ' Theme.css">';
// document.getElementsByTagName('head')[0].innerHTML += '<link rel="stylesheet" href="assets/styles/Jirachi Theme.css">';
document.getElementsByTagName('head')[0].innerHTML += '<link rel="stylesheet" href="assets/styles/New Theme.css">';
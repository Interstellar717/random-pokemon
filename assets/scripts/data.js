const qs = (e) => document.querySelector(e);
const qsa = (e) => document.querySelectorAll(e);

class HSL {
    constructor(h, s, l) {
        [this.h, this.s, this.l] = [h, s, l];
    }

    getStyleCode() {
        return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
    }

    newFromReference(h, s, l) {
        return new HSL(this.h + h, this.s + s, this.l + l);
    }
}

const typeColor = {
    nor: new HSL(41, 13, 63),
    fir: new HSL(10, 93, 58),
    wat: new HSL(210, 100, 61),
    gra: new HSL(100, 56, 56),
    ele: new HSL(43, 100, 60),
    ice: new HSL(191, 75, 63),
    roc: new HSL(45, 43, 55),
    gro: new HSL(44, 60, 60),
    ste: new HSL(240, 18, 73),
    poi: new HSL(311, 38, 53),
    fig: new HSL(14, 49, 44),
    fly: new HSL(229, 85, 79),
    bug: new HSL(66, 70, 44),
    psy: new HSL(339, 100, 73),
    gho: new HSL(240, 36, 55),
    dar: new HSL(23, 22, 37),
    fai: new HSL(316, 100, 70),
    dra: new HSL(251, 73, 65)
}

const typeBorderColor = {};

for (let k of Object.keys(typeColor)) {
    typeBorderColor[k] = typeColor[k].newFromReference(0, 0, 20);
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

    str = str.replaceAll("-", " ");

    var sections = str.toString().split(" "),
        res = "",
        count = 0;



    sections.forEach(e => {
        count++
        var list = e.toString().split(''),
            capital = list[0]?.toUpperCase();
        list.splice(0, 1);
        if (e) {
            res += (count != 1 ? " " : "") + capital + list.join('');
        }
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

    // getting total form count
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


    dexData["showdownNameToNo"] = {};

    Object.keys(dexData).forEach(k => {
        if (k == "nameToNo") return;
        if (k == "showdownNameToNo") return;

        var pokemon = dexData[k];
        var forms = dexData[k].forms;

        for (let i = 0; i < forms.length; i++) {

            let pkName = pokemon.pokemon.replaceAll(" ", "-");

            let fName = forms[i].name.toLowerCase();
            fName = fName.replaceAll(".", "");
            fName = fName.replaceAll("gigantamax", "gmax");
            fName = fName.replaceAll("single strike", "");
            fName = fName.replaceAll("sword", "");
            fName = fName.replaceAll("shield", "");
            fName = fName.replaceAll("alolan", "alola");
            fName = fName.replaceAll("galarian", "galar");
            fName = fName.replaceAll("hisuian", "hisui");
            fName = fName.replaceAll("paldean", "paldea");
            if (fName.endsWith(" ")) fName = fName.substr(0, fName.length - 1);

            var res = undefined;

            if (fName == "gmax rapid strike") {
                res = pkName + "-rapid-strike-gmax";
            }

            if (fName == "base" || !fName || i == 0 || ["male", "female", "overdrive", "black overdrive", "white overdrive"].includes(fName)) {
                res = pkName.replaceAll("♂", "-m").replaceAll("♀", "-f");
            }


            if (!res) {
                res = `${pkName}-${fName.split(" ").join("-")}`;
            }

            forms[i].showdownName = res;
            dexData.showdownNameToNo[res] = { number: dexData.nameToNo[pkName], form: i + 1 };
        }
    });


    var allTags = [];
    for (let k of Object.keys(dexData)) {
        if (!dexData[k].forms) continue;
        for (let form of dexData[k].forms) {
            form.tags && (allTags = allTags.concat(form.tags));
        }
    }

    allTags = allTags.filter((item, index) => allTags.indexOf(item) === index);

    for (let tag of allTags) {
        let o = document.createElement("option");
        o.textContent = tag;
        o.value = tag;
        qs("#tag-filter").appendChild(o);
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


function arrayRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
const head = document.head;
for (let i = 1; i <= 1025; i++) {
    const number = String(i).padStart(3, '0');
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`;
    head.appendChild(link);
}

async function getJSON() {
    var n = location.pathname.includes(".") ? "/" : location.pathname,
        s = await fetch(location.origin + n + "/json/evo.json"),
        r = await s.json();
    return (r)
}
var x,
    base_total = 1025,
    total = 1025;

getJSON().then(data => x = data).then(() => {
    Object.keys(x).forEach(k => {
        x[k].forms > 1 && (total += (x[k].forms - 1))
    });
    // form images
    for (let [k, v] of Object.entries(x)) {
        for (let i = 2; i < v.forms + 1; i++) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${k}_f${i}.png`;
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

var season = getSeason();
document.getElementsByTagName('head')[0].innerHTML += '<link rel="stylesheet" href="css/' + season + ' Theme.css">';

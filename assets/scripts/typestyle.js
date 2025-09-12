function updateTypeColors() {
    qsa(".type").forEach(span => {
        if (span.textContent) {
            span.style.backgroundColor = typeColor[span.textContent.substr(0, 3).toLowerCase()].getStyleCode();
            span.style.border = `solid 3px ${typeBorderColor[span.textContent.substr(0, 3).toLowerCase()].getStyleCode()}`;
        }
    })

}

const cols = document.querySelectorAll('.col');
const alertCopied = document.querySelector('.alert');
const generateColors = document.querySelector('.generate > i');

document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
});

generateColors.addEventListener('click', () => {
    setRandomColors()
    generateColors.classList.add('rotated')
});



document.addEventListener('click', event => {
    const type = event.target.dataset.type;
    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === "i" ? event.target : event.target.children[0];
        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');
    }
    else if (type === 'copy') {
        copyToClickboard(event.target.textContent);
        alertCopied.classList.add('alertVisible');
        setTimeout(() => {
            alertCopied.classList.remove('alertVisible');
        }, "2000")
    }
})

function copyToClickboard(text) {
    return navigator.clipboard.writeText(text);
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsfromHash() : [];
    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        const lock = col.querySelector('button > i');

        if (isLocked) {
            colors.push(text.textContent);
            return
        }

        const color = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
         : chroma.random()

        if (!isInitial) {
            colors.push(color);
        };

        col.style.background = color;
        text.textContent = color;
        setTextColor(text, color);
        setTextColor(lock, color);
    })
    updateColorsHash(colors);
};

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    if (luminance > 0.5)
        text.style.color = 'black'
    else
        text.style.color = 'white'
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map((col) => {
        return col.toString().substring(1)
    }).join('-')
}

function getColorsfromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map((color) => '#' + color)
    }
    return []
}

setRandomColors(true);

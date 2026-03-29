const AGES = [{ value: 'archaic', img: './image/archaic.webp' },
{ value: 'classical', img: './image/classical.webp' },
{ value: 'heroic', img: './image/heroic.webp' },
{ value: 'mythic', img: './image/mythic.webp' }]
let MAJOR = 4;
const MINOR = 3;
const IMG_TITAN = './image/titan.webp'
const IMG_MAJOR = './image/major.webp'
const IMG_MAJOR_POWER = './image/major_power.webp'
const IMG_WONDER = './image/wonder.webp'
const IMG_MINOR = './image/minor.webp'
const IMG_MINOR_POWER = './image/minor_power.webp'
const IMG_MYTH = './image/myth.webp'

let pantheon = document.getElementById('pantheon')
pantheon.appendChild(createEditableLabel('pantheon-name', 'pantheon-name', 'My Pantheon'))
pantheon.appendChild(createTitan())

let pantheon_detail = document.getElementById('pantheon-detail')
AGES.forEach(age => {
    pantheon_detail.appendChild(createAge(age.value, age.img))
});
for (let i = 1; i <= MAJOR; i++) {
    pantheon_detail.appendChild(createGod(i, 'major'))
    for (let j = 1; j <= MINOR; j++) {
        pantheon_detail.appendChild(createGod(i + '' + j, 'minor'))
    }
}

function createClass(type, className) {
    let element = document.createElement(type)
    element.classList.add(className)
    return element
}

function createAge(id, imgSrc) {
    let age = createClass('div', 'age')
    let img = createImgSrc(imgSrc)
    img.classList.add('age-icon')
    age.appendChild(img)
    let span = createClass('span', 'age-name')
    span.innerText = firstUcase(id) + ' Age'
    age.appendChild(span)
    age.id = id;
    return age
}

function createTitan() {
    let titan = createClass('div', 'titan')
    let titan_portrait = createClass('div', 'titan-portrait')
    let imgInput = createClass('input', 'load-img-input')
    imgInput.type = 'file'
    imgInput.accept = 'image/*'
    let img = createImgSrc(IMG_TITAN)
    editableImg(titan_portrait, img, imgInput)
    titan_portrait.appendChild(imgInput)
    titan_portrait.appendChild(img)
    let titan_detail = createClass('div', 'titan-detail')
    let titan_name = createEditableLabel('titan-name', 'titan-name', 'Titan')
    titan_detail.appendChild(titan_name)
    titan.appendChild(titan_portrait)
    titan.appendChild(titan_detail)
    return titan
}

function createGod(id, type) {
    let god = createClass('div', type + '-god')
    god.id = type + '-' + id
    let god_portrait = createClass('div', 'god-portrait')
    let imgInput = createClass('input', 'load-img-input')
    imgInput.type = 'file'
    imgInput.accept = 'image/*'
    let img = createImgSrc(type === 'major' ? IMG_MAJOR : IMG_MINOR)
    editableImg(god_portrait, img, imgInput)
    god_portrait.appendChild(imgInput)
    god_portrait.appendChild(img)
    let god_detail = createClass('div', 'god-detail')
    let god_name = createEditableLabel(id, 'god-name', firstUcase(type) + ' God')
    god_detail.appendChild(god_name)
    god.appendChild(god_portrait)
    god.appendChild(god_detail)

    let power_detail = createSubPart(id, 'power')
    god.appendChild(power_detail)
    if (type === 'major') {
        let wonder_detail = createSubPart(id, 'wonder')
        god.appendChild(wonder_detail)
    } else {
        let myth_detail = createSubPart(id, 'myth')
        god.appendChild(myth_detail)
    }
    return god
}

function createSubPart(id, type) {
    let subPart = createClass('div', type + '-detail')
    let imgInput = createClass('input', 'load-img-input')
    imgInput.type = 'file'
    imgInput.accept = 'image/*'
    let imgSrc = '';
    switch (type) {
        case 'power':
            imgSrc = id < 10 ? IMG_MAJOR_POWER : IMG_MINOR_POWER
            break;
        case 'wonder':
            imgSrc = IMG_WONDER
            break;
        case 'myth':
            imgSrc = IMG_MYTH
            break;
    }
    let img = createImgSrc(imgSrc)
    img.classList.add(type + '-icon')
    editableImg(img, img, imgInput)
    subPart.appendChild(imgInput)
    subPart.appendChild(img)
    let subPart_name = createEditableLabel(id, type + '-name', firstUcase(type))
    subPart.appendChild(subPart_name)
    return subPart
}

function createEditableLabel(id, className, value) {
    let container = createClass('div', className)

    let label = createClass('label', className + '-label')
    label.htmlFor = id
    label.innerText = value
    container.appendChild(label)

    let input = createClass('input', className + '-input')
    input.id = 'input-name-' + id
    container.appendChild(input)

    editableLabel(container, label, input, className)
    return container
}

function editableLabel(container, label, input, className) {
    container.addEventListener('click', (e) => {
        if (e.target.classList.value === className && input.style.display === 'inline') {
        } else {
            label.style.display = 'none'
            input.value = label.innerText.substr(0, 200)
            input.style.display = 'inline'
            input.style.textAlign = 'center'
            input.select()
        }
    })
    input.addEventListener('focusout', (e) => {
        updateLabel(label, input)
    })
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            updateLabel(label, input)
        }
    })
}

function updateLabel(label, input) {
    input.style.display = 'none';
    if (input.value.trim() !== '') {
        label.innerText = input.value;
    }
    label.style.display = 'inline';
}

function createImgSrc(src) {
    let img = document.createElement('img');
    img.src = src;
    return img;
}

function editableImg(container, img, input) {
    container.addEventListener('click', (e) => {
        if (e.target.classList.value === 'god-portrait' && input.style.display === 'inline') {
        } else {
            input.click()
        }
    })
    input.addEventListener('change', (e) => {
        let file = e.target.files[0]
        let reader = new FileReader();
        reader.addEventListener('load', (load_evt) => {
            img.src = load_evt.target.result
        });
        reader.readAsDataURL(file);
    })
}

function firstUcase(text) {
    return text[0].toUpperCase() + text.slice(1)
}

function toggleDLC(bool) {
    let major_four = document.getElementById('major-4')
    let minor_four1 = document.getElementById('minor-41')
    let minor_four2 = document.getElementById('minor-42')
    let minor_four3 = document.getElementById('minor-43')
    let dlc = [major_four, minor_four1, minor_four2, minor_four3]
    dlc.forEach(element => {
        element.style.display = bool ? 'block' : 'none'
    })
    if (bool) {
        pantheon_detail.style.gridTemplateColumns = '1fr repeat(4, 2fr)'
    } else {
        pantheon_detail.style.gridTemplateColumns = '1fr repeat(3, 2fr)'
    }
}

function togglePower(bool) {
    let powers = document.querySelectorAll('.power-detail')
    powers.forEach(element => {
        element.style.display = bool ? 'block' : 'none'
    })
}

function toggleWonder(bool) {
    let wonders = document.querySelectorAll('.wonder-detail')
    wonders.forEach(element => {
        element.style.display = bool ? 'block' : 'none'
    })
}

function toggleMyth(bool) {
    let myths = document.querySelectorAll('.myth-detail')
    myths.forEach(element => {
        element.style.display = bool ? 'block' : 'none'
    })
}

function toggleTitan(bool) {
    let titan = document.querySelector('.titan')
    titan.style.display = bool ? 'flex' : 'none'
}

function toggleImage(bool) {
    let portraits = document.querySelectorAll('.god-portrait')
    let titan_portrait = document.querySelector('.titan-portrait')
    let icons = document.querySelectorAll('.power-icon, .wonder-icon, .myth-icon')
    let all = [...portraits, titan_portrait]
    all.forEach(element => {
        element.style.display = bool ? 'block' : 'none'
    })
    icons.forEach(element => {
        element.style.display = bool ? 'inline' : 'none'
    })
}

function openSettings() {
    document.getElementById("setting").style.width = "100%";
}

function closeSettings() {
    document.getElementById("setting").style.width = "0%";
}

function screenshot() {
    html2canvas(document.getElementById('background'), {
        useCORS: true, allowTaint: true, ignoreElements: (element) => {
            return element.id === 'open-setting' || element.id === 'setting'
        }
    }).then(canvas => {
        let link = document.createElement('a')
        link.dataset.html2canvasIgnore = 'true'
        link.download = 'pantheon.png'
        link.href = canvas.toDataURL()
        link.click()
    })
}

function saveJSON() {
    let data = {
        pantheonName: document.querySelector('.pantheon-name-label').innerText,
        backgroundImage: document.getElementById('background').style.backgroundImage,
        titan: {
            name: document.querySelector('.titan-name-label').innerText,
            img: document.querySelector('.titan-portrait img').src
        },
        gods: []
    }
    for (let i = 1; i <= MAJOR; i++) {
        let god = {
            id: i,
            type: 'major',
            name: document.querySelector('label[for="' + i + '"]').innerText,
            img: document.querySelector('#major-' + i + ' .god-portrait img').src,
            power: {
                name: document.querySelector('#major-' + i + ' .power-name').innerText,
                img: document.querySelector('#major-' + i + ' .power-detail img').src
            },
            wonder: {
                name: document.querySelector('#major-' + i + ' .wonder-name').innerText,
                img: document.querySelector('#major-' + i + ' .wonder-detail img').src
            }
        }
        data.gods.push(god)
        for (let j = 1; j <= MINOR; j++) {
            let minorGod = {
                id: i + '' + j,
                type: 'minor',
                name: document.querySelector('label[for="' + i + j + '"]').innerText,
                img: document.querySelector('#minor-' + i + '' + j + ' .god-portrait img').src,
                power: {
                    name: document.querySelector('#minor-' + i + '' + j + ' .power-name').innerText,
                    img: document.querySelector('#minor-' + i + '' + j + ' .power-detail img').src
                },
                myth: {
                    name: document.querySelector('#minor-' + i + '' + j + ' .myth-name').innerText,
                    img: document.querySelector('#minor-' + i + '' + j + ' .myth-detail img').src
                }
            }
            data.gods.push(minorGod)
        }
    }
    let link = document.createElement('a')
    link.download = 'pantheon.json'
    link.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data))
    link.click()
}

function loadJSON(event) {
    let file = event.target.files[0]
    let reader = new FileReader();
    reader.addEventListener('load', (load_evt) => {
        let data = JSON.parse(load_evt.target.result)
        document.querySelector('.pantheon-name-label').innerText = data.pantheonName
        document.getElementById('background').style.backgroundImage = data.backgroundImage
        document.querySelector('.titan-name-label').innerText = data.titan.name
        document.querySelector('.titan-portrait img').src = data.titan.img
        data.gods.forEach(god => {
            let godElement = document.querySelector('#' + god.type + '-' + god.id)
            if (godElement) {
                godElement.querySelector('label[for="' + god.id + '"]').innerText = god.name
                godElement.querySelector('.god-portrait img').src = god.img
                godElement.querySelector('.power-name-label').innerText = god.power.name
                godElement.querySelector('.power-detail img').src = god.power.img
                if (god.type === 'major') {
                    godElement.querySelector('.wonder-name-label').innerText = god.wonder.name
                    godElement.querySelector('.wonder-detail img').src = god.wonder.img
                } else {
                    godElement.querySelector('.myth-name-label').innerText = god.myth.name
                    godElement.querySelector('.myth-detail img').src = god.myth.img
                }
            }
        })
    });
    reader.readAsText(file);
}

function changeBackground(event) {
    let file = event.target.files[0]
    let reader = new FileReader();
    reader.addEventListener('load', (load_evt) => {
        document.getElementById('background').style.backgroundImage = 'url(' + load_evt.target.result + ')'
    });
    reader.readAsDataURL(file);
}
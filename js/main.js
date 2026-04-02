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
const IMG_HEROIC_NAVAL = './image/heroic_naval.webp'
const IMG_MYTHIC_NAVAL = './image/mythic_naval.webp'

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
    if (id === 'heroic' || id === 'mythic') {
        age.appendChild(createNavalMyth(id))
    }
    return age
}

function createTitan() {
    let titan = createClass('div', 'titan')
    let imgSrc = IMG_TITAN
    let titan_portrait = createEditableImg('titan', imgSrc)
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
    let imgSrc = type === 'major' ? IMG_MAJOR : IMG_MINOR
    let god_portrait = createEditableImg('god', imgSrc)
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
    subPart.appendChild(createEditableImg(type, imgSrc))
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

    let input = createClass('textarea', className + '-input')
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

function editableImg(container, img, input, className) {
    container.addEventListener('click', (e) => {
        if (e.target.classList.value === className + '-portrait' && input.style.display === 'inline') {
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
        reader.readAsDataURL(file)
    })
}

function createEditableImg(className, src) {
    let container = createClass('div', className + '-portrait')
    let imgInput = createClass('input', 'load-img-input')
    imgInput.type = 'file'
    imgInput.accept = 'image/*'
    let img = createImgSrc(src)
    img.classList.add(className + '-icon')
    editableImg(container, img, imgInput, className)
    container.appendChild(imgInput)
    container.appendChild(img)
    return container
}

function firstUcase(text) {
    return text[0].toUpperCase() + text.slice(1)
}

function createNavalMyth(age) {
    let navalMyth = createClass('div', 'naval-myth')
    let src;
    if (age === 'heroic') {
        src = IMG_HEROIC_NAVAL
    } else if (age === 'mythic') {
        src = IMG_MYTHIC_NAVAL
    }
    let portrait = createEditableImg('naval-myth', src)
    let detail = createEditableLabel(age, 'naval-myth-name', firstUcase(age) + ' Naval Myth')
    navalMyth.appendChild(portrait)
    navalMyth.appendChild(detail)
    return navalMyth
}
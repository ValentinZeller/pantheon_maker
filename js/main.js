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
pantheon.appendChild(createEditableLabel('pantheon', 'pantheon', 'My Pantheon'))
pantheon.appendChild(createElement('titan', 'titan', IMG_TITAN, 'Titan'))

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
    age.appendChild(createImgSrc(imgSrc, 'age'))
    let span = createClass('span', 'age-name')
    span.innerText = firstUcase(id) + ' Age'
    age.appendChild(span)
    age.id = id;
    if (id === 'heroic' || id === 'mythic') {
        let value = firstUcase(id) + ' Naval Myth'
        let imgSrc = id === 'heroic' ? IMG_HEROIC_NAVAL : IMG_MYTHIC_NAVAL
        age.appendChild(createElement(id, 'naval-myth', imgSrc, value))
    }
    return age
}

function createGod(id, type) {
    let imgSrc = type === 'major' ? IMG_MAJOR : IMG_MINOR
    let value = firstUcase(type) + ' God'
    let god = createElement(id, 'god', imgSrc, value)
    god.id = type + '-' + id

    imgSrc = id < 10 ? IMG_MAJOR_POWER : IMG_MINOR_POWER
    god.appendChild(createElement(id, 'power', imgSrc, 'Power'))
    if (type === 'major') {
        imgSrc = IMG_WONDER
        god.appendChild(createElement(id, 'wonder', imgSrc, 'Wonder'))
    } else {
        imgSrc = IMG_MYTH
        god.appendChild(createElement(id, 'myth', imgSrc, 'Myth'))
    }
    return god
}

function createElement(id, type, imgSrc, value) {
    let container = createClass('div', type)
    container.appendChild(createEditableImg(type, imgSrc))
    container.appendChild(createEditableLabel(id, type, value))
    return container
}

function firstUcase(text) {
    return text[0].toUpperCase() + text.slice(1)
}

function createEditableLabel(id, className, value) {
    let container = createClass('div', className + '-name')

    let label = createClass('label', className + '-name-label')
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

function createImgSrc(src, className) {
    let img = document.createElement('img');
    img.src = src;
    img.classList.add(className + '-icon')
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
    let img = createImgSrc(src, className)
    editableImg(container, img, imgInput, className)
    container.appendChild(imgInput)
    container.appendChild(img)
    return container
}
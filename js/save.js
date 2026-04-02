function saveJSON() {
    let data = {
        pantheonName: document.querySelector('.pantheon-name-label').innerText,
        backgroundImage: document.getElementById('background').style.backgroundImage,
        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--main-color'),
        textColor: getComputedStyle(document.documentElement).getPropertyValue('--text-color'),
        ageColor: getComputedStyle(document.documentElement).getPropertyValue('--age-color'),
        navalMyths: {
            heroic: {
                name: document.querySelector('#heroic .naval-myth-name-label').innerText,
                img: document.querySelector('#heroic .naval-myth-portrait img').src
            },
            mythic: {
                name: document.querySelector('#mythic .naval-myth-name-label').innerText,
                img: document.querySelector('#mythic .naval-myth-portrait img').src
            }
        },
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
                img: document.querySelector('#major-' + i + ' .power-portrait img').src
            },
            wonder: {
                name: document.querySelector('#major-' + i + ' .wonder-name').innerText,
                img: document.querySelector('#major-' + i + ' .wonder-portrait img').src
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
                    img: document.querySelector('#minor-' + i + '' + j + ' .power-portrait img').src
                },
                myth: {
                    name: document.querySelector('#minor-' + i + '' + j + ' .myth-name').innerText,
                    img: document.querySelector('#minor-' + i + '' + j + ' .myth-portrait img').src
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
        document.documentElement.style.setProperty('--main-color', data.backgroundColor)
        document.documentElement.style.setProperty('--text-color', data.textColor)
        document.documentElement.style.setProperty('--age-color', data.ageColor)
        document.querySelector('.titan-name-label').innerText = data.titan.name
        document.querySelector('.titan-portrait img').src = data.titan.img
        if (data.navalMyths) {
            document.querySelector('#heroic .naval-myth-name-label').innerText = data.navalMyths.heroic.name
            document.querySelector('#heroic .naval-myth-portrait img').src = data.navalMyths.heroic.img
            document.querySelector('#mythic .naval-myth-name-label').innerText = data.navalMyths.mythic.name
            document.querySelector('#mythic .naval-myth-portrait img').src = data.navalMyths.mythic.img
        }
        data.gods.forEach(god => {
            let godElement = document.querySelector('#' + god.type + '-' + god.id)
            if (godElement) {
                godElement.querySelector('label[for="' + god.id + '"]').innerText = god.name
                godElement.querySelector('.god-portrait img').src = god.img
                godElement.querySelector('.power-name-label').innerText = god.power.name
                godElement.querySelector('.power-portrait img').src = god.power.img
                if (god.type === 'major') {
                    godElement.querySelector('.wonder-name-label').innerText = god.wonder.name
                    godElement.querySelector('.wonder-portrait img').src = god.wonder.img
                } else {
                    godElement.querySelector('.myth-name-label').innerText = god.myth.name
                    godElement.querySelector('.myth-portrait img').src = god.myth.img
                }
            }
        })
    });
    reader.readAsText(file);
}
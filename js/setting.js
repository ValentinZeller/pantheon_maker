function openSettings() {
    document.getElementById("setting").style.width = "100%";
}

function closeSettings() {
    document.getElementById("setting").style.width = "0%";
}

async function screenshot() {
    const result = await snapdom(document.getElementById('background'), { embedFonts: true, localFonts: [{ 'family': 'Baskervville', 'src': 'url(./style/Baskervville-Regular.ttf)' }] })
    await result.download({ format: 'jpg', filename: 'pantheon.jpg' });
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

function toggleTitan(bool) {
    let titan_portrait = document.querySelector('.titan-portrait')
    let titan_name = document.querySelector('.titan-name')
    titan_portrait.style.display = bool ? 'block' : 'none'
    titan_name.style.display = bool ? 'block' : 'none'
}

function toggleWonder(bool) {
    let wonders = document.querySelectorAll('.wonder')
    wonders.forEach(element => {
        element.style.display = bool ? 'block' : 'none'
    })
}

function togglePower(bool) {
    let powers = document.querySelectorAll('.power')
    powers.forEach(element => {
        element.style.display = bool ? 'block' : 'none'
    })
}

function toggleMyth(bool) {
    let myths = document.querySelectorAll('.myth')
    myths.forEach(element => {
        element.style.display = bool ? 'block' : 'none'
    })
}

function toggleNavalMyth(bool) {
    let navalMyths = document.querySelectorAll('.naval-myth')
    navalMyths.forEach(element => {
        element.style.display = bool ? 'block' : 'none'
    })
}

function toggleImage(bool) {
    let portraits = document.querySelectorAll('.god-portrait, .titan-portrait, .power-portrait, .wonder-portrait, .myth-portrait, .naval-myth-portrait')
    portraits.forEach(element => {
        element.style.display = bool ? 'block' : 'none'
    })
}

function changeBackground(event) {
    let file = event.target.files[0]
    let reader = new FileReader();
    reader.addEventListener('load', (load_evt) => {
        document.getElementById('background').style.backgroundImage = 'url(' + load_evt.target.result + ')'
    });
    reader.readAsDataURL(file);
}

function changeColor(event) {
    document.documentElement.style.setProperty('--main-color', event.target.value + 'e3')
}

function changeTextColor(event) {
    document.documentElement.style.setProperty('--text-color', event.target.value)
}

function changeAgeColor(event) {
    document.documentElement.style.setProperty('--age-color', event.target.value)
}

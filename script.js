
const CryptoJson = (url) => {
    fetch(url, {

    })
        .then(response => response.json())
        .then(data => {
            console.log('data', data)
            containBox(data)
        })
        .catch(err => {
            console.log('error', err)
        })
}

CryptoJson('https://api.coingecko.com/api/v3/coins/bitcoin?market_data=true')
CryptoJson('https://api.coingecko.com/api/v3/coins/ethereum?market_data=true')

let ids = []
// const box1 = document.querySelector('#box_1')
const rgrid = document.querySelector('#rightGrid')
const div = document.createElement('div')
const containBox = (data) => {
    // console.log(box1.children)
    div.className = 'boxes'
    const box1 = document.createElement('div')
    box1.id = 'box_1'
    const img = document.createElement('img')
    img.src = data.image.small

    const smbox = document.createElement('div')
    smbox.className = 'smallbox'
    const b = document.createElement('b')
    b.textContent = `$_${data.market_data.current_price.usd}`
    const h1 = document.createElement('h1')
    h1.textContent = data.name

    smbox.append(b, h1)
    box1.append(img, smbox)

    div.append(box1)
    rgrid.append(div)

}

const sect = document.querySelector('#Contain')
const CryptoAllJson = (url) => {
    fetch(url, {

    })
        .then(response => response.json())
        .then(data => {
            // LoadData(data, 0)
            console.log(data,'gtgt')
            data.forEach(DataOn => {
                LoadData(DataOn, data.indexOf(DataOn))
            })

        })
        .catch(err => {
            console.log('error', err)
        })
}

CryptoAllJson('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en')
// CryptoAllJson('../data.json')
const LoadData = (data, indexNum) => {
    const colData = document.createElement('div')
    colData.className = 'colData'
    const b1 = document.createElement('button')
    b1.className = 'iconStar'



    const b2 = document.createElement('b')
    const b3 = document.createElement('b')
    const b4 = document.createElement('b')
    const b5 = document.createElement('b')

    const img = document.createElement('img')
    const h1 = document.createElement('h1')
    h1.style.display = 'flex'
    h1.style.flexDirection = 'column-reverse'
    const h1_b = document.createElement('b')
    const h2_b = document.createElement('b')
    h1_b.textContent = data.symbol
    h1_b.style.fontWeight = '500'

    h1_b.style.textTransform = 'uppercase'
    h2_b.textContent = data.name
    h1.append(h1_b, h2_b)
    img.src = data.image
    b1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg> ${indexNum + 1}`


    b2.className = 'coincontent'
    b3.textContent = `$${data.current_price}`
    b4.textContent = `$${data.total_volume}`
    b5.textContent = `$${data.market_cap}`

    b2.prepend(img)
    b2.append(h1)
    colData.append(b1, b2, b3, b4, b5)
    sect.append(colData)




    b1.addEventListener('click', () => {
        let checked = b1.classList.toggle('Checked')
        clickFunc(checked)

        if (b1.className === 'iconStar Checked') {
            ids.push({
                id: data.id
            })

            localStorage.setItem('ids', JSON.stringify(ids))
            console.log('hihiih')
        }
        else {

            function removeData(condition) {
                ids = ids.filter(item => !condition(item));

                console.log('New Array:', ids);
            }

            removeData(item => item.id == data.id)

            localStorage.setItem('ids', JSON.stringify(ids))
        }


    })

    const clickFunc = (checked) => {
        checked = !checked
        if (!checked) {
            sect.prepend(colData)

            b1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg> ${indexNum + 1}`
        }
        else {
            sect.insertBefore(colData, sect.childNodes[indexNum + 1].nextSibling)
            b1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg> ${indexNum + 1}`

        }
    }

    let getDta = JSON.parse(localStorage.getItem('ids'))


    getDta.forEach(Item => {
        if (data.id === Item.id) {
            ids.push(Item)
            let checked = b1.className += ' Checked'
            clickFunc(checked)
            console.log('hi')

        }
    })

}



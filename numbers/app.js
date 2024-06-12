// Part 1
let favNum = (Math.round(Math.random() * 100))
let baseURL = "http://numbersapi.com"
let n = favNum

async function favoriteNumber(n) {
    let res = await $.getJSON(`${baseURL}/${n}?json`);
    console.log(res.text)
}

favoriteNumber(`${favNum}`)


// Part 2
const numbers = [12, 22]
async function favNums() {
    let res = await $.getJSON(`${baseURL}/${numbers}?json`)
    console.log(res)    
}

favNums()

// Part 3
async function favFour() {
        let facts = await Promise.all(
            Array.from({length: 4 }, () => $.getJSON(`${baseURL}/${favNum}?json`))
        )
        facts.forEach(data => {
            $('body').append(`<p>${data.text}</p>`)
        })
}
favFour()
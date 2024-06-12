$(function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck'

    // part 1
    async function drawOne() {
        let data = await $.getJSON(`${baseURL}/new/draw/`)
        let { suit, value } = data.cards[0]
        console.log(`${value.toLowercase()} of ${suit.toLowercase()}`)
    }

    //part 2
    async function drawTwo() {
        let firstCard = await $.getJSON(`${baseURL}/new/draw/`)
        let deckID = firstCard.deck_id
        let secondCard = await $.getJSON(`${baseURL}/${deckID}/draw/`)
        [firstCard, secondCard].forEach(card => {
            let { suit, value } = card.cards[0]
            console.log(`${value.toLowercase()} of ${suit.toLowercase()}`)
        })
    }

    // part 3
    async function showCards() {
        let $btn = $('button')
        let $cardArea = $('#card-area')

        let deckData = await $.getJSON(`${baseURL}/new/shuffle/`)
        $btn.show().on('click', async function() {
            let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`)
            let cardSrc = cardData.cards[0].image
            let angle = Math.random() * 90 - 45
            let randomX = Math.random() * 40 - 20
            let randomY = Math.random() * 40 - 20
            $cardArea.append(
                $('<img>', {
                    src: cardSrc,
                    css: {
                        transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                    }
                })
            )
            if (cardData.remaining === 0) $btn.remove()
        })
    }
    showCards()
})
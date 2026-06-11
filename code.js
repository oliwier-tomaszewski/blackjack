let suits = ["♠", "♥", "♦", "♣"]
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
let deck = []
let playerHand = []
let dealerHand = []


function createDeck() {
    for (let a = 0; a < suits.length; a++) {
    for (let b = 0; b < values.length; b++) {
        deck.push({suit: suits[a], value: values[b], points: values[b] === "A" ? 11 : (values[b] === "J" || values[b] === "Q" || values[b] === "K") ? 10 : parseInt(values[b])})
    }
}
}

createDeck()
shuffle()

function shuffle() {
    for (c = deck.length - 1; c > 0; c--) {
        let random = Math.floor(Math.random() * (c + 1))

        let temp = deck[c]
        deck[c] = deck[random]
        deck[random] = temp
    }
} 

function dealCard() {
    return deck.pop()
}


dealInitialCards()
renderHands()
console.log(playerHand, dealerHand)
console.log(calculateScore(playerHand))
console.log(calculateScore(dealerHand))


function dealInitialCards() {
    playerHand.push(dealCard())
    playerHand.push(dealCard())

    dealerHand.push(dealCard())
    dealerHand.push(dealCard())
}


function calculateScore(hand) {
    let total = 0
    let aces = 0
    hand.forEach(card => {
        total += card.points
        if (card.value === "A") aces++
    });

    while (total > 21 && aces > 0) {
        total -= 10
        aces--
    }

    return total
    
}


function renderHands() {
    let playerDiv = document.getElementById("player-hand")
    let dealerDiv = document.getElementById("dealer-hand")

    playerDiv.innerHTML = ""
    dealerDiv.innerHTML = ""

    playerHand.forEach( card => {
        let cardDiv = document.createElement("div")
        cardDiv.classList.add("card")
        cardDiv.textContent = card.suit + card.value
        playerDiv.appendChild(cardDiv)
    })

    dealerHand.forEach(card => {
        let cardDiv = document.createElement("div")
        cardDiv.classList.add("card")
        cardDiv.textContent = card.suit + card.value
        dealerDiv.appendChild(cardDiv)
    })

    document.getElementById("player-score").textContent = calculateScore(playerHand)
    document.getElementById("dealer-score").textContent = calculateScore(dealerHand)
}


function hit() {
    playerHand.push(dealCard())
    renderHands()

    let score = calculateScore(playerHand)

    if (score > 21) {
        document.getElementById("message").textContent = "Bust! Przegrałeś"
        document.getElementById("hit").disabled = true
        document.getElementById("stand").disabled = true
        document.getElementById("double").disabled = true
    } else if (score === 21) {
        document.getElementById("message").textContent = "Blackjack! Wygrałeś"
        document.getElementById("hit").disabled = true
        document.getElementById("stand").disabled = true
        document.getElementById("double").disabled = true
    }
}


function stand() {
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(dealCard())
        renderHands()
    }

    let playerScore = calculateScore(playerHand)
    let dealerScore = calculateScore(dealerHand)

    if (calculateScore(dealerHand) > 21) {
        document.getElementById("message").textContent = "Bust! ty wygrałeś"
    } else if (playerScore > dealerScore) {
        document.getElementById("message").textContent = "ty wygrałeś"
    } else if (dealerScore > playerScore) {
        document.getElementById("message").textContent = "ty przegrałeś"
    } else if (dealerScore == playerScore) {
        document.getElementById("message").textContent = "remis"
    }

    document.getElementById("hit").disabled = true
    document.getElementById("stand").disabled = true
    document.getElementById("double").disabled = true

}


function double() {
    playerHand.push(dealCard())
    renderHands()

    let score = calculateScore(playerHand)

    if (score > 21) {
        document.getElementById("message").textContent = "Bust! Przegrałeś"
        document.getElementById("hit").disabled = true
        document.getElementById("stand").disabled = true
        document.getElementById("double").disabled = true
    } else {
        stand()
    }
}


function restartGame() {
    playerHand = []
    dealerHand = []
    deck = []

    createDeck()
    shuffle()
    dealInitialCards()
    renderHands()

    document.getElementById("hit").disabled = false
    document.getElementById("stand").disabled = false
    document.getElementById("double").disabled = false
    document.getElementById("message").textContent = ""

}
const packs = [
    {
        name: "silver",
        channels: [
            "Zee",
            "Sony",
            "Star plus"
        ],
        amount: 50,
        isAvailable: false
    },
    {
        name: "gold",
        channels: [
            "Zee",
            "Sony",
            "Star plus",
            "Discovery",
            "NatGeo"
        ],
        amount: 100,
        isAvailable: true
    },
]

const channels = [
    {
        name: "Zee",
        amount: 10,
        isAvailable: true
    },
    {
        name: "Sony",
        amount: 15,
        isAvailable: true
    },
    {
        name: "Star plus",
        amount: 20,
        isAvailable: true
    },
    {
        name: "Discovery",
        amount: 10,
        isAvailable: false
    },
    {
        name: "NatGeo",
        amount: 20,
        isAvailable: true
    }
]

const services = [
    {
        name: "LearnEnglish",
        amount: 200,
        isAvailable: true
    },
    {
        name: "LearnCooking",
        amount: 100,
        isAvailable: true
    }
]
module.exports = { packs, channels, services }
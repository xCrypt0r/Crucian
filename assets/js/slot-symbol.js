const { SlotSymbol } = require('slot-machine');

const apple = new SlotSymbol('apple', {
    display: '🍎',
    points: 1,
    weight: 100
});
const orange = new SlotSymbol('orange', {
    display: '🍊',
    points: 1,
    weight: 100
});
const grape = new SlotSymbol('grape', {
    display: '🍇',
    points: 1,
    weight: 100
});
const lemon = new SlotSymbol('lemon', {
    display: '🍋',
    points: 1,
    weight: 100
});
const watermelon = new SlotSymbol('watermelon', {
    display: '🍉',
    points: 1,
    weight: 100
});
const cherry = new SlotSymbol('cherry', {
    display: '🍒',
    points: 1,
    weight: 100
});
const wild = new SlotSymbol('wild', {
    display: '❓',
    points: 1,
    weight: 40,
    wildcard: true
});
const bell = new SlotSymbol('bell', {
    display: '🔔',
    points: 2,
    weight: 40
});
const clover = new SlotSymbol('clover', {
    display: '🍀',
    points: 3,
    weight: 35
});
const heart = new SlotSymbol('heart', {
    display: '❤',
    points: 4,
    weight: 30
});
const money = new SlotSymbol('money', {
    display: '💰',
    points: 5,
    weight: 25
});
const star = new SlotSymbol('star', {
    display: '⭐',
    points: 10,
    weight: 5
});
const diamond = new SlotSymbol('diamond', {
    display: '💎',
    points: 30,
    weight: 3
});
const jackpot = new SlotSymbol('jackpot', {
    display: '👑',
    points: 50,
    weight: 2
});

module.exports = {
    apple,
    orange,
    grape,
    lemon,
    watermelon,
    cherry,
    wild,
    bell,
    clover,
    heart,
    money,
    star,
    diamond,
    jackpot
};
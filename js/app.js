'use strict';

// Sets the speed variable
var speed = {
    'fast': 200,
    'fastNormal': 175,
    'normal': 150,
    'normalSlow': 125,
    'slow': 100
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    console.log(this.speed);
};

Enemy.prototype.reset = function() {
    if (this.x > 510) {
        this.x = -200;
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    this.reset();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player Class
var Player = function() {
    this.x = 200;
    this.y = 380;
    this.height = 75;
    this.width = 66;
    this.sprite = 'images/char-boy.png';

};

Player.prototype.update = function(dt) {
        this.reset();

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function(){
    if (this.y <= 0){
        this.y = 380;
        console.log('Touchdown!!');
    }
};

Player.prototype.handleInput = function(keyCode) {
    switch (keyCode) {
        case 'left':
            if (this.x > 0) {
                this.x = this.x - 100;
            } else {
                this.x = this.x;
            }
            break;
        case 'right':
            if (this.x < 400) {
                this.x = this.x + 100;
            } else {
                this.x = this.x;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y = this.y - 80;
            } else {
                this.y = this.y;
            }
            break;
        case 'down':
            if (this.y < 350) {
                this.y = this.y + 80;
            } else {
                this.y = this.y;
            }
            break;
        default:
    }
};

// Checking collision between Player and allEnemies

function checkCollisions(){
    var badGuy;
    for (let i = 0; i < allEnemies.length; i++){
        badGuy = allEnemies[i];
        badGuy.width = 50;
        badGuy.height = 40;
        if (player.x < badGuy.x + badGuy.width && player.x + player.width > badGuy.x && player.y < badGuy.y + badGuy.height && player.y + player.height > badGuy.y){
            player.x = 200;
            player.y = 380;
        }
    }
    return false;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(-100, 220, speed.slow), new Enemy(-100, 140, speed.fast), new Enemy(-100, 60, speed.normal)];
var player = new Player();

(function pushEnemy() {
    function enemyPush(){
            var secondEnemies = [new Enemy(-300, 220, speed.fastNormal), new Enemy(-100, 140, speed.normalSlow), new Enemy(-200, 60, speed.slow)];

            for (let i = 0; i < secondEnemies.length; i++) {
            allEnemies.push(secondEnemies[i]);
            }
        }
        var pushTimeout = setTimeout(enemyPush, 3500);
})();


// This will allow to get random index from positionY Array

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
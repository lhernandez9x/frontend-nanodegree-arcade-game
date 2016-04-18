// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy()];
var player = new Player();


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
'use strict';

// Sets the speed variable
var speed = {
    'fast': 200,
    'fastNormal': 175,
    'normal': 150,
    'normalSlow': 125,
    'slow': 100
};

// Gem variables
var blueGem = 'images/GemBlue.png',
    greenGem = 'images/GemGreen.png',
    orangeGem = 'images/GemOrange.png';

// This creates Gem Class
var Gem = function(x, y, speed, sprite){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = sprite;
};

//This resets Gem to reappear on left side of screen
Gem.prototype.reset = function() {
    if (this.x > 600) {
        this.x = -500;
    }
};

//This monitors Gem movement and
//resets once it reaches off screen on right side
Gem.prototype.update = function(dt){
    this.x = this.x + this.speed * dt;
    this.reset();
};

// This draws the gems on the screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

//This resets enemy to reappear on  left side of screen
Enemy.prototype.reset = function() {
    if (this.x > 600) {
        this.x = -200;
    }
};

//This monitors enemy movement and
//resets once it reaches off screen on right side
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    this.reset();
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This sets the Player Class
var Player = function(x, y, points, lives) {
    this.x = x;
    this.y = y;
    this.height = 75;
    this.width = 66;
    this.points = points;
    this.lives = lives;
    this.sprite = 'images/char-boy.png';

};

// This appends the scoreboard so that points get added to screen
var hud = '<div id="hud"><h2 class="score">Score: 0</h2><h2 class="lives">Lives: 5</h2></div>';
$('body').append(hud);



// Player Update and Render functions
Player.prototype.update = function(dt) {
    this.score();
    enemyCollisions();
    gemCollisions();
    this.gameEnd();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This resets player position when player reaches water and adds points
// and removes points  and life when player collides with enemy

Player.prototype.score = function(){
    if (this.y <= 0){
        this.y = 380;
        this.points = this.points + 50;
    }
    document.getElementById('hud').innerHTML = '<h2 class="score">Score: ' + this.points + '</h2>' + '<h2 class="lives">Lives: ' + this.lives + '</h2>';
};

// Rules for game end
Player.prototype.gameEnd = function(){
    //This sets player win
    if(this.points >= 2500){
        document.getElementById('gameEnd').innerHTML = '<h2 class="won">You won! Unfortunately the Princess is in another castle.(J/K there is no princess) But go ahead and try again.<br><input type="button" id="playAgain" value="Play Again"></h2>';
        this.y = 380;
        this.x = 200;
        this.points = 0;
        this.lives = 5;
        document.getElementById('playAgain').addEventListener('click', function retryPlay(){
            document.getElementById('gameEnd').innerHTML = '';
        })
    }

    //This sets player death
    if(this.lives == 0){
        document.getElementById('gameEnd').innerHTML = '<h2 class="lost">You died a painfull, simulated death. :( You can try again if you dare.<br><input type="button" id="retry" value="Retry"></h2>';
        this.y = 380;
        this.points = 0;
        this.lives = 5;
        document.getElementById('retry').addEventListener('click', function retryPlay(){
            document.getElementById('gameEnd').innerHTML = '';
        })

    }
};


// This handles the input for the player motion and controls player from c=going out of bounds

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

// Checking collision between Player, allEnemies, and Gems

function enemyCollisions(){
    var badGuy;
    for (var i = 0; i < allEnemies.length; i++){
        badGuy = allEnemies[i];
        badGuy.width = 50;
        badGuy.height = 40;
        if (player.x < badGuy.x + badGuy.width && player.x + player.width > badGuy.x && player.y < badGuy.y + badGuy.height && player.y + player.height > badGuy.y){
            player.x = 200;
            player.y = 380;
            player.points = player.points - 50;
            player.lives = player.lives - 1;
        }
    }
    return false;
}

function gemCollisions(){
    var bonusGems;
    for (var i = 0; i < gems.length; i++){
        bonusGems = gems[i];
        bonusGems.width = 50;
        bonusGems.height = 40;

        // Collision with blue gems.
        // Blue gems give 200 points.
        if (player.x < bonusGems.x + bonusGems.width && player.x + player.width > bonusGems.x && player.y < bonusGems.y + bonusGems.height && player.y + player.height > bonusGems.y && bonusGems.sprite == blueGem){
            player.points = player.points + 200;
            bonusGems.x = -500;
        }
        // Collision with green gems.
        // Blue gems give 100 points.
        if (player.x < bonusGems.x + bonusGems.width && player.x + player.width > bonusGems.x && player.y < bonusGems.y + bonusGems.height && player.y + player.height > bonusGems.y && bonusGems.sprite == greenGem){
            player.points = player.points + 100;
            bonusGems.x = -500;
        }
        // Collision with orange gems.
        // Blue gems give 150 points.
        if (player.x < bonusGems.x + bonusGems.width && player.x + player.width > bonusGems.x && player.y < bonusGems.y + bonusGems.height && player.y + player.height > bonusGems.y && bonusGems.sprite == orangeGem){
            player.points = player.points + 150;
            bonusGems.x = -500;
        }
    }
    return false;
}

// This instantiate Enemies, Player, and Gems

var allEnemies = [new Enemy(-100, 220, speed.slow), new Enemy(-100, 140, speed.fast), new Enemy(-100, 60, speed.normal)];
var gems = [new Gem(-1000, 60, speed.normal, blueGem), new Gem(-200, 140, speed.fastNormal, greenGem), new Gem(-400, 220, speed.fast, orangeGem)];
var player = new Player(200, 380, 0, 5);

(function pushEnemy() {
    function enemyPush(){
            var secondEnemies = [new Enemy(-300, 220, speed.fastNormal), new Enemy(-100, 140, speed.normalSlow), new Enemy(-200, 60, speed.slow)];

            for (var i = 0; i < secondEnemies.length; i++) {
            allEnemies.push(secondEnemies[i]);
            }
        }
        var pushTimeout = setTimeout(enemyPush, 2500);
})();



// This will allow to get random index from positionY Array

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

// This listens for key presses
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/**
 * By Alxeander Ezharjan
 * 2020/04/05
 */

// Customized API for user 
var clearColor = Color.BISQUE;
var playerColor = Color.SKY_BLUE;
var destinationColor = Color.DARK_BLUE;
var infoColor = Color.DARK_BLUE;
var lives = 5;

// Internal settings
var gameOver = false;
var playerHeight = 20;
var playerWidth = 20;
var destinationHeight = 20;
var destinationWidth = 20;
var enemyRadius = 10;
var destinationX = (Math.floor(Math.random() * (canvas.width - destinationWidth - 1)));
var destinationY = (Math.floor(Math.random() * (canvas.height - destinationHeight - 1)));
var level = 1;

// Make the Origin point at the center of the player
var playerX = (canvas.width / 2 - enemyRadius * (18 - level));
var playerY = (canvas.height / 2 - enemyRadius * (18 - level));

var enemies = [];
var score = 0;
var interacted = false;


const scoreInfo = new InfoRenderer();
scoreInfo.posX = 8;
scoreInfo.text = 'Score: ' + score;

const levelInfo = new InfoRenderer();
levelInfo.posX = canvas.width / 2 - 23;
levelInfo.text = 'Level: ' + level;

const lifeInfo = new InfoRenderer();
lifeInfo.posX = canvas.width - 65;
lifeInfo.text = 'Life: ' + lives;

const enemy = new ArcRenderer();
enemy.radius = enemyRadius;
enemy.color = Color.PURE_RED;

const player = new RectRenderer();
player.width = playerWidth;
player.height = playerHeight;
player.color = playerColor;

const destination = new RectRenderer();
destination.posX = destinationX;
destination.posY = destinationY;
destination.width = destinationWidth;
destination.height = destinationHeight;
destination.color = destinationColor;

const bubleBG = new ArcRenderer();

const background = new BaseRenderer();
background.color = clearColor;
background.width = canvas.width;
background.height = canvas.height;

const collision = new Collider();


const romnia = new ImageRenderer();
romnia.source = './assests/rom.png';
romnia.width = 150;
romnia.height = 150;
romnia.posX = 125;
romnia.posY = 95;


class AVGBehaviour extends BaseBehaviour {
    //pass
}

class MyGame extends BaseBehaviour {

    interaction() {
        if (GetKeyDown.RightArrow && playerX < canvas.width - playerWidth) {
            playerX += 3;
            interacted = true;
        } else if (GetKeyDown.LeftArrow && playerX > 0) {
            playerX -= 3;
            interacted = true;
        } else if (GetKeyDown.DownArrow && playerY < canvas.height - playerHeight) {
            playerY += 3;
            interacted = true;
        } else if (GetKeyDown.UpArrow && playerY > 0) {
            playerY -= 3;
            interacted = true;
        } else if (GetKeyDown.Space) {
            document.getElementById('bg_music').play();
        } else if (GetKeyDown.Esc) {
            //Test
            var c = document.getElementById("mainCanvas");
            var ctx = c.getContext("2d");
            ctx.fillStyle = "green";
            ctx.fillRect(10, 10, 50, 50);
        }
    }

    raiseChallengeByBall() {
        for (var i = 0; i < level; i++) {
            if (level != 1) {
                enemyRadius += level / 10 + 0.2;
            } else {
                enemyRadius += 0.1
            }
        }
    }

    isTriggered() {
        if (collision.collidedWithSame(playerX, playerY,
                playerWidth, playerHeight, canvas.width, canvas.height)) {
            document.getElementById('explode_sound').play();
        } else if (collision.collidedWithSame(playerX, playerY, playerWidth,
                destinationX, destinationY, destinationWidth, destinationHeight)) {

            console.log("Win!");
            score += 10;
            level += 1;
            document.getElementById('succeed_music').play();
            gameOver = true;
            // document.getElementById('bg_music').stop();
            alert("Congradulations on wining the game! \n\nHit F5 to play again! ");
        } else if (collision.collidedWidthDiff(playerX, playerY,
                canvas.width / 2, canvas.height / 2, enemyRadius) && interacted) {

            console.log("Lose!");
            document.getElementById('failed_music').play();
            gameOver = true;
            // document.getElementById('bg_music').stop();
            alert("Sorry but you have lost the game! \n\nHit F5 to play again! ")
        }
        return true;
    }


    onUpdate() {

        background.draw(ctx);
        (typeof bubleSpawner != 'undefined') && bubleSpawner.drawBubleBG();
        scoreInfo.draw(ctx);
        levelInfo.draw(ctx);
        lifeInfo.draw(ctx);
        player.posX = playerX;
        player.posY = playerY;
        player.draw(ctx);
        destination.draw(ctx);

        ////Call your own method using game.
        game.isTriggered();
        enemy.radius = enemyRadius;
        enemy.draw(ctx);
        game.raiseChallengeByBall();
        game.interaction();

        // romnia.draw(ctx);
        // question.draw(ctx);
        // rightButton.draw(ctx);
        // leftButton.draw(ctx);
        // answer1.draw(ctx);
        // answer2.draw(ctx);

    }

}

//Register for running the game
var game = new MyGame();
game.onInputDetect();
startGame();
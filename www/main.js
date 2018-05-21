var xScreen = 1600, yScreen = 900;
var game = new Phaser.Game(xScreen, yScreen, Phaser.AUTO);

var info = {
    hp: 0, money: 0, weight: 0
}

var GameState = {

    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {
        this.load.image('background', 'assets/img/bg.png');
        this.load.image('health', 'assets/img/heart.png');
        this.load.image('food', 'assets/img/food.png');
        this.load.image('girl', 'assets/img/girl.png');
        this.load.image('crocodile', 'assets/img/cro.png');
        this.load.image('money', 'assets/img/money.png');
        this.load.image('star', 'assets/img/star.png');
        this.load.image('house', 'assets/img/house.png');
        this.load.image('humb', 'assets/img/humb.png');
        this.load.image('carrot', 'assets/img/carrot.png');
        this.load.image('apple', 'assets/img/apple.png');

        this.load.audio('crack', 'assets/sounds/crack.wav');
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        self = this;

        this.background = this.game.add.sprite(0, 0, 'background');
        var style = {font: '60px Arial', fill: '#000000', align: 'center'};
        this.score = this.game.add.sprite(750, 20, 'apple');
        this.score.scorePoints = 0;
        this.score.textOfPoints = game.add.text(this.score.x + 35, this.score.y + 100, this.score.scorePoints, style);
        this.score.scale.setTo(0.4);

        this.crocodile = this.game.add.sprite(500, 500, 'crocodile');
        this.crocodile.inputEnabled = true;
        this.crocodile.crack = this.game.add.audio('crack');
        
        this.player = this.game.add.sprite(xScreen/2, yScreen/2, 'girl');
        this.player.scale.setTo(0.5);
        this.player.anchor.setTo(0.5);
        this.player.inputEnabled = true;


        this.isPlayerAlive = true;

        game.time.events.loop(Phaser.Timer.SECOND*2, this.spawnEat, this);
    },

    update: function() {
        this.score.textOfPoints.text = this.score.scorePoints;
    },

    killPlayer: function() {
            var  count = 200;
            for (i = 0; i < count; i++) {
                var star = self.game.add.sprite(self.player.x, self.player.y, 'star');
                star.anchor.setTo(0.5);
                star.scale.setTo(0.25);
                game.physics.enable(star, Phaser.Physics.ARCADE);
                var speedX = Math.random() * 1000; var speedY = Math.random() * 1000;
                star.body.velocity.setTo(speedX, speedY);
            }

            for (i = 0; i < count; i++) {
                var star = self.game.add.sprite(self.player.x, self.player.y, 'star');
                star.anchor.setTo(0.5);
                star.scale.setTo(0.25);
                game.physics.enable(star, Phaser.Physics.ARCADE);
                var speedX = Math.random() * -1000; var speedY = Math.random() * -1000;
                star.body.velocity.setTo(speedX, speedY);
            }

            for (i = 0; i < count; i++) {
                var star = self.game.add.sprite(self.player.x, self.player.y, 'star');
                star.anchor.setTo(0.5);
                star.scale.setTo(0.25);
                game.physics.enable(star, Phaser.Physics.ARCADE);
                var speedX = Math.random() * 1000; var speedY = Math.random() * -1000;
                star.body.velocity.setTo(speedX, speedY);
            }

            for (i = 0; i < count; i++) {
                var star = self.game.add.sprite(self.player.x, self.player.y, 'star');
                star.anchor.setTo(0.5);
                star.scale.setTo(0.25);
                game.physics.enable(star, Phaser.Physics.ARCADE);
                var speedX = Math.random() * -1000; var speedY = Math.random() * 1000;
                star.body.velocity.setTo(speedX, speedY);
            }

            this.player.kill();
            game.time.events.add(Phaser.Timer.SECOND*3, function() {game.state.start('EndState');}, this);
    },

    randomInteger: function(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    },

    spawnEat: function() {
        this.spawnedEat = this.game.add.sprite(this.randomInteger(200, 1400), this.randomInteger(200, 700), 'apple');
        this.spawnedEat.scale.setTo(0.25);
        this.spawnedEat.anchor.setTo(0.5);
        this.spawnedEat.inputEnabled = true;
        self = this;
        this.spawnedEat.events.onInputDown.add(this.appleOnClick, this);
    },

    appleOnClick: function(sprite, event) {
        this.player.playerTween = this.game.add.tween(this.player);
        this.player.playerTween.to({x: sprite.x, y: sprite.y}, 700);
        self = this;
        this.player.playerTween.onComplete.add(function() {
            sprite.kill();
            self.eatFood();
        }, this);
        this.player.playerTween.start();
    },

    eatFood: function() {
        this.score.scorePoints += 1;
    }
}

game.state.add('GameState', GameState);
game.state.start('GameState');
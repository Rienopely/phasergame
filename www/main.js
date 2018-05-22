var xScreen = 1600, yScreen = 900;
var game = new Phaser.Game(xScreen, yScreen, Phaser.AUTO);

var info = {
    hp: 0, money: 0, weight: 0
}

var GameState = {

    levels: [
        {apple: 10, banana: 10, grape: 10}
    ],

    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {
        this.load.image('background', 'assets/img/bg.png');
        this.load.image('girl', 'assets/img/girl.png');
        this.load.image('crocodile', 'assets/img/cro.png');
        this.load.image('apple', 'assets/img/apple.png');
        this.load.image('star', 'assets/img/star.png');
        this.load.image('banana', 'assets/img/banana.png');
        this.load.image('grape', 'assets/img/grape.png');

        this.load.audio('crack', 'assets/sounds/crack.wav');
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.level = 0;

        self = this;

        this.background = this.game.add.sprite(0, 0, 'background');
        var style = {font: '60px Arial', fill: '#000000', align: 'center'};
        this.apple = this.game.add.sprite(750, 20, 'apple');
        this.apple.score = this.levels[this.level].apple;
        this.apple.textOfPoints = game.add.text(this.apple.x + 50, this.apple.y + 100, this.apple.score, style);
        this.apple.textOfPoints.anchor.setTo(0.5, 0);
        this.apple.scale.setTo(0.4);

        this.banana = this.game.add.sprite(900, 20, 'banana');
        this.banana.score = this.levels[this.level].banana;
        this.banana.textOfPoints = game.add.text(this.banana.x + 50, this.banana.y + 100, this.banana.score, style);
        this.banana.textOfPoints.anchor.setTo(0.5, 0);
        this.banana.scale.setTo(0.4);

        this.grape = this.game.add.sprite(600, 20, 'grape');
        this.grape.score = this.levels[this.level].grape;
        this.grape.textOfPoints = game.add.text(this.grape.x + 50, this.grape.y + 100, this.grape.score, style);
        this.grape.textOfPoints.anchor.setTo(0.5, 0);
        this.grape.scale.setTo(0.4);
        
        this.player = this.game.add.sprite(xScreen/2, yScreen/2, 'girl');
        this.player.scale.setTo(0.5);
        this.player.anchor.setTo(0.5);
        this.player.inputEnabled = true;

        this.isPlayerAlive = true;

        game.time.events.loop(Phaser.Timer.SECOND, this.spawnEat, this);

    },
    ras: true,
    update: function() {
        if (this.apple.score < 0) this.apple.score = 0;
        if (this.banana.score < 0) this.banana.score = 0;
        if (this.grape.score < 0) this.grape.score = 0;

        this.apple.textOfPoints.text = this.apple.score;
        this.banana.textOfPoints.text = this.banana.score;
        this.grape.textOfPoints.text = this.grape.score;

        if(this.apple.score == 0 && this.grape.score == 0 && this.banana.score == 0 && this.ras){ this.completeLevel();this. ras = false;}
    },

    completeLevel: function() {
        this.killPlayer();
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
            game.time.events.add(Phaser.Timer.SECOND*3, function() {game.state.start('GameState2');}, this);
    },

    randomInteger: function(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    },

    spawnEat: function() {
        var r = this.randomInteger(0, 2);
        var typeOfEat = 'apple';
        switch (r) {
            case 0:
                typeOfEat = 'apple';
                break;
            case 1:
                typeOfEat = 'banana';
                break;
             case 2:
                typeOfEat = 'grape';
                break;
        }

        this.spawnedEat = this.game.add.sprite(this.randomInteger(200, 1400), this.randomInteger(200, 700), typeOfEat);
        this.spawnedEat.scale.setTo(0.25);
        this.spawnedEat.anchor.setTo(0.5);
        this.spawnedEat.inputEnabled = true;

        this.spawnedEat.customParams = {type : r}
        self = this;
        this.spawnedEat.events.onInputDown.add(this.onEatClick, this);
    },

    onEatClick: function(sprite, event) {
        this.player.playerTween = this.game.add.tween(this.player);
        this.player.playerTween.to({x: sprite.x, y: sprite.y}, 700);
        self = this;
        this.player.playerTween.onComplete.add(function() {
                console.log(sprite.customParams.type);
            switch(sprite.customParams.type) {
                case 0:
                    self.apple.score--;
                    break;
                case 1:
                    self.banana.score--;
                    break;
                 case 2:
                    self.grape.score--;
                    break;
            }

            sprite.kill();
        }, this);
        this.player.playerTween.start();
    },
}

var GameState2 = {

    levels: [
        {apple: 20, banana: 25, grape: 15}
    ],

    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {
        this.load.image('background', 'assets/img/bg2.png');
        this.load.image('girl', 'assets/img/girl.png');
        this.load.image('crocodile', 'assets/img/cro.png');
        this.load.image('apple', 'assets/img/apple.png');
        this.load.image('star', 'assets/img/star.png');
        this.load.image('banana', 'assets/img/banana.png');
        this.load.image('grape', 'assets/img/grape.png');

        this.load.audio('crack', 'assets/sounds/crack.wav');
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.level = 0;

        self = this;

        this.background = this.game.add.sprite(0, 0, 'background');
        this.background.scale.setTo(xScreen/1920, yScreen/1080);
        var style = {font: '60px Arial', fill: '#000000', align: 'center'};
        this.apple = this.game.add.sprite(750, 20, 'apple');
        this.apple.score = this.levels[this.level].apple;
        this.apple.textOfPoints = game.add.text(this.apple.x + 50, this.apple.y + 100, this.apple.score, style);
        this.apple.textOfPoints.anchor.setTo(0.5, 0);
        this.apple.scale.setTo(0.4);

        this.banana = this.game.add.sprite(900, 20, 'banana');
        this.banana.score = this.levels[this.level].banana;
        this.banana.textOfPoints = game.add.text(this.banana.x + 50, this.banana.y + 100, this.banana.score, style);
        this.banana.textOfPoints.anchor.setTo(0.5, 0);
        this.banana.scale.setTo(0.4);

        this.grape = this.game.add.sprite(600, 20, 'grape');
        this.grape.score = this.levels[this.level].grape;
        this.grape.textOfPoints = game.add.text(this.grape.x + 50, this.grape.y + 100, this.grape.score, style);
        this.grape.textOfPoints.anchor.setTo(0.5, 0);
        this.grape.scale.setTo(0.4);
        
        this.player = this.game.add.sprite(xScreen/2, yScreen/2, 'girl');
        this.player.scale.setTo(0.5);
        this.player.anchor.setTo(0.5);
        this.player.inputEnabled = true;

        this.isPlayerAlive = true;

        game.time.events.loop(Phaser.Timer.SECOND, this.spawnEat, this);

    },
    ras: true,
    update: function() {
        if (this.apple.score < 0) this.apple.score = 0;
        if (this.banana.score < 0) this.banana.score = 0;
        if (this.grape.score < 0) this.grape.score = 0;

        this.apple.textOfPoints.text = this.apple.score;
        this.banana.textOfPoints.text = this.banana.score;
        this.grape.textOfPoints.text = this.grape.score;

        if(this.apple.score == 0 && this.grape.score == 0 && this.banana.score == 0 && this.ras){ this.completeLevel();this. ras = false;}
    },

    completeLevel: function() {
        this.killPlayer();
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
            game.time.events.add(Phaser.Timer.SECOND*3, function() {game.state.start('GameState3');}, this);
    },

    randomInteger: function(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    },

    spawnEat: function() {
        var r = this.randomInteger(0, 2);
        var typeOfEat = 'apple';
        switch (r) {
            case 0:
                typeOfEat = 'apple';
                break;
            case 1:
                typeOfEat = 'banana';
                break;
             case 2:
                typeOfEat = 'grape';
                break;
        }

        this.spawnedEat = this.game.add.sprite(this.randomInteger(200, 1400), this.randomInteger(200, 700), typeOfEat);
        this.spawnedEat.scale.setTo(0.25);
        this.spawnedEat.anchor.setTo(0.5);
        this.spawnedEat.inputEnabled = true;

        this.spawnedEat.customParams = {type : r}
        self = this;
        this.spawnedEat.events.onInputDown.add(this.onEatClick, this);
    },

    onEatClick: function(sprite, event) {
        this.player.playerTween = this.game.add.tween(this.player);
        this.player.playerTween.to({x: sprite.x, y: sprite.y}, 700);
        self = this;
        this.player.playerTween.onComplete.add(function() {
                console.log(sprite.customParams.type);
            switch(sprite.customParams.type) {
                case 0:
                    self.apple.score--;
                    break;
                case 1:
                    self.banana.score--;
                    break;
                 case 2:
                    self.grape.score--;
                    break;
            }

            sprite.kill();
        }, this);
        this.player.playerTween.start();
    },
}

var GameState3 = {

    levels: [
        {apple: 30, banana: 30, grape: 30}
    ],

    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {
        this.load.image('background', 'assets/img/bg3.jpg');
        this.load.image('girl', 'assets/img/girl.png');
        this.load.image('crocodile', 'assets/img/cro.png');
        this.load.image('apple', 'assets/img/apple.png');
        this.load.image('star', 'assets/img/star.png');
        this.load.image('banana', 'assets/img/banana.png');
        this.load.image('grape', 'assets/img/grape.png');

        this.load.audio('crack', 'assets/sounds/crack.wav');
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.level = 0;

        self = this;

        this.background = this.game.add.sprite(0, 0, 'background');
        this.background.scale.setTo(1600/1920, 900/1080);
        var style = {font: '60px Arial', fill: '#000000', align: 'center'};
        this.apple = this.game.add.sprite(750, 20, 'apple');
        this.apple.score = this.levels[this.level].apple;
        this.apple.textOfPoints = game.add.text(this.apple.x + 50, this.apple.y + 100, this.apple.score, style);
        this.apple.textOfPoints.anchor.setTo(0.5, 0);
        this.apple.scale.setTo(0.4);

        this.banana = this.game.add.sprite(900, 20, 'banana');
        this.banana.score = this.levels[this.level].banana;
        this.banana.textOfPoints = game.add.text(this.banana.x + 50, this.banana.y + 100, this.banana.score, style);
        this.banana.textOfPoints.anchor.setTo(0.5, 0);
        this.banana.scale.setTo(0.4);

        this.grape = this.game.add.sprite(600, 20, 'grape');
        this.grape.score = this.levels[this.level].grape;
        this.grape.textOfPoints = game.add.text(this.grape.x + 50, this.grape.y + 100, this.grape.score, style);
        this.grape.textOfPoints.anchor.setTo(0.5, 0);
        this.grape.scale.setTo(0.4);
        
        this.player = this.game.add.sprite(xScreen/2, yScreen/2, 'girl');
        this.player.scale.setTo(0.5);
        this.player.anchor.setTo(0.5);
        this.player.inputEnabled = true;

        this.isPlayerAlive = true;

        game.time.events.loop(Phaser.Timer.SECOND, this.spawnEat, this);

    },
    ras: true,
    update: function() {
        if (this.apple.score < 0) this.apple.score = 0;
        if (this.banana.score < 0) this.banana.score = 0;
        if (this.grape.score < 0) this.grape.score = 0;

        this.apple.textOfPoints.text = this.apple.score;
        this.banana.textOfPoints.text = this.banana.score;
        this.grape.textOfPoints.text = this.grape.score;

        if(this.apple.score == 0 && this.grape.score == 0 && this.banana.score == 0 && this.ras){ this.completeLevel();this. ras = false;}
    },

    completeLevel: function() {
        this.killPlayer();
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
            game.time.events.add(Phaser.Timer.SECOND*3, function() {game.state.start('End');}, this);
    },

    randomInteger: function(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    },

    spawnEat: function() {
        var r = this.randomInteger(0, 2);
        var typeOfEat = 'apple';
        switch (r) {
            case 0:
                typeOfEat = 'apple';
                break;
            case 1:
                typeOfEat = 'banana';
                break;
             case 2:
                typeOfEat = 'grape';
                break;
        }

        this.spawnedEat = this.game.add.sprite(this.randomInteger(200, 1400), this.randomInteger(200, 700), typeOfEat);
        this.spawnedEat.scale.setTo(0.25);
        this.spawnedEat.anchor.setTo(0.5);
        this.spawnedEat.inputEnabled = true;

        this.spawnedEat.customParams = {type : r}
        self = this;
        this.spawnedEat.events.onInputDown.add(this.onEatClick, this);
    },

    onEatClick: function(sprite, event) {
        this.player.playerTween = this.game.add.tween(this.player);
        this.player.playerTween.to({x: sprite.x, y: sprite.y}, 700);
        self = this;
        this.player.playerTween.onComplete.add(function() {
                console.log(sprite.customParams.type);
            switch(sprite.customParams.type) {
                case 0:
                    self.apple.score--;
                    break;
                case 1:
                    self.banana.score--;
                    break;
                 case 2:
                    self.grape.score--;
                    break;
            }

            sprite.kill();
        }, this);
        this.player.playerTween.start();
    },
}

var End = {
    preload: function () {
        this.load.image('girl', 'assets/img/girl.png');
        this.load.image('crocodile', 'assets/img/cro.png');
        this.load.image('apple', 'assets/img/apple.png');
        this.load.image('star', 'assets/img/star.png');
        this.load.image('banana', 'assets/img/banana.png');
        this.load.image('grape', 'assets/img/grape.png');

        this.load.audio('crack', 'assets/sounds/crack.wav');
    },

    create: function () {
        this.croco = this.game.add.sprite(800, 450, 'crocodile');
        this.croco.anchor.setTo(0.5);
        this.crack = game.add.audio('crack');
        this.croco.events.onInputDown.add(function() {
            crack.play();
        }, this);
    }
}

game.state.add('GameState', GameState);
game.state.add('GameState2', GameState2);
game.state.add('GameState3', GameState3);
game.state.add('End', End);
game.state.start('GameState3');
var xScreen = 1600, yScreen = 900;
var game = new Phaser.Game(xScreen, yScreen, Phaser.AUTO);

var GameState = {

    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    preload: function () {
        this.load.image('background', 'assets/img/bg.png');
        this.load.image('health', 'assets/img/heart.png');
        this.load.image('girl', 'assets/img/girl.png');
        this.load.image('crocodile', 'assets/img/cro.png');

        this.load.audio('crack', 'assets/sounds/crack.wav');
    },

    create: function () {
        this.background = this.game.add.sprite(0, 0, 'background');
        var style = {font: '60px Arial', fill: '#000000', align: 'center'};
        this.health = this.game.add.sprite(20, 20, 'health');
        this.health.healthPoints = 100;
        this.health.textOfPoints = game.add.text(this.health.x + 100, this.health.y + 30, this.health.healthPoints, style);
        this.health.scale.setTo(0.5);

        this.crocodile = this.game.add.sprite(500, 500, 'crocodile');
        this.crocodile.inputEnable = true;
        this.crocodile.events.onInputDown.add(
            function() {
                this.crocodile.play('crack');
            }
        );

        this.player = this.game.add.sprite(xScreen/2, yScreen/2, 'girl');
        this.player.scale.setTo(0.5);
        this.player.anchor.setTo(0.5);
    },

    update: function() {
        this.health.textOfPoints.text = this.health.healthPoints;
    }

};

game.state.add('GameState', GameState);
game.state.start('GameState');
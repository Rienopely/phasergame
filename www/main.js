var game = new Phaser.Game(960, 540, Phaser.AUTO);

var MenuState = {

    preload : function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.load.image('cro', 'assets/img/cro.png');
        this.load.audio('crack', 'assets/sounds/crack.wav');
    },

    create : function() {
        this.croco = game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'cro');
        this.croco.anchor.setTo(0.5);
        this.crocoSound = game.add.sound('crack');
        game.time.events.add(Phaser.Timer.SECOND*1, function() {this.crocoSound.play();}, this);
        game.time.events.add(Phaser.Timer.SECOND*3, function() {game.state.start('GameState')}, this);
    },

    update : function() {
        game.time.events.add(Phaser.Timer.SECOND/10, function() {game.stage.backgroundColor = "#4488AA";}, this);
    }

}


var GameState = {

    init: function () {
        
    },

    preload: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.load.image('background', 'assets/img/bg.png');
        this.load.image('girl', 'assets/img/girl.png');
        this.load.image('heart', 'assets/img/heart.png');
        this.load.image('happy', 'assets/img/happy.png');
        this.load.image('food', 'assets/img/food.png');
        this.load.image('hb', 'assets/img/h.png');
        this.load.image('cro', 'assets/img/cro.png');

        this.load.audio('crack', 'assets/sounds/crack.wav');
    },

    create: function () {

        this.myTime = 0;

        this.background = this.game.add.sprite(-300, 0, 'background');
        this.background.scale.setTo(1);
        this.background.inputEnabled = true;

        this.cro = this.game.add.sprite(100, 350, 'cro');
        this.cro.scale.setTo(0.25);
        this.cro.inputEnabled = true;
        this.cro.input.pixelPerfectOver = true;
        this.cro.crackSound = this.add.audio('crack');
        this.cro.events.onInputDown.add(
                function() {
                    this.cro.crackSound.play();
                }
        ,this);

       

        this.player = this.game.add.sprite(this.game.world.centerX, 350, 'girl');
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(1.25);
        this.player.inputEnabled = true;
        //this.player.input.enableDrag(true);
        this.background.events.onInputDown.add(
            function(){
                if (game.input.y > 350) this.game.add.tween(this.player).to({x: this.game.input.x, y: this.game.input.y}).start();
            }
        ,this);
        game.physics.enable(this.player, Phaser.Physics.ARCADE);

        

        this.hpIcon = this.game.add.sprite(20, 20, 'heart');
        this.hpIcon.scale.setTo(0.25);
        this.hp = 100;

        this.happyIcon = this.game.add.sprite(150, 30, 'happy');
        this.happyIcon.scale.setTo(0.325);
        this.ep = 100;

        this.fdIcon = this.game.add.sprite(270, 20, 'food');
        this.fdIcon.scale.setTo(0.5);
        this.fd = 100;

        var style = { font: "30px Arial", fill: "#000000", align: "center" };
        this.textHP = game.add.text(80, 35, this.hp, style);
        this.textEP = game.add.text(205, 35, this.ep, style);
        this.textFD = game.add.text(335, 35, this.fd, style);

        //--------------------------------------------------------------------
    },

    update: function() {
           
        var deltaTime = game.time.elapsed / 1000;
        this.myTime = this.myTime + deltaTime;

        if(this.myTime > 15) {
            this.decreaseFood(3);
            this.decreaseHappy(5);
            this.myTime = 0;
        }

        if(this.fd < 100) {this.player.scale.setTo(1.15, 1.25)}
        if(this.fd < 80) {this.player.scale.setTo(1, 1.25)}
        if(this.fd < 60) {this.player.scale.setTo(0.8, 1.25)}
        if(this.fd < 40) {this.player.scale.setTo(0.5, 1.25)}
        if(this.fd > 100) {this.player.scale.setTo(1, 1.25)}
        if(this.fd > 120) {this.player.scale.setTo(1.5 ,1.25)}
        if(this.fd > 140) {this.player.scale.setTo(1.7, 1.25)}
        if(this.fd > 160) {this.player.scale.setTo(1.9, 1.25)}
        if(this.fd > 180) {this.player.scale.setTo(2, 1.25)}
    },

    decreaseHealth : function(points) {
        this.hp = this.hp - points;
        this.textHP.text = this.hp;
    },

    decreaseHappy : function(points) {
        this.ep = this.ep - points;
        this.textEP.text = this.ep;
    },

    decreaseFood : function(points) {
        this.fd = this.fd - points;
        this.textFD.text = this.fd;
    },

    hungry : function () {
        this.decreaseFood(5);
    },

    eats : function () {
        this.decreaseFood(-20);
    }

};

game.state.add('GameState', GameState);
game.state.add('MenuState', MenuState);
game.state.start('MenuState');
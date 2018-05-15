var game = new Phaser.Game(540, 960, Phaser.AUTO);

var GameState = {

    init: function () {
        
    },

    preload: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.load.image('background', 'bg.png');
        this.load.image('girl', 'girl.png');
        this.load.image('heart', 'heart.png');
        this.load.image('happy', 'happy.png');
        this.load.image('food', 'food.png');
        this.load.image('hb', 'h.png');
    },

    create: function () {

        this.myTime = 0;

        this.background = this.game.add.sprite(-300, 0, 'background');
        this.background.scale.setTo(1);

        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'girl');
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(1.25);
        this.player.inputEnabled = true;
        this.player.input.enableDrag(true);
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
        this.hb = this.game.add.sprite(20, 850,'hb');
        this.hb.scale.setTo(0.18);
        this.hb.inputEnabled = true;
        this.hb.events.onInputDown.add(this.eats, this);
      
    },

    update: function() {
        if (game.input.pointer1.isDown)
        {
        //  400 is the speed it will move towards the mouse
        game.physics.arcade.moveToPointer(this.player, 400);

        //  if it's overlapping the mouse, don't move any more
            if (Phaser.Rectangle.contains(this.player.body, game.input.x, game.input.y))
            {
                this.player.body.velocity.setTo(0, 0);
            }
        }
        else
        {
            this.player.body.velocity.setTo(0, 0);
        }

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
        if(this.fd > 100) {this.player.scale.setTo(1.35, 1.25)}
        if(this.fd > 150) {this.player.scale.setTo(1.45 ,1.25)}
        if(this.fd > 200) {this.player.scale.setTo(1.5, 1.25)}
        if(this.fd > 250) {this.player.scale.setTo(1.6, 1.25)}
        if(this.fd > 300) {this.player.scale.setTo(1.7, 1.25)}
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
game.state.start('GameState');
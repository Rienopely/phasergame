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

        this.load.audio('crack', 'assets/sounds/crack.wav');
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        self = this;

        this.background = this.game.add.sprite(0, 0, 'background');
        var style = {font: '60px Arial', fill: '#000000', align: 'center'};
        this.health = this.game.add.sprite(20, 20, 'health');
        this.health.healthPoints = 100;
        this.health.textOfPoints = game.add.text(this.health.x + 100, this.health.y + 30, this.health.healthPoints, style);
        this.health.scale.setTo(0.5);

        //this.money = this.game.add.sprite(470, 35, 'money');
        //this.money.moneyPoints = 0;
        //this.money.textOfPoints = game.add.text(this.money.x + 120, this.health.y + 30, this.money.moneyPoints, style);
        //this.money.scale.setTo(0.4);

        this.food = this.game.add.sprite(230, 20, 'food');
        this.food.foodPoints = 100;
        this.food.textOfPoints = game.add.text(this.food.x + 130, this.health.y + 30, this.food.foodPoints, style);
        this.food.scale.setTo(0.5);

        this.crocodile = this.game.add.sprite(500, 500, 'crocodile');
        this.crocodile.inputEnabled = true;
        this.crocodile.crack = this.game.add.audio('crack');

        this.house = this.game.add.sprite(500, 200, 'house');
        this.house.scale.setTo(0.5);
        this.house.inputEnabled = true;
        
        this.player = this.game.add.sprite(xScreen/2, yScreen/2, 'girl');
        this.player.scale.setTo(0.5);
        this.player.anchor.setTo(0.5);
        this.player.inputEnabled = true;

        this.humb = this.game.add.sprite(1450, 20, 'humb');
        this.humb.scale.setTo(0.5);
        this.humb.inputEnabled = true;
        this.humb.events.onInputDown.add(
            function() {
                self.eat();
            }
        );

        this.carrot = this.game.add.sprite(1450, 200, 'carrot');
        this.carrot.scale.setTo(0.4);
        this.carrot.inputEnabled = true;
        this.carrot.events.onInputDown.add(
            function() {
                if(self.health.healthPoints <= 90)
                self.health.healthPoints = self.health.healthPoints + 10;
            }
        );
        
        this.crocodile.events.onInputDown.add(
            function() {
                self.crocodile.crack.play();
                self.health.healthPoints = self.health.healthPoints - 10;
            }
        );

        this.house.events.onInputDown.add(
            function() {
                game.state.start('HomeState');
            }
        );

        game.time.events.loop(Phaser.Timer.SECOND*3, function() {
            self.food.foodPoints = self.food.foodPoints - 5;
        }, this);

        this.isPlayerAlive = true;
    },

    update: function() {
        this.health.textOfPoints.text = this.health.healthPoints;
        //this.money.textOfPoints.text = this.money.moneyPoints;
        this.food.textOfPoints.text = this.food.foodPoints;

        var k = 1;
        

        if(this.isPlayerAlive)
        {   
            if(this.health.healthPoints <= 0) {this.killPlayer(); this.isPlayerAlive = false;}
            if(this.food.foodPoints <= 100) k = 1;
            if(this.food.foodPoints <= 90) k = 0.9;
            if(this.food.foodPoints <= 80) k = 0.8;
            if(this.food.foodPoints <= 70) k = 0.7;
            if(this.food.foodPoints <= 60) k = 0.6;
            if(this.food.foodPoints <= 50) k = 0.5;
            if(this.food.foodPoints <= 49) {this.killPlayer(); this.isPlayerAlive = false;}
            if(this.food.foodPoints >= 110) k = 1.10;
            if(this.food.foodPoints >= 120) k = 1.20;
            if(this.food.foodPoints >= 130) k = 1.30;
            if(this.food.foodPoints >= 140) k = 1.40;
            if(this.food.foodPoints >= 150) k = 1.50;
            if(this.food.foodPoints >= 160) k = 1.60;
            if(this.food.foodPoints >= 161) {this.killPlayer(); this.isPlayerAlive = false;}
            
        }
        
        this.player.scale.setTo(0.5*k, 0.5);

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

    eat: function() {
        this.food.foodPoints = this.food.foodPoints + 10;
    }

};

EndState = {

    preload: function() {
        
    },

    create: function() {
        this.crocodile = this.game.add.sprite(xScreen/2, yScreen/2, 'crocodile');
        this.crack = this.game.add.audio('crack');
        this.crocodile.anchor.setTo(0.5);
        self = this;
        game.stage.backgroundColor = '#F2845C';
        game.time.events.add(Phaser.Timer.SECOND*0.5, function() {self.crack.play();}, this);
    },

    update: function() {

    }
}

HomeState = {
    preload: function() {

    },

    create: function() {

    },

    update: function() {

    }
}

game.state.add('HomeState', HomeState);
game.state.add('GameState', GameState);
game.state.add('EndState', EndState);
game.state.start('GameState');
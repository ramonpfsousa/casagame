
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)


    this.map;
    this.layer;
    this.player;
    this.cursors;
    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    /*preload: function () {
        this.load.tilemap('map', 'tilemaps/mp1.csv', null, Phaser.Tilemap.CSV);
        this.load.spritesheet('spritemap', 'images/tileset-platformer.png', 32, 32);
    },*/

    create: function () {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        //this.add.sprite(0, 0, 'titlepage');
        //alert('Game1');
        this.game.world.setBounds(0, 0, 1920, 1056);
        this.map = this.add.tilemap('map', 32, 32);
        //this.map = this.add.tilemap('mapJSON', 32, 32);
        this.map.addTilesetImage('spritemap');

        this.layer = this.map.createLayer(0);
        this.layer.resizeWorld();
        
        this.map.setCollision(4);
        this.map.setCollision(10);
        this.map.setCollisionBetween(50, 52);
        //this.map.setTileIndexCallback([4, 10, 50, 51, 52], this.collideTeste, this, this.layer);

        this.player = this.add.sprite(32, this.world.height - 500, 'dude');
        this.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);

        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        //this.player.body.setSize(10, 14, 2, 1);

        this.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);

        this.cursors = this.input.keyboard.createCursorKeys();

    },

    update: function () {
        //alert('Game2');
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.physics.arcade.collide(this.player, this.layer);
        //this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown)
        {
            //  Move to the left
            this.player.body.velocity.x = -150;

            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown)
        {
            //  Move to the right
            this.player.body.velocity.x = 150;

            this.player.animations.play('right');
        }
        else
        {
            //  Stand still
            this.player.animations.stop();

            this.player.frame = 4;
        }
        
        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.onFloor())
        {
            this.player.body.velocity.y = -350;
        }
    },

    quitGame: function (pointer) {
        //alert('Game3');
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};

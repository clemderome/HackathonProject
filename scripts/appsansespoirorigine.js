var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: {
			preload: preload,
			create: create,
			update: update
		}
};

var bullets; // shoot
var goat; // goat
var speed; // shoot spped
var stats;
var cursors; // touch keyboard
var chicken;  // chicken
var lastFired = 0;  // stoper les shoots

var game = new Phaser.Game(config);

function preload ()
{
	this.load.image("background", "../assets/Background/backforest.jpg");
	this.load.image("bullet", "../assets/Miscelenous/bouze_30px.png");
	this.load.image("goat", "../assets/Characters/goat_50px.png");
	this.load.image("chicken", "../assets/Characters/chicken_good.png");
	this.load.image("chickenAttack", "../assets/Miscelenous/littleEgg.png", {frameWidth: 100,frameHeight: 400});
	this.load.spritesheet("kaboom", "../assets/Miscelenous/explode.png", {frameWidth: 128, frameHeight: 128,
});
}

function create () {
	
	this.add.image(0, 0, "background").setOrigin(0, 0);
        
	var Bullet = new Phaser.Class({

			Extends: Phaser.GameObjects.Image,
			initialize:

			function Bullet (scene)
			{
					Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
					this.speed = Phaser.Math.GetSpeed(200, 1);
			},

			fire: function (x, y)
			{
					this.setPosition(x, y - 50 );
					this.setActive(true);
					this.setVisible(true);
			},

			update: function (time, delta){
				this.y -= this.speed * delta;
					if (this.y < -50)
					{
							this.setActive(false);
							this.setVisible(false);
					}
			}
	});

	bullets = this.add.group({
			classType: Bullet,
			maxSize: 5,
			runChildUpdate: true
	});

    const group = this.add.group({
        key: "chicken",
        frame: [1],
        repeat: 44
    });
    Phaser.Actions.GridAlign(group.getChildren(), {
        width: 15,
        height: 4,
        cellWidth: 45,
        cellHeight: 32,
        x: 90,
        y: 90,
    });

	goat = this.add.sprite(400, 500, 'goat').setDepth(1);
	cursors = this.input.keyboard.createCursorKeys();
    speed = Phaser.Math.GetSpeed(300, 1);

    
}


function update (time, delta) {
	if (cursors.left.isDown)
	{
			goat.x -= speed * delta;
	}
	else if (cursors.right.isDown)
	{
			goat.x += speed * delta;
	}

	if (cursors.up.isDown && time > lastFired)
	{
			var bullet = bullets.get();

			if (bullet)
			{
					bullet.fire(goat.x, goat.y);

					lastFired = time + 100;
			}
	}
}

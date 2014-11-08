describe("Prueba Sprite", function(){

	var canvas, ctx;

	beforeEach(function(){
		loadFixtures('index.html');
		canvas = $('#game')[0];
		expect(canvas).toExist();
		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();
		g = Game;
		s = SpriteSheet;
	});

	afterEach(function(){
		Game = g;
		SpriteSheet = s;
	});

	it("Sprite.setup", function(){

		var dummi = new Sprite();
		SpriteSheet.map = {	explosion: {sx: 0, sy: 64, w: 64, h: 64, frames: 12} };
		var properties = {x: 1, y: 1, z: 1};
		spyOn(dummi, "setup");
		dummi.setup("explosion",properties);
		expect(dummi.setup).toHaveBeenCalledWith("explosion",properties);

	});
	
	it("Sprite.merge", function(){

		var properties = {a: '5', b: '27', c:'2'};
		var dummi = new Sprite();
		dummi.merge(properties);
		expect(dummi['a']).toBe('5');
		expect(dummi['b']).toBe('27');
		expect(dummi['c']).toBe('2');

	});
	
	it("Sprite.draw", function(){

		var dummi = new Sprite();
		SpriteSheet = {
			map: {explosion: {sx: 0, sy: 64, w: 64, h: 64, frames: 12}},
			draw: function(){}
		};
		spyOn(SpriteSheet, "draw");
		dummi.setup("explosion",{x: 1, y: 1, z: 1});
		dummi.draw(ctx);
		expect(SpriteSheet.draw).toHaveBeenCalled();
	});
		
});


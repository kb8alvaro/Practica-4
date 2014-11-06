
describe("Prueba Fire Ball", function(){

  beforeEach(function(){
		loadFixtures('index.html');
		s = SpriteSheet;	
		g = Game;
	});
  afterEach(function(){
		SpriteSheet = s;
		Game = g;	
	});


	it("FireBall.step()", function(){
		SpriteSheet = { map: {explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 } } }
		var board = new GameBoard();
		spyOn(board,"remove");
		var fb = new FireBall(1,17,1);
		board.add(fb);
		fb.step(0.01);
		expect(fb.x).toEqual(-30.6);
		expect(fb.y).toEqual(-48.985);
		fb.step(10);
		expect(board.remove).toHaveBeenCalled();
	});

	it("FireBall.draw()", function(){
		SpriteSheet = { map: {explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 } }, draw: function(){} };
		var board = new GameBoard();
		spyOn(SpriteSheet,"draw").andCallThrough();
		var fb = new FireBall(1,17,1);
		board.add(fb);
		fb.step(0.01);
		fb.draw();
		expect(SpriteSheet.draw).toHaveBeenCalled();
		expect(SpriteSheet.draw.calls[0].args[1]).toBe('explosion');
		expect(SpriteSheet.draw.calls[0].args[2]).toBe(-30.6);
		expect(SpriteSheet.draw.calls[0].args[3]).toBe(-48.985);
	});

});



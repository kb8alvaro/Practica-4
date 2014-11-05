/*

  Requisitos: 

  La nave del usuario disparará 2 misiles si está pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendrá un tiempo de recarga de 0,25s, no pudiéndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores



  Especificación:

  - Hay que añadir a la variable sprites la especificación del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se añadirán
    misiles al tablero de juego en la posición en la que esté la nave
    del usuario. En el código de la clase PlayerSip es donde tienen
    que añadirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creación de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declararán los métodos de
    la clase en el prototipo

*/

describe("Prueba Player Missile", function(){

  beforeEach(function(){
		loadFixtures('index.html');
		s = SpriteSheet;	
		g = Game;
	});
  afterEach(function(){
		SpriteSheet = s;
		Game = g;	
	});


	it("PlayerMissile.step()", function(){
		SpriteSheet = { map: {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 } } }
		var board = new GameBoard();
		spyOn(board,"remove");
		var pm = new PlayerMissile(1,17);
		board.add(pm);
		pm.step(0.01);
		expect(pm.y).toEqual(0);
		pm.step(1);
		expect(board.remove).toHaveBeenCalled();
	});

	it("PlayerMissile.draw()", function(){
		SpriteSheet = { map: {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 } }, draw: function(){} };
		var board = new GameBoard();
		spyOn(SpriteSheet,"draw").andCallThrough();
		var pm = new PlayerMissile(1,17);
		board.add(pm);
		pm.step(0.01);
		pm.draw();
		expect(SpriteSheet.draw).toHaveBeenCalled();
		expect(SpriteSheet.draw.calls[0].args[1]).toBe('missile');
		expect(SpriteSheet.draw.calls[0].args[2]).toBe(0);
		expect(SpriteSheet.draw.calls[0].args[3]).toBe(0);
	});

	it("modificacion tecla de disparo", function(){
		SpriteSheet = { map: {
											ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
											missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 } },
										draw: function(){} };
		var board = new GameBoard();
		var nave = new PlayerShip();
		board.add(nave);		
		Game.keys['fire'] = false;
		board.step(0);
		Game.keys['fire'] = true;
		board.step(1);
		expect(board.objects.length).toBe(3);
		board.step(0.4);				
		expect(board.objects.length).toBe(3);  //esperamos que no haya nuevos misiles pese a no dejar de pulsar fire
		Game.keys['fire'] = false;
		board.step(0);
		Game.keys['fire'] = true;
		board.step(0);
		expect(board.objects.length).toBe(5);
	});


});



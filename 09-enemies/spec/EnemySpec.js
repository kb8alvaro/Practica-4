/*

  Requisitos:

  El objetivo de este prototipo es añadir al juego naves enemigas. Las
  naves se añadirán al tablero de juegos (objeto GameBoard) al igual
  que el resto de los elementos del juego (nave del jugador y
  misiles).

  Cada nave enemiga debe tener un patrón de movimiento que exhibirá
  desde que entra por la parte superior del canvas hasta que
  desaparece por la parte inferior. En este prototipo las naves
  enemigos no interaccionan con el resto de los elementos del juego:
  los disparos de la nave del jugador no les afectan. La nave del
  jugador tampoco se ve afectada por la colisión con una nave enemiga.


  Especificación:

  1. El patrón de movimiento lo dictan las ecuaciones que se
     utilizarán para calcular las componentes vx e vy de su velocidad.
     Los parámetros de las ecuaciones que definen vx e vy determinan
     el patrón de comportamiento:

     vx = A + B * sin (C * t + D) 
     vy = E + F * sin (G * t + H)

     siendo t la edad de un enemigo, calculada como el tiempo que ha
     pasado desde que se creó la nave.

     A: componente constante de la velocidad horizontal
     B: fuerza de la velocidad horizontal sinusoidal
     C: periodo de la velocidad horizontal sinusoidal
     D: desplazamiento en el tiempo de la velocidad horizontal
        sinusoidal

     E: componente constante de la velocidad vertical
     F: fuerza de la velocidad vertical sinusoidal
     G: periodo de la velocidad vertical sinusoidal
     H: desplazamiento en el tiempo de la velocidad vertical
        sinusoidal

     Todos estos parámetros tendrán un valor por defecto de 0
     (definido en la variable baseParameters en el constructor), que
     puede ser substituido por otro valor cuando se crea la nave.


  2. Se creará un nuevo constructor/clase Enemy. Los enemigos se
     diferenciarán sólo en su posición inicial, en el sprite que
     utilizan y en el patrón de movimiento (parámetros A..H de la
     velocidad), pero todos serán de la misma clase: Enemy.

     Para definir diferentes tipos de enemigos se pasará al
     constructor una plantilla con valores para las propiedades (x, y,
     sprite, A..H).

     Para poder definir fácilmente enemigos parecidos creados a partir
     de una misma plantilla, se pasará un segundo argumento al
     constructor con valores alternativos para algunas de las
     propiedades de la plantilla.

*/


describe("Prueba Enemy", function(){

	beforeEach(function(){
		loadFixtures('index.html');
		s = SpriteSheet;
		g = Game;	
	});
	afterEach(function(){
		SpriteSheet = s;
		Game = g;	
	});


	it("Enemy factory", function(){
		SpriteSheet = { map: {
					missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
					enemy_test:   { sx: 37, sy: 0, w: 42, h: 43, frames: 1 }
					 } };
		var enemies = {
			basic: { x: 100, y: -50, sprite: 'enemy_test', B: 100, C: 2 , E: 100 }
		};
		var e1 = new Enemy(enemies.basic);
		expect(e1.x).toEqual(100);
		var e2 = new Enemy(enemies.basic, { x: 200 });
		expect(e2.x).toEqual(200);
	});

	it("Enemy.step", function(){
		SpriteSheet = { map: {
					missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
					enemy_test:   { sx: 37, sy: 0, w: 42, h: 43, frames: 1 }
					 } };
		var enemies = {
			basic: { x: 100, y: -50, sprite: 'enemy_test', B: 100, C: 2 , E: 100 }
		};
		var board = new GameBoard();
		var e = new Enemy(enemies.basic);
		board.add(e);
		board.resetRemoved();
		e.step(2);
		expect(e.x).toEqual(-51.36049906158564);
		expect(e.y).toEqual(150);
	});



	it("Enemy.draw", function(){
		SpriteSheet = { map: {
					missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
					enemy_test:   { sx: 37, sy: 0, w: 42, h: 43, frames: 1 }
					 },
				draw: function(){} };
		var enemies = {
			basic: { x: 100, y: -50, sprite: 'enemy_test', B: 100, C: 2 , E: 100 }
		};
		var board = new GameBoard();
		spyOn(SpriteSheet,"draw").andCallThrough();
		var e = new Enemy(enemies.basic);
		board.add(e);
		board.resetRemoved();
		e.step(2);
		e.draw();
		expect(SpriteSheet.draw).toHaveBeenCalled();
		expect(SpriteSheet.draw.calls[0].args[1]).toBe('enemy_test');
		expect(SpriteSheet.draw.calls[0].args[2]).toBe(-51.36049906158564);
		expect(SpriteSheet.draw.calls[0].args[3]).toBe(150);
	});

});

/*

// Metodo draw, que anadimos al prototipo para que cada instancia de
// Enemy no tenga una copia de el
Enemy.prototype.draw = function(ctx) {
    SpriteSheet.draw(ctx,this.sprite,this.x,this.y);
}

*/


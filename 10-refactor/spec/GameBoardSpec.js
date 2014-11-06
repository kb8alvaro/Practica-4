/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colección de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se añaden como tableros independientes para que Game pueda
  ejecutar sus métodos step() y draw() periódicamente desde su método
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre sí. Aunque se añadiesen nuevos tableros para los
  misiles y para los enemigos, resulta difícil con esta arquitectura
  pensar en cómo podría por ejemplo detectarse la colisión de una nave
  enemiga con la nave del jugador, o cómo podría detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: diseñar e implementar un mecanismo que permita gestionar
  la interacción entre los elementos del juego. Para ello se diseñará
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego serán las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard será un board más, por lo que deberá ofrecer los
  métodos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos métodos.

  Este prototipo no añade funcionalidad nueva a la que ofrecía el
  prototipo 06.


  Especificación: GameBoard debe

  - mantener una colección a la que se pueden añadir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosión, etc.

  - interacción con Game: cuando Game llame a los métodos step() y
    draw() de un GameBoard que haya sido añadido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los métodos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisión entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deberán
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cuándo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qué tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto sólo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/

describe("Prueba Game Board", function(){

	it("GameBoard.add()", function(){
		var gb = new GameBoard();
		gb.add(4);
		expect(gb.objects[0]).toEqual(4);
	});

	it("Metodos de borrado (GameBoard.remove(), GameBoard.resetRemoved() y GameBoard.finalizeRemoved()", function(){
		var gb = new GameBoard();
		gb.add(4);
		spyOn(gb, "resetRemoved").andCallThrough();
		gb.resetRemoved();
		expect(gb.resetRemoved).toHaveBeenCalled();
		gb.remove(4);
		expect(gb.removed.length).toEqual(1);
		gb.finalizeRemoved();
		expect(gb.objects.length).toEqual(0);	
	});

	it("GameBoard.iterate()", function(){
		var gb = new GameBoard();
		var dummy = {
			doThings: function(){}
		};
		spyOn(dummy, "doThings").andCallThrough();
		gb.add(dummy);
		gb.iterate('doThings');
		expect(dummy.doThings).toHaveBeenCalled();
	});

	it("GameBoard.step()", function(){
		var gb = new GameBoard();
		spyOn(gb, "step").andCallThrough();
		gb.step();
		expect(gb.step).toHaveBeenCalled();
	});

	it("GameBoard.draw()", function(){
		var gb = new GameBoard();
		spyOn(gb, "draw").andCallThrough();
		gb.draw();
		expect(gb.draw).toHaveBeenCalled();
	});

	it("GameBoard.overlap()", function(){
		var gb = new GameBoard();
		var r1 = { x:0, y:0, h:3, w:3};
		var r2 = { x:2, y:2, h:4, w:5};
		var r3 = { x:4, y:4, h:1, w:3};
		expect(gb.overlap(r1,r2)).toBeTruthy();
		expect(gb.overlap(r1,r3)).toBeFalsy();
		expect(gb.overlap(r2,r3)).toBeTruthy();
	});

	it("GameBoard.collide()", function(){
		var gb = new GameBoard();
		var r1 = { x:0, y:0, h:3, w:3};
		var r2 = { x:2, y:2, h:4, w:5};
		var r3 = { x:4, y:4, h:1, w:3};
		gb.add(r1);
		gb.add(r2);
		gb.add(r3);
		expect(gb.collide(r2)).toEqual(r1);
		expect(gb.collide(r3)).toEqual(r2);
	});

});



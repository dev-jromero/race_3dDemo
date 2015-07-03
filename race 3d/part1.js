//modelo canvas de JS RACE 3D
//@JROMERO
// Ancho y alto para nuestro Canvas
var canvasWidth = 480;
var canvasHeight = 320;
// Cantidad de lineas a pintar de la pista
var roadLines = 150;
// Para manejar la profundidad.
var zMap = [];
// Para manejar los trazos de pista.
var lines = [];
// Nos va a servir para calcular la escala de cada tramo de acuerdo a su posición.
var widthStep = 1;

// Sirve para optimizar el hilo para poder trabajar con el canvas.
window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, PERIODO);
              };
    })();

loadCanvas();



//Carga el canvas.

function loadCanvas()
{
	// Obtenemos el canvas del HTML
	this.canvas = document.getElementById('modelgamecanvas');
	// Ajustamos ancho y alto
	this.canvas.width = canvasWidth;
	this.canvas.height = canvasHeight;
	// Obtenemos el contexto 2D
	this.context = this.canvas.getContext('2d');
	// Cargamos los recursos
	_loadResources();
	// Ejecutamos el hilo y llamamos a gameThread
	requestAnimFrame(gameThread);
}

function _loadResources()
{
	var i;	
	// Cargamos el zMap con la profundidad para las lineas de nuestro camino.
	for(i=0; i < roadLines; i++)
	{
		zMap.push(1 / (i - canvasHeight / 2));
	}
	
	// Queremos que la linea del fondo este en frente del resto entonces dibujamos la ultima primero.
	for(i=0; i < roadLines; i++)
	{
		var line = new Sprite("images/tracks.png",0,0);
		line.x = canvasWidth * 0.5;
		line.y = canvasHeight - i;
		lines.push(line);
	}
	
	// Escalamos el camino de acuerdo a su posición
	var halfWidth = canvasWidth / 2;
	for(i=0;i < roadLines; i++)
	{
		lines[i].scaleX = halfWidth / 60 - 1.2;
		halfWidth -= widthStep;
	}
}

function gameThread(dt)
{
	requestAnimFrame(gameThread);
	onDraw();
	update();
}

function onDraw()
{
	var ctx = this.context;
	ctx.fillStyle = "#A9F5F2";
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	
	for(var i = roadLines-1; i >= 0; i--)
	{
		lines[i].onDraw(ctx);
	}
}

function update()
{
	// Por el momento nada.
}

function Sprite(resource,x,y)
{
	var _image = new Image();
	_image.src = resource;

	this.x = x;
	this.y = y;
	this.scaleX = 1;
	this.scaleY = 1;

	this.onDraw = function(ctx)
	{
		var w = _image.width * this.scaleX;
		var h = _image.height * this.scaleY;
		
		ctx.drawImage(_image, this.x - w / 2, this.y - h / 2, w, h);
	};
	
}

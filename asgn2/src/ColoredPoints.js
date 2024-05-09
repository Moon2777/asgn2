// HelloPoint1.js
// Vertex shader program
var VSHADER_SOURCE =`
attribute vec4 a_Position;
uniform mat4 u_ModelMatrix;
uniform mat4 u_GlobalRotationMatrix;
void main() {
  gl_Position = u_GlobalRotationMatrix * u_ModelMatrix * a_Position;
}`;

// Fragment shader program
var FSHADER_SOURCE =`
precision mediump float;
uniform vec4 u_FragColor;
void main() {
  gl_FragColor = u_FragColor;
}`;

// Global Variables
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;

function setUpWebGL(){
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  gl.enable(gl.DEPTH_TEST);
  //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function ConnectVariablesToGLS(){
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders.');
    return;
  }

  // Get the storage location of attribute variable
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor variable
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if(!u_FragColor){
    console.log("Failed to get the location of u_FragColor");
    return;
  }

  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if(!u_ModelMatrix){
    console.log("Failed to get the location of u_ModelMatrix");
    return;
  }

  u_GlobalRotationMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotationMatrix');
  if(!u_ModelMatrix){
    console.log("Failed to get the location of u_GlobalRotationMatrix");
    return;
  }

  var idenityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, idenityM.elements)

}

const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;
const ODDTRIANGLE = 3;

let g_selectedColor = [1.0,1.0,1.0,1.0];
let g_selectedSize = 5;
let g_selectedType = POINT;
let g_globalAngle = 0;
let g_beakAngle = 0;
let g_neckAngle = 0;
let g_headAngle = 0;
let animate = false;

function addActionsForHtmlUI(){
  /*document.getElementById("green").onclick = function(){g_selectedColor = [0.0,1.0,0.0,1.0];};
  document.getElementById("red").onclick = function(){g_selectedColor = [1.0,0.0,0.0,1.0];};
  document.getElementById("clearButton").onclick = function(){g_shapeList = []; renderAllShapes();};

  document.getElementById("point").onclick = function(){g_selectedType = POINT};
  document.getElementById("triangle").onclick = function(){g_selectedType = TRIANGLE};
  document.getElementById("circle").onclick = function(){g_selectedType = CIRCLE};
  //document.getElementById("drawing").onclick = function(){drawing()};*/

  document.getElementById("ani_on").onclick = function(){animate = true};
  document.getElementById("ani_off").onclick = function(){animate = false};

  document.getElementById("beakAngle").addEventListener('mousemove', function(){g_beakAngle = this.value; renderAllShapes(); });
  document.getElementById("neckAngle").addEventListener('mousemove', function(){g_neckAngle = this.value; renderAllShapes(); });
  document.getElementById("headAngle").addEventListener('mousemove', function(){g_headAngle = this.value; renderAllShapes(); });
  document.getElementById("cameraAngle").addEventListener('mousemove', function(){g_globalAngle = this.value; renderAllShapes();});

}
function main() {
  //
  setUpWebGL();

  //
  ConnectVariablesToGLS();

  addActionsForHtmlUI();

 // Register function (event handler) to be called on a mouse press
 //canvas.onmousedown = click;

 //canvas.onmousemove = function(ev){if(ev.buttons == 1){click(ev)}};

 // Set the color for clearing <canvas>
 gl.clearColor(0.0, 0.0, 0.0, 1.0);

 // Clear <canvas>

 //gl.enable(gl.DEPTH_TEST);
 gl.clear(gl.COLOR_BUFFER_BIT);



 //renderAllShapes();
 requestAnimationFrame(tick);

}

var g_shapeList = [];

function click(ev) {
  let [x,y] = covertCoordinateEventToGL(ev);

  let point;

  if(g_selectedType == POINT){
    point = new Point();
  }else if(g_selectedType == TRIANGLE){
    point = new Triangle();
  }else{
    point = new Circle();
  }

  point.position=[x,y];
  point.color=g_selectedColor.slice();
  point.size=g_selectedSize;
  g_shapeList.push(point);

 renderAllShapes();

}

function covertCoordinateEventToGL(ev){
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.height/2)/(canvas.height/2);
  y = (canvas.width/2 - (y - rect.top))/(canvas.width/2);

  // Store the coordinates to g_points array
  return([x, y]);
}

function renderAllShapes(){

  var startTime = performance.now();
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  //gl.clear(gl.COLOR_BUFFER_BIT);

  var globalRotMat = new Matrix4().rotate(g_globalAngle, 0, 1, 0);
  gl.uniformMatrix4fv(u_GlobalRotationMatrix, false, globalRotMat.elements)
  /*var len = g_shapeList.length;
  for(var i = 0; i < len; i+=2) {
      g_shapeList[i].render();
  }*/
  //draw3DTriangle([-1, 0, 0,  -0.5, -1, 0,  0, 0, 0]);
  var body = new Sphere();
  body.segment = 6;
  body.color = [0.75, 0.5, 0.5, 1];
  body.matrix.translate(0.5,0,0.25);
  body.matrix.rotate(90, 0, 1, 0);
  body.matrix.rotate(20, 1, 0, 0);
  var bodyCoord = new Matrix4(body.matrix);
  //body.matrix.translate(-0.25,-0.25,0.25);
  //var bodyCoord = new Matrix4(body.matrix);
  body.matrix.scale(0.5,0.375,0.6);
  //body.matrix.rotate(180, 0, 0, 0);
  //body.matrix.rotate(15, 1, 0, 0);
  body.render();


  var neck = new Cylinder();
  neck.color = [0.5, 0.5, 0.5, 1];
  neck.segment = 10;
  neck.matrix = new Matrix4(bodyCoord);
  neck.matrix.translate(0,0.05,-0.7);
  neck.matrix.rotate( 45*Math.sin(g_neckAngle * Math.PI/180) , 1, 0, 0);
  var neckCoords = new Matrix4(neck.matrix);
  neck.matrix.scale(0.1,0.1,0.25);
  //var neckCoords = new Matrix4(neck.matrix);
  //neck.matrix.translate(0, -1.5,-1.75);
  //neck.matrix.translate(0, 4,-2);
  //var neckCoords = new Matrix4(neck.matrix);
  neck.render();


  // Head
  var head = new Sphere();
  head.segment = 10;
  head.matrix = neckCoords;
  //head.matrix.rotate(((g_headAngle))/3 - 105, 1, 0, 0);
  head.matrix.translate(0,-0.1,-0.15);
  head.color = [0.5, 0.5, 0.5, 1];
  head.matrix.scale(0.25,0.25,0.25);
  head.matrix.rotate( 45 * Math.sin(g_headAngle * Math.PI/180) , 1, 0, 0);
  var headCoord = new Matrix4(head.matrix);
  head.render();


  // Right eye
  var eye1 = new Sphere();
  eye1.segment = 10;
  eye1.color = [1, 1, 1, 1];
  eye1.matrix = new Matrix4(headCoord);
  eye1.matrix.scale(0.5,0.5,0.5);
  eye1.matrix.translate(1.25,0.25,0);
  eye1.render();


  // Left eye
  var eye2 = new Sphere();
  eye2.segment = 10;
  eye2.color = [1, 1, 1, 1];
  eye2.matrix = new Matrix4(headCoord);
  eye2.matrix.scale(0.5,0.5,0.5);
  eye2.matrix.translate(-1.25,0.25,0);
  eye2.render();

  // Upper beak
  var upper1 = new Pyramid();
  upper1.color = [0, 1, 1, 1];
  upper1.matrix = new Matrix4(headCoord);
  upper1.matrix.scale(1.25,1.25,1.25);
  upper1.matrix.rotate(180, 0, 1, 0);
  upper1.matrix.translate(-0.5,-0.125,0.5);
  var upperCoord = upper1.matrix;
  upper1.render();
  // Lower beak
  var upper2 = new Pyramid();
  upper2.color = [1, 1, 0, 1];
  upper2.matrix = upperCoord;
  upper2.matrix.scale(1,-1,1);
  upper2.matrix.rotate(-90*Math.abs(Math.sin(g_beakAngle * Math.PI/180)), 1, 0, 0);
  upper2.render();


  var leg1 = new Sphere();
  leg1.segment = 4;
  leg1.color = [1,1,1,1];
  leg1.matrix = new Matrix4(bodyCoord);
  leg1.matrix.scale(0.25,0.25,0.25);
  leg1.matrix.translate(1.5,-0.5,1);
  var leg1Coord = new Matrix4(leg1.matrix);
  leg1.render();

  var leg2 = new Sphere();
  leg2.segment = 4;
  leg2.color = [1,1,1,1];
  leg2.matrix = new Matrix4(bodyCoord);
  leg2.matrix.scale(0.25,0.25,0.25);
  leg2.matrix.translate(-1.5,-0.5,1);
  var leg2Coord = new Matrix4(leg2.matrix);
  leg2.render();

  var feet1 = new Pyramid();
  feet1.color = [1, 1, 0, 1];
  feet1.matrix = leg1Coord;
  feet1.matrix.rotate(165, 1, 0, 0);
  feet1.matrix.rotate(180, 0, 0, 1);

  feet1.matrix.rotate(-45*Math.sin(g_neckAngle * Math.PI/180), 1, 0, 0);
  feet1.matrix.translate(-1,-1.25, -0.25);
  feet1.matrix.scale(2, 2, 2);
  feet1.render();

  var feet2 = new Pyramid();
  feet2.color = [1, 1, 0, 1];
  feet2.matrix = leg2Coord;
  feet2.matrix.rotate(165, 1, 0, 0);
  feet2.matrix.rotate(180, 0, 0, 1);

  feet2.matrix.rotate(45*Math.sin(g_neckAngle * Math.PI/180), 1, 0, 0);
  feet2.matrix.translate(-1, -1.25, -0.25);
  feet2.matrix.scale(2, 2, 2);
  feet2.render();



  var duration = performance.now() - startTime;
  sendTextToHtml("ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration), "numdot");
}

function sendTextToHtml(text, htmlID){
    var htmlElm = document.getElementById(htmlID);
    if(!htmlID){
      console.log('Failed to get ' + htmlID + "from HTML");
      return;
    }
    htmlElm.innerHTML = text;
}

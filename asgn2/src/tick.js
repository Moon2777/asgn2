var g_startTime = performance.now()/10000;
var g_seconds = performance.now()/10000 - g_startTime;
function tick(){
  g_seconds = performance.now()/10000 - g_startTime;
  console.log(g_seconds);

  updateAnimation();
  
  renderAllShapes();

  requestAnimationFrame(tick);
}

function updateAnimation(){
  if (animate){
    let t = 360 * Math.sin(g_seconds);
    g_beakAngle = t;
    g_neckAngle = t;
    g_headAngle = t;
  }
}

let frame = 0;
let pg, pgCtx;
let circles = [];

function setup() {
  createAdaptiveCanvas(500, 500);
  strokeWeight(10);

  pg = createAdaptiveGraphics(scaler.width(),scaler.height(),renderBuffer);
  
  for (let i = 0; i < 1000000; i++) {
    circles.push(createVector(random(500),random(500)));
  }

  pg.reRender();

  //scaler.scaleCanvasTo(10);

}

function draw() {
  background(200);

  rectMode(CENTER);
  
  translate(scaler.width() / 2, scaler.height() / 2);
  rotate(radians(frame));

  image(pg.graphics(),0,0);
  rect(0, 0, scaler.width() / 2, scaler.height() / 2);
  
  frame++;

}


function renderBuffer(b) {
  // b.background('#ff0000');
  // b.rectMode(CENTER);
  // b.strokeWeight(10);
  // b.ellipse(0,0,500,500);
  b.strokeWeight(0.2);
  for (let i = 0; i < circles.length; i++) {
    b.ellipse(circles[i].x,circles[i].y,3,3);
  }
}



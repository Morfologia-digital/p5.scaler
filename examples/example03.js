let frame = 0;
let pg, pgCtx;
let circles = [];
let myMask = [];
let backgroundColor = 255;
let day = true;

function sgn(val) {
  if (val > 0) return 1;
  if (val < 0) return -1;
  return 0;
}

function setup() {
  createAdaptiveCanvas(500, 500);
  strokeWeight(10);

  let r = 100;
  let a = 100;
  let b = 100;
  let n = 0.5;
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let na = 2 / n;
    let x = pow(abs(cos(angle)), na) * a * sgn(cos(angle));
    let y = pow(abs(sin(angle)), na) * b * sgn(sin(angle));
    myMask.push(createVector(x, y));
  }

  pg = createAdaptiveGraphics(
    scaler.width() / 2,
    scaler.height() / 2,
    renderBuffer
  );

  for (let i = 0; i < 100000; i++) {
    circles.push(createVector(random(500), random(500)));
  }

  pg.reRender();

  console.log(pg.graphics().drawingContext);

}

function draw() {
  background(backgroundColor);
  if (day) {
    backgroundColor--;
    if (backgroundColor == 0) {
      day = false;
    }
  } else {
    backgroundColor++;
    if (backgroundColor == 255) {
      day = true;
    }
  }

  rectMode(CENTER);

  translate(scaler.width() / 2, scaler.height() / 2);
  rotate(radians(frame));

  image(pg.graphics(), -pg.graphics().width / 2, -pg.graphics().height / 2);

  push();
  strokeWeight(1);
  noFill();
  beginShape();
  stroke(255, 0, 0, 80);
  for (let i = 0; i < myMask.length; i++) {
    vertex(myMask[i].x, myMask[i].y);
  }
  endShape(CLOSE);
  pop();

  frame++;
}

function renderBuffer(b) {
  let ctx = b.drawingContext;

  ctx.beginPath();
  for (let i = 1; i < myMask.length; i++) {
    ctx.lineTo(b.width / 2 + myMask[i].x, b.height / 2 + myMask[i].y);
  }
  ctx.clip();

  b.noStroke();
  b.fill(255, 0, 0, 15);
  for (let i = 0; i < circles.length; i++) {
    b.ellipse(circles[i].x, circles[i].y, random(10), random(10));
  }
}

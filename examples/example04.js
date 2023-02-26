let frame = 0;

function setup() {
  createAdaptiveCanvas(2000, 2000);
  rectMode(CENTER);
}

function draw() {
  background(200);

  push();

  translate(scaler.width() / 2, scaler.height() / 2);
  rotate(radians(frame));

  strokeWeight(10);
  rect(0, 0, scaler.width() / 2, scaler.height() / 2);
  pop();

  push();
  noStroke();
  fill(255,0,0);
  ellipse(scaler.mouseX(), scaler.mouseY(), 20, 20);
  pop();

  frame++;
}

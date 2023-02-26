let frame = 0;

function setup() {
  createAdaptiveCanvas(2000, 2000);
  strokeWeight(10);
}

function draw() {
  background(200);

  rectMode(CENTER);

  translate(scaler.width() / 2, scaler.height() / 2);
  rotate(radians(frame));

  rect(0, 0, scaler.width() / 2, scaler.height() / 2);

  frame++;
}

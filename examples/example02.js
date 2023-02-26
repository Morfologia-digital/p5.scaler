let frame = 0;

function setup() {
  createAdaptiveCanvas(100, 100, false);
  strokeWeight(1);
  scaler.scaleCanvasTo(50);
}

function draw() {
  background(200);

  rectMode(CENTER);

  translate(scaler.width() / 2, scaler.height() / 2);
  rotate(radians(frame));

  rect(0, 0, scaler.width() / 2, scaler.height() / 2);

  frame++;
}

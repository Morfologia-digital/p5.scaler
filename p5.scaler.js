p5.prototype.scaler = undefined;
p5.prototype.createAdaptiveCanvas = function (width, height, fitScreen) {
  createCanvas(width, height);
  scaler = new Scaler(width, height, fitScreen === undefined ? true : false);
};
p5.prototype.updateAdaptiveCanvas = function () {
  if (scaler !== undefined)
    scale(scaler.scale());
};
window.addEventListener(
  'resize',
  function (event) {
    scaler.scaleCanvas();
  },
  true
);
p5.prototype.registerMethod('pre', p5.prototype.updateAdaptiveCanvas);

class Scaler {
  #width;
  #height;
  #ratio;
  #scale;
  #fitScreen;

  constructor(w, h, fitScreen) {
    this.#width = w;
    this.#height = h;
    this.#ratio = this.#width / this.#height;
    this.#fitScreen = fitScreen;
    if (!this.#fitScreen) return;
    this.scaleCanvas();
  }

  scaleCanvas() {
    if (this.#fitScreen) {
      let scaledWidth, scaledHeight;
      let diffWidth = Math.abs(this.#width - window.innerWidth);
      let diffHeight = Math.abs(this.#height - window.innerHeight);
      if (Math.min(diffWidth, diffHeight) == diffWidth) {
        scaledWidth = window.innerWidth;
        scaledHeight = window.innerWidth / this.#ratio;
        if (scaledHeight > window.innerHeight) {
          scaledHeight = window.innerHeight;
          scaledWidth = window.innerHeight * this.#ratio;
        }
      } else {
        scaledHeight = window.innerHeight;
        scaledWidth = window.innerHeight * this.#ratio;
        if (scaledWidth > window.innerWidth) {
          scaledWidth = window.innerWidth;
          scaledHeight = window.innerWidth / this.#ratio;
        }
      }
      this.#scale = scaledWidth / this.#width;
      resizeCanvas(scaledWidth, scaledHeight);
    }
  }

  width() {
    return this.#width;
  }

  height() {
    return this.#height;
  }

  scale() {
    return this.#scale;
  }
}

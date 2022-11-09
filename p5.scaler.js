p5.prototype.scaler = undefined;
p5.prototype.createAdaptiveCanvas = function (width, height, fitScreen) {
  let c = createCanvas(width, height);
  scaler = new Scaler(width, height, fitScreen === undefined ? true : false);
  return c;
};
p5.prototype.updateAdaptiveCanvas = function () {
  if (scaler !== undefined) scale(scaler.scale());
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
      this._doScale(window.innerWidth, window.innerHeight);
    }
  }

  scaleCanvasTo(s) {
    this._doScale(this.#width * s, this.#height * s);
  }

  _doScale(w, h) {
    let scaledWidth, scaledHeight;
    let diffWidth = Math.abs(this.#width - w);
    let diffHeight = Math.abs(this.#height - h);
    if (Math.min(diffWidth, diffHeight) == diffWidth) {
      scaledWidth = w;
      scaledHeight = w / this.#ratio;
      if (scaledHeight > h) {
        scaledHeight = h;
        scaledWidth = h * this.#ratio;
      }
    } else {
      scaledHeight = window.innerHeight;
      scaledWidth = window.innerHeight * this.#ratio;
      if (scaledWidth > w) {
        scaledWidth = w;
        scaledHeight = w / this.#ratio;
      }
    }
    this.#scale = scaledWidth / this.#width;
    resizeCanvas(scaledWidth, scaledHeight);
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

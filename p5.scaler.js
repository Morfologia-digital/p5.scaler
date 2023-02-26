p5.prototype.scaler = undefined;
p5.prototype.createAdaptiveCanvas = function (width, height, fitScreen) {
  let c = createCanvas(width, height);
  scaler = new Scaler(width, height, fitScreen === undefined ? true : false);
  return c;
};

function createAdaptiveGraphics(width, height, bufferRenderer) {
  let newBuffer = new AdaptiveBuffer(
    createGraphics(width, height),
    bufferRenderer
  );
  scaler.addBuffer(newBuffer);
  scaler.adjust();
  return newBuffer;
}

function addAdaptiveGraphics(graphics, bufferRenderer) {
  let newBuffer = new AdaptiveBuffer(graphics, bufferRenderer);
  scaler.addBuffer(newBuffer);
  scaler.adjust();
}

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

class AdaptiveBuffer {
  #graphics;
  #renderer;

  constructor(graphics, renderer) {
    this.#graphics = graphics;
    this.#renderer = renderer;
  }

  reRender() {
    this.#renderer(this.#graphics);
  }

  graphics() {
    return this.#graphics;
  }
}

class Scaler {
  #width;
  #height;
  #ratio;
  #scale;
  #fitScreen;
  #buffers;

  constructor(w, h, fitScreen) {
    this.#width = w;
    this.#height = h;
    this.#ratio = this.#width / this.#height;
    this.#fitScreen = fitScreen;
    this.#buffers = [];
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
    this.adjust();
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

  adjust() {
    for (let b = 0; b < this.#buffers.length; b++) {
      this.#buffers[b].graphics().pixelDensity(Math.ceil(this.#scale));
      this.#buffers[b].reRender();
    }
  }

  addBuffer(pg) {
    this.#buffers.push(pg);
  }

  mouseX() {
    return mouseX / this.#scale;
  }

  mouseY() {
    return mouseY / this.#scale;
  }

}

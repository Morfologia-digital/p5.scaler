p5.prototype.scaler = undefined;
p5.prototype.createAdaptiveCanvas = function (width, height, fitScreen) {
  let c = createCanvas(width, height);
  scaler = new Scaler(
    width,
    height,
    fitScreen === undefined ? true : fitScreen
  );
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
  "resize",
  function (event) {
    scaler.scaleCanvas();
  },
  true
);
p5.prototype.registerMethod("pre", p5.prototype.updateAdaptiveCanvas);

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
  #container;
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
      let scaleToWidth, scaleToHeight;
      if (this.#container !== undefined) {
        let cs = getComputedStyle(this.#container);

        let paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
        let paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);

        let borderX =
          parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
        let borderY =
          parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

        scaleToWidth = this.#container.offsetWidth - paddingX - borderX;
        scaleToHeight = this.#container.offsetHeight - paddingY - borderY;
      } else {
        scaleToWidth = window.innerWidth;
        scaleToHeight = window.innerHeight;
      }
      this._doScale(scaleToWidth, scaleToHeight);
    }
  }

  scaleCanvasTo(s) {
    this._doScale(this.#width * s, this.#height * s);
  }

  scaleCanvasToWidth(newWidth) {
    this._doScale(newWidth, this.#height * (newWidth/this.#width));
  }

  scaleCanvasToHeight(newHeight) {
    this._doScale(this.#width * (newHeight/this.#height), newHeight);
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
      scaledHeight = h;
      scaledWidth = h * this.#ratio;
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
      this.#buffers[b]
        .graphics()
        .pixelDensity(
          max(Math.ceil(this.#scale) * displayDensity() * 1.2, displayDensity())
        );
      this.#buffers[b].reRender();
    }
  }

  addBuffer(pg) {
    this.#buffers.push(pg);
  }

  setCanvasContainer(container) {
    this.#container = container;
    this.scaleCanvas();
  }

  mouseX() {
    return mouseX / this.#scale;
  }

  mouseY() {
    return mouseY / this.#scale;
  }

  pmouseX() {
    return pmouseX / this.#scale;
  }

  pmouseY() {
    return pmouseY / this.#scale;
  }
}

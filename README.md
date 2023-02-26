# p5.scaler
Auto scales sketches in order to fit the browser's inner dimensions.

## Get started :beginner:

- [Download](https://raw.githubusercontent.com/Morfologia-digital/p5.scaler/main/p5.scaler.js) the p5.scaler.js file to your existing p5.js project
- Link the file in your index.html. It should look something like this:
```
    <script src="p5.min.js"></script>
    <script src="p5.scaler.js"></script>
    <script src="sketch.js"></script>
```
- On your sketch code, instead of calling the `createCanvas()`, use `createAdaptiveCanvas()`. This function has three arguments:
  - *width* - the original width of your canvas, in pixels
  - *height* - the original height of your canvas, in pixels
  - *fitScreen* - whether or not the canvas should auto scale to fit the screen. Default value is *true*. You may want to set it to *false* during development
- From now on, if you need to retrieve the width/height of your canvas (originally done through the `width` & `height` global properties), you should use `scaler.width()` and `scaler.height()`
- From now on, if you need to retrieve mouseX,mouseY (originally done through the `mouseX` & `mouseY` global properties), you should use `scaler.mouseX()` and `scaler.mouseY()`

## Factor scaling :art:
You may want to scale your canvas to a factor. This may be particularly useful if you want to generate files for printing. In order to do that, you just need to follow these two steps:
- disable auto-scaling, by making sure your `createAdaptiveCanvas()` call has *false* to the *fitScreen* argument;
- in the last line of your `setup()` function add the following line:
```
// scaleFactor is a float-pointing number
scaler.scaleCanvasTo(scaleFactor);
```
- Right click on the rendered canvas and select "Save image as..." and select the folder location to save the scaled PNG file.

## Scaling p5.Renderer objects :tv:
If your sketch has *p5.Renderer* objects (they are VERY useful as buffers), you will need to tell *p5.scaler* about them. Just complete the following steps:
- instead of calling the `createGraphics();` function, use `createAdaptiveGraphics()`. This function has three arguments:
  - *width* - the original width of your *p5.Renderer*, in pixels
  - *height* - the original height of your *p5.Renderer*, in pixels
  - *bufferRenderer* - a function that receives a regular *p5.Renderer* as a parameter and is responsible for the actual drawing of that buffer (*refreshing the buffer* might be the accurate idea here). So, everytime the canvas is resized, this function is called to re-draw your *p5.Renderer*
- make sure you have a rendering function to your *p5.Renderer*, to pass as the last argument of the `createAdaptiveGraphics()` function. Here is a simple example:
```
  // declares the buffer variable
  let pg;

  function setup() {
    // instantiates the buffer
    pg = createAdaptiveGraphics(
      scaler.width() / 2,
      scaler.height() / 2,
      renderBuffer
    );
  }

  // specification of the function that will render the buffer
  function renderBuffer(b) {
    b.background(0);
    b.ellipse(b.width/2, b.height/2, 100, 100);
  }

  function draw() {
    translate(scaler.width() / 2, scaler.height() / 2);
    // renders the buffer right on the center of the main canvas
    image(pg.graphics(), -pg.graphics().width / 2, -pg.graphics().height / 2);
  }

```
- make sure you call `pg.reRender()` once in the the `setup()` function

## Task list :seedling:
- [ ] **We strongly believe the features added by p5.scaler.js could fit as standard code for the p5.js library. Maybe you can help us by suggesting that to the authors [here](https://github.com/processing/p5.js)**;
- [ ] Add log messages to the console when something is wrong, to help programmers;
- [x] Add support to mouseX and mouseY properties.They should be used as `scaler.mouseX()` and `scaler.mouseY()`;


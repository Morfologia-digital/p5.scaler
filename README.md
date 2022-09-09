# p5.scaler
Auto scales sketches in order to fit the browser's inner dimensions.

## Get Started

- [Download]() the p5.scaler.js file to your existing p5.js project
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

## Task List
- [ ] Add log messages to the console when something is wrong, to help programmers
- [ ] Add support to mouseX and mouseY properties.They should be used as `scaler.mouseX()` and `scaler.mouseY()`


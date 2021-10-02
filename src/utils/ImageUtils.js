export function resizeImage(image, defaultSize) {
  // -- resize image
  var width = 1000,
    height = 1000;

  if (typeof defaultSize != "undefined") {
    width = parseInt(defaultSize);
    height = parseInt(defaultSize);
  }

  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  if (image.width >= image.height) {
    height = (image.height / image.width) * 1000;
  } else {
    width = (image.width / image.height) * 1000;
  }

  canvas.width = width;
  canvas.height = height;
  console.log(width + " " + height);
  ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg");
}

export function resizeDataURL(datas, callback) {
  console.log("datas",datas)
  var width = 1000,
    height = 1000;
  // We create an image to receive the Data URI
  var image = document.createElement("img");

  // When the event "onload" is triggered we can resize the image.
  image.onload = function () {
    // We create a canvas and get its context.
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    if (image.width >= image.height) {
      height = (image.height / image.width) * 1000;
    } else {
      width = (image.width / image.height) * 1000;
    }

    canvas.width = width;
    canvas.height = height;
    console.log(width + " " + height);
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);

    var dataURI = canvas.toDataURL();
    callback(dataURI);
  };

  // We put the Data URI in the image's src attribute
  image.src = datas;
}

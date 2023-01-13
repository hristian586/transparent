var fileInput = document.getElementById("file-input");
var image = document.getElementById("image");
var button = document.getElementById("button");
var dropZone = document.getElementById("drop-zone");

// Handle file selection
fileInput.onchange = function (event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function (event) {
    image.src = event.target.result;
    image.style.display = "block";
    button.style.display = "block";
    dropZone.style.display = "none";
  }
  reader.readAsDataURL(file);
}

// Handle drag and drop
dropZone.ondragover = function () {
  this.className = "hover";
  return false;
}
dropZone.ondragleave = function () {
    this.className = "";
    return false;
  }
  dropZone.ondrop = function (event) {
    event.preventDefault();
    var file = event.dataTransfer.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      image.src = event.target.result;
      image.style.display = "block";
      button.style.display = "block";
      dropZone.style.display = "none";
    }
    reader.readAsDataURL(file);
  }
  
  // Make white pixels transparent
  function makeWhitePixelsTransparent() {
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    var imgData = ctx.getImageData(0, 0, image.width, image.height);
    var data = imgData.data;
    for (var i = 0; i < data.length; i += 4) {
      if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
        data[i + 3] = 0;
      }
    }
    ctx.putImageData(imgData, 0, 0);
    image.src = canvas.toDataURL();
    h1.style.display = "block";
  }
  

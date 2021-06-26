let outputWidth;
let outputHeight;

let faceTracker; // Face Tracking
let videoInput;

let imgSpidermanMask; // Spiderman Mask Filter
let imgDogEarRight, imgDogEarLeft, imgDogNose; // Dog Face Filter

let selected = -1; // Default no filter

/*
 * **p5.js** library automatically executes the `preload()` function. Basically, it is used to load external files. In our case, we'll use it to load the images for our filters and assign them to separate variables for later use.
*/
function preload()
{
  // Spiderman Mask Filter asset
  imgSpidermanMask = loadImage("https://i.ibb.co/9HB2sSv/spiderman-mask-1.png");

  // Dog Face Filter assets
  imgDogEarRight = loadImage("https://i.ibb.co/bFJf33z/dog-ear-right.png");
  imgDogEarLeft = loadImage("https://i.ibb.co/dggwZ1q/dog-ear-left.png");
  imgDogNose = loadImage("https://i.ibb.co/PWYGkw1/dog-nose.png");
}

/**
 * In p5.js, `setup()` function is executed at the beginning of our program, but after the `preload()` function.
*/
function setup()
{
  const maxWidth = Math.min(windowWidth, windowHeight);
  pixelDensity(1);
  outputWidth = maxWidth;
  outputHeight = maxWidth * 0.75; // 4:3

  createCanvas(outputWidth, outputHeight);

  // webcam capture
  videoInput = createCapture(VIDEO);
  videoInput.size(outputWidth, outputHeight);
  videoInput.hide();

  // select filter
  const sel = createSelect();
  const selectList = ['Spiderman Mask', 'Dog Filter']; // list of filters
  sel.option('Select Filter', -1); // Default no filter
  for (let i = 0; i < selectList.length; i++)
  {
    sel.option(selectList[i], i);
  }
  sel.changed(applyFilter);

  // tracker
  faceTracker = new clm.tracker();
  faceTracker.init();
  faceTracker.start(videoInput.elt);
}

// callback function
function applyFilter()
{
  selected = this.selected(); // change filter type
}

/*
 * In p5.js, draw() function is executed after setup(). This function runs inside a loop until the program is stopped.
*/
function draw()
{
  image(videoInput, 0, 0, outputWidth, outputHeight); // render video from webcam

  // apply filter based on choice
  switch(selected)
  {
    case '-1': break;
    case '0': drawSpidermanMask(); break;
    case '1': drawDogFace(); break;
  }
}

// Spiderman Mask Filter
function drawSpidermanMask()
{
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false)
  {
    push();
    const wx = Math.abs(positions[13][0] - positions[1][0]) * 1.2; // The width is given by the face width, based on the geometry
    const wy = Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) * 1.2; // The height is given by the distance from nose to chin, times 2
    translate(-wx/2, -wy/2);
    image(imgSpidermanMask, positions[62][0], positions[62][1], wx, wy); // Show the mask at the center of the face
    pop();
  }
}

// Dog Face Filter
function drawDogFace()
{
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false)
  {
    if (positions.length >= 20) {
      push();
      translate(-100, -150); // offset adjustment
      image(imgDogEarRight, positions[20][0], positions[20][1]);
      pop();
    }

    if (positions.length >= 16) {
      push();
      translate(-20, -150); // offset adjustment
      image(imgDogEarLeft, positions[16][0], positions[16][1]);
      pop();
    }

    if (positions.length >= 62) {
      push();
      translate(-57, -20); // offset adjustment
      image(imgDogNose, positions[62][0], positions[62][1]);
      pop();
    }
  }
}

function windowResized()
{
  const maxWidth = Math.min(windowWidth, windowHeight);
  pixelDensity(1);
  outputWidth = maxWidth;
  outputHeight = maxWidth * 0.75; // 4:3
  resizeCanvas(outputWidth, outputHeight);
}
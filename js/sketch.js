let angle = 0;
let jitter = 0;
let img, button, soundtrack, bone_crack, timer, b3, b4;
let playing_animation = false;

var serial; //variable to hold an instance of the serial port library
var portName = 'COM4'; //fill in with YOUR port

function preload() {
  wishbone_left = loadImage('./bones/wishbone_left_broken.png')
  wishbone_right = loadImage('./bones/wishbone_right_broken.png')
  wishbone_whole = loadImage('./bones/wishbone.png')
  soundtrack = loadSound('invincibility_loop.mp3')
  bone_crack = loadSound('bone-crack.mp3')
}

function setup() {

  alert(//'When the music stops,\n' +
    'SMASH YOUR SIDE AS FAST AS POSSIBLE\n\n' +
    'Good Luck!');


  imageMode(CENTER);
  img = wishbone_whole


  button = createButton('START')
  translate(width / 2, height / 2);
  button.position(100, 100);
  button.mousePressed(button_press)

  soundtrack.playMode('sustain');
  // soundtrack.play();

  serial = new p5.SerialPort(); //a new instance of serial port library

  // //set up events for serial communication
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', portClose);

  //open our serial port
  serial.open(portName);
}

function button_press() {
  button.hide();
  img = wishbone_whole;
  createCanvas(700, 700);
  playing_animation = true;
  soundtrack.stop();
  soundtrack.loop();
}

function draw() {
  if (playing_animation === true) {
    clear()
    jitter = .08
    angle = angle + jitter;
    let c = cos(angle)
    shears_action();

    translate(width / 2, height / 2);
    rotate(c)
    image(img, 0, 0);
  } else {
    clear()
    translate(width / 2, height / 2);
    image(img, 0, 0);
    console.log(b3 + ',' + b4)
  }
}

function keyPressed() {
  if ((keyCode === LEFT_ARROW)) {
    soundtrack.stop();
    bone_crack.play();
    img = wishbone_left;
    playing_animation = false;
    button.show()
  } else if ((keyCode === RIGHT_ARROW)) {
    soundtrack.stop();
    bone_crack.play();
    img = wishbone_right;
    playing_animation = false;
    button.show()
  } else if (keyCode === DOWN_ARROW) {
    soundtrack.stop();
    img = wishbone_whole;
    playing_animation = false;
    button.show();
  }
}

function shears_action() {
  if ((b4 == 0)) {
    soundtrack.stop();
    bone_crack.play();
    img = wishbone_left;
    playing_animation = false;
    button.show()
  }
  if ((b3 == 0)) {
    soundtrack.stop();
    bone_crack.play();
    img = wishbone_right;
    playing_animation = false;
    button.show()
  }
}

/**
 * Todo - Add back serial function here for button smashes
 */
function serialEvent() {
  // //receive serial data here
  var data = serial.readLine();
  if (data === "") return;
  var array = data.split(',')

  b3 = parseInt(array[0]);
  b4 = parseInt(array[1]);
}

function serverConnected() {
  console.log('connected to the server');
}

function portOpen() {
  console.log('the serial port opened!');
}

function serialError(err) {
  console.log('something went wrong with the port. ' + err);
}

function portClose() {
  console.log('the port was closed');
}

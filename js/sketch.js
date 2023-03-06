let angle = 0;
let jitter = 0;
let img;
let playing_animation = true;
let soundtrack, bone_crack;

var serial; //variable to hold an instance of the serial port library
var portName = 'COM3'; //fill in with YOUR port

function preload() {
  retroFont = loadFont('ARCADECLASSIC.TTF');
  wishbone_left = loadImage('./bones/wishbone_left_broken.png')
  wishbone_right = loadImage('./bones/wishbone_right_broken.png')
  wishbone_whole = loadImage('./bones/wishbone.png')
  soundtrack = loadSound('invincibility.mp3')
  bone_crack = loadSound('bone-crack.mp3')
}

function setup() {

  alert('When the music stops,\n' +
    'SMASH YOUR SIDE AS FAST AS POSSIBLE\n\n' +
    'Good Luck!');

  createCanvas(700, 700);

  imageMode(CENTER);
  img = wishbone_whole

  soundtrack.playMode('sustain');
  // soundtrack.play();

  // serial = new p5.SerialPort(); //a new instance of serial port library

  // //set up events for serial communication
  // serial.on('connected', serverConnected);
  // serial.on('open', portOpen);
  // serial.on('data', serialEvent);
  // serial.on('error', serialError);
  // serial.on('close', portClose);

  // //open our serial port
  // serial.open(portName);

  // //set comparison triggers to true
  // comp1 = true;
  // comp2 = true;
  // comp3 = true;
  // comp4 = true;
}

function draw() {
  if (playing_animation === true) {
    clear()
    jitter = .08
    angle = angle + jitter;
    let c = cos(angle)

    translate(width / 2, height / 2);
    rotate(c)
    image(img, 0, 0);
  } else {
    clear()
    translate(width / 2, height / 2);
    image(img, 0, 0);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    soundtrack.stop()
    bone_crack.play();
    img = wishbone_left;
    playing_animation = false;
  } else if (keyCode === RIGHT_ARROW) {
    soundtrack.stop()
    bone_crack.play();
    img = wishbone_right;
    playing_animation = false;
  } else if (keyCode === DOWN_ARROW) {
    soundtrack.play();
    img = wishbone_whole
    playing_animation = true;
  }
}

/**
 * Todo - Add back serial function here for button smashes
 */
function serialEvent() {
  // //receive serial data here
  // var data = serial.readLine();
  // if (data === "") return;
  // console.log(data);
  // var array = data.split(',')
  // // console.log(array[1]);

  // // map potentiometers to paddles
  // p1.pos.y = map(array[0], 0, 255, 0, height - 1)
  // p1.pos.y = constrain(p1.pos.y, 10, height - 10 - p1.h);
  // p2.pos.y = map(array[1], 0, 255, 0, height - 1)
  // p2.pos.y = constrain(p2.pos.y, 10, height - 10 - p2.h);

  // // set button states
  // b1 = parseInt(array[2]);
  // b2 = parseInt(array[3]);
  // b3 = parseInt(array[4]);
  // b4 = parseInt(array[5]);
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

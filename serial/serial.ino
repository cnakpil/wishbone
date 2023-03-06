void setup() {
  Serial.begin(9600); // initialize serial communications

  pinMode(2, INPUT_PULLUP);
  pinMode(3, INPUT_PULLUP);
  pinMode(4, INPUT_PULLUP);
  pinMode(5, INPUT_PULLUP);
}
 
void loop() {
  // read the input pins:
  int pot1 = analogRead(A0);
  int pot2 = analogRead(A1);
  int b1 = digitalRead(2);
  int b2 = digitalRead(3);
  int b3 = digitalRead(4);
  int b4 = digitalRead(5);
  
  // remap the pot value to fit in 1 byte:
  int mappedPot1 = map(pot1, 0, 1023, 0, 255); 
  int mappedPot2 = map(pot2, 0, 1023, 0, 255);
  
  // print it out the serial port as a string:
  String output = String(mappedPot1)+","+String(mappedPot2)+","+String(b1)+","+String(b2)+","+String(b3)+","+String(b4);
  Serial.println(output);

  // slight delay to stabilize the ADC:
//  delay(1);    
}

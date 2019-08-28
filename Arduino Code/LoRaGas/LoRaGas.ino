#include <SPI.h>
#include <LoRa.h>
#include <ArduinoJson.h>

int gasPin = A3;
// Your threshold value
int sensorThres = 400;

void setup() {
  pinMode(gasPin, INPUT);
  Serial.println("LoRa Sender");

  if (!LoRa.begin(915E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
}//end steup

char data[100];

//initialize json object
StaticJsonBuffer<200> jsonBuffer;
JsonObject& jsonObj = jsonBuffer.createObject();

void loop() {
  Serial.print("Sending packet: ");

  // Send a message to rf95_server

  int analogSensor = analogRead(gasPin);
  jsonObj["id"] = int(3);
  jsonObj["gas"] = analogSensor;
  jsonObj["lat"] = 24.645631;
  jsonObj["lng"] = 46.699013;
  


  // send packet
  LoRa.beginPacket();   
  Serial.print("Sending Packets");
  jsonObj.printTo(LoRa);
  LoRa.endPacket();

  delay(5000);
}

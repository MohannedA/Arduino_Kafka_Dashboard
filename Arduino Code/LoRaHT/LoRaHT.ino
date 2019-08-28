#include <SoftwareSerial.h>
#include <dht.h>
#include <SPI.h>
#include <LoRa.h>
#include <ArduinoJson.h>
#define dht_apin A0 // Analog Pin sensor is connected to
const int pinAdc = A0;
dht DHT;

void setup() {

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
  DHT.read11(dht_apin);

  //Because it does not accept to send an array with buffer uin8_t
  jsonObj["id"] = 1;
  jsonObj["humidity"] = DHT.humidity;
  jsonObj["temperature"] = DHT.temperature;
  jsonObj["lat"] = 24.729175;
  jsonObj["lng"] = 46.660559;

  // send packet
  LoRa.beginPacket();
  Serial.print("Sending Packets");
  jsonObj.printTo(LoRa);
  LoRa.endPacket();

  delay(5000);
}

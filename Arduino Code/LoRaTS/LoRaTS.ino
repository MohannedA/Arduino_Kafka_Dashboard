#include <dht.h>
#include <SPI.h>
#include <LoRa.h>
#include <ArduinoJson.h>
#define dht_apin A0 // Analog Pin sensor is connected to
#define NODEID 1;
const int pinAdc = A3;
dht DHT;

void setup() {

  Serial.println("LoRa Sender");

  if (!LoRa.begin(915E6)) {
    Serial.println("Starting LoRa failed!");
    while (1);
  }
}//end steup

char data[100];
int inc = 1;

//initialize json object
StaticJsonBuffer<200> jsonBuffer;
JsonObject& jsonObj = jsonBuffer.createObject();

void loop() {
  DHT.read11(dht_apin);
  Serial.print("Sending packet: ");
  Serial.println(DHT.temperature);
  long sum = 0;
  for (int i = 0; i < 32; i++)
  {
    sum += analogRead(pinAdc);
  }

  sum >>= 5;


  // Send a message to rf95_server

  //You have to convert from uint8_t to char
  //Because it does not accept to send an array with buffer uin8_t
  jsonObj["id"] = 2;
  jsonObj["sound"] = int(sum);
  jsonObj["temperature"] = DHT.temperature;
  jsonObj["lat"] = 24.761776;
  jsonObj["lng"] = 46.740189;
  jsonObj["inc"] = inc;
  inc++;  

  // send packet
  LoRa.beginPacket();
  Serial.print("Sending Packets");
  jsonObj.printTo(LoRa);
  LoRa.endPacket();

  delay(100);
}

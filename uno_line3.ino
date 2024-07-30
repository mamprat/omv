#include "EmonLib.h"
#include <avr/wdt.h>

const int sensor = 1;  //A1

EnergyMonitor emon1;
const int threshold = 100;

static unsigned long OnDelay;
unsigned long TimeOn = 20000;

int printCounter = 0;  // Counter untuk menghitung jumlah data yang telah dicetak
int dataPrint = 10;

void setup() {
  Serial.begin(9600);
  delay(100);
  emon1.current(sensor, 600.600);
  OnDelay = 0 - TimeOn;

  // Aktifkan Watchdog Timer dengan timeout 8 detik
  wdt_enable(WDTO_8S);
}

void loop() {
  wdt_reset();

  int Irms = emon1.calcIrms(1480);
  if (Irms > threshold) {
    OnDelay = millis();
  }

  if (millis() - OnDelay >= (TimeOn)) {
    Serial.println(Irms);
    printCounter++;
  } else {
    Serial.println(Irms);
    printCounter++;
  }

  // Cek apakah sudah mencetak 10 data
  if (printCounter >= dataPrint) {
    delay(2000);  // Menunggu sebentar sebelum reset
    while (1) {}  // Loop tak terbatas untuk memicu Watchdog reset
  }
  delay(500);
}



// #include "EmonLib.h"
// const int sensor = 1;  //A1

// EnergyMonitor emon1;
// const int threshold = 100;

// static unsigned long OnDelay;
// unsigned long TimeOn = 20000;

// int printCounter = 0;  // Counter untuk menghitung jumlah data yang telah dicetak
// int dataPrint = 10;
// void (*resetFunc)(void) = 0;  // Deklarasi fungsi reset

// void setup() {
//   Serial.begin(9600);
//   delay(100);
//   emon1.current(sensor, 600.600);
//   OnDelay = 0 - TimeOn;
// }

// void loop() {
//   int Irms = emon1.calcIrms(1480);
//   if (Irms > threshold) {
//     OnDelay = millis();
//   }

//   if (millis() - OnDelay >= (TimeOn)) {
//     Serial.println(Irms);
//     printCounter++;
//   } else {
//     Serial.println(Irms);
//     printCounter++;
//   }

//   // Cek apakah sudah mencetak 10 data
//   if (printCounter >= dataPrint) {
//     delay(2000);  // Menunggu sebentar sebelum reset
//     resetFunc();  // Memanggil fungsi reset
//   }
//   delay(500);
// }


// #include "EmonLib.h"
// const int sensor = 1;  //A1

// EnergyMonitor emon1;
// const int threshold = 100;

// static unsigned long OnDelay;
// unsigned long TimeOn = 20000; 

// void setup() {
//   Serial.begin(9600);
//   delay(100);
//   emon1.current(sensor, 600.600);  
//   OnDelay = 0 - TimeOn;
// }

// void loop() {
//   int Irms = emon1.calcIrms(1480);
//   if (Irms > threshold) {
//     OnDelay = millis();
//   }
//   if (millis() - OnDelay >= (TimeOn)) {
//     Serial.println(Irms);
//     delay(500);
//   } else {
//     Serial.println(Irms);
//     delay(500);
//   }
// }

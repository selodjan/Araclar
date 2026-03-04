const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// En son gelen veriyi hafızada tutar (Basitlik için veritabanı kullanmıyoruz)
let lastGpsData = {
    lat: "0.0",
    lng: "0.0",
    speed: "0",
    time: "Yok"
};

// 1. SIM800L VERİ GÖNDERME UÇ NOKTASI (Endpoint)
// Örnek kullanım: /update?lat=41.01&lng=28.97&speed=50
app.get('/update', (req, res) => {
    const { lat, lng, speed } = req.query;
    
    if (lat && lng) {
        lastGpsData = {
            lat: lat,
            lng: lng,
            speed: speed || "0",
            time: new Date().toLocaleTimeString('tr-TR')
        };
        console.log("Yeni Konum Alındı:", lastGpsData);
        res.send("OK"); // Modüle onay gönderir
    } else {
        res.status(400).send("Eksik veri!");
    }
});

// 2. C# UYGULAMASI VERİ ÇEKME UÇ NOKTASI
app.get('/data', (req, res) => {
    res.json(lastGpsData);
});

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda aktif.`);
});

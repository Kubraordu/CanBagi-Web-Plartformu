// KAYIT OLMA VE GİRİŞ YAPMA İŞLEMLERİ

// ---------- ELEMANLARI BULMA ----------
// document.getElementById("..."): id'si verilen HTML elemanını bulur
const kayitFormu = document.getElementById("kayit-formu");         // kayıt formunu bulur
const kayitMesaji = document.getElementById("kayit-mesaji");     // kayıt mesajının yazılacağı yeri bulur
const girisFormu = document.getElementById("giris-formu");            // giriş formunu bulur
const girisMesaji = document.getElementById("giris-mesaji");        // giriş mesajının yazılacağı yeri bulur
const kalanHakYazisi = document.getElementById("kalan-hak"); // kalan hak sayısının yazılacağı yeri bulur

// ---------- KALAN HAKKI AYARLAMA ----------
let kalanHak = 5;                                     // let: değişecek değer
const kayitliHak = localStorage.getItem("kalanHak");  // localStorage.getItem: tarayıcı hafızasından değer okur
if (kayitliHak !== null) {                            // hafızada kayıtlı hak var mı diye bakar
    kalanHak = Number(kayitliHak);                    // Number(): yazıyı sayıya çevirir
}
kalanHakYazisi.textContent = kalanHak;                // textContent: elemanın yazısını değiştirir, kalan hakkı ekranda gösterir

// ---------- FONKSİYONLAR ----------

// kullanicilariGetir: kayıtlı kullanıcıların listesini verir
function kullanicilariGetir() {                       
    const kayitliYazi = localStorage.getItem("kullanicilar"); // localStorage.getItem: hafızadaki kullanıcı yazısını okur
    if (kayitliYazi === null) {                       // hafızada kullanıcı var mı diye bakar
        return [];                                   
    }
    return JSON.parse(kayitliYazi);                   // JSON.parse: yazıyı tekrar js listesine çevirir
}


function kullaniciBul(eposta) {                       // kullaniciBul: e-postası verilen kullanıcıyı bulur
    const kullanicilar = kullanicilariGetir();        // kullanıcı listesini alır
    for (let i = 0; i < kullanicilar.length; i++) {   // i < kullanicilar.length: Sayaç, listedeki kullanıcı sayısından küçük olduğu sürece döngü devam eder
        if (kullanicilar[i].eposta === eposta) {      // kullanıcının e-postası aranan e-postayla aynı mı diye bakar
            return kullanicilar[i];                   // e-posta aynıysa o kullanıcıyı verir
        }
    }
    return null;                                     
}

// ---------- KAYIT OL ----------
// addEventListener("submit", ...): form gönderilince çalışacak kodu belirler
kayitFormu.addEventListener("submit", function (event) {
    event.preventDefault();                           // preventDefault: sayfanın otomatik yenilenmesini durdurur

    // value: kutuya yazılan değeri alır
    const eposta = document.getElementById("kayit-eposta").value;          // yazılan e-posta
    const sifre = document.getElementById("kayit-sifre").value;        // yazılan şifre
    const sifreTekrar = document.getElementById("sifre-tekrar").value;    // tekrar yazılan şifre

    if (sifre !== sifreTekrar) {                      // iki şifre de aynı mı diye bakar
        kayitMesaji.textContent = "Şifreler aynı değil.";
        return;                                      
    }

    if (kullaniciBul(eposta) !== null) {              // bu e-postada kayıtlı kullanıcı var mı diye bakar
        kayitMesaji.textContent = "Bu e-posta ile zaten kayıt olunmuş.";
        return;                                      
    }

    const kullanicilar = kullanicilariGetir();        // mevcut kullanıcı listesini alır

    kullanicilar.push({                               // push: listenin sonuna yeni eleman ekler
        adSoyad: document.getElementById("ad-soyad").value, // ad soyad
        eposta: eposta,                               // e-posta
        telefon: document.getElementById("telefon").value,     // telefon
        cinsiyet: document.getElementById("cinsiyet").value,   // cinsiyet
        sifre: sifre                                  // şifre
    });

    try {                                             // try: hata çıkabilecek işi dener
        localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar)); // setItem: hafızaya yazar. JSON.stringify: listeyi yazıya çevirir
        kayitMesaji.textContent = "Kayıt başarılı! Şimdi giriş yapabilirsiniz.";
        kayitFormu.reset();                           // reset: formdaki yazıları temizler
    } catch (error) {                                 // catch: try'da hata çıkarsa burası çalışır
        kayitMesaji.textContent = "Kayıt sırasında bir hata oluştu."; // kullanıcıya haber verir
    }
});

// ---------- GİRİŞ YAP ----------
girisFormu.addEventListener("submit", function (event) { // "Giriş Yap"a basılınca çalışır
    event.preventDefault();                           // sayfanın yenilenmesini durdurur

    if (kalanHak <= 0) {                              // kalan hak sıfır veya sıfırdan küçük mü diye kontrol eder
        girisMesaji.textContent = "Giriş hakkınız bitti.";
        return;                                       
    }

    const eposta = document.getElementById("giris-eposta").value;       // yazılan e-posta
    const sifre = document.getElementById("giris-sifre").value;     // yazılan şifre
    const kullanici = kullaniciBul(eposta);           // kullaniciBul: bu e-postadaki kullanıcıyı arar

    if (kullanici === null) {                         // kullanıcı var mı diye kontrol eder
        girisMesaji.textContent = "Bu e-posta kayıtlı değil. Önce kayıt olun.";
        return;                                     
    }

    if (kullanici.sifre === sifre) {                  // kayıtlı şifre ile yazılan şifre aynı mı diye bakar
        localStorage.setItem("girisYapanKullanici", eposta); // giriş yapıldığını hafızaya yazar
        localStorage.setItem("kalanHak", 5);          // hakkı tekrar 5 yapar
        window.location.href = "index.html";          // window.location.href: tarayıcıyı başka sayfaya götürür
    } else {                                        
        kalanHak = kalanHak - 1;                      // bir hak düşürür
        localStorage.setItem("kalanHak", kalanHak);   // kalan hakkı hafızaya yazar
        kalanHakYazisi.textContent = kalanHak;        // kalan hakkı ekranda günceller

        if (kalanHak > 0) {                           // hâlâ hak var mı diye bakar
            girisMesaji.textContent = "Şifre yanlış. Kalan hakkınız: " + kalanHak; // + : yazıları birleştirir
        } else {                                    
            girisMesaji.textContent = "Giriş hakkınız bitti.";
        }
    }
});
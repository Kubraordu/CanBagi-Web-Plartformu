// İLAN ARAMA İŞLEMLERİ

// ---------- GİRİŞ KONTROLÜ ----------
const girisYapanKullanici = localStorage.getItem("girisYapanKullanici"); // localStorage.getItem: hafızadan giriş yapan kullanıcıyı okur

if (girisYapanKullanici === null) {             // girisYapanKullanici: giriş yapan kullanıcının bilgisidir
    alert("Önce giriş yapmalısınız.");          // alert: ekrana uyarı penceresi açar
    window.location.href = "giris-yap.html";    // window.location.href: başka sayfaya götürür
}

// ---------- ELEMANLARI BULMA ----------
const aramaFormu = document.getElementById("search-form");       // getElementById: id'si verilen elemanı bulur (arama formunu)
const sonucMesaji = document.getElementById("result-message");   // "X ilan bulundu" yazısının yeri
const sonucListesi = document.getElementById("result-list");     // bulunan ilanların listesinin yeri

// ---------- FONKSİYONLAR ----------

// ilanlariGetir: kayıtlı ilanların listesini verir
function ilanlariGetir() {                                 // function: tekrar kullanılabilen kod parçası
    try {                                                  // try: hata çıkabilecek işi dener
        const kayitliYazi = localStorage.getItem("ilanlar"); // localStorage: Tarayıcı hafızasıdır. kayitliYazi: hafızadan okunan yazıyı tutar
        if (kayitliYazi === null) {                        // hafızada hiç ilan yoksa koşulunu sağlar
            return [];                                   
        }
        return JSON.parse(kayitliYazi);                    // JSON.parse: yazıyı listeye çevirir
    } catch (error) {                                      // catch: try'da hata çıkarsa burası çalışır
        return [];                                       
    }
}

// ilanAra: seçilen bilgilere göre ilanları bulup ekranda gösterir
function ilanAra() {
    // .value: kutudan seçilen ya da yazılan değeri alır
    const turDegeri = document.getElementById("search-type").value;                 // turDegeri: seçilen ilan türünü tutar
    const kanGrubuDegeri = document.getElementById("search-blood-group").value;     // kanGrubuDegeri: seçilen kan grubunu tutar
    const aciliyetDegeri = document.getElementById("search-urgency").value;         // aciliyetDegeri: seçilen aciliyeti tutar
    // trim(): baştaki sondaki boşlukları siler. toLocaleLowerCase: küçük harfe çevirir (büyük küçük harf fark etmesin diye)
    const sehirDegeri = document.getElementById("search-city").value.trim().toLocaleLowerCase("tr-TR");         // yazılan şehir
    const ilceDegeri = document.getElementById("search-district").value.trim().toLocaleLowerCase("tr-TR");      // yazılan ilçe

    const ilanlar = ilanlariGetir();                       // bütün ilanları alır
    sonucListesi.innerHTML = "";                           // innerHTML: elemanın içini değiştirir
    let ilanSayisi = 0;                                    // let: değişecek değer. ilanSayisi: bulunan ilan sayısını tutar

    for (let i = 0; i < ilanlar.length; i++) {             // for: listedeki her ilana sırayla bakan döngü. i < ilanlar.length: sayaç ilan sayısından küçük olduğu sürece devam eder
        let uyuyor = true;                                 // uyuyor: bu ilan aramaya uyuyor mu? Başta "evet" kabul ederiz

        if (turDegeri !== "" && ilanlar[i].tur !== turDegeri) {  // ilanlar[i]: o an kontrol edilen ilanı temsil eder
            uyuyor = false;                                // İlanın arama kriterlerine uymadığını belirtir
        }
        if (kanGrubuDegeri !== "" && ilanlar[i].kanGrubu !== kanGrubuDegeri) { // Kan grubu seçilmiş ve ilanınkinden farklıysa
            uyuyor = false;
        }
        if (aciliyetDegeri !== "" && ilanlar[i].aciliyet !== aciliyetDegeri) { // Aciliyet seçilmiş ve farklıysa
            uyuyor = false;
        }
        // includes: yazı, başka bir yazının içinde geçiyor mu diye arar
        if (ilanlar[i].sehir.toLocaleLowerCase("tr-TR").includes(sehirDegeri) === false) {   // şehir uymuyorsa
            uyuyor = false;
        }
        if (ilanlar[i].ilce.toLocaleLowerCase("tr-TR").includes(ilceDegeri) === false) {     // ilçe uymuyorsa
            uyuyor = false;
        }

        if (uyuyor === true) {                             // ilan bütün seçimlere uyuyorsa
            sonucListesi.innerHTML += "<li>" + ilanlar[i].tur + " | " + ilanlar[i].kanGrubu + " | " +   // sonucListesi: ilanların gösterileceği HTML elemanıdır. += : listeye yeni satır ekler
                ilanlar[i].sehir + " / " + ilanlar[i].ilce + " | " + ilanlar[i].aciliyet + " | Tel: " +
                ilanlar[i].telefon + " | " + ilanlar[i].aciklama + " <button type='button' onclick='yanitFormuAc(" + i + ")'>İlan Yanıtla</button></li>";
            ilanSayisi = ilanSayisi + 1;                   // bulunan ilan sayısını bir artırır
        }
    }

    if (ilanSayisi === 0) {                                // hiç ilan bulunamadıysa
        sonucMesaji.textContent = "Aradığınız ilan bulunamadı."; // textContent: elemanın yazısını değiştirir
    } else {                                               
        sonucMesaji.textContent = ilanSayisi + " ilan bulundu."; 
    }
}

ilanAra();                                                 // sayfa açılınca bütün ilanları gösterir

// ---------- ARA BUTONU ----------                       // aramaFormu: HTML'deki arama formudur
aramaFormu.addEventListener("submit", function (event) {   // addEventListener: butona basılınca çalışacak kodu belirler
    event.preventDefault();                                // preventDefault: sayfanın yenilenmesini durdurur
    ilanAra();                                         
    window.location.hash = "results";                      // hash: sayfayı id'si results olan yere kaydırır

});

// ---------- İLANA YANIT VERME ----------

const yanitFormu = document.getElementById("reply-form");             // yanıt formu
const yanitIlanBilgisi = document.getElementById("reply-ad-info");    // yanıtlanan ilanın özetinin yeri
const yanitAdi = document.getElementById("reply-name");               // yanıtlayanın adının yeri
const yanitTelefonu = document.getElementById("reply-phone");         // yanıtlayanın telefonunun yeri
const yanitVazgecButonu = document.getElementById("reply-cancel-button"); // "Vazgeç" butonu
const yanitMesaji = document.getElementById("reply-message");         // hata mesajının yeri

let secilenIlanSirasi = -1;                                // let: değişecek değer. Hangi ilana yanıt verildiğini tutar

// kullaniciGetir: e-postası verilen kullanıcının bilgilerini verir
function kullaniciGetir(eposta) {                          
    const kayitliYazi = localStorage.getItem("kullanicilar"); // hafızadaki kullanıcı yazısını okur
    if (kayitliYazi === null) {                            // kullanıcı var mı diye bakar
        return null;                                       // return: sonucu verir
    }
    const kullanicilar = JSON.parse(kayitliYazi);          // JSON.parse: yazıyı listeye çevirir
    for (let i = 0; i < kullanicilar.length; i++) {        // kullanıcı listesini sırayla kontrol eder
        if (kullanicilar[i].eposta === eposta) {           // e-posta aynı mı diye bakar
            return kullanicilar[i];                        // aynıysa o kullanıcıyı verir
        }
    }
    return null;                                          
}

// yanitlariGetir: kayıtlı yanıtların listesini verir
function yanitlariGetir() {
    try {                                                  // try: hata çıkabilecek işi dener
        const kayitliYazi = localStorage.getItem("yanitlar"); // localStorage.getItem(): tarayıcı hafızasından bilgi okur
        if (kayitliYazi === null) {                        // yanıt var mı kontrol eder
            return [];                                    
        }
        return JSON.parse(kayitliYazi);                    // yazıyı listeye çevirir
    } catch (error) {                                      // catch: try'da hata çıkarsa burası çalışır
        return [];                                       
    }
}

// yanitFormuAc: "İlan Yanıtla" düğmesine basılınca yanıt formunu açar
function yanitFormuAc(sira) {
    const ilanlar = ilanlariGetir();                       // bütün ilanları alır

    if (ilanlar[sira].sahibi === girisYapanKullanici) {    // ilanın sahibi giriş yapan kullanıcı mı diye bakar
        alert("Kendi ilanınıza yanıt veremezsiniz.");      // alert: uyarı penceresi açar
        return;                                         
    }

    const kullanici = kullaniciGetir(girisYapanKullanici); // giriş yapan kullanıcının bilgilerini alır
    if (kullanici === null) {                              // kullanıcı bulunuyor mu diye bakar
        alert("Kullanıcı bilgisi bulunamadı.");
        return;
    }

    secilenIlanSirasi = sira;                              // hangi ilan seçildiğini kaydeder
    yanitIlanBilgisi.textContent = "Yanıtlanan ilan: " + ilanlar[sira].tur + " | " + ilanlar[sira].kanGrubu + " | " + ilanlar[sira].sehir + " / " + ilanlar[sira].ilce; // textContent: elemanın yazısını değiştirir
    yanitAdi.textContent = kullanici.adSoyad;              // yanıtlayanın adını yazar
    yanitTelefonu.textContent = kullanici.telefon;         // yanıtlayanın telefonunu yazar
    yanitMesaji.textContent = "";                          // eski mesajı temizler
    yanitFormu.hidden = false;                             // hidden = false: formu görünür yapar
    window.location.hash = "reply-form";                   // hash: sayfayı id'si, reply-form olan yere kaydırır
}

yanitVazgecButonu.addEventListener("click", function () {  // addEventListener: "Vazgeç"e tıklanınca çalışacak kodu belirler
    yanitFormu.hidden = true;                              // hidden = true: formu gizler
    yanitFormu.reset();                                    // reset: formdaki yazıları temizler
});

yanitFormu.addEventListener("submit", function (event) {   // "Yanıtı Gönder"e basılınca çalışır
    event.preventDefault();                                // preventDefault: sayfanın yenilenmesini durdurur

    const ilanlar = ilanlariGetir();                       // bütün ilanları alır
    const kullanici = kullaniciGetir(girisYapanKullanici); // yanıtlayan kullanıcının bilgilerini alır
    const yanitlar = yanitlariGetir();                     // mevcut yanıt listesini alır
    const ilan = ilanlar[secilenIlanSirasi];               // yanıtlanan ilanı alır

    yanitlar.unshift({                                     // unshift: listenin başına ekler 
        ilanSahibi: ilan.sahibi,                           // yanıtı alacak kişinin e-postası
        ilanOzeti: ilan.tur + " | " + ilan.kanGrubu + " | " + ilan.sehir + " / " + ilan.ilce, // ilanın kısa özeti
        yanitlayan: kullanici.adSoyad,                     // yanıtlayanın adı
        telefon: kullanici.telefon,                        // yanıtlayanın telefonu
        mesaj: document.getElementById("reply-text").value.trim(), // yazılan açıklama
        tarih: new Date().toLocaleDateString("tr-TR")      // bugünün tarihi
    });

    try {                                                  // try: hata çıkabilecek işi dener
        localStorage.setItem("yanitlar", JSON.stringify(yanitlar)); // setItem: hafızaya yazar. JSON.stringify: listeyi yazıya çevirir
        alert("Yanıtınız ilan sahibine iletildi!");       
        yanitFormu.reset();                                // formu temizler
        yanitFormu.hidden = true;                          // formu gizler
    } catch (error) {                                      // catch: try'da hata çıkarsa burası çalışır
        yanitMesaji.textContent = "Yanıt kaydedilirken hata oluştu.";
    }
});
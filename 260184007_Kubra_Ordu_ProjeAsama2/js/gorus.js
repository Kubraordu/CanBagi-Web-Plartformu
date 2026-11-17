// GÖRÜŞ ALANI: paylaşım yapma ve yorum yazma

// ---------- GİRİŞ KONTROLÜ ----------
const girisYapanKullanici = localStorage.getItem("girisYapanKullanici"); // localStorage.getItem: hafızadan giriş yapan kullanıcıyı okur. girisYapanKullanici: kullanıcının e-posta adresini tutan değişkendir

if (girisYapanKullanici === null) {                        // if: kullanıcı giriş yapmadıysa koşulunu sağlar
    alert("Önce giriş yapmalısınız.");                     // alert: ekrana uyarı penceresi açar
    window.location.href = "giris-yap.html";               // window.location.href: başka sayfaya götürür
}

// ---------- ELEMANLARI BULMA ----------
const formAcButonu = document.getElementById("paylasim-ac-butonu"); // getElementById: id'si verilen elemanı bulur ("+ Paylaşım Yap" butonu)
const paylasimFormu = document.getElementById("paylasim-formu");       // paylaşım formu
const vazgecButonu = document.getElementById("vazgec-butonu");    // "Vazgeç" butonu
const formMesaji = document.getElementById("form-mesaji");       // hata mesajının yeri
const paylasimListesi = document.getElementById("paylasim-listesi");     // paylaşımların listesinin yeri

// ---------- FONKSİYONLAR ----------

// kullaniciAdiGetir: e-postası verilen kullanıcının adını verir
function kullaniciAdiGetir(eposta) {                       // function: tekrar kullanılabilen kod parçası
    const kayitliYazi = localStorage.getItem("kullanicilar"); // hafızadaki kullanıcı yazısını okur
    if (kayitliYazi === null) {                            // hafızada kullanıcı kaydı yoksa koşulunu sağlar
        return eposta;                                     // adı bulamadığı için e-postayı verir
    }
    const kullanicilar = JSON.parse(kayitliYazi);          // JSON.parse: metni JavaScript verisine dönüştürür
    for (let i = 0; i < kullanicilar.length; i++) {        // for: listedeki herkese sırayla bakar döngüdür
        if (kullanicilar[i].eposta === eposta) {           // kullanicilar[i]: O anda kontrol edilen kullanıcıdır
            return kullanicilar[i].adSoyad;                // kullanıcının adını verir
        }
    }
    return eposta;                                         // kullanıcı adı bulunamazsa e-postayı verir
}

// paylasimlariGetir: kayıtlı paylaşımların listesini verir
function paylasimlariGetir() {
    try {                                                  // try: hata çıkabilecek işi dener
        const kayitliYazi = localStorage.getItem("paylasimlar"); // hafızadaki paylaşım yazısını okur
        if (kayitliYazi === null) {                        // hafızada paylaşım var mı diye kontrol eder
            return [];                                    
        }
        return JSON.parse(kayitliYazi);                    // yazıyı js listesine çevirir
    } catch (error) {                                      // catch: try'da hata çıkarsa burası çalışır
        return [];                                        
    }
}

// paylasimlariKaydet: paylaşım listesini hafızaya kaydeder
function paylasimlariKaydet(paylasimlar) {
    try {                                                  // try: hata çıkabilecek işi dener
        localStorage.setItem("paylasimlar", JSON.stringify(paylasimlar)); // setItem: hafızaya yazar. JSON.stringify: listeyi yazıya çevirir
        return true;                                       
    } catch (error) {                                      // hata olursa
        return false;                                     
    }
}

// paylasimlariGoster: bütün paylaşımları ve yorumları ekranda gösterir
function paylasimlariGoster() {
    const paylasimlar = paylasimlariGetir();               // bütün paylaşımları alır
    paylasimListesi.innerHTML = "";                        // innerHTML: elemanın içini değiştirir

    for (let i = 0; i < paylasimlar.length; i++) {         // i < paylasimlar.length: bütün paylaşımları kontrol eder
        let yorumlarYazisi = "";                           // let: değişecek değer. Bu paylaşımın yorumları burada birikir

        for (let j = 0; j < paylasimlar[i].yorumlar.length; j++) { // j: yorumların sırasını takip eden sayaçtır, length: yorum sayısını verir
            yorumlarYazisi += "<li>" + paylasimlar[i].yorumlar[j].yazan + ": " + paylasimlar[i].yorumlar[j].metin + "</li>"; 
        }

        if (yorumlarYazisi === "") {                       // yorum var mı diye kontrol eder
            yorumlarYazisi = "<li>Henüz yorum yok.</li>";
        }

        paylasimListesi.innerHTML += "<div>" +             // her paylaşımı bir kutu içinde ekler
            "<p><b>" + paylasimlar[i].yazan + "</b> | " + paylasimlar[i].tarih + "</p>" + 
            "<p>" + paylasimlar[i].metin + "</p>" +        // paylaşımın metni
            "<p>Yorumlar:</p>" +
            "<ul>" + yorumlarYazisi + "</ul>" +            // <ul>: Sırasız liste oluşturur
            "<input type='text' id='yorum-kutusu-" + i + "' placeholder='Yorumunuzu yazın...'> " + // input: Kullanıcıdan bilgi almak için giriş alanı oluşturur
            "<button type='button' onclick='yorumEkle(" + i + ")'>Yorum Yap</button>" + // onclick: butona basılınca yorum ekle fonksiyonunu çalıştırır
            "<hr></div>";                                  // i: Hangi paylaşımın yorumlanacağını belirtir
    }

    if (paylasimlar.length === 0) {                        // paylaşım olup olmadığını kontrol eder
        paylasimListesi.innerHTML = "<p>Henüz paylaşım yok.</p>";
    }
}

// yorumEkle: verilen sıradaki paylaşıma yorum ekler
function yorumEkle(sira) {                                 // sira: kaçıncı paylaşıma yorum yazıldığı
    const yorumKutusu = document.getElementById("yorum-kutusu-" + sira); // o paylaşımın yorum kutusunu bulur
    const yorumMetni = yorumKutusu.value.trim();           // .value: kutuya yazılanı alır

    if (yorumMetni === "") {                               // yorum boş mu diye kontrol eder
        alert("Yorum boş olamaz.");
        return;                                          
    }

    const paylasimlar = paylasimlariGetir();               // paylaşım listesini alır
    paylasimlar[sira].yorumlar.push({                      // push: yorum listesinin sonuna yeni yorum ekler
        yazan: kullaniciAdiGetir(girisYapanKullanici),     // yorumu yazanın adını verir
        metin: yorumMetni                                  // metin: yorumun içeriğini tutar
    });

    if (paylasimlariKaydet(paylasimlar) === true) {        // kayıt başarılı mı diye bakar
        paylasimlariGoster();                              // listeyi yeniler
    } else {                                              
        alert("Yorum kaydedilirken hata oluştu.");
    }
}

paylasimlariGoster();                                      // sayfa açılınca paylaşımları gösterir

// ---------- BUTONLAR ----------

formAcButonu.addEventListener("click", function () {       // addEventListener: butona tıklanınca çalışacak kodu belirler
    paylasimFormu.hidden = false;                          // hidden: HTML elemanının gizli olup olmadığını belirler
});

vazgecButonu.addEventListener("click", function () {       // "Vazgeç"e tıklanınca
    paylasimFormu.hidden = true;                           //  hidden: HTML elemanının gizli olup olmadığını belirler
    paylasimFormu.reset();                                 // reset: formdaki yazıları temizler
});

// ---------- PAYLAŞ ----------
paylasimFormu.addEventListener("submit", function (event) { // "Paylaş"a basılınca çalışır
    event.preventDefault();                                // preventDefault: sayfanın yenilenmesini durdurur

    const metin = document.getElementById("paylasim-metni").value.trim(); // yazılan paylaşım metni
    const anonimMi = document.getElementById("anonim").checked;   // checked: kutu işaretli mi diye bakar

    let yazanAdi = kullaniciAdiGetir(girisYapanKullanici); // yazan kişinin adı
    if (anonimMi === true) {                               // Adımı gizle kutusunun işaretli olup olmadığını kontrol eder
        yazanAdi = "Anonim";                               // ad yerine Anonim yazılır
    }

    const paylasimlar = paylasimlariGetir();               // mevcut paylaşım listesini alır

    paylasimlar.unshift({                                  // unshift: listenin başına yeni eleman ekler
        yazan: yazanAdi,                                   
        metin: metin,                                    
        tarih: new Date().toLocaleDateString("tr-TR"),     // new Date(): bugünün tarihi. toLocaleDateString: Türkçe tarih yazısı yapar
        yorumlar: []                                       // yeni paylaşımın yorum listesini başlangıçta boş oluşturur
    });

    if (paylasimlariKaydet(paylasimlar) === true) {        // kayıt başarılı mı diye bakar
        paylasimFormu.reset();                             // formu temizler
        paylasimFormu.hidden = true;                       // formu gizler
        formMesaji.textContent = "";                       // textContent: elemanın yazısını değiştirir, mesajı temizler
        paylasimlariGoster();                              // listeyi yeniler
    } else {                                              
        formMesaji.textContent = "Paylaşım kaydedilirken hata oluştu."; // kullanıcıya hata mesajı gösterilir
    }
});
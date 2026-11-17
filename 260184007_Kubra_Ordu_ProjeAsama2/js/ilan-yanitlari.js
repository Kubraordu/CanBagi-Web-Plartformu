// İLAN YANITLARI: ilanlarıma gelen yanıtları gösterme

// ---------- GİRİŞ KONTROLÜ ----------
const girisYapanKullanici = localStorage.getItem("girisYapanKullanici"); // localStorage.getItem: hafızadan giriş yapan kullanıcıyı okur

if (girisYapanKullanici === null) {                        // kullanıcı giriş yapmtı mı kontrol eder
    alert("Önce giriş yapmalısınız.");                     // alert: ekrana uyarı penceresi açar
    window.location.href = "giris-yap.html";               // window.location.href: başka sayfaya götürür
}

// ---------- ELEMANLARI BULMA ----------
const yanitListesi = document.getElementById("yanit-listesi"); // getElementById: id'si verilen elemanı bulur

// ---------- FONKSİYONLAR ----------

// yanitlariGetir: kayıtlı yanıtların listesini verir
function yanitlariGetir() {                               
    try {                                                  // try: hata çıkabilecek işi dener
        const kayitliYazi = localStorage.getItem("yanitlar"); // hafızadaki yanıt yazısını okur
        if (kayitliYazi === null) {                        // yanıt var mı diye kontrol eder
            return [];                                    
        }
        return JSON.parse(kayitliYazi);                    // JSON.parse: yazıyı listeye çevirir
    } catch (error) {                                      // catch: try'da hata çıkarsa burası çalışır
        return [];                                     
    }
}

// yanitlariGoster: giriş yapan kullanıcının ilanlarına gelen yanıtları ekranda gösterir
function yanitlariGoster() {
    const yanitlar = yanitlariGetir();                     // bütün yanıtları alır
    yanitListesi.innerHTML = "";                           // innerHTML: elemanın içini değiştirir

    for (let i = 0; i < yanitlar.length; i++) {            // i< yanitlar.length: Sayaç yanıt sayısından küçük olduğu sürece döngü devam eder
        if (yanitlar[i].ilanSahibi === girisYapanKullanici) { // yanıt bu kullanıcının ilanına mı gelmiş
            yanitListesi.innerHTML += "<div>" +            // her yanıtı bir kutu içinde ekler
                "<p><b>İlanım:</b> " + yanitlar[i].ilanOzeti + "</p>" + // yanitlar[i].ilanOzeti: Yanıt verilen ilanın kısa özetidir
                "<p>" + yanitlar[i].yanitlayan + " | Tel: " + yanitlar[i].telefon + " | " + yanitlar[i].tarih + "</p>" + // yanıtlayanın adı, telefonu ve tarihi verir
                "<p>" + yanitlar[i].mesaj + "</p>" +       // yanıtın açıklaması
                "<hr></div>";                             
        }
    }

    if (yanitListesi.innerHTML === "") {                   // yanıt eklenmedi mi diye bakar
        yanitListesi.innerHTML = "<p>Henüz ilanlarınıza gelen yanıt yok.</p>";
    }
}

yanitlariGoster();             // sayfa açılınca yanıtları gösterir
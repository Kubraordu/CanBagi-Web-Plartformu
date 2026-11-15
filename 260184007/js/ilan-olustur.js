// İLAN OLUŞTURMA İŞLEMLERİ

// ---------- GİRİŞ KONTROLÜ ----------
const girisYapanKullanici = localStorage.getItem("girisYapanKullanici"); // localStorage.getItem: hafızadan giriş yapan kullanıcıyı okur. girisYapanKullanici: kullanıcının e-postasını tutar

if (girisYapanKullanici === null) {                        // if: kullanıcı giriş yapmadıysa koşuluna bakar
    alert("Önce giriş yapmalısınız.");                     // alert: ekrana uyarı penceresi açar
    window.location.href = "giris-yap.html";               // window.location.href: başka sayfaya götürür
}

// ---------- ELEMANLARI BULMA ----------
const ilanFormu = document.getElementById("ad-form");      // getElementById: id'si verilen elemanı bulur
const ilanMesaji = document.getElementById("ad-message");  // mesajın yazılacağı yeri bulur
const ilanListesi = document.getElementById("ad-list");    // ilan listesinin yerini bulur

// ---------- FONKSİYONLAR ----------

// ilanlariGetir: kayıtlı ilanların listesini verir
function ilanlariGetir() {                                
    const kayitliYazi = localStorage.getItem("ilanlar");   // hafızadaki ilan yazısını okur
    if (kayitliYazi === null) {                            // hiç ilan yoksa koşuluna bakar
        return [];                                         // return: sonucu verir. [] boş liste demek
    }
    return JSON.parse(kayitliYazi);                        // JSON.parse: metni js'ye verisisne çevirir
}

// ilanlarimiGoster: giriş yapan kullanıcının ilanlarını ekranda gösterir
function ilanlarimiGoster() {
    const ilanlar = ilanlariGetir();                       // kayıtlı ilanları getiren fonksiyonu çalıştırır
    ilanListesi.innerHTML = "";                            // innerHTML: elemanın içini değiştirir

    for (let i = 0; i < ilanlar.length; i++) {       // for: listedeki her ilana sırayla bakar. i<ilanlar.length: ilan sayısı bitene kadar döngüyü sürdürür
        if (ilanlar[i].sahibi === girisYapanKullanici) {   // ilanlar[i].sahibi: ilanın sahibini verir
            ilanListesi.innerHTML += "<li>" + ilanlar[i].tur + " | " + ilanlar[i].kanGrubu + " | " + // <li>: HTML'de liste elemanı oluşturur, ilanlar[i].tur: incelenen ilan türünü gösterir
                ilanlar[i].sehir + " / " + ilanlar[i].ilce + " | " + ilanlar[i].aciliyet + " | " +  
                ilanlar[i].donorSayisi + " donör | Tel: " + ilanlar[i].telefon + " | Son tarih: " +
                ilanlar[i].sonTarih + " | " + ilanlar[i].aciklama + "</li>";    // += : listeye yeni satır ekler
        }
    }

    if (ilanListesi.innerHTML === "") {                    // hinnerHTML: elemanın içeriğini verir
        ilanListesi.innerHTML = "<li>Henüz ilan oluşturmadınız.</li>";
    }
}

ilanlarimiGoster();                                        // sayfa açılınca ilanları gösterir

// ---------- İLAN YAYINLA ----------
ilanFormu.addEventListener("submit", function (event) {    // addEventListener: butona basılınca çalışacak kodu belirler
    event.preventDefault();                                // preventDefault: sayfanın yenilenmesini durdurur

    const ilanlar = ilanlariGetir();                       // mevcut ilan listesini alır

    ilanlar.push({                                         // push: listenin sonuna yeni ilan ekler
        sahibi: girisYapanKullanici,                       // ilanı veren kullanıcı
        tur: document.getElementById("ad-type").value,            // .value: kutuya yazılan değeri alır 
        kanGrubu: document.getElementById("blood-group").value,   // kan grubu
        sehir: document.getElementById("city").value,             // şehir
        ilce: document.getElementById("district").value,          // ilçe
        aciliyet: document.getElementById("urgency").value,       // aciliyet
        donorSayisi: document.getElementById("people-count").value, // donör sayısı
        telefon: document.getElementById("ad-phone").value,       // telefon
        sonTarih: document.getElementById("deadline").value,      // son tarih
        aciklama: document.getElementById("description").value    // açıklama
    });

    try {                                                  // try: hata çıkabilecek işi dener
        localStorage.setItem("ilanlar", JSON.stringify(ilanlar)); // setItem: hafızaya yazar. JSON.stringify: listeyi metne çevirir
        ilanMesaji.textContent = "İlanınız yayınlandı!";   // textContent: elemanın yazısını değiştirir
        ilanFormu.reset();                                 // reset: formu temizler
        ilanlarimiGoster();                              
    } catch (error) {                                      // catch: try'da hata çıkarsa burası çalışır
        ilanMesaji.textContent = "İlan kaydedilirken hata oluştu.";
    }
});
// Ana sayfadaki işlemler: fotoğraf kaydırıcı ve giriş kontrolü

// ---------- 1. Fotoğraf kaydırıcı ----------

// Hasta fotoğraflarının listesi
const hikayeFotograflari = [            // const: Değeri değişmeyen değişken oluşturur
    "assets/images/hasta1.jpg",
    "assets/images/hasta2.jpg",
    "assets/images/hasta3.jpg"
];

// Şu an gösterilen fotoğrafın sırası (0 = ilk fotoğraf)
let suankiSira = 0;         // let: Değeri sonradan değiştirilebilen değişken oluşturur
                            
// HTML'deki elemanları id'leriyle bulur
const hikayeFotografi = document.getElementById("hikaye-fotografi");   // document: HTML sayfasını temsil eder, getElementById: id'si verilen elemanı bulur
const oncekiButonu = document.getElementById("onceki-butonu");  // HTML'deki Önceki butonunu bulur ve oncekiButonu değişkenine aktarır
const sonrakiButonu = document.getElementById("sonraki-butonu");     // HTML'deki Sonraki butonunu bulur ve sonrakiButonu değişkenine aktarır

// Verilen sıradaki fotoğrafı gösterir
function hikayeGoster(sira) {                           // Bu fonksiyon, istenilen sıradaki fotoğrafı ekranda gösterir
    if (sira < 0) {                                     // sira < 0: Fotoğraf sırası sıfırdan küçük mü diye kontrol eder
        sira = hikayeFotograflari.length - 1;           // İlk fotoğraftan geriye gidilirse son fotoğrafa geçilir
    } else if (sira >= hikayeFotograflari.length) {     // Fotoğraf sırasının dizideki fotoğraf sayısına ulaşıp ulaşmadığını kontrol eder
        sira = 0;                                       // Son fotoğraftan sonra tekrar ilk fotoğrafa dönülmesini sağlar
    }

    suankiSira = sira;                                  // yeni sırayı kaydeder
    hikayeFotografi.src = hikayeFotograflari[suankiSira]; // src: resmin dosya yolunu değiştirir, yani fotoğrafı değiştirir
    hikayeFotografi.alt = "Hasta hikayesi " + (suankiSira + 1); // alt: resmin açıklamasını değiştirir
}                                                       // suankiSira + 1: Fotoğraf numarasını 1'den başlatır. Çünkü dizi sıfırdan başlar

// "Önceki" butonuna basılınca bir geri gider
oncekiButonu.addEventListener("click", function () {    // addEventListener(): Bir HTML elemanını tıklanınca çalıştırır
    hikayeGoster(suankiSira - 1);                       // Fotoğraf sırasını bir azaltır, önceki fotoğrafı gösterir
});

// "Sonraki" butonuna basılınca bir ileri gider
sonrakiButonu.addEventListener("click", function () {   // Sonraki butonuna tıklanınca çalışır
    hikayeGoster(suankiSira + 1);                       // Fotoğraf sırasını bir arttırır, sonraki fotoğrafı gösterir
});

// ---------- 2. Giriş kontrolü ----------

// Giriş yapılmış mı? Evet ise true, hayır ise false verir
function girisYapildiMi() {                             // girisYapildiMi: Fonksiyonun adıdır. Kullanıcının giriş yapıp yapmadığını kontrol eder
    return localStorage.getItem("girisYapanKullanici") !== null; // localStorage: Tarayıcıda veri saklamayı sağlar
}                                                       // getItem("girisYapanKullanici"): Tarayıcıda girisYapanKullanici adlı veriyi arar

// Menüdeki bütün bağlantıları bulur
const menuBaglantilari = document.querySelectorAll("nav a"); // querySelectorAll(): Belirtilen seçiciye uyan bütün elemanları bulur

// Her bağlantıya tıklanınca giriş kontrolü yapar          let i = 0: i isimli sayacı sıfırdan başlatır
for (let i = 0; i < menuBaglantilari.length; i++) {     // for: menüdeki her bağlantıya sırayla bakar
    menuBaglantilari[i].addEventListener("click", function (event) { // menuBaglantilari[i]: sıradaki menü bağlantısını seçer. addEventListener: Tıklanınca çalışacak kodu ekler
        if (menuBaglantilari[i].getAttribute("href") === "#hakkimizda") { // getAttribute("href"): bağlantının adresini okur
            return;                                             // i < menuBaglantilari.length: menü bağlantılarının sayısı bitene kadar döngüyü devam ettirir
        }

        if (!girisYapildiMi()) {                        // ! : tersi demek. giriş yapılmadıysa
            event.preventDefault();                     // bağlantıya gitmeyi engeller
            alert("Devam etmek için önce giriş yapmalısınız."); // alert(): ekrana uyarı penceresi çıkarır
            window.location.href = "giris-yap.html";    // window.location.href: tarayıcıyı belirtilen sayfaya yönlendirir
        }
    });
}

// Giriş yapılmışsa üstteki bağlantıyı "Çıkış Yap" yapar
const girisBaglantisi = document.getElementById("giris-baglantisi"); // HTML'de giris-baglantisi ID'sine sahip bağlantıyı bulur

if (girisYapildiMi()) {                                 // Kullanıcının giriş yapıp yapmadığını kontrol eder
    girisBaglantisi.textContent = "Çıkış Yap";          // .textContent: bağlantının üzerinde yazan metni çıkış yap olarak değiştirir
    girisBaglantisi.addEventListener("click", function (event) { // Çıkış bağlantısına tıklanınca çalıştırır
        event.preventDefault();                         // event.preventDefault(): bağlantının normal davranışını durdurur
        localStorage.removeItem("girisYapanKullanici"); // removeItem: giriş bilgisini hafızadan siler
        window.location.reload();                       // reload(): sayfayı yeniler
    });
}
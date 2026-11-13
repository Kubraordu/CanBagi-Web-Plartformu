# 🩸 CanBağı
Sağlık ihtiyaçlarında ihtiyaç sahipleri ile uygun donörleri buluşturan web platformu projesi 📍 CanBağı

Kan, kök hücre, kemik iliği ve organ nakli gibi ihtiyaçlar için donör arayan ve ilan oluşturan kullanıcıları, aynı platformda bir araya getiren web sitesi uygulamasıdır.

## 📌 Proje Amacı
CanBağı; ihtiyaç sahiplerinin uygun donörlere, donörlerin de ihtiyaç duyulan ilanlara kolayca ulaşmasını sağlar. Kullanıcılar ilan oluşturabilir, ilanlarının güncelliğini yönetebilir ve hastalık ile tedavi süreçleri hakkında soru sorup deneyimlerini paylaşabilir. Böylece donör bulma, ihtiyaçları duyurma ve sağlık deneyimlerini paylaşma süreçlerinin tek bir platformda toplanması hedeflenmektedir.

## 🚀 Anahtar Özellikler

* **Ana Sayfa:** Kutu şeklinde menü ve "Hastalarımızdan Gelenler" bölümünde Önceki/Sonraki butonlarıyla gezilen fotoğraf kaydırıcı
* **Kayıt ve Giriş Sistemi:**
   * Ad soyad, e-posta, telefon, cinsiyet ve şifre ile kayıt (şifre iki kez girilir)
   * Girişte 5 hak: yanlış şifrede hak düşer, hak bitince giriş engellenir
   * Giriş yapmayan kullanıcı menüdeki sayfalara geçemez, giriş sayfasına yönlendirilir
* **Form Doğrulama:** `required`, `pattern`, `minlength` ve JavaScript ile şifre ve e-posta kontrolleri
* **İlan Sistemi (Planlanan):**
   * İlan oluşturma, güncelleme ve yanıtlama
   * Kan grubu, şehir ve ilçeye göre ilan arama
* **Soru-Cevap Alanı (Planlanan):** Önceden benzer süreçleri yaşamış kişilerle görüş alışverişi

## 🛠️ Kullanılan Teknolojiler

* HTML5 (semantik etiketler, formlar)
* JavaScript ES6 (`let` / `const`, fonksiyonlar, döngüler, `if / else`, `try-catch`)
* localStorage (kullanıcı ve giriş bilgileri)
* CSS3 (sonraki aşamada eklenecek)
* Git & GitHub

## 📁 Klasör Yapısı

```
canbagi/
├── index.html          # Ana sayfa
├── giris-yap.html      # Kayıt ol ve giriş yap sayfası
├── css/
│   └── style.css       # Stil dosyası
├── js/
│   ├── main.js         # Ana sayfa işlemleri
│   └── auth.js         # Kayıt ve giriş işlemleri
└── assets/
    └── images/         # Logo ve fotoğraflar
```

## ▶️ Nasıl Çalıştırılır?

1. Projeyi indirin.
2. `index.html` dosyasını tarayıcıda açın.
3. Menüdeki bir kutuya tıklayınca önce kayıt olup giriş yapmanız istenir.

> ⚠️ Kullanıcı bilgileri şimdilik tarayıcının `localStorage` alanında tutulmaktadır. Bu, ders projesi içindir. Gerçek bir sitede bilgiler sunucuda güvenli biçimde saklanır.

## 👩‍💻 Geliştirici / Öğrenci Bilgileri

* **Ad Soyad:** Kübra ORDU
* **Öğrenci Numarası:** [numaranı yaz]
* **Üniversite / Bölüm:** [üniversiteni yaz] / Ön yüz yazılım geliştirme
* **Ders:** OYG103 - JavaScript Uygulamaları
* **Akademik Yıl:** 2026-2027 Güz Dönemi
* **GitHub Profili:** [https://github.com/KULLANICI-ADIN](https://github.com/KULLANICI-ADIN)

## 📄 Telif Hakkı
© 2026 CanBağı. Tüm hakları saklıdır.

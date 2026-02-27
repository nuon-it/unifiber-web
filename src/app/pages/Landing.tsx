import { useState } from "react";
import { useNavigate } from "react-router";
import { Wifi, Zap, Shield, Headphones, TrendingUp, MapPin, Check, ChevronDown, ChevronUp, Star, X, Smartphone, Bell, CreditCard, Package } from "lucide-react";
import { IndonesiaMap } from "../components/IndonesiaMap";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Landing() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showCoverageModal, setShowCoverageModal] = useState(false);

  const features = [
    {
      icon: Zap,
      title: "Kecepatan Fiber Optik",
      description: "Internet super cepat hingga 1 Gbps dengan teknologi FTTH (Fiber to the Home)",
    },
    {
      icon: Shield,
      title: "Koneksi Stabil 24/7",
      description: "Uptime 99.9% dengan infrastruktur redundant dan monitoring real-time",
    },
    {
      icon: Headphones,
      title: "Support 24/7",
      description: "Tim support siap membantu Anda kapan saja melalui chat, telepon, atau WhatsApp",
    },
    {
      icon: TrendingUp,
      title: "No Bandwidth Limit",
      description: "Unlimited quota tanpa FUP, streaming dan download sepuasnya",
    },
  ];

  const packages = [
    {
      name: "Lite",
      speed: "50 Mbps",
      price: "249.000",
      features: ["Unlimited Quota", "Support 24/7", "Free Instalasi", "Gratis Nuon Basic 3 Bulan"],
      popular: false,
    },
    {
      name: "Prime",
      speed: "100 Mbps",
      price: "399.000",
      features: ["Unlimited Quota", "Support 24/7", "Free Instalasi", "Gratis Nuon Premium 6 Bulan", "Free WiFi 6 Router"],
      popular: true,
    },
    {
      name: "Ultra",
      speed: "300 Mbps",
      price: "599.000",
      features: ["Unlimited Quota", "Support 24/7", "Free Instalasi", "Gratis Nuon Premium 12 Bulan", "Free WiFi 6 Router", "Priority Support"],
      popular: false,
    },
    {
      name: "Giga",
      speed: "1 Gbps",
      price: "999.000",
      features: ["Unlimited Quota", "Support 24/7", "Free Instalasi", "Gratis Nuon Premium Lifetime", "Free WiFi 6E Router", "Dedicated Support", "Static IP"],
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: "Budi Santoso",
      location: "Jakarta Selatan",
      rating: 5,
      text: "Internet super cepat! Paket 100 Mbps benar-benar konsisten. Download game 50GB cuma 15 menit. Worth it banget!",
    },
    {
      name: "Sarah Williams",
      location: "Tangerang",
      rating: 5,
      text: "Dari ISP lain pindah ke Unifiber, beda banget! Zoom meeting lancar, Netflix 4K ga buffering. Customer service juga ramah.",
    },
    {
      name: "Ahmad Rizki",
      location: "Bekasi",
      rating: 5,
      text: "Sudah 1 tahun pakai Unifiber, jarang banget trouble. Kalau ada masalah pun langsung ditangani. Recommended!",
    },
  ];

  const coverageAreas = [
    { city: "Jakarta", areas: ["Jakarta Pusat", "Jakarta Selatan", "Jakarta Barat", "Jakarta Timur", "Jakarta Utara"] },
    { city: "Tangerang", areas: ["Tangerang Selatan", "Tangerang Kota", "BSD City", "Alam Sutera", "Gading Serpong"] },
    { city: "Bekasi", areas: ["Bekasi Barat", "Bekasi Selatan", "Bekasi Timur", "Summarecon Bekasi", "Grand Galaxy"] },
    { city: "Depok", areas: ["Depok Baru", "Margonda", "Sawangan", "Cinere", "UI Campus"] },
    { city: "Bogor", areas: ["Bogor Kota", "Cibinong", "Sentul City", "Bogor Barat", "Bogor Timur"] },
  ];

  const faqs = [
    {
      question: "Berapa lama proses instalasi Unifiber?",
      answer: "Proses instalasi biasanya memakan waktu 3-7 hari kerja setelah survei lokasi. Untuk area yang sudah ter-cover fiber, bisa lebih cepat 1-3 hari kerja.",
    },
    {
      question: "Apakah ada biaya instalasi?",
      answer: "Tidak ada! Semua paket Unifiber sudah termasuk gratis instalasi. Anda hanya perlu membayar biaya langganan bulanan.",
    },
    {
      question: "Apakah ada FUP (Fair Usage Policy)?",
      answer: "Tidak ada FUP di semua paket Unifiber. Anda bisa browsing, streaming, dan download sepuasnya tanpa batasan kuota.",
    },
    {
      question: "Bagaimana cara cek coverage area?",
      answer: "Anda bisa cek coverage area dengan memasukkan alamat lengkap Anda di form berlangganan. Sistem kami akan otomatis mengecek ketersediaan jaringan di lokasi Anda.",
    },
    {
      question: "Apa yang dimaksud dengan Nuon?",
      answer: "Nuon adalah platform entertainment terintegrasi dari Unifiber yang menyediakan streaming video, musik, game, dan konten hiburan lainnya. Gratis untuk pelanggan Unifiber!",
    },
    {
      question: "Apakah bisa request jadwal instalasi?",
      answer: "Tentu! Anda bisa memilih jadwal instalasi yang sesuai dengan ketersediaan Anda. Tim instalasi kami akan menyesuaikan dengan waktu yang Anda pilih.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation - Minimal */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00b8ff] to-[#0066cc] rounded-full flex items-center justify-center">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#0d2847]">
                Uni<span className="text-[#00b8ff]">fiber</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-[#00b8ff] transition-colors">Keunggulan</a>
              <a href="#packages" className="text-gray-600 hover:text-[#00b8ff] transition-colors">Paket</a>
              <a href="#coverage" className="text-gray-600 hover:text-[#00b8ff] transition-colors">Coverage</a>
              <a href="#faq" className="text-gray-600 hover:text-[#00b8ff] transition-colors">FAQ</a>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="px-4 md:px-6 py-2 bg-[#00b8ff] text-white rounded-lg hover:bg-[#0099dd] transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d2847] via-[#1a3a5c] to-[#0d2847]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00b8ff]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00b8ff]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-center md:text-left">
              <div className="inline-block px-4 py-2 bg-[#00b8ff]/20 rounded-full mb-6">
                <span className="text-[#00b8ff] font-medium">Indonesia's Fastest Fiber Internet</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Internet Super Cepat untuk <span className="text-[#00b8ff]">Semua Kebutuhan</span>
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Nikmati koneksi fiber optik hingga 1 Gbps dengan unlimited quota, gratis instalasi, dan bonus Nuon Entertainment. Mulai dari Rp 249.000/bulan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 bg-[#00b8ff] text-white rounded-lg hover:bg-[#0099dd] transition-all hover:scale-105 shadow-lg shadow-[#00b8ff]/30"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" />
                    Berlangganan Sekarang
                  </span>
                </button>
                <button
                  onClick={() => setShowCoverageModal(true)}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cek Coverage Area
                </button>
              </div>
              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap items-center gap-6 justify-center md:justify-start text-white/60">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00b8ff]" />
                  <span>No FUP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00b8ff]" />
                  <span>Gratis Instalasi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#00b8ff]" />
                  <span>Support 24/7</span>
                </div>
              </div>
            </div>

            {/* Right content - Stats */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">1 Gbps</div>
                <div className="text-white/60">Max Speed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">99.9%</div>
                <div className="text-white/60">Uptime</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">50K+</div>
                <div className="text-white/60">Pelanggan</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">24/7</div>
                <div className="text-white/60">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0d2847] mb-4">
              Kenapa Pilih Unifiber?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kami memberikan yang terbaik untuk koneksi internet Anda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#00b8ff] to-[#0066cc] rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0d2847] mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0d2847] mb-4">
              Pilih Paket Sesuai Kebutuhan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Semua paket sudah termasuk gratis instalasi dan unlimited quota
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-6 md:p-8 ${
                  pkg.popular
                    ? "bg-gradient-to-br from-[#0d2847] to-[#1a3a5c] text-white shadow-xl scale-105"
                    : "bg-white border-2 border-gray-200 hover:border-[#00b8ff] transition-all"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#00b8ff] text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${pkg.popular ? "text-white" : "text-[#0d2847]"}`}>
                    {pkg.name}
                  </h3>
                  <div className={`text-4xl font-bold mb-1 ${pkg.popular ? "text-[#00b8ff]" : "text-[#0d2847]"}`}>
                    {pkg.speed}
                  </div>
                  <div className={`${pkg.popular ? "text-white/80" : "text-gray-600"}`}>
                    <span className="text-2xl font-bold">Rp {pkg.price}</span>
                    <span className="text-sm">/bulan</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className={`w-5 h-5 flex-shrink-0 ${pkg.popular ? "text-[#00b8ff]" : "text-green-500"}`} />
                      <span className={`text-sm ${pkg.popular ? "text-white/90" : "text-gray-600"}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/login")}
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    pkg.popular
                      ? "bg-[#00b8ff] text-white hover:bg-[#0099dd]"
                      : "bg-[#0d2847] text-white hover:bg-[#1a3a5c]"
                  }`}
                >
                  Pilih Paket
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section id="coverage" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0d2847] mb-4">
              Coverage Area
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Jaringan fiber optik kami telah menjangkau berbagai wilayah
            </p>
          </div>

          {/* Indonesia Map with Coverage Points */}
          <div className="mb-12 bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="relative max-w-4xl mx-auto">
              {/* Interactive Indonesia Map */}
              <IndonesiaMap />

              {/* Stats below map */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#00b8ff]">10</div>
                  <div className="text-sm text-gray-600">Provinsi Aktif</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#00b8ff]">25+</div>
                  <div className="text-sm text-gray-600">Kota & Kabupaten</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#00b8ff]">500km</div>
                  <div className="text-sm text-gray-600">Fiber Network</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#00b8ff]">Expanding</div>
                  <div className="text-sm text-gray-600">Coverage Daily</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverageAreas.map((coverage, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#00b8ff]/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#00b8ff]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0d2847]">{coverage.city}</h3>
                </div>
                <ul className="space-y-2">
                  {coverage.areas.map((area, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-[#00b8ff] rounded-full" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setShowCoverageModal(true)}
              className="px-8 py-4 bg-[#00b8ff] text-white rounded-lg hover:bg-[#0099dd] transition-colors"
            >
              Cek Alamat Saya
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0d2847] mb-4">
              Apa Kata Pelanggan Kami?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ribuan pelanggan puas dengan layanan Unifiber
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-[#0d2847]">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0d2847] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Pertanyaan yang sering ditanyakan
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-[#0d2847] pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-[#00b8ff] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0d2847] via-[#1a3a5c] to-[#0d2847] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00b8ff]/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Siap Upgrade ke Internet Super Cepat?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Daftar sekarang dan nikmati promo gratis instalasi + bonus Nuon Entertainment
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 bg-[#00b8ff] text-white rounded-lg hover:bg-[#0099dd] transition-all hover:scale-105 shadow-lg shadow-[#00b8ff]/30 inline-flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Berlangganan Sekarang
          </button>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - App Preview */}
            <div className="relative order-2 md:order-1">
              <div className="relative max-w-md mx-auto">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00b8ff]/20 to-[#0d2847]/20 rounded-3xl blur-3xl" />
                
                {/* Phone mockup */}
                <div className="relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1629697776809-f37ceac39e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwaGFuZCUyMG1vYmlsZSUyMGFwcCUyMG1vY2t1cHxlbnwxfHx8fDE3NzIxNTUzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Unifiber Mobile App"
                    className="w-full h-auto rounded-3xl shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00b8ff]/10 rounded-full mb-6">
                <Smartphone className="w-4 h-4 text-[#00b8ff]" />
                <span className="text-[#00b8ff] font-medium">Download Mobile App</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-[#0d2847] mb-4">
                Kelola Internet Lebih Mudah dengan Unifiber App
              </h2>
              
              <p className="text-xl text-gray-600 mb-8">
                Download aplikasi Unifiber untuk kemudahan monitoring, pembayaran, dan akses support 24/7 di genggaman Anda.
              </p>

              {/* App Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#00b8ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-[#00b8ff]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0d2847] mb-1">Real-time Monitoring</h4>
                    <p className="text-gray-600 text-sm">Pantau kecepatan dan penggunaan internet secara real-time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#00b8ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-[#00b8ff]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0d2847] mb-1">Pembayaran Praktis</h4>
                    <p className="text-gray-600 text-sm">Bayar tagihan dan top-up langsung dari aplikasi</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#00b8ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bell className="w-5 h-5 text-[#00b8ff]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0d2847] mb-1">Notifikasi Instant</h4>
                    <p className="text-gray-600 text-sm">Dapatkan update promo, tagihan, dan gangguan jaringan</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#00b8ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-[#00b8ff]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0d2847] mb-1">Nuon Entertainment</h4>
                    <p className="text-gray-600 text-sm">Akses konten hiburan, game, dan voucher eksklusif</p>
                  </div>
                </div>
              </div>

              {/* Download Badges */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">Download sekarang:</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Google Play Badge */}
                  <a
                    href="#"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-md group"
                  >
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs opacity-80">GET IT ON</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </a>

                  {/* App Store Badge */}
                  <a
                    href="#"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-md group"
                  >
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs opacity-80">Download on the</div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d2847] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#00b8ff] to-[#0066cc] rounded-full flex items-center justify-center">
                  <Wifi className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">
                  Uni<span className="text-[#00b8ff]">fiber</span>
                </span>
              </div>
              <p className="text-white/60 text-sm">
                Fiber Internet Super Cepat untuk Indonesia
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Produk</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#packages" className="hover:text-[#00b8ff] transition-colors">Paket Internet</a></li>
                <li><a href="#" className="hover:text-[#00b8ff] transition-colors">Nuon Entertainment</a></li>
                <li><a href="#" className="hover:text-[#00b8ff] transition-colors">Business</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#" className="hover:text-[#00b8ff] transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-[#00b8ff] transition-colors">Karir</a></li>
                <li><a href="#" className="hover:text-[#00b8ff] transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Bantuan</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li><a href="#faq" className="hover:text-[#00b8ff] transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-[#00b8ff] transition-colors">Support Center</a></li>
                <li><a href="#coverage" className="hover:text-[#00b8ff] transition-colors">Coverage Area</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm">
            <p>&copy; 2024 Unifiber. All rights reserved. Powered by Nuon Entertainment.</p>
          </div>
        </div>
      </footer>

      {/* Coverage Check Modal */}
      {showCoverageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 relative">
            <button
              onClick={() => setShowCoverageModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <h3 className="text-2xl font-bold text-[#0d2847] mb-4">Cek Coverage Area</h3>
            <p className="text-gray-600 mb-6">
              Untuk mengecek ketersediaan jaringan di lokasi Anda, silakan lanjutkan proses berlangganan.
            </p>
            <button
              onClick={() => {
                setShowCoverageModal(false);
                navigate("/login");
              }}
              className="w-full py-3 bg-[#00b8ff] text-white rounded-lg hover:bg-[#0099dd] transition-colors"
            >
              Lanjutkan Berlangganan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
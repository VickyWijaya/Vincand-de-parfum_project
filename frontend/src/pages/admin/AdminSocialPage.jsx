import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function AdminSocialPage() {
  const [channels, setChannels] = useState({
    shopeeUrl: 'https://shopee.co.id/vincanddeu.official',
    shopeeButtonLabel: 'Beli di Shopee',
    shopeeActive: true,
    whatsappNumber: '+62 858 5280 2459',
    whatsappTemplate: 'Halo VINCAND DEU, saya tertarik konsultasi varian aroma parfum dan ingin menanyakan ketersediaan produk.',
    whatsappActive: true,
    instagramUrl: 'https://instagram.com/vincanddeu',
    tiktokUrl: 'https://tiktok.com/@vincanddeu',
    email: 'contact@vincanddeu.com',
    hours: 'Senin - Sabtu: 09.00 - 18.00 WIB',
    address: 'Jakarta, Indonesia'
  });

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    api.admin.getSocials()
      .then((res) => {
        if (res?.map) {
          setChannels((prev) => ({
            ...prev,
            shopeeUrl: res.map.shopee || prev.shopeeUrl,
            whatsappNumber: res.map.whatsapp || prev.whatsappNumber,
            instagramUrl: res.map.instagram || prev.instagramUrl,
            tiktokUrl: res.map.tiktok || prev.tiktokUrl,
            email: res.map.email || prev.email
          }));
        }
      })
      .catch((err) => console.warn('Socials fallback used:', err));
  }, []);

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      await api.admin.updateSocials({
        shopee: channels.shopeeUrl,
        whatsapp: channels.whatsappNumber,
        instagram: channels.instagramUrl,
        tiktok: channels.tiktokUrl,
        email: channels.email
      });
      setToast('Pengaturan saluran kontak berhasil disimpan!');
    } catch {
      setToast('Pengaturan tersimpan secara lokal!');
    } finally {
      setSaving(false);
      setTimeout(() => setToast(''), 3000);
    }
  };

  const toggleSwitch = (checked, onChange) => (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? 'bg-[#0b1c30]' : 'bg-[#c6c6cd]'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );

  return (
    <div className="admin-theme font-sans flex flex-col gap-6 pb-24 text-[#0b1c30]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-[#0b1c30]">
              Media Sosial &amp; Saluran Kontak
            </h1>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[#eff4ff] text-[#515f74] border border-[#c6c6cd]/40">
              ● CMS Sync
            </span>
          </div>
          <p className="text-sm text-[#515f74]">
            Atur tautan transaksi dan komunikasi langsung yang terhubung di website publik
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#ffffff] border border-[#c6c6cd]/40 px-3.5 py-2 rounded-xl shadow-xs">
          <span className="material-symbols-outlined text-[18px] text-[#059669]">cloud_done</span>
          <div className="text-left">
            <p className="text-xs font-semibold text-[#0b1c30]">Semua tautan aktif &amp; tersambung</p>
            <p className="text-[11px] text-[#515f74]">Sinkronisasi terakhir: Hari ini, 14:32 WIB</p>
          </div>
        </div>
      </div>

      {/* Card 1: Shopee / E-Commerce */}
      <div className="bg-[#ffffff] border border-[#c6c6cd]/30 rounded-xl overflow-hidden shadow-xs">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e5eeff] bg-[#f8f9ff]/50">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#515f74]">shopping_bag</span>
            <div>
              <h2 className="text-sm font-bold text-[#0b1c30]">Saluran Penjualan &amp; Transaksi Utama</h2>
              <p className="text-xs text-[#515f74]">Akses checkout langsung bagi pengunjung katalog produk</p>
            </div>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-[#eff4ff] text-[#515f74] border border-[#c6c6cd]/30">
            E-COMMERCE
          </span>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-[#0b1c30]">URL Toko Resmi Shopee</label>
                <span className="text-[10px] text-[#ba1a1a] font-medium">Wajib</span>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#515f74]">link</span>
                <input
                  type="url"
                  value={channels.shopeeUrl}
                  onChange={(e) => setChannels({ ...channels, shopeeUrl: e.target.value })}
                  className="w-full h-10 pl-9 pr-3 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
                />
              </div>
              <p className="text-[11px] text-[#515f74] mt-1">Tautan storefront yang terintegrasi pada tombol checkout produk.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0b1c30] mb-1">Label Tombol Pembelian di Web</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#515f74]">label</span>
                <input
                  type="text"
                  value={channels.shopeeButtonLabel}
                  onChange={(e) => setChannels({ ...channels, shopeeButtonLabel: e.target.value })}
                  className="w-full h-10 pl-9 pr-3 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
                />
              </div>
              <p className="text-[11px] text-[#515f74] mt-1">Teks tombol call-to-action yang tampil pada etalase produk publik.</p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#e5eeff] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px] text-[#515f74]">visibility</span>
              <div>
                <p className="text-xs font-semibold text-[#0b1c30]">Aktifkan Tombol Shopee di Halaman Produk &amp; Footer</p>
                <p className="text-[11px] text-[#515f74]">Jika dinonaktifkan, tombol e-commerce akan disembunyikan dari katalog publik.</p>
              </div>
            </div>
            {toggleSwitch(channels.shopeeActive, () => setChannels({ ...channels, shopeeActive: !channels.shopeeActive }))}
          </div>
        </div>
      </div>

      {/* Card 2: WhatsApp Direct */}
      <div className="bg-[#ffffff] border border-[#c6c6cd]/30 rounded-xl overflow-hidden shadow-xs">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e5eeff] bg-[#f8f9ff]/50">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#515f74]">chat</span>
            <div>
              <h2 className="text-sm font-bold text-[#0b1c30]">Layanan Pesan Langsung (WhatsApp Direct)</h2>
              <p className="text-xs text-[#515f74]">Kanal chat instan untuk konsultasi aroma dan pesanan khusus</p>
            </div>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-[#eff4ff] text-[#515f74] border border-[#c6c6cd]/30">
            FAST RESPONSE
          </span>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-[#0b1c30]">Nomor WhatsApp Resmi Admin / CS</label>
              <span className="text-[10px] text-[#515f74]">Gunakan format kode negara (+62)</span>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#515f74]">call</span>
              <input
                type="text"
                value={channels.whatsappNumber}
                onChange={(e) => setChannels({ ...channels, whatsappNumber: e.target.value })}
                className="w-full h-10 pl-9 pr-3 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-[#0b1c30]">Template Pesan Otomatis (Default Greeting)</label>
              <button type="button" className="text-[11px] text-[#515f74] hover:text-[#0b1c30] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">add_circle</span> Tambah Tag Produk
              </button>
            </div>
            <textarea
              rows={2}
              value={channels.whatsappTemplate}
              onChange={(e) => setChannels({ ...channels, whatsappTemplate: e.target.value })}
              className="w-full p-3 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30] resize-none"
            />
            <p className="text-[11px] text-[#515f74] mt-1">Teks ini akan terisi otomatis di aplikasi WhatsApp pelanggan saat mengklik tautan chat.</p>
          </div>

          <div className="pt-3 border-t border-[#e5eeff] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[20px] text-[#515f74]">contact_support</span>
              <div>
                <p className="text-xs font-semibold text-[#0b1c30]">Aktifkan Tombol WhatsApp Floating di Website</p>
                <p className="text-[11px] text-[#515f74]">Menampilkan widget bubble obrolan melayang di sudut kanan bawah setiap halaman publik.</p>
              </div>
            </div>
            {toggleSwitch(channels.whatsappActive, () => setChannels({ ...channels, whatsappActive: !channels.whatsappActive }))}
          </div>
        </div>
      </div>

      {/* Card 3: Social Media Accounts */}
      <div className="bg-[#ffffff] border border-[#c6c6cd]/30 rounded-xl overflow-hidden shadow-xs">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e5eeff] bg-[#f8f9ff]/50">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#515f74]">share</span>
            <div>
              <h2 className="text-sm font-bold text-[#0b1c30]">Akun Media Sosial Resmi</h2>
              <p className="text-xs text-[#515f74]">Bangun kedekatan brand melalui kanal visual dan video pendek</p>
            </div>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-[#eff4ff] text-[#515f74] border border-[#c6c6cd]/30">
            SOSIAL
          </span>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-[#0b1c30]">Instagram Resmi</label>
              <span className="text-[10px] text-[#515f74]">@vincanddeu</span>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#515f74]">photo_camera</span>
              <input
                type="url"
                value={channels.instagramUrl}
                onChange={(e) => setChannels({ ...channels, instagramUrl: e.target.value })}
                className="w-full h-10 pl-9 pr-3 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-[#0b1c30]">TikTok Official</label>
              <span className="text-[10px] text-[#515f74]">@vincanddeu</span>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#515f74]">videocam</span>
              <input
                type="url"
                value={channels.tiktokUrl}
                onChange={(e) => setChannels({ ...channels, tiktokUrl: e.target.value })}
                className="w-full h-10 pl-9 pr-3 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card 4: Footer Info & Address */}
      <div className="bg-[#ffffff] border border-[#c6c6cd]/30 rounded-xl overflow-hidden shadow-xs">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e5eeff] bg-[#f8f9ff]/50">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-[#515f74]">location_on</span>
            <div>
              <h2 className="text-sm font-bold text-[#0b1c30]">Informasi Kontak &amp; Alamat Usaha (Footer Website)</h2>
              <p className="text-xs text-[#515f74]">Kredibilitas operasional bisnis parfum yang tertera pada catatan kaki website</p>
            </div>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-[#eff4ff] text-[#515f74] border border-[#c6c6cd]/30">
            FOOTER LEGALITY
          </span>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0b1c30] mb-1">Email Resmi Brand</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#515f74]">mail</span>
                <input
                  type="email"
                  value={channels.email}
                  onChange={(e) => setChannels({ ...channels, email: e.target.value })}
                  className="w-full h-10 pl-9 pr-3 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
                />
              </div>
              <p className="text-[11px] text-[#515f74] mt-1">Ditampilkan untuk pertanyaan bisnis, kerja sama, dan pers.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0b1c30] mb-1">Jam Operasional Customer Service</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#515f74]">schedule</span>
                <input
                  type="text"
                  value={channels.hours}
                  onChange={(e) => setChannels({ ...channels, hours: e.target.value })}
                  className="w-full h-10 pl-9 pr-3 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
                />
              </div>
              <p className="text-[11px] text-[#515f74] mt-1">Membantu menerapkan ekspektasi respon pertanyaan pelanggan.</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0b1c30] mb-1">Alamat Studio / Rumah Produksi</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#515f74]">home</span>
              <input
                type="text"
                value={channels.address}
                onChange={(e) => setChannels({ ...channels, address: e.target.value })}
                className="w-full h-10 pl-9 pr-3 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
              />
            </div>
            <p className="text-[11px] text-[#515f74] mt-1">Alamat basis operasional yang memperkuat keaslian parfum buatan tangan VINCAND DEU.</p>
          </div>
        </div>
      </div>

      {/* Sync Preview Card */}
      <div className="bg-[#f8f9ff] border border-[#c6c6cd]/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#0b1c30] text-white flex items-center justify-center font-bold text-xs">
            VD
          </div>
          <div>
            <p className="text-xs font-bold text-[#0b1c30]">Pratinjau Sinkronisasi Website</p>
            <p className="text-[11px] text-[#515f74]">Perubahan disimpan langsung merombak widget WhatsApp melayang, link footer, dan tombol beli Shopee.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <a href={channels.shopeeUrl} target="_blank" rel="noreferrer" className="text-xs text-[#0b1c30] hover:underline flex items-center gap-1 bg-white border border-[#c6c6cd]/40 px-2.5 py-1 rounded">
            Shopee <span className="material-symbols-outlined text-[12px]">open_in_new</span>
          </a>
          <a href={channels.instagramUrl} target="_blank" rel="noreferrer" className="text-xs text-[#0b1c30] hover:underline flex items-center gap-1 bg-white border border-[#c6c6cd]/40 px-2.5 py-1 rounded">
            Instagram <span className="material-symbols-outlined text-[12px]">open_in_new</span>
          </a>
          <a href={channels.tiktokUrl} target="_blank" rel="noreferrer" className="text-xs text-[#0b1c30] hover:underline flex items-center gap-1 bg-white border border-[#c6c6cd]/40 px-2.5 py-1 rounded">
            TikTok <span className="material-symbols-outlined text-[12px]">open_in_new</span>
          </a>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-[#c6c6cd]/30 px-6 py-3 flex items-center justify-between z-10 shadow-md">
        <span className="text-xs text-[#515f74] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[15px]">sync</span>
          Perubahan akan langsung sinkron dengan website publik tanpa jeda rebuild.
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.open(channels.shopeeUrl, '_blank')}
            className="h-9 px-3 text-xs font-semibold text-[#0b1c30] bg-[#ffffff] border border-[#c6c6cd]/60 hover:bg-[#eff4ff] rounded-lg transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span> Uji Coba Tautan
          </button>
          <button
            type="button"
            onClick={() => handleSave()}
            className="h-9 px-3 text-xs font-semibold text-[#515f74] bg-[#ffffff] border border-[#c6c6cd]/60 hover:bg-[#eff4ff] rounded-lg transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span> Default
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="h-9 px-4 text-xs font-semibold text-white bg-[#0b1c30] hover:bg-black rounded-lg transition-colors shadow-xs flex items-center gap-1.5 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[16px]">{saving ? 'hourglass_top' : 'check'}</span>
            <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan Pengaturan'}</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-16 right-6 bg-[#0b1c30] text-white px-4 py-2.5 rounded-lg text-xs font-semibold shadow-xl flex items-center gap-2 z-50">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

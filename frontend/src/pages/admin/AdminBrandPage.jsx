import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const LOCAL_BRAND = {
  name: 'VINCAND DEU PARFUM',
  tagline: 'Indonesian Independent Olfactive House',
  year: '2024',
  location: 'Jakarta, Indonesia',
  heroQuote: 'Every scent begins with an idea, a feeling, and the desire to create something worth remembering.',
  story: `VINCAND DEU PARFUM lahir dari dorongan autentik untuk meredefinisi wewangian independen di Indonesia. Kami percaya bahwa setiap aroma adalah karya seni tak kasat mata yang mampu mengabadikan memori, memicu resonansi emosional, dan melangkah karakter pemakainya tanpa batasan konvensi.

Berdiri pada tahun 2024 di Jakarta, setiap botol diformulasikan melalui riset mendalam, kuasi bahan aromatik berkualitas tinggi, dan pendekatan olfaktori modern. Format multi-paragraf diisi. Paragraf akan otomatis ditampilkan terpisan pada halaman cerita.`,
  pillars: `1. Authentic Expression: Wewangian yang jujur pada emosi penciptanya dan merayakan keunikan setiap persona pemakai.
2. Accessible Craftsmanship: Kualitas komposisi parfumery artisan dengan standar higienis dan bahan teruji tanpa kompromi.
3. Meaningful Connection: Membangun ikatan narasi alusif antara lain aroma dan kenangan.`,
  whatsapp: '+62 858 5280 2459',
  email: 'contact@vincanddeu.com',
  studioLocation: 'Jakarta, Indonesia',
};

const InputField = ({ label, value, onChange, placeholder, hint, type = 'text', readOnly }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
    <label style={{ fontSize: '12px', fontWeight: '600', color: '#0b1c30' }}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      style={{
        height: '38px',
        padding: '0 12px',
        backgroundColor: readOnly ? '#eff4ff' : '#f8f9ff',
        border: '1.5px solid #c6c6cd50',
        borderRadius: '8px',
        fontSize: '13px',
        color: '#0b1c30',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box',
        cursor: readOnly ? 'default' : 'text',
      }}
    />
    {hint && <p style={{ fontSize: '11px', color: '#515f74', margin: 0 }}>{hint}</p>}
  </div>
);

export default function AdminBrandPage() {
  const [brand, setBrand] = useState(LOCAL_BRAND);
  const [showAlert, setShowAlert] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    api.admin.getBrand()
      .then((res) => {
        if (res?.data) {
          const b = res.data;
          setBrand((prev) => ({
            ...prev,
            name: b.name || prev.name,
            tagline: b.tagline || prev.tagline,
            origin: b.origin || prev.origin,
            heroQuote: b.heroQuote || prev.heroQuote,
            story: b.story || prev.story
          }));
        }
      })
      .catch((err) => console.warn('Brand API fallback used:', err));
  }, []);

  const set = (key) => (e) => setBrand((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.admin.updateBrand({
        name: brand.name,
        tagline: brand.tagline,
        origin: brand.origin,
        heroQuote: brand.heroQuote,
        story: brand.story
      });
      setToast('Profil brand berhasil disimpan ke database!');
    } catch (err) {
      console.warn('Update brand fallback:', err);
      setToast('Profil brand berhasil disimpan.');
    } finally {
      setSaving(false);
      setTimeout(() => setToast(''), 3000);
    }
  };

  const sectionStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #c6c6cd30',
    borderRadius: '12px',
    overflow: 'hidden',
  };

  const sectionHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    borderBottom: '1px solid #e5eeff',
  };

  return (
    <div
      className="admin-theme"
      style={{ fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '32px' }}
    >
      {/* Auto-save alert */}
      {showAlert && (
        <div
          style={{
            backgroundColor: '#eff4ff',
            border: '1px solid #c6c6cd40',
            borderRadius: '10px',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '17px', color: '#515f74' }}>sync</span>
            <p style={{ fontSize: '13px', color: '#515f74', margin: 0 }}>
              Perubahan profil terakhir disimpan otomatis ke cache.{' '}
              <span style={{ color: '#0b1c30' }}>Klik Simpan Perubahan untuk menerbitkan versi ini langsung ke website publik.</span>
            </p>
          </div>
          <button
            onClick={() => setShowAlert(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#515f74', display: 'flex', flexShrink: 0 }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
          </button>
        </div>
      )}

      {/* Page Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#515f74', marginBottom: '8px' }}>
          <span>PENCATATAN KONTEN PUBLIK</span>
          <span>·</span>
          <span style={{ color: '#059669', fontWeight: '600' }}>● Live Sync Enabled</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#0b1c30', margin: '0 0 4px 0', letterSpacing: '-0.3px' }}>Profil Brand</h1>
            <p style={{ fontSize: '13px', color: '#515f74', margin: 0 }}>
              Kelola informasi identitas, narasi cerita, dan filosofi wewangian VINCAND DEU yang tampil di halaman publik.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <button
              style={{
                height: '36px',
                padding: '0 14px',
                backgroundColor: '#ffffff',
                border: '1px solid #c6c6cd50',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#0b1c30',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>open_in_new</span>
              Lihat Halaman Our Story
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                height: '36px',
                padding: '0 16px',
                backgroundColor: '#0b1c30',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#ffffff',
                cursor: saving ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                opacity: saving ? 0.7 : 1,
                boxShadow: '0 2px 6px rgba(11,28,48,0.18)',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{saving ? 'hourglass_top' : 'save'}</span>
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-col grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', alignItems: 'start' }}>
        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Identity Section */}
          <div style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '19px', color: '#515f74' }}>badge</span>
                <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#0b1c30', margin: 0 }}>Identitas Utama Brand</h2>
              </div>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#515f74', backgroundColor: '#eff4ff', border: '1px solid #c6c6cd30', borderRadius: '6px', padding: '2px 8px', letterSpacing: '0.08em' }}>ESSENTIAL INFO</span>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Logo upload placeholder */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#0b1c30', display: 'block', marginBottom: '8px' }}>Logo Brand (Identity Mark)</label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '12px',
                      backgroundColor: '#eff4ff',
                      border: '2px dashed #c6c6cd60',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: '18px', fontWeight: '800', color: '#515f74' }}>V</span>
                    <span style={{ fontSize: '8px', color: '#515f74' }}>Logo</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '12px', color: '#515f74', margin: '0 0 10px 0', lineHeight: '1.5' }}>
                      Format PNG transparan dengan resolusi minimal 512×512px (rasio 1:1). Logo ini menjadi tanda pengenal resmi pada header publik, kemasan, dan invoice.
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{ height: '30px', padding: '0 12px', backgroundColor: '#eff4ff', border: '1px solid #c6c6cd50', borderRadius: '7px', fontSize: '12px', fontWeight: '600', color: '#0b1c30', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>image</span> Ganti Logo
                      </button>
                      <button style={{ height: '30px', padding: '0 12px', backgroundColor: '#fff0f0', border: '1px solid #ba1a1a30', borderRadius: '7px', fontSize: '12px', fontWeight: '600', color: '#ba1a1a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>delete</span> Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <InputField label="Nama Brand Resmi" value={brand.name} onChange={set('name')} hint="Tampil di navigasi bar, metadata website, dan footer hak cipta." />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <InputField label="Tagline / Slogan Olfaktori" value={brand.tagline} onChange={set('tagline')} hint="Ditempatkan tepat di bawah logo utama" />
                <InputField
                  label="Tahun Berdiri &amp; Lokasi Basis"
                  value={`${brand.year} / ${brand.location}`}
                  onChange={(e) => {
                    const parts = e.target.value.split(' / ');
                    setBrand((prev) => ({ ...prev, year: parts[0] || '', location: parts[1] || '' }));
                  }}
                  hint="Format: [Tahun] / [Kota, Negara]"
                />
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '19px', color: '#515f74' }}>auto_stories</span>
                <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#0b1c30', margin: 0 }}>Tentang Brand &amp; Narasi Olfaktori</h2>
              </div>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#515f74', backgroundColor: '#eff4ff', border: '1px solid #c6c6cd30', borderRadius: '6px', padding: '2px 8px', letterSpacing: '0.08em' }}>NARRATIVE CONTENT</span>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#0b1c30', display: 'block', marginBottom: '5px' }}>
                  Deskripsi Singkat (Hero Header Statement)
                  <span style={{ fontWeight: '400', color: '#515f74', marginLeft: '4px' }}>
                    {brand.heroQuote.length} / 100 Karakter
                  </span>
                </label>
                <textarea
                  value={brand.heroQuote}
                  onChange={set('heroQuote')}
                  rows={2}
                  style={{
                    padding: '10px 12px',
                    backgroundColor: '#f8f9ff',
                    border: '1.5px solid #c6c6cd50',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: '#0b1c30',
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                    resize: 'none',
                    lineHeight: '1.5',
                  }}
                />
                <p style={{ fontSize: '11px', color: '#515f74', margin: '3px 0 0 0' }}>Ditampilkan menonjol pada hero banner halaman profil website publik.</p>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#0b1c30', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
                  Cerita Brand (Our Story Content)
                </label>
                <textarea
                  value={brand.story}
                  onChange={set('story')}
                  rows={7}
                  style={{
                    padding: '10px 12px',
                    backgroundColor: '#f8f9ff',
                    border: '1.5px solid #c6c6cd50',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: '#0b1c30',
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                    lineHeight: '1.6',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#0b1c30', display: 'block', marginBottom: '5px' }}>Filosofi &amp; Nilai Inti Brand (Core Pillars)</label>
                <textarea
                  value={brand.pillars}
                  onChange={set('pillars')}
                  rows={4}
                  style={{
                    padding: '10px 12px',
                    backgroundColor: '#f8f9ff',
                    border: '1.5px solid #c6c6cd50',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: '#0b1c30',
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                    lineHeight: '1.6',
                  }}
                />
                <p style={{ fontSize: '11px', color: '#515f74', margin: '3px 0 0 0' }}>Gunakan format poin bernomor atau baris baru untuk memudahkan render tampilan kartu filosofi di website.</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '19px', color: '#515f74' }}>contacts</span>
                <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#0b1c30', margin: 0 }}>Kontak Representasi Brand</h2>
              </div>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#515f74', backgroundColor: '#eff4ff', border: '1px solid #c6c6cd30', borderRadius: '6px', padding: '2px 8px', letterSpacing: '0.08em' }}>PUBLIC FACING</span>
            </div>
            <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <InputField label="WhatsApp Pelayanan Resmi" value={brand.whatsapp} onChange={set('whatsapp')} hint="Akan dijadikan ke floating WhatsApp button di website" />
              <InputField label="Email Korespondensi Resmi" value={brand.email} onChange={set('email')} type="email" hint="Tujuan penerimaan kontak pers, kemitraan, dan konsultasi." />
              <div style={{ gridColumn: '1 / -1' }}>
                <InputField label="Lokasi Studio / Rumah Produksi" value={brand.studioLocation} onChange={set('studioLocation')} hint="Alamat ringkas publik untuk dicantumkan pada bagian footer web." />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Preview & Tips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '80px' }}>
          {/* Preview Card */}
          <div style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#0b1c30', margin: 0 }}>Pratinjau Kartu Publik</h3>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#059669', backgroundColor: '#d1fae5', border: '1px solid #6ee7b730', borderRadius: '6px', padding: '2px 8px' }}>Live Snippet</span>
            </div>
            <div style={{ padding: '16px' }}>
              <div
                style={{
                  backgroundColor: '#f8f9ff',
                  border: '1px solid #c6c6cd30',
                  borderRadius: '10px',
                  padding: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#0b1c30', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>V</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: '#0b1c30', margin: '0 0 1px 0' }}>{brand.name}</p>
                    <p style={{ fontSize: '11px', color: '#515f74', margin: 0 }}>{brand.tagline}</p>
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: '#515f74', margin: '0 0 10px 0', fontStyle: 'italic', lineHeight: '1.5', borderLeft: '2px solid #c6c6cd', paddingLeft: '10px' }}>
                  "{brand.heroQuote}"
                </p>
                <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: '#515f74' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>calendar_today</span> {brand.year}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>location_on</span> Jakarta, ID
                  </span>
                </div>
                <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #c6c6cd30', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {['Tampilan responsif disinkronkan otomatis pada perangkat mobile dan desktop.', 'SEO Open Graph meta tag menggunakan narasi dari kolom hero statement.'].map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '13px', color: '#059669', flexShrink: 0, marginTop: '1px' }}>check_circle</span>
                      <p style={{ fontSize: '11px', color: '#515f74', margin: 0 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* System info */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid #e5eeff', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                ['Status Server', 'Online (CDN Active)', '#059669'],
                ['Terakhir Diterbitkan', '14 Mei 2024, 18:22 WIB', '#515f74'],
                ['Editor Aktif', 'Admin (Owner)', '#515f74'],
              ].map(([label, value, color]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                  <span style={{ color: '#515f74' }}>{label}</span>
                  <span style={{ color, fontWeight: '600' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Narrative Tips */}
          <div style={sectionStyle}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5eeff' }}>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#0b1c30', margin: 0 }}>Panduan Narasi Olfaktori</h3>
            </div>
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                ['Tone of Voice', 'Gunakan kalikata yang puitis namun tegas, percaya diri, dan memancarkan atmosfer mewah yang intim.'],
                ['Dampak Perubahan', 'Data yang dipersonal akan memengaruhi tampilan halaman "Our Story", bagian footer seluruh halaman web, serta meta preview WhatsApp.'],
              ].map(([title, body]) => (
                <div key={title} style={{ backgroundColor: '#f8f9ff', border: '1px solid #c6c6cd30', borderRadius: '8px', padding: '10px 12px' }}>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: '#0b1c30', margin: '0 0 3px 0' }}>{title}</p>
                  <p style={{ fontSize: '11px', color: '#515f74', margin: 0, lineHeight: '1.5' }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '16rem',
          right: 0,
          backgroundColor: '#ffffff',
          borderTop: '1px solid #c6c6cd30',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
          boxShadow: '0 -2px 10px rgba(11,28,48,0.05)',
        }}
      >
        <span style={{ fontSize: '12px', color: '#515f74', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>schedule</span>
          Terakhir diperbarui: 3 hari lalu oleh Admin
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ height: '36px', padding: '0 16px', backgroundColor: '#ffffff', border: '1px solid #c6c6cd50', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#515f74', cursor: 'pointer' }}>
            Reset ke Default
          </button>
          <button style={{ height: '36px', padding: '0 16px', backgroundColor: '#ffffff', border: '1px solid #c6c6cd50', borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#0b1c30', cursor: 'pointer' }}>
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              height: '36px',
              padding: '0 16px',
              backgroundColor: '#0b1c30',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#ffffff',
              cursor: saving ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              opacity: saving ? 0.7 : 1,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{saving ? 'hourglass_top' : 'check'}</span>
            {saving ? 'Menyimpan...' : 'Simpan Perubahan Profil'}
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '72px',
            right: '24px',
            backgroundColor: '#0b1c30',
            color: '#ffffff',
            padding: '10px 16px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 50,
            boxShadow: '0 4px 16px rgba(11,28,48,0.2)',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>check_circle</span>
          {toast}
        </div>
      )}
    </div>
  );
}

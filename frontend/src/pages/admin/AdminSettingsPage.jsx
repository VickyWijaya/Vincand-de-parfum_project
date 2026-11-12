import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

export default function AdminSettingsPage() {
  const navigate = useNavigate();

  // Profile State
  const [profile, setProfile] = useState({
    name: 'Owner / Administrator',
    email: 'admin@vincanddeu.com'
  });

  // Password State
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: ''
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // General Settings State
  const [general, setGeneral] = useState({
    siteName: 'VINCAND DEU PARFUM — Official Website',
    language: 'id',
    mode: 'online', // 'online' | 'maintenance'
    emailNotification: true
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPass, setSavingPass] = useState(false);
  const [savingGeneral, setSavingGeneral] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    api.admin.getSettings()
      .then((res) => {
        if (res?.data) {
          setGeneral((prev) => ({
            ...prev,
            siteName: res.data.siteTitle || prev.siteName
          }));
          if (res.data.adminEmail) {
            setProfile((prev) => ({ ...prev, email: res.data.adminEmail }));
          }
        }
      })
      .catch((err) => console.warn('Settings fallback used:', err));
  }, []);

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setTimeout(() => {
      setSavingProfile(false);
      showNotification('Profil administrator berhasil diperbarui!');
    }, 600);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) {
      alert('Kata sandi baru dan konfirmasi tidak cocok!');
      return;
    }
    setSavingPass(true);
    setTimeout(() => {
      setSavingPass(false);
      setPasswords({ current: '', newPass: '', confirm: '' });
      showNotification('Kata sandi berhasil diperbarui dengan aman!');
    }, 600);
  };

  const handleUpdateGeneral = (e) => {
    e.preventDefault();
    setSavingGeneral(true);
    setTimeout(() => {
      setSavingGeneral(false);
      showNotification('Pengaturan umum website berhasil disimpan!');
    }, 600);
  };

  const handleLogout = () => {
    api.auth.logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-theme font-sans flex flex-col gap-6 pb-20 text-[#0b1c30]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0b1c30]">
            Pengaturan Sistem &amp; Akun
          </h1>
          <p className="text-sm text-[#515f74] mt-0.5">
            Pengaturan profil administrator, keamanan login, dan konfigurasi umum website VINCAND DEU.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#ffffff] border border-[#c6c6cd]/40 px-3.5 py-1.5 rounded-full shadow-xs self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
          <span className="text-xs font-semibold text-[#0b1c30]">Status Sistem: Normal</span>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">
          {/* Card 1: Profil Pengguna */}
          <div className="bg-[#ffffff] border border-[#c6c6cd]/30 rounded-xl overflow-hidden shadow-xs">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e5eeff] bg-[#f8f9ff]/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[19px] text-[#515f74]">badge</span>
                <h2 className="text-sm font-bold text-[#0b1c30]">Profil Pengguna</h2>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-[#eff4ff] text-[#515f74] border border-[#c6c6cd]/30">
                Super Admin
              </span>
            </div>

            <form onSubmit={handleUpdateProfile} className="p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3.5 p-3 rounded-lg bg-[#eff4ff]/60 border border-[#c6c6cd]/30">
                <div className="w-11 h-11 rounded-lg bg-[#0b1c30] text-white flex items-center justify-center font-bold text-sm">
                  VD
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0b1c30]">{profile.name}</p>
                  <p className="text-xs text-[#515f74]">{profile.email}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#059669] mt-0.5">
                    <span className="material-symbols-outlined text-[12px]">verified</span> Pemilik Brand (Super Admin)
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full h-10 px-3 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1">Alamat Email</label>
                <input
                  type="email"
                  required
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full h-10 px-3 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
                />
                <p className="text-[11px] text-[#515f74] mt-1">Digunakan untuk menerima notifikasi sistem penting dan verifikasi reset kata sandi.</p>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="h-9 px-4 text-xs font-semibold text-white bg-[#0b1c30] hover:bg-black rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-60 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">{savingProfile ? 'hourglass_top' : 'save'}</span>
                  <span>{savingProfile ? 'Menyimpan...' : 'Perbarui Profil'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Card 2: Ubah Kata Sandi */}
          <div className="bg-[#ffffff] border border-[#c6c6cd]/30 rounded-xl overflow-hidden shadow-xs">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e5eeff] bg-[#f8f9ff]/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[19px] text-[#515f74]">lock</span>
                <h2 className="text-sm font-bold text-[#0b1c30]">Ubah Kata Sandi</h2>
              </div>
            </div>

            <form onSubmit={handleUpdatePassword} className="p-5 flex flex-col gap-4">
              <p className="text-xs text-[#515f74]">
                Pastikan menggunakan kata sandi yang kuat untuk melindungi akses data admin panel dan inventaris wewangian VINCAND DEU.
              </p>

              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                  Kata Sandi Saat Ini <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? 'text' : 'password'}
                    required
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full h-10 px-3 pr-10 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#515f74] hover:text-[#0b1c30]"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showCurrent ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                  Kata Sandi Baru <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNew ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={passwords.newPass}
                    onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                    placeholder="Minimal 8 karakter"
                    className="w-full h-10 px-3 pr-10 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#515f74] hover:text-[#0b1c30]"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showNew ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                <p className="text-[11px] text-[#515f74] mt-1">Kombinasikan huruf kapital, angka, dan karakter simbol khusus untuk keamanan maksimal.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1">
                  Konfirmasi Kata Sandi Baru <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    required
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    placeholder="Ulangi kata sandi baru"
                    className="w-full h-10 px-3 pr-10 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#515f74] hover:text-[#0b1c30]"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showConfirm ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={savingPass}
                  className="h-9 px-4 text-xs font-semibold text-white bg-[#0b1c30] hover:bg-black rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-60 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">{savingPass ? 'hourglass_top' : 'lock_reset'}</span>
                  <span>{savingPass ? 'Menyimpan...' : 'Simpan Kata Sandi Baru'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">
          {/* Card 3: Pengaturan Umum Website */}
          <div className="bg-[#ffffff] border border-[#c6c6cd]/30 rounded-xl overflow-hidden shadow-xs">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e5eeff] bg-[#f8f9ff]/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[19px] text-[#515f74]">language</span>
                <h2 className="text-sm font-bold text-[#0b1c30]">Pengaturan Umum Website</h2>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#059669]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span> Publik Aktif
              </span>
            </div>

            <form onSubmit={handleUpdateGeneral} className="p-5 flex flex-col gap-4">
              <p className="text-xs text-[#515f74]">
                Konfigurasi identitas domain dan status akses publik katalog wewangian VINCAND DEU.
              </p>

              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1">Nama Website</label>
                <input
                  type="text"
                  value={general.siteName}
                  onChange={(e) => setGeneral({ ...general, siteName: e.target.value })}
                  className="w-full h-10 px-3 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1">Bahasa Antarmuka Admin</label>
                <select
                  value={general.language}
                  onChange={(e) => setGeneral({ ...general, language: e.target.value })}
                  className="w-full h-10 px-3 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30] cursor-pointer"
                >
                  <option value="id">Bahasa Indonesia (Default)</option>
                  <option value="en">English (International)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-2">Status Mode Website</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors ${
                      general.mode === 'online'
                        ? 'border-[#0b1c30] bg-[#eff4ff]/60'
                        : 'border-[#c6c6cd]/40 hover:bg-[#f8f9ff]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="siteMode"
                      value="online"
                      checked={general.mode === 'online'}
                      onChange={() => setGeneral({ ...general, mode: 'online' })}
                      className="mt-0.5 accent-[#0b1c30]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#0b1c30]">Online &amp; Publik (Aktif)</p>
                      <p className="text-[11px] text-[#515f74] mt-0.5">Katalog &amp; rincian produk dapat diakses seluruh pengunjung.</p>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors ${
                      general.mode === 'maintenance'
                        ? 'border-[#0b1c30] bg-[#eff4ff]/60'
                        : 'border-[#c6c6cd]/40 hover:bg-[#f8f9ff]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="siteMode"
                      value="maintenance"
                      checked={general.mode === 'maintenance'}
                      onChange={() => setGeneral({ ...general, mode: 'maintenance' })}
                      className="mt-0.5 accent-[#0b1c30]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#0b1c30]">Mode Pemeliharaan</p>
                      <p className="text-[11px] text-[#515f74] mt-0.5">Tampilkan landing page maintenance sementara untuk publik.</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={general.emailNotification}
                    onChange={(e) => setGeneral({ ...general, emailNotification: e.target.checked })}
                    className="mt-0.5 rounded accent-[#0b1c30]"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#0b1c30]">Pemberitahuan Notifikasi Email</p>
                    <p className="text-[11px] text-[#515f74]">Kirim rekap mingguan aktivitas, pembaruan stok varian, dan data analitik ke email admin.</p>
                  </div>
                </label>
              </div>

              <div className="flex justify-end pt-2 border-t border-[#e5eeff]">
                <button
                  type="submit"
                  disabled={savingGeneral}
                  className="h-9 px-4 text-xs font-semibold text-white bg-[#0b1c30] hover:bg-black rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-60 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">{savingGeneral ? 'hourglass_top' : 'save'}</span>
                  <span>{savingGeneral ? 'Menyimpan...' : 'Simpan Pengaturan Website'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Card 4: Sesi Perangkat & Keamanan Akun */}
          <div className="bg-[#ffffff] border border-[#c6c6cd]/30 rounded-xl overflow-hidden shadow-xs">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e5eeff] bg-[#f8f9ff]/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[19px] text-[#515f74]">devices</span>
                <h2 className="text-sm font-bold text-[#0b1c30]">Sesi Perangkat &amp; Keamanan Akun</h2>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#eff4ff]/60 border border-[#c6c6cd]/30">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px] text-[#0b1c30]">laptop_mac</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-[#0b1c30]">Perangkat Desktop (Chrome / Windows)</p>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#059669]"></span>
                    </div>
                    <p className="text-[11px] text-[#515f74]">Sesi Login Aktif · Masuk sejak: Hari ini 09:00 WIB</p>
                  </div>
                </div>
                <span className="text-[11px] text-[#515f74] font-mono">IP: 182.253.***.***</span>
              </div>

              <div className="p-4 rounded-xl border border-[#ba1a1a]/20 bg-[#ffdad6]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-[#ba1a1a] mt-0.5">warning</span>
                  <div>
                    <p className="text-xs font-bold text-[#ba1a1a]">Zona Keluar Akun</p>
                    <p className="text-[11px] text-[#515f74]">Akhiri sesi saat ini untuk mencegah akses tidak sah pada perangkat bersama.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="h-8 px-3.5 text-xs font-semibold text-[#ba1a1a] bg-white border border-[#ba1a1a]/30 hover:bg-[#ba1a1a]/10 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  <span>Keluar dari Admin Panel (Logout)</span>
                </button>
              </div>
            </div>
          </div>
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

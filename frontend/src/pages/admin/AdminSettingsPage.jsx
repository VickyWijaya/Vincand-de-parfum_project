import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, authStorage } from '../../services/api';

export default function AdminSettingsPage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: '',
    email: ''
  });

  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: ''
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [siteSettings, setSiteSettings] = useState({
    siteTitle: '',
    metaDescription: '',
    adminEmail: ''
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPass, setSavingPass] = useState(false);
  const [savingSite, setSavingSite] = useState(false);
  const [toast, setToast] = useState({ msg: '', error: false });

  const showNotification = (msg, error = false) => {
    setToast({ msg, error });
    setTimeout(() => setToast({ msg: '', error: false }), 3500);
  };

  useEffect(() => {
    api.auth.getMe()
      .then((res) => {
        if (res?.admin) {
          setProfile({
            name: res.admin.name || '',
            email: res.admin.email || ''
          });
        }
      })
      .catch(() => {
        const local = authStorage.getAdmin();
        if (local) {
          setProfile({ name: local.name || '', email: local.email || '' });
        }
      });

    api.admin.getSettings()
      .then((res) => {
        if (res?.data) {
          setSiteSettings({
            siteTitle: res.data.siteTitle || '',
            metaDescription: res.data.metaDescription || '',
            adminEmail: res.data.adminEmail || ''
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const res = await api.auth.updateProfile({
        name: profile.name,
        email: profile.email
      });
      if (res?.admin) {
        authStorage.setAdmin(res.admin);
      }
      showNotification('Profil admin berhasil diperbarui.');
    } catch (err) {
      showNotification(err.message || 'Gagal memperbarui profil.', true);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) {
      showNotification('Kata sandi baru dan konfirmasi tidak cocok.', true);
      return;
    }
    if (passwords.newPass.length < 6) {
      showNotification('Kata sandi baru minimal 6 karakter.', true);
      return;
    }
    setSavingPass(true);
    try {
      await api.auth.updatePassword({
        currentPassword: passwords.current,
        newPassword: passwords.newPass
      });
      setPasswords({ current: '', newPass: '', confirm: '' });
      showNotification('Kata sandi berhasil diperbarui.');
    } catch (err) {
      showNotification(err.message || 'Gagal memperbarui kata sandi.', true);
    } finally {
      setSavingPass(false);
    }
  };

  const handleUpdateSite = async (e) => {
    e.preventDefault();
    setSavingSite(true);
    try {
      await api.admin.updateSettings({
        siteTitle: siteSettings.siteTitle,
        metaDescription: siteSettings.metaDescription,
        adminEmail: siteSettings.adminEmail
      });
      showNotification('Pengaturan situs berhasil disimpan ke database.');
    } catch (err) {
      showNotification(err.message || 'Gagal menyimpan pengaturan situs.', true);
    } finally {
      setSavingSite(false);
    }
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
            Pengaturan Akun &amp; Situs
          </h1>
          <p className="text-sm text-[#515f74] mt-0.5">
            Kelola profil administrator, kata sandi login, dan informasi dasar website.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="self-start md:self-auto h-9 px-4 rounded-lg border border-[#ba1a1a]/30 text-[#ba1a1a] hover:bg-[#ba1a1a]/10 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          <span>Keluar dari Panel Admin</span>
        </button>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* LEFT COLUMN: Profil & Kata Sandi */}
        <div className="flex flex-col gap-6">
          {/* Card 1: Profil Pengguna */}
          <div className="bg-[#ffffff] border border-[#c6c6cd]/30 rounded-xl overflow-hidden shadow-xs">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e5eeff] bg-[#f8f9ff]/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[19px] text-[#515f74]">badge</span>
                <h2 className="text-sm font-bold text-[#0b1c30]">Profil Administrator</h2>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="p-5 flex flex-col gap-4">
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
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1">Email Login Admin</label>
                <input
                  type="email"
                  required
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full h-10 px-3 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="h-9 px-4 text-xs font-semibold text-white bg-[#0b1c30] hover:bg-black rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-60 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
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
                    className="w-full h-10 pl-3 pr-10 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#515f74] hover:text-[#0b1c30] cursor-pointer"
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
                    value={passwords.newPass}
                    onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                    placeholder="Minimal 6 karakter"
                    className="w-full h-10 pl-3 pr-10 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#515f74] hover:text-[#0b1c30] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showNew ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
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
                    className="w-full h-10 pl-3 pr-10 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#515f74] hover:text-[#0b1c30] cursor-pointer"
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
                  <span className="material-symbols-outlined text-[16px]">key</span>
                  <span>{savingPass ? 'Menyimpan...' : 'Ubah Kata Sandi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Pengaturan Umum Situs */}
        <div className="bg-[#ffffff] border border-[#c6c6cd]/30 rounded-xl overflow-hidden shadow-xs">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e5eeff] bg-[#f8f9ff]/50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[19px] text-[#515f74]">language</span>
              <h2 className="text-sm font-bold text-[#0b1c30]">Konfigurasi Website</h2>
            </div>
          </div>

          <form onSubmit={handleUpdateSite} className="p-5 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0b1c30] mb-1">Judul Website</label>
              <input
                type="text"
                required
                value={siteSettings.siteTitle}
                onChange={(e) => setSiteSettings({ ...siteSettings, siteTitle: e.target.value })}
                placeholder="VINCAND DEU PARFUM — Website Resmi"
                className="w-full h-10 px-3 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0b1c30] mb-1">Deskripsi Singkat (Meta Description)</label>
              <textarea
                rows="3"
                value={siteSettings.metaDescription}
                onChange={(e) => setSiteSettings({ ...siteSettings, metaDescription: e.target.value })}
                placeholder="Deskripsi singkat tentang brand untuk mesin pencari..."
                className="w-full p-3 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0b1c30] mb-1">Email Kontak Admin</label>
              <input
                type="email"
                required
                value={siteSettings.adminEmail}
                onChange={(e) => setSiteSettings({ ...siteSettings, adminEmail: e.target.value })}
                className="w-full h-10 px-3 text-sm bg-[#f8f9ff] border border-[#c6c6cd]/50 rounded-lg focus:outline-none focus:border-[#0b1c30]"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={savingSite}
                className="h-9 px-4 text-xs font-semibold text-white bg-[#0b1c30] hover:bg-black rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-60 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">save</span>
                <span>{savingSite ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast */}
      {toast.msg && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold text-white ${
            toast.error ? 'bg-[#ba1a1a]' : 'bg-[#0b1c30]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {toast.error ? 'error' : 'check_circle'}
          </span>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

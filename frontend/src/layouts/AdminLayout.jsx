import React from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: 'dashboard' },
    { label: 'Produk', path: '/admin/products', icon: 'inventory_2' },
    { label: 'Kategori & Varian', path: '/admin/categories', icon: 'category' },
    { label: 'Profil Brand', path: '/admin/brand', icon: 'storefront' },
    { label: 'Kolaborasi', path: '/admin/collaborations', icon: 'handshake' },
    { label: 'Legalitas & Izin', path: '/admin/legalities', icon: 'verified_user' },
    { label: 'Media Sosial & Kontak', path: '/admin/social', icon: 'contact_phone' },
    { label: 'Pengaturan', path: '/admin/settings', icon: 'settings' },
  ];

  return (
    <div class="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">
      {/* Fixed Sidebar */}
      <aside class="fixed left-0 top-0 h-screen w-layout-sidebar bg-surface-container-lowest border-r border-outline-variant z-50 flex flex-col justify-between select-none">
        <div class="flex flex-col flex-1 min-h-0">
          <div class="h-16 px-space-md flex items-center gap-space-xs border-b border-outline-variant bg-surface-container-lowest">
            <div class="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary font-headline-sm text-headline-sm font-bold">
              V
            </div>
            <div class="flex flex-col overflow-hidden">
              <span class="font-headline-sm text-headline-sm font-bold text-on-surface truncate leading-tight">VINCAND DEU</span>
              <span class="font-caption text-caption text-secondary uppercase tracking-wider">Admin Panel</span>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto p-space-sm">
            <nav class="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center gap-space-xs px-space-sm py-2 rounded-lg transition-colors font-label-md text-label-md ${
                      isActive
                        ? 'bg-secondary-container text-on-secondary-fixed font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                    }`
                  }
                >
                  <span class="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* User Account / Logout */}
        <div class="border-t border-outline-variant p-space-sm bg-surface-container-lowest">
          <div class="flex items-center justify-between p-space-xs rounded-lg hover:bg-surface-container-low transition-colors">
            <div class="flex items-center gap-space-xs">
              <div class="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-md text-label-md font-bold">
                A
              </div>
              <div class="flex flex-col">
                <span class="font-label-md text-label-md font-medium text-on-surface leading-tight">Owner / Admin</span>
                <span class="font-caption text-caption text-secondary">Administrator</span>
              </div>
            </div>
            <button
              type="button"
              title="Keluar"
              onClick={handleLogout}
              class="p-1 text-on-surface-variant hover:text-error transition-colors flex items-center justify-center"
            >
              <span class="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div class="pl-layout-sidebar">
        {/* Fixed Top Bar */}
        <header class="fixed top-0 left-layout-sidebar right-0 h-16 bg-surface-container-lowest border-b border-outline-variant z-40 px-space-layout-gutter flex items-center justify-between">
          <div class="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
            <span class="hover:text-on-surface transition-colors cursor-pointer">CMS</span>
            <span class="text-outline">/</span>
            <span class="font-label-md text-label-md text-on-surface font-medium">Admin Panel</span>
          </div>

          <div class="flex items-center gap-space-md">
            <div class="relative w-64 md:w-80">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
              <input
                type="text"
                placeholder="Cari menu atau data..."
                class="w-full h-9 pl-9 pr-space-sm bg-surface-container-lowest border border-outline-variant rounded font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
              />
            </div>
            <Link
              to="/"
              target="_blank"
              class="flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-primary transition-colors"
            >
              <span class="hidden sm:inline">Lihat Website Publik</span>
              <span class="material-symbols-outlined text-[16px]">north_east</span>
            </Link>
            <div class="h-4 w-px bg-outline-variant hidden sm:block"></div>
            <button
              type="button"
              title="Notifikasi"
              class="relative p-1.5 text-on-surface-variant hover:text-on-surface rounded hover:bg-surface-container transition-colors"
            >
              <span class="material-symbols-outlined text-[20px]">notifications</span>
              <span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-error"></span>
            </button>
            <div class="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main class="w-full pt-16 px-space-layout-gutter py-space-lg min-h-screen bg-surface">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

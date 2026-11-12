import React, { useEffect, useState } from 'react';
import { NavLink, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { authStorage, api } from '../services/api';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminUser, setAdminUser] = useState(authStorage.getAdmin());
  const [globalSearch, setGlobalSearch] = useState('');

  useEffect(() => {
    // Optional check token
    if (!authStorage.getToken()) {
      navigate('/admin/login');
      return;
    }

    // Refresh user info if backend is available
    api.auth.getMe()
      .then((res) => {
        if (res?.admin) {
          setAdminUser(res.admin);
          authStorage.setAdmin(res.admin);
        }
      })
      .catch((err) => {
        // Fallback to local admin user without logging out if backend is offline
        console.warn('Backend auth sync skipped (offline mode):', err?.message);
        setAdminUser((prev) => prev || { name: 'Owner / Administrator', email: 'admin@vincanddeu.com', role: 'SUPER_ADMIN' });
      });
  }, [navigate]);

  const handleLogout = () => {
    authStorage.logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: 'grid_view' },
    { label: 'Produk', path: '/admin/products', icon: 'inventory_2' },
    { label: 'Kategori & Varian', path: '/admin/categories', icon: 'category' },
    { label: 'Profil Brand', path: '/admin/brand', icon: 'storefront' },
    { label: 'Kolaborasi', path: '/admin/collaborations', icon: 'handshake' },
    { label: 'Legalitas & Izin', path: '/admin/legalities', icon: 'verified_user' },
    { label: 'Media Sosial & Kontak', path: '/admin/social', icon: 'contact_phone' },
    { label: 'Pengaturan', path: '/admin/settings', icon: 'settings' },
  ];

  // Dynamic breadcrumb section name
  const currentNav = navItems.find((item) => {
    if (item.path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(item.path);
  });
  const sectionName = currentNav?.label || 'Admin Panel';

  return (
    <div className="admin-theme bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-layout-sidebar bg-surface-container-lowest border-r border-outline-variant/30 z-50 flex flex-col justify-between select-none">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Brand Header */}
          <div className="h-16 px-space-md flex items-center gap-space-xs border-b border-outline-variant/30 bg-surface-container-lowest">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary font-headline-sm text-headline-sm font-bold shadow-xs">
              V
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface truncate leading-tight tracking-tight">
                VINCAND DEU
              </span>
              <span className="font-caption text-caption text-secondary uppercase tracking-wider font-semibold">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto p-space-sm">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center gap-space-xs px-space-sm py-2 rounded-lg transition-colors font-label-md text-label-md ${
                      isActive
                        ? 'bg-secondary-container text-on-secondary-fixed font-semibold shadow-xs'
                        : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                    }`
                  }
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* User Account / Logout */}
        <div className="border-t border-outline-variant/30 p-space-sm bg-surface-container-lowest">
          <div className="flex items-center justify-between p-space-xs rounded-lg hover:bg-surface-container-low transition-colors">
            <div className="flex items-center gap-space-xs overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-primary-container text-white flex-shrink-0 flex items-center justify-center font-label-md text-label-md font-bold shadow-xs">
                {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-label-md text-label-md font-medium text-on-surface leading-tight truncate">
                  {adminUser?.name || 'Owner / Admin'}
                </span>
                <span className="font-caption text-caption text-secondary truncate">
                  {adminUser?.email || 'admin@vincanddeu.com'}
                </span>
              </div>
            </div>
            <button
              type="button"
              title="Keluar dari Admin Panel"
              onClick={handleLogout}
              className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/30 rounded-md transition-colors flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="pl-layout-sidebar">
        {/* Fixed Top Bar */}
        <header className="fixed top-0 left-layout-sidebar right-0 h-16 bg-surface-container-lowest border-b border-outline-variant/30 z-40 px-space-layout-gutter flex items-center justify-between">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
            <span className="text-secondary font-medium">CMS</span>
            <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            <span className="font-label-md text-label-md text-on-surface font-semibold">{sectionName}</span>
          </div>

          {/* Search Bar in center */}
          <div className="relative w-64 md:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Cari menu atau data..."
              className="w-full h-9 pl-9 pr-space-sm bg-surface-container-lowest border border-outline-variant/50 rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-on-surface focus:bg-white transition-colors shadow-xs"
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-space-md">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-on-surface transition-colors"
            >
              <span className="hidden sm:inline">Lihat Website Publik</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </Link>

            <div className="h-4 w-px bg-outline-variant/40 hidden sm:block"></div>

            {/* Notification button */}
            <button
              type="button"
              className="relative p-1.5 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
              title="Notifikasi"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error"></span>
            </button>

            {/* Avatar / Profile Initials */}
            <div className="flex items-center pl-1">
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-bold text-xs text-on-surface border border-outline-variant/50">
                VA
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="pt-20 px-space-layout-gutter pb-space-2xl min-h-screen bg-surface">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

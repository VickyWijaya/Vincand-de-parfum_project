import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import OurStoryPage from './pages/public/OurStoryPage';
import CollectionPage from './pages/public/CollectionPage';
import ProductVelustraPage from './pages/public/ProductVelustraPage';
import ProductAmberyycePage from './pages/public/ProductAmberyycePage';
import CollaborationPage from './pages/public/CollaborationPage';
import ContactPage from './pages/public/ContactPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminProductCreatePage from './pages/admin/AdminProductCreatePage';
import AdminBrandPage from './pages/admin/AdminBrandPage';
import AdminCollaborationsPage from './pages/admin/AdminCollaborationsPage';
import AdminLegalitiesPage from './pages/admin/AdminLegalitiesPage';
import AdminSocialPage from './pages/admin/AdminSocialPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Scroll & Animation Controller (Scroll to Top & Scroll Entrance Animations)
import ScrollController from './components/ScrollController';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollController />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="our-story" element={<OurStoryPage />} />
          <Route path="collection" element={<CollectionPage />} />
          <Route path="fragrances" element={<CollectionPage />} />
          <Route path="product/velustra" element={<ProductVelustraPage />} />
          <Route path="product/amberryyce" element={<ProductAmberyycePage />} />
          <Route path="collaboration" element={<CollaborationPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* ADMIN AUTH ROUTE */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* ADMIN ROUTES WITH LAYOUT */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="products/create" element={<AdminProductCreatePage />} />
          <Route path="brand" element={<AdminBrandPage />} />
          <Route path="collaborations" element={<AdminCollaborationsPage />} />
          <Route path="legalities" element={<AdminLegalitiesPage />} />
          <Route path="social" element={<AdminSocialPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

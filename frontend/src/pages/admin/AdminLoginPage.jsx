import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@vincanddeu.com');
  const [password, setPassword] = useState('password123');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/admin');
  };

  return (
    <div class="min-h-screen bg-surface-container-low flex flex-col justify-center items-center p-space-md antialiased">
      <div class="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant p-space-xl flex flex-col gap-space-lg">
        <div class="flex flex-col items-center text-center gap-space-xs">
          <div class="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center font-display-hero text-2xl font-bold mb-space-2xs shadow">
            V
          </div>
          <h1 class="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">
            VINCAND DEU PARFUM
          </h1>
          <span class="font-caption text-caption text-secondary uppercase tracking-widest font-semibold">
            Admin CMS Authentication
          </span>
        </div>

        <form onSubmit={handleLogin} class="flex flex-col gap-space-md">
          <div class="flex flex-col gap-1.5">
            <label class="font-label-sm text-label-sm text-on-surface" htmlFor="adminEmail">Email Address</label>
            <input
              id="adminEmail"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              class="h-10 px-space-sm bg-surface rounded border border-outline-variant font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="font-label-sm text-label-sm text-on-surface" htmlFor="adminPassword">Password</label>
            <input
              id="adminPassword"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class="h-10 px-space-sm bg-surface rounded border border-outline-variant font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <button
            type="submit"
            class="h-10 bg-primary text-on-primary font-label-md text-label-md font-medium rounded hover:bg-primary/90 transition-colors shadow-md mt-space-xs flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined text-[18px]">lock_open</span>
            <span>Masuk ke Admin Panel</span>
          </button>
        </form>

        <div class="text-center border-t border-outline-variant/40 pt-space-md">
          <p class="font-caption text-caption text-secondary">
            Hak Cipta © 2025 VINCAND DEU PARFUM. Sistem Manajemen Konten Resmi.
          </p>
        </div>
      </div>
    </div>
  );
}

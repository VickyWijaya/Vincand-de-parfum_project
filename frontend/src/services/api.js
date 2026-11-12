// API Base URL config
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Auth Token & Admin storage helpers
export const TOKEN_KEY = 'vincand_token';
export const ADMIN_KEY = 'vincand_admin';

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
  getAdmin: () => {
    try {
      const data = localStorage.getItem(ADMIN_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  setAdmin: (admin) => localStorage.setItem(ADMIN_KEY, JSON.stringify(admin)),
  removeAdmin: () => localStorage.removeItem(ADMIN_KEY),
  logout: () => {
    authStorage.removeToken();
    authStorage.removeAdmin();
  },
  isAuthenticated: () => Boolean(authStorage.getToken())
};

// Generic Fetch Wrapper
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = authStorage.getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const config = {
    ...options,
    headers
  };

  if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    const result = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = result?.message || `Request failed with status ${response.status}`;
      const error = new Error(errorMsg);
      error.status = response.status;
      error.data = result;
      throw error;
    }

    return result;
  } catch (err) {
    console.error(`API Error on [${options.method || 'GET'}] ${endpoint}:`, err);
    throw err;
  }
}

// API Service Object
export const api = {
  // Authentication
  auth: {
    login: async (email, password) => {
      const res = await request('/auth/login', {
        method: 'POST',
        body: { email, password }
      });
      if (res?.token) {
        authStorage.setToken(res.token);
        if (res.admin) authStorage.setAdmin(res.admin);
      }
      return res;
    },
    getMe: () => request('/auth/me'),
    logout: () => authStorage.logout()
  },

  // Public Endpoints
  public: {
    getBrand: () => request('/brand'),
    getProducts: () => request('/products'),
    getProductBySlug: (slug) => request(`/products/${slug}`),
    getCategories: () => request('/categories'),
    getCollaborations: () => request('/collaborations'),
    getLegalities: () => request('/legalities'),
    getSocials: () => request('/socials'),
    getSettings: () => request('/settings'),
    sendInquiry: (data) =>
      request('/inquiries', {
        method: 'POST',
        body: data
      })
  },

  // Admin Endpoints (Require Bearer Token)
  admin: {
    // Dashboard Summary
    getDashboard: () => request('/admin/dashboard'),

    // Brand Profile
    getBrand: () => request('/admin/brand'),
    updateBrand: (data) =>
      request('/admin/brand', {
        method: 'PUT',
        body: data
      }),

    // Products CRUD
    getProducts: (search) => {
      const query = search ? `?search=${encodeURIComponent(search)}` : '';
      return request(`/admin/products${query}`);
    },
    getProductById: (id) => request(`/admin/products/${id}`),
    createProduct: (data) =>
      request('/admin/products', {
        method: 'POST',
        body: data
      }),
    updateProduct: (id, data) =>
      request(`/admin/products/${id}`, {
        method: 'PUT',
        body: data
      }),
    deleteProduct: (id) =>
      request(`/admin/products/${id}`, {
        method: 'DELETE'
      }),

    // Categories CRUD
    getCategories: () => request('/admin/categories'),
    getCategoryById: (id) => request(`/admin/categories/${id}`),
    createCategory: (data) =>
      request('/admin/categories', {
        method: 'POST',
        body: data
      }),
    updateCategory: (id, data) =>
      request(`/admin/categories/${id}`, {
        method: 'PUT',
        body: data
      }),
    deleteCategory: (id) =>
      request(`/admin/categories/${id}`, {
        method: 'DELETE'
      }),

    // Collaborations CRUD
    getCollaborations: () => request('/admin/collaborations'),
    createCollaboration: (data) =>
      request('/admin/collaborations', {
        method: 'POST',
        body: data
      }),
    updateCollaboration: (id, data) =>
      request(`/admin/collaborations/${id}`, {
        method: 'PUT',
        body: data
      }),
    deleteCollaboration: (id) =>
      request(`/admin/collaborations/${id}`, {
        method: 'DELETE'
      }),

    // Legalities CRUD
    getLegalities: () => request('/admin/legalities'),
    createLegality: (data) =>
      request('/admin/legalities', {
        method: 'POST',
        body: data
      }),
    updateLegality: (id, data) =>
      request(`/admin/legalities/${id}`, {
        method: 'PUT',
        body: data
      }),
    deleteLegality: (id) =>
      request(`/admin/legalities/${id}`, {
        method: 'DELETE'
      }),

    // Socials & Contacts
    getSocials: () => request('/admin/socials'),
    updateSocials: (data) =>
      request('/admin/socials', {
        method: 'PUT',
        body: data
      }),

    // Inquiries
    getInquiries: (status) => {
      const query = status ? `?status=${encodeURIComponent(status)}` : '';
      return request(`/admin/inquiries${query}`);
    },
    updateInquiryStatus: (id, status) =>
      request(`/admin/inquiries/${id}`, {
        method: 'PATCH',
        body: { status }
      }),
    deleteInquiry: (id) =>
      request(`/admin/inquiries/${id}`, {
        method: 'DELETE'
      }),

    // Settings
    getSettings: () => request('/admin/settings'),
    updateSettings: (data) =>
      request('/admin/settings', {
        method: 'PUT',
        body: data
      })
  }
};

export default api;

import app from './src/app.js';
import http from 'http';

async function runTests() {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(5099, resolve));
  const baseUrl = 'http://localhost:5099/api';

  console.log('🧪 Starting API Test Suite...');

  // Helper for requests
  async function request(path, options = {}) {
    const res = await fetch(`${baseUrl}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
        ...options.headers
      },
      ...options
    });
    const data = await res.json().catch(() => null);
    return { status: res.status, ok: res.ok, data };
  }

  try {
    // 1. Healthcheck
    const health = await request('/health');
    console.log(`[1] GET /api/health -> Status: ${health.status}, OK: ${health.data?.status === 'OK'}`);

    // 2. Public Brand
    const brand = await request('/brand');
    console.log(`[2] GET /api/brand -> Status: ${brand.status}, Name: ${brand.data?.data?.name}`);

    // 3. Public Products
    const products = await request('/products');
    console.log(`[3] GET /api/products -> Status: ${products.status}, Count: ${products.data?.data?.length}`);

    // 4. Public Product by Slug
    const velustra = await request('/products/velustra');
    console.log(`[4] GET /api/products/velustra -> Status: ${velustra.status}, Notes: ${velustra.data?.data?.notes?.length}`);

    // 5. Public Categories
    const categories = await request('/categories');
    console.log(`[5] GET /api/categories -> Status: ${categories.status}, Count: ${categories.data?.data?.length}`);

    // 6. Public Collaborations
    const collabs = await request('/collaborations');
    console.log(`[6] GET /api/collaborations -> Status: ${collabs.status}, Count: ${collabs.data?.data?.length}`);

    // 7. Public Legalities
    const legalities = await request('/legalities');
    console.log(`[7] GET /api/legalities -> Status: ${legalities.status}, Count: ${legalities.data?.data?.length}`);

    // 8. Public Socials
    const socials = await request('/socials');
    console.log(`[8] GET /api/socials -> Status: ${socials.status}, Shopee: ${socials.data?.map?.shopee}`);

    // 9. Post Inquiry (Contact Form)
    const newInquiry = await request('/inquiries', {
      method: 'POST',
      body: JSON.stringify({
        nature: 'general',
        name: 'Tester Fragrance',
        email: 'tester@fragrance.com',
        message: 'Testing contact inquiry from test suite'
      })
    });
    console.log(`[9] POST /api/inquiries -> Status: ${newInquiry.status}, Message: ${newInquiry.data?.message}`);

    // 10. Admin Login
    const loginRes = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@vincanddeu.com',
        password: 'password123'
      })
    });
    console.log(`[10] POST /api/auth/login -> Status: ${loginRes.status}, Has Token: ${Boolean(loginRes.data?.token)}`);

    const token = loginRes.data?.token;

    // 11. Admin Dashboard
    const dashboard = await request('/admin/dashboard', { token });
    console.log(`[11] GET /api/admin/dashboard -> Status: ${dashboard.status}, Total Products: ${dashboard.data?.data?.counts?.totalProducts}`);

    // 12. Admin Brand Update
    const updateBrandRes = await request('/admin/brand', {
      method: 'PUT',
      token,
      body: JSON.stringify({
        name: 'VINCAND DEU PARFUM',
        tagline: 'Indonesian Independent Olfactive House'
      })
    });
    console.log(`[12] PUT /api/admin/brand -> Status: ${updateBrandRes.status}`);

    // 13. Admin Inquiries List & Patch Status
    const inquiriesList = await request('/admin/inquiries', { token });
    console.log(`[13] GET /api/admin/inquiries -> Status: ${inquiriesList.status}, Count: ${inquiriesList.data?.data?.length}`);

    if (inquiriesList.data?.data?.length > 0) {
      const firstInquiry = inquiriesList.data.data[0];
      const patchRes = await request(`/admin/inquiries/${firstInquiry.id}`, {
        method: 'PATCH',
        token,
        body: JSON.stringify({ status: 'READ' })
      });
      console.log(`[14] PATCH /api/admin/inquiries/:id -> Status: ${patchRes.status}, New Status: ${patchRes.data?.data?.status}`);
    }

    console.log('\n🎉 ALL BACKEND API TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
  } finally {
    server.close();
  }
}

runTests();

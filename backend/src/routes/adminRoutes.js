import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import { getDashboardSummary } from '../controllers/dashboardController.js';
import { getBrand, updateBrand } from '../controllers/brandController.js';
import {
  getAdminProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import {
  getAdminCollaborations,
  createCollaboration,
  updateCollaboration,
  deleteCollaboration
} from '../controllers/collaborationController.js';
import {
  getLegalities,
  createLegality,
  updateLegality,
  deleteLegality
} from '../controllers/legalityController.js';
import { getSocials, updateSocials } from '../controllers/socialController.js';
import {
  getInquiries,
  updateInquiryStatus,
  deleteInquiry
} from '../controllers/inquiryController.js';
import { getSettings, updateSettings } from '../controllers/settingController.js';

const router = Router();

// Apply JWT authentication to all admin routes
router.use(authenticateToken);

// Dashboard
router.get('/dashboard', getDashboardSummary);

// Brand
router.get('/brand', getBrand);
router.put('/brand', updateBrand);

// Products CRUD
router.get('/products', getAdminProducts);
router.post('/products', createProduct);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Categories CRUD
router.get('/categories', getCategories);
router.post('/categories', createCategory);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// Collaborations CRUD
router.get('/collaborations', getAdminCollaborations);
router.post('/collaborations', createCollaboration);
router.put('/collaborations/:id', updateCollaboration);
router.delete('/collaborations/:id', deleteCollaboration);

// Legalities CRUD
router.get('/legalities', getLegalities);
router.post('/legalities', createLegality);
router.put('/legalities/:id', updateLegality);
router.delete('/legalities/:id', deleteLegality);

// Socials & Contacts
router.get('/socials', getSocials);
router.put('/socials', updateSocials);

// Inquiries
router.get('/inquiries', getInquiries);
router.patch('/inquiries/:id', updateInquiryStatus);
router.delete('/inquiries/:id', deleteInquiry);

// Settings
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

export default router;

import { Router } from 'express';
import { getBrand } from '../controllers/brandController.js';
import { getPublicProducts, getProductBySlug } from '../controllers/productController.js';
import { getCategories, getCategoryById } from '../controllers/categoryController.js';
import { getPublicCollaborations } from '../controllers/collaborationController.js';
import { getLegalities } from '../controllers/legalityController.js';
import { getSocials } from '../controllers/socialController.js';
import { createInquiry } from '../controllers/inquiryController.js';
import { getSettings } from '../controllers/settingController.js';

const router = Router();

// Brand
router.get('/brand', getBrand);

// Settings
router.get('/settings', getSettings);

// Products
router.get('/products', getPublicProducts);
router.get('/products/:slug', getProductBySlug);

// Categories
router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);

// Collaborations
router.get('/collaborations', getPublicCollaborations);

// Legalities
router.get('/legalities', getLegalities);

// Socials
router.get('/socials', getSocials);

// Inquiries (Contact Form Submission)
router.post('/inquiries', createInquiry);

export default router;

import { Router } from 'express';
import FAQController from '../controllers/faqController.js';

const router = Router();

router.post('/faqs', FAQController.create);
router.get('/faqs/:slug', FAQController.getFAQ);

export default router;
import FAQ from '../models/faq.js';
import TranslationService from '../services/translationServices.js';
import sanitizeHtml from 'sanitize-html';

class FAQController {
  #parseAnswerComponents = (answer) => {
    const components = [];
    const codeRegex = /<code>(.*?)<\/code>/g;
    const imgRegex = /<img.*?src="(.*?)".*?>/g;
    
    let position = 0;
    let match;

    // Extract code blocks
    while ((match = codeRegex.exec(answer)) !== null) {
      components.push({
        type: 'code',
        content: match[1],
        position: position++
      });
    }

    // Extract images
    while ((match = imgRegex.exec(answer)) !== null) {
      components.push({
        type: 'image',
        content: match[1],
        position: position++
      });
    }

    // Add remaining text
    const textContent = answer.replace(/<[^>]*>/g, '').trim();
    if (textContent) {
      components.push({
        type: 'text',
        content: textContent,
        position: position
      });
    }

    return components;
  };

  create = async (req, res) => {
    try {
      const {
        question,
        answer,
        category,
        difficulty,
        seo
      } = req.body;

      const questionSlug = question
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-');

      const sanitizedAnswer = sanitizeHtml(answer, {
        allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
        allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, '*': ['class'] }
      });

      const faq = new FAQ({
        questionSlug,
        translations: [{
          language: 'en',
          question,
          answer: sanitizedAnswer,
          answerComponents: this.#parseAnswerComponents(sanitizedAnswer)
        }],
        category,
        difficulty,
        seo
      });

      const supportedLanguages = ['hi', 'bn', 'es', 'fr'];
      
      // Using Promise.all for parallel translation
      const translationPromises = supportedLanguages.map(async (lang) => {
        const [translatedQuestion, translatedAnswer] = await Promise.all([
          TranslationService.translateText(question, lang),
          TranslationService.translateText(answer, lang)
        ]);
        
        return {
          language: lang,
          question: translatedQuestion,
          answer: translatedAnswer,
          answerComponents: this.#parseAnswerComponents(translatedAnswer)
        };
      });

      const translations = await Promise.all(translationPromises);
      faq.translations.push(...translations);

      await faq.save();
      res.status(201).json(faq);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getFAQ = async (req, res) => {
    try {
      const { slug } = req.params;
      const { lang = 'en' } = req.query;

      const faq = await FAQ.findOne({ questionSlug: slug });
      if (!faq) {
        return res.status(404).json({ error: 'FAQ not found' });
      }

      await faq.recordEngagement('view');

      const translation = faq.translations.find(t => t.language === lang) 
        ?? faq.translations.find(t => t.language === 'en');

      const relatedFAQs = await faq.findSimilarFAQs();

      const response = {
        ...translation.toObject(),
        metrics: faq.metrics,
        relatedFAQs: relatedFAQs.map(r => ({
          question: r.translations.find(t => t.language === lang)?.question,
          slug: r.questionSlug
        }))
      };

      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default new FAQController();
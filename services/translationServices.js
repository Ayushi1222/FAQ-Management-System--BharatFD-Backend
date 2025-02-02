import pkg from '@google-cloud/translate';
const { Translate } = pkg;
import Redis from 'ioredis';

class TranslationService {
  #translate;
  #redis;

  constructor() {
    this.#translate = new Translate({
      projectId: process.env.GOOGLE_PROJECT_ID,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
    });
    this.#redis = new Redis(process.env.REDIS_URL);
  }

  translateText = async (text, targetLang) => {
    const cacheKey = `trans:${text}:${targetLang}`;
    
    try {
      // Check cache first
      const cached = await this.#redis.get(cacheKey);
      if (cached) return JSON.parse(cached);

      // Translate and cache
      const [translation] = await this.#translate.translate(text, targetLang);
      await this.#redis.set(cacheKey, JSON.stringify(translation), 'EX', 86400);
      
      return translation;
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  }
}

export default TranslationService;
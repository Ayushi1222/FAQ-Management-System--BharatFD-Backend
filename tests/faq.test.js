import request from 'supertest';
import app from '../server.js';
import mongoose from 'mongoose';

describe('FAQ API', () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  it('should fetch FAQs in default language', async () => {
    const res = await request(app).get('/api/faqs');
    expect(res.statusCode).toEqual(200);
  });

  it('should create a new FAQ', async () => {
    const res = await request(app).post('/api/faqs').send({
      question: 'What is Node.js?',
      answer: 'Node.js is a JavaScript runtime.',
    });
    expect(res.statusCode).toEqual(201);
  });
});

const request = require('supertest');
const express = require('express');
const postRoutes = require('../Resources/routes/PostRoutes'); // Adjust path as needed

// Mock the controller methods
jest.mock('../Resources/controllers/postsController', () => ({
  create: jest.fn((req, res) => res.status(201).send('Post created')),
  getByCreator: jest.fn((req, res) => res.status(200).send('Posts by creator')),
  getComments: jest.fn((req, res) => res.status(200).send('Post comments')),
  getOne: jest.fn((req, res) => res.status(200).send('Single post')),
  getAll: jest.fn((req, res) => res.status(200).send('All posts')),
  update: jest.fn((req, res) => res.status(200).send('Post updated')),
  delete: jest.fn((req, res) => res.status(200).send('Post deleted')),
}));

const app = express();
app.use(express.json());
app.use('/posts', postRoutes);

describe('Post Routes', () => {
  it('POST /posts - should create a post', async () => {
    const res = await request(app).post('/posts');
    expect(res.statusCode).toBe(201);
    expect(res.text).toBe('Post created');
  });

  it('GET /posts/creator/:creator - should get posts by creator', async () => {
    const res = await request(app).get('/posts/creator/someUser');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Posts by creator');
  });

  it('GET /posts/:post/comments - should get comments of a post', async () => {
    const res = await request(app).get('/posts/123/comments');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Post comments');
  });

  it('GET /posts/:post_id - should get a single post', async () => {
    const res = await request(app).get('/posts/123');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Single post');
  });

  it('GET /posts - should get all posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('All posts');
  });

  it('PUT /posts/:post_id - should update a post', async () => {
    const res = await request(app).put('/posts/123');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Post updated');
  });

  it('DELETE /posts/:post_id - should delete a post', async () => {
    const res = await request(app).delete('/posts/123');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Post deleted');
  });
});

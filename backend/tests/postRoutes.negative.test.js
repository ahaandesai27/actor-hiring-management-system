const request = require('supertest');
const express = require('express');
const PostController = require('../Resources/controllers/postsController');
const postRoutes = require('../Resources/routes/PostRoutes'); // Adjust path as needed

jest.mock('../Resources/controllers/postsController');

// Create a mock app
const app = express();
app.use(express.json());
app.use('/posts', postRoutes);

describe('Post Routes - Negative Test Cases', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('POST /posts - should handle failure to create post', async () => {
    PostController.create.mockImplementation((req, res) => {
      res.status(400).send('Invalid post data');
    });

    const res = await request(app).post('/posts').send({});
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('Invalid post data');
  });

  it('GET /posts/creator/:creator - should handle invalid creator', async () => {
    PostController.getByCreator.mockImplementation((req, res) => {
      res.status(404).send('Creator not found');
    });

    const res = await request(app).get('/posts/creator/unknownUser');
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe('Creator not found');
  });

  it('GET /posts/:post/comments - should handle post not found for comments', async () => {
    PostController.getComments.mockImplementation((req, res) => {
      res.status(404).send('Comments not found');
    });

    const res = await request(app).get('/posts/invalidPost/comments');
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe('Comments not found');
  });

  it('GET /posts/:post_id - should handle non-existent post', async () => {
    PostController.getOne.mockImplementation((req, res) => {
      res.status(404).send('Post not found');
    });

    const res = await request(app).get('/posts/nonexistent');
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe('Post not found');
  });

  it('PUT /posts/:post_id - should handle update on non-existent post', async () => {
    PostController.update.mockImplementation((req, res) => {
      res.status(404).send('Cannot update. Post not found');
    });

    const res = await request(app).put('/posts/badID').send({ title: 'Updated' });
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe('Cannot update. Post not found');
  });

  it('DELETE /posts/:post_id - should handle delete on non-existent post', async () => {
    PostController.delete.mockImplementation((req, res) => {
      res.status(404).send('Post not found');
    });

    const res = await request(app).delete('/posts/missingID');
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe('Post not found');
  });
});

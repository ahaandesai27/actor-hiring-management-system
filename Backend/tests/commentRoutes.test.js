const request = require('supertest');
const express = require('express');
const commentRouter = require('../Resources/routes/commentRoutes');
const commentController = require('../Resources/controllers/commentsController');

// Mock the commentController methods
jest.mock('../Resources/controllers/commentsController', () => ({
  create: jest.fn((req, res) => res.status(201).json({ message: 'Comment created', id: '123' })),
  update: jest.fn((req, res) => res.status(200).json({ message: 'Comment updated' })),
  delete: jest.fn((req, res) => res.status(200).json({ message: 'Comment deleted' }))
}));

// Setup express app for testing
const app = express();
app.use(express.json());
app.use('/api/comments', commentRouter);

describe('Comment Routes', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('POST /', () => {
    it('should create a new comment', async () => {
      const commentData = { 
        text: 'This is a test comment',
        user_id: 'user123',
        post_id: 'post456'
      };

      const response = await request(app)
        .post('/api/comments')
        .send(commentData)
        .expect(201);

      expect(response.body.message).toBe('Comment created');
      expect(response.body).toHaveProperty('id');
      expect(commentController.create).toHaveBeenCalledTimes(1);
      expect(commentController.create.mock.calls[0][0].body).toEqual(commentData);
    });
  });

  describe('PUT /:comment_id', () => {
    it('should update a comment', async () => {
      const comment_id = '123abc';
      const updateData = { 
        text: 'This is an updated comment'
      };

      const response = await request(app)
        .put(`/api/comments/${comment_id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.message).toBe('Comment updated');
      expect(commentController.update).toHaveBeenCalledTimes(1);
      expect(commentController.update.mock.calls[0][0].params).toEqual({ comment_id });
      expect(commentController.update.mock.calls[0][0].body).toEqual(updateData);
    });
  });

  describe('DELETE /:comment_id', () => {
    it('should delete a comment', async () => {
      const comment_id = '123abc';

      const response = await request(app)
        .delete(`/api/comments/${comment_id}`)
        .expect(200);

      expect(response.body.message).toBe('Comment deleted');
      expect(commentController.delete).toHaveBeenCalledTimes(1);
      expect(commentController.delete.mock.calls[0][0].params).toEqual({ comment_id });
    });
  });
});
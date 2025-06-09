const request = require('supertest');
const express = require('express');
const commentRouter = require('../Resources/routes/commentRoutes');
const commentController = require('../Resources/controllers/commentsController');

// Mock the controller with error cases
jest.mock('../Resources/controllers/commentsController', () => ({
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}));

const app = express();
app.use(express.json());
app.use('/api/comments', commentRouter);

describe('Comment Routes - Negative Test Cases', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /', () => {
    it('should return 400 if comment data is missing', async () => {
      commentController.create.mockImplementation((req, res) => {
        res.status(400).json({ error: 'Missing comment data' });
      });

      const response = await request(app)
        .post('/api/comments')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Missing comment data');
      expect(commentController.create).toHaveBeenCalledTimes(1);
    });

    it('should return 500 if comment creation fails', async () => {
      commentController.create.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Internal Server Error' });
      });

      const response = await request(app)
        .post('/api/comments')
        .send({
          text: 'This is a comment',
          user_id: 'user123',
          post_id: 'post456'
        })
        .expect(500);

      expect(response.body).toHaveProperty('error', 'Internal Server Error');
      expect(commentController.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /:comment_id', () => {
    it('should return 404 if comment to update is not found', async () => {
      commentController.update.mockImplementation((req, res) => {
        res.status(404).json({ error: 'Comment not found' });
      });

      const response = await request(app)
        .put('/api/comments/nonexistent')
        .send({ text: 'Updated text' })
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Comment not found');
      expect(commentController.update).toHaveBeenCalledTimes(1);
    });

    it('should return 400 if no text is provided for update', async () => {
      commentController.update.mockImplementation((req, res) => {
        res.status(400).json({ error: 'No update data provided' });
      });

      const response = await request(app)
        .put('/api/comments/123')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error', 'No update data provided');
      expect(commentController.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('DELETE /:comment_id', () => {
    it('should return 404 if comment to delete is not found', async () => {
      commentController.delete.mockImplementation((req, res) => {
        res.status(404).json({ error: 'Comment not found' });
      });

      const response = await request(app)
        .delete('/api/comments/fake123')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Comment not found');
      expect(commentController.delete).toHaveBeenCalledTimes(1);
    });

    it('should return 500 if deletion fails due to server error', async () => {
      commentController.delete.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Failed to delete comment' });
      });

      const response = await request(app)
        .delete('/api/comments/123')
        .expect(500);

      expect(response.body).toHaveProperty('error', 'Failed to delete comment');
      expect(commentController.delete).toHaveBeenCalledTimes(1);
    });
  });
});

const request = require('supertest');
const express = require('express');
const connectionsRouter = require('../Resources/routes/ConnectionRoutes');
const connectionsController = require('../Resources/controllers/connectionsController');

// Mock controller methods
jest.mock('../Resources/controllers/connectionsController', () => ({
  followProfessional: jest.fn(),
  unfollowProfessional: jest.fn(),
  getFollowing: jest.fn(),
  getFollowers: jest.fn()
}));

const app = express();
app.use(express.json());
app.use('/api/connections', connectionsRouter);

describe('Connections Routes - Negative Test Cases', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /:professional1/follow/:professional2', () => {
    it('should return 400 if trying to follow self', async () => {
      connectionsController.followProfessional.mockImplementation((req, res) => {
        res.status(400).json({ error: 'Cannot follow yourself' });
      });

      const res = await request(app)
        .post('/api/connections/prof123/follow/prof123')
        .expect(400);

      expect(res.body).toHaveProperty('error', 'Cannot follow yourself');
      expect(connectionsController.followProfessional).toHaveBeenCalledTimes(1);
    });

    it('should return 500 on follow failure', async () => {
      connectionsController.followProfessional.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Follow failed due to server error' });
      });

      const res = await request(app)
        .post('/api/connections/prof123/follow/prof456')
        .expect(500);

      expect(res.body).toHaveProperty('error', 'Follow failed due to server error');
    });
  });

  describe('POST /:professional1/unfollow/:professional2', () => {
    it('should return 404 if user is not following the other', async () => {
      connectionsController.unfollowProfessional.mockImplementation((req, res) => {
        res.status(404).json({ error: 'Follow relationship not found' });
      });

      const res = await request(app)
        .post('/api/connections/prof123/unfollow/prof456')
        .expect(404);

      expect(res.body).toHaveProperty('error', 'Follow relationship not found');
    });

    it('should return 500 on unfollow failure', async () => {
      connectionsController.unfollowProfessional.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Server error during unfollow' });
      });

      const res = await request(app)
        .post('/api/connections/prof123/unfollow/prof456')
        .expect(500);

      expect(res.body).toHaveProperty('error', 'Server error during unfollow');
    });
  });

  describe('GET /:professional/following', () => {
    it('should return 400 if professional ID is invalid', async () => {
      connectionsController.getFollowing.mockImplementation((req, res) => {
        res.status(400).json({ error: 'Invalid professional ID' });
      });

      const res = await request(app)
        .get('/api/connections/!nvalid/following')
        .expect(400);

      expect(res.body).toHaveProperty('error', 'Invalid professional ID');
    });

    it('should return 500 on failure to fetch following list', async () => {
      connectionsController.getFollowing.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Server error while fetching following list' });
      });

      const res = await request(app)
        .get('/api/connections/prof123/following')
        .expect(500);

      expect(res.body).toHaveProperty('error', 'Server error while fetching following list');
    });
  });

  describe('GET /:professional/followers', () => {
    it('should return 404 if professional does not exist', async () => {
      connectionsController.getFollowers.mockImplementation((req, res) => {
        res.status(404).json({ error: 'Professional not found' });
      });

      const res = await request(app)
        .get('/api/connections/nonexistent/followers')
        .expect(404);

      expect(res.body).toHaveProperty('error', 'Professional not found');
    });

    it('should return 500 on failure to fetch followers', async () => {
      connectionsController.getFollowers.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Failed to get followers' });
      });

      const res = await request(app)
        .get('/api/connections/prof123/followers')
        .expect(500);

      expect(res.body).toHaveProperty('error', 'Failed to get followers');
    });
  });
});

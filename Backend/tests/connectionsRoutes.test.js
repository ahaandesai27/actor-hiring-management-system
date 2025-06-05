const request = require('supertest');
const express = require('express');
const connectionsRouter = require('../Resources/routes/ConnectionRoutes');
const connectionsController = require('../Resources/controllers/connectionsController');

// Mock the connectionsController methods
jest.mock('../Resources/controllers/connectionsController', () => ({
  followProfessional: jest.fn((req, res) => res.status(200).json({ message: 'Follow successful' })),
  unfollowProfessional: jest.fn((req, res) => res.status(200).json({ message: 'Unfollow successful' })),
  getFollowing: jest.fn((req, res) => res.status(200).json({ following: [] })),
  getFollowers: jest.fn((req, res) => res.status(200).json({ followers: [] }))
}));

// Setup express app for testing
const app = express();
app.use(express.json());
app.use('/api/connections', connectionsRouter);

describe('Connections Routes', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('POST /:professional1/follow/:professional2', () => {
    it('should follow a professional', async () => {
      const professional1 = 'prof123';
      const professional2 = 'prof456';

      const response = await request(app)
        .post(`/api/connections/${professional1}/follow/${professional2}`)
        .expect(200);

      expect(response.body.message).toBe('Follow successful');
      expect(connectionsController.followProfessional).toHaveBeenCalledTimes(1);
      expect(connectionsController.followProfessional.mock.calls[0][0].params).toEqual({
        professional1,
        professional2
      });
    });
  });

  describe('POST /:professional1/unfollow/:professional2', () => {
    it('should unfollow a professional', async () => {
      const professional1 = 'prof123';
      const professional2 = 'prof456';

      const response = await request(app)
        .post(`/api/connections/${professional1}/unfollow/${professional2}`)
        .expect(200);

      expect(response.body.message).toBe('Unfollow successful');
      expect(connectionsController.unfollowProfessional).toHaveBeenCalledTimes(1);
      expect(connectionsController.unfollowProfessional.mock.calls[0][0].params).toEqual({
        professional1,
        professional2
      });
    });
  });

  describe('GET /:professional/following', () => {
    it('should get professionals that a user is following', async () => {
      const professional = 'prof123';

      const response = await request(app)
        .get(`/api/connections/${professional}/following`)
        .expect(200);

      expect(response.body).toHaveProperty('following');
      expect(connectionsController.getFollowing).toHaveBeenCalledTimes(1);
      expect(connectionsController.getFollowing.mock.calls[0][0].params).toEqual({
        professional
      });
    });
  });

  describe('GET /:professional/followers', () => {
    it('should get followers of a professional', async () => {
      const professional = 'prof123';

      const response = await request(app)
        .get(`/api/connections/${professional}/followers`)
        .expect(200);

      expect(response.body).toHaveProperty('followers');
      expect(connectionsController.getFollowers).toHaveBeenCalledTimes(1);
      expect(connectionsController.getFollowers.mock.calls[0][0].params).toEqual({
        professional
      });
    });
  });
});
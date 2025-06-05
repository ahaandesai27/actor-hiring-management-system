const request = require('supertest');
const express = require('express');
const locationRoutes = require('../Resources/routes/locationRoutes');
const locationController = require('../Resources/controllers/locationController');

jest.mock('../Resources/controllers/locationController', () => ({
  create: jest.fn(),
  getOne: jest.fn(),
  getAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}));

const app = express();
app.use(express.json());
app.use('/api/locations', locationRoutes);

describe('Location Routes - Negative Test Cases', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /', () => {
    it('should return 500 if creation fails', async () => {
      locationController.create.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Database error' });
      });

      const response = await request(app).post('/api/locations').send({});
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
      expect(locationController.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /', () => {
    it('should return 500 if fetching all locations fails', async () => {
      locationController.getAll.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Database error' });
      });

      const response = await request(app).get('/api/locations');
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
      expect(locationController.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /:latitude/:longitude', () => {
    it('should return 404 if location not found', async () => {
      locationController.getOne.mockImplementation((req, res) => {
        res.status(404).json({ message: 'Location not found' });
      });

      const response = await request(app)
        .get('/api/locations/99.999999/-99.999999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Location not found');
      expect(locationController.getOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /:latitude/:longitude', () => {
    it('should return 404 if location to update not found', async () => {
      locationController.update.mockImplementation((req, res) => {
        res.status(404).json({ message: 'Location not found.' });
      });

      const response = await request(app)
        .put('/api/locations/99.999999/-99.999999')
        .send({ name: 'Update Attempt' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Location not found.');
      expect(locationController.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('DELETE /:latitude/:longitude', () => {
    it('should return 404 if location to delete not found', async () => {
      locationController.delete.mockImplementation((req, res) => {
        res.status(404).json({ message: 'Location not found.' });
      });

      const response = await request(app)
        .delete('/api/locations/99.999999/-99.999999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Location not found.');
      expect(locationController.delete).toHaveBeenCalledTimes(1);
    });
  });
});

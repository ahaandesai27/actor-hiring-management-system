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

describe('Location Routes', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /', () => {
    it('should create a new location', async () => {
      const mockLocation = {
        latitude: 40.123456,
        longitude: -74.123456,
        name: 'Test Location',
        freq_of_booking: 10,
        rating: 4.5,
        cost_of_booking: 100,
        conditions: 'Good'
      };

      
      locationController.create.mockImplementation((req, res) => {
        res.status(201).json({ ...mockLocation, id: 1 });
      });

      const response = await request(app)
        .post('/api/locations')
        .send(mockLocation);

      expect(response.status).toBe(201);
      expect(locationController.create).toHaveBeenCalledTimes(1);
      expect(response.body).toHaveProperty('latitude', mockLocation.latitude);
      expect(response.body).toHaveProperty('longitude', mockLocation.longitude);
      expect(response.body).toHaveProperty('name', mockLocation.name);
    });

    it('should return 500 if creation fails', async () => {
      locationController.create.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Database error' });
      });

      const response = await request(app)
        .post('/api/locations')
        .send({});

      expect(response.status).toBe(500);
      expect(locationController.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /', () => {
    it('should get all locations', async () => {
      const mockLocations = [
        {
          latitude: 40.123456,
          longitude: -74.123456,
          name: 'Test Location 1'
        },
        {
          latitude: 41.123456,
          longitude: -75.123456,
          name: 'Test Location 2'
        }
      ];

      locationController.getAll.mockImplementation((req, res) => {
        res.status(200).json(mockLocations);
      });

      const response = await request(app).get('/api/locations');

      expect(response.status).toBe(200);
      expect(locationController.getAll).toHaveBeenCalledTimes(1);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
    });

    it('should return 500 if fetching all locations fails', async () => {
      locationController.getAll.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Database error' });
      });

      const response = await request(app).get('/api/locations');

      expect(response.status).toBe(500);
      expect(locationController.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /:latitude/:longitude', () => {
    it('should get a specific location', async () => {
      const mockLocation = {
        latitude: 40.123456,
        longitude: -74.123456,
        name: 'Test Location',
        freq_of_booking: 10,
        rating: 4.5,
        cost_of_booking: 100,
        conditions: 'Good'
      };

      locationController.getOne.mockImplementation((req, res) => {
        res.status(200).json(mockLocation);
      });

      const response = await request(app)
        .get('/api/locations/40.123456/-74.123456');

      expect(response.status).toBe(200);
      expect(locationController.getOne).toHaveBeenCalledTimes(1);
      expect(response.body).toHaveProperty('latitude', mockLocation.latitude);
      expect(response.body).toHaveProperty('longitude', mockLocation.longitude);
    });

    it('should return 404 if location not found', async () => {
      locationController.getOne.mockImplementation((req, res) => {
        res.status(404).json({ message: 'Location not found' });
      });

      const response = await request(app)
        .get('/api/locations/99.999999/-99.999999');

      expect(response.status).toBe(404);
      expect(locationController.getOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /:latitude/:longitude', () => {
    it('should update a specific location', async () => {
      const updateData = {
        name: 'Updated Location',
        rating: 5.0
      };

      locationController.update.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Updated successfully.' });
      });

      const response = await request(app)
        .put('/api/locations/40.123456/-74.123456')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(locationController.update).toHaveBeenCalledTimes(1);
      expect(response.body).toHaveProperty('message', 'Updated successfully.');
    });

    it('should return 404 if location to update not found', async () => {
      locationController.update.mockImplementation((req, res) => {
        res.status(404).json({ message: 'Location not found.' });
      });

      const response = await request(app)
        .put('/api/locations/99.999999/-99.999999')
        .send({ name: 'Will Not Update' });

      expect(response.status).toBe(404);
      expect(locationController.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('DELETE /:latitude/:longitude', () => {
    it('should delete a specific location', async () => {
      locationController.delete.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Deleted successfully.' });
      });

      const response = await request(app)
        .delete('/api/locations/40.123456/-74.123456');

      expect(response.status).toBe(200);
      expect(locationController.delete).toHaveBeenCalledTimes(1);
      expect(response.body).toHaveProperty('message', 'Deleted successfully.');
    });

    it('should return 404 if location to delete not found', async () => {
      locationController.delete.mockImplementation((req, res) => {
        res.status(404).json({ message: 'Location not found.' });
      });

      const response = await request(app)
        .delete('/api/locations/99.999999/-99.999999');

      expect(response.status).toBe(404);
      expect(locationController.delete).toHaveBeenCalledTimes(1);
    });
  });
});
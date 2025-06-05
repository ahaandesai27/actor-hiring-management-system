const request = require('supertest');
const express = require('express');
const bookingRoutes = require('../Resources/routes/bookingRoutes');
const bookingController = require('../Resources/controllers/bookingController');

// Mock the controller
jest.mock('../Resources/controllers/bookingController', () => ({
  create: jest.fn(),
  getAll: jest.fn(),
  getOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getBookingsByOrganization: jest.fn(),
  getBookingsByLocation: jest.fn()
}));

const app = express();
app.use(express.json());
app.use('/api/bookings', bookingRoutes);

describe('Booking Routes - Negative Test Cases', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/bookings', () => {
    it('should return 400 if required fields are missing', async () => {
      bookingController.create.mockImplementation((req, res) => {
        res.status(400).json({ error: 'Missing required fields' });
      });

      const res = await request(app).post('/api/bookings').send({ org_id: 1 });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Missing required fields');
    });

    it("should return 400 if organization doesn't exist", async () => {
      bookingController.create.mockImplementation((req, res) => {
        res.status(400).json({ error: "Organization doesn't exist" });
      });

      const res = await request(app).post('/api/bookings').send({
        latitude: 40.123456,
        longitude: -74.123456,
        org_id: 999,
        startbookingdate: '2025-04-30T10:00:00.000Z',
        endbookingdate: '2025-05-02T16:00:00.000Z'
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', "Organization doesn't exist");
    });

    it("should return 400 if location doesn't exist", async () => {
      bookingController.create.mockImplementation((req, res) => {
        res.status(400).json({ error: "Location doesn't exist" });
      });

      const res = await request(app).post('/api/bookings').send({
        latitude: 99.999999,
        longitude: -99.999999,
        org_id: 1,
        startbookingdate: '2025-04-30T10:00:00.000Z',
        endbookingdate: '2025-05-02T16:00:00.000Z'
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', "Location doesn't exist");
    });

    it('should return 500 if database error occurs', async () => {
      bookingController.create.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Database error' });
      });

      const res = await request(app).post('/api/bookings').send({});
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('error', 'Database error');
    });
  });

  describe('PUT /api/bookings/:lat/:long/:org_id', () => {
    it('should return 400 if date format is invalid', async () => {
      bookingController.update.mockImplementation((req, res) => {
        res.status(400).json({ error: 'Invalid date format' });
      });

      const res = await request(app)
        .put('/api/bookings/40.123456/-74.123456/1')
        .send({
          startbookingdate: 'not-a-date',
          endbookingdate: 'still-not-a-date'
        });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Invalid date format');
    });

    it('should return 404 if booking not found for update', async () => {
      bookingController.update.mockImplementation((req, res) => {
        res.status(404).json({ message: 'Booking not found.' });
      });

      const res = await request(app)
        .put('/api/bookings/99.999999/-99.999999/999')
        .send({
          startbookingdate: '2025-05-01T10:00:00.000Z',
          endbookingdate: '2025-05-03T16:00:00.000Z'
        });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Booking not found.');
    });
  });

  describe('DELETE /api/bookings/:lat/:long/:org_id', () => {
    it('should return 400 for invalid coordinates', async () => {
      bookingController.delete.mockImplementation((req, res) => {
        res.status(400).json({ error: 'Invalid coordinates' });
      });

      const res = await request(app).delete('/api/bookings/abc/xyz/1');
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Invalid coordinates');
    });

    it('should return 404 if booking not found for delete', async () => {
      bookingController.delete.mockImplementation((req, res) => {
        res.status(404).json({ message: 'Booking not found.' });
      });

      const res = await request(app).delete('/api/bookings/99.999999/-99.999999/999');
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Booking not found.');
    });
  });

  describe('GET /api/bookings/organization/:org_id', () => {
    it('should return 400 if org_id is not a number', async () => {
      bookingController.getBookingsByOrganization.mockImplementation((req, res) => {
        res.status(400).json({ error: 'Invalid org_id' });
      });

      const res = await request(app).get('/api/bookings/organization/invalid');
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error', 'Invalid org_id');
    });
  });

  describe('GET /api/bookings/location/:lat/:long', () => {
    it('should return 500 if server fails to fetch bookings by location', async () => {
      bookingController.getBookingsByLocation.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Server error' });
      });

      const res = await request(app).get('/api/bookings/location/40.123456/-74.123456');
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('error', 'Server error');
    });
  });
});

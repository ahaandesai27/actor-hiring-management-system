const request = require('supertest');
const express = require('express');
const bookingRoutes = require('../Resources/routes/bookingRoutes');
const bookingController = require('../Resources/controllers/bookingController');

// Mock the booking controller methods
jest.mock('../Resources/controllers/bookingController', () => ({
  create: jest.fn(),
  getAll: jest.fn(),
  getOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getBookingsByOrganization: jest.fn(),
  getBookingsByLocation: jest.fn()
}));

// Create an Express application for testing
const app = express();
app.use(express.json());
app.use('/api/bookings', bookingRoutes);

describe('Booking Routes', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /', () => {
    it('should create a new booking', async () => {
      const mockBooking = {
        latitude: 40.123456,
        longitude: -74.123456,
        org_id: 1,
        startbookingdate: '2025-04-30T10:00:00.000Z',
        endbookingdate: '2025-05-02T16:00:00.000Z'
      };

      // Mock the implementation for this test
      bookingController.create.mockImplementation((req, res) => {
        res.status(201).json({ ...mockBooking, id: 1 });
      });

      const response = await request(app)
        .post('/api/bookings')
        .send(mockBooking);

      expect(response.status).toBe(201);
      expect(bookingController.create).toHaveBeenCalledTimes(1);
      expect(response.body).toHaveProperty('latitude', mockBooking.latitude);
      expect(response.body).toHaveProperty('longitude', mockBooking.longitude);
      expect(response.body).toHaveProperty('org_id', mockBooking.org_id);
      expect(response.body).toHaveProperty('startbookingdate', mockBooking.startbookingdate);
      expect(response.body).toHaveProperty('endbookingdate', mockBooking.endbookingdate);
    });

    it('should return 400 if organization does not exist', async () => {
      bookingController.create.mockImplementation((req, res) => {
        res.status(400).json({ error: "Organization doesn't exist" });
      });

      const response = await request(app)
        .post('/api/bookings')
        .send({
          latitude: 40.123456,
          longitude: -74.123456,
          org_id: 999, // non-existent org_id
          startbookingdate: '2025-04-30T10:00:00.000Z',
          endbookingdate: '2025-05-02T16:00:00.000Z'
        });

      expect(response.status).toBe(400);
      expect(bookingController.create).toHaveBeenCalledTimes(1);
      expect(response.body).toHaveProperty('error', "Organization doesn't exist");
    });

    it('should return 400 if location does not exist', async () => {
      bookingController.create.mockImplementation((req, res) => {
        res.status(400).json({ error: "Location doesn't exist" });
      });

      const response = await request(app)
        .post('/api/bookings')
        .send({
          latitude: 99.999999, // non-existent location
          longitude: -99.999999,
          org_id: 1,
          startbookingdate: '2025-04-30T10:00:00.000Z',
          endbookingdate: '2025-05-02T16:00:00.000Z'
        });

      expect(response.status).toBe(400);
      expect(bookingController.create).toHaveBeenCalledTimes(1);
      expect(response.body).toHaveProperty('error', "Location doesn't exist");
    });

    it('should return 500 if creation fails', async () => {
      bookingController.create.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Database error' });
      });

      const response = await request(app)
        .post('/api/bookings')
        .send({});

      expect(response.status).toBe(500);
      expect(bookingController.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /', () => {
    it('should get all bookings with organization and location details', async () => {
      const mockBookings = [
        {
          latitude: 40.123456,
          longitude: -74.123456,
          org_id: 1,
          startbookingdate: '2025-04-30T10:00:00.000Z',
          endbookingdate: '2025-05-02T16:00:00.000Z',
          Organization: { name: 'Org 1' },
          Location: { name: 'Location 1' }
        },
        {
          latitude: 41.123456,
          longitude: -75.123456,
          org_id: 2,
          startbookingdate: '2025-05-05T10:00:00.000Z',
          endbookingdate: '2025-05-07T16:00:00.000Z',
          Organization: { name: 'Org 2' },
          Location: { name: 'Location 2' }
        }
      ];

      bookingController.getAll.mockImplementation((req, res) => {
        res.status(200).json(mockBookings);
      });

      const response = await request(app).get('/api/bookings');

      expect(response.status).toBe(200);
      expect(bookingController.getAll).toHaveBeenCalledTimes(1);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('Organization');
      expect(response.body[0]).toHaveProperty('Location');
    });

    it('should return 500 if fetching all bookings fails', async () => {
      bookingController.getAll.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Database error' });
      });

      const response = await request(app).get('/api/bookings');

      expect(response.status).toBe(500);
      expect(bookingController.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /:latitude/:longitude/:org_id', () => {
    it('should update a specific booking', async () => {
      const updateData = {
        startbookingdate: '2025-05-01T10:00:00.000Z',
        endbookingdate: '2025-05-03T16:00:00.000Z'
      };

      bookingController.update.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Updated successfully.' });
      });

      const response = await request(app)
        .put('/api/bookings/40.123456/-74.123456/1')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(bookingController.update).toHaveBeenCalledTimes(1);
      expect(response.body).toHaveProperty('message', 'Updated successfully.');
    });

    it('should return 404 if booking to update not found', async () => {
      bookingController.update.mockImplementation((req, res) => {
        res.status(404).json({ message: 'Booking not found.' });
      });

      const response = await request(app)
        .put('/api/bookings/99.999999/-99.999999/999')
        .send({
          startbookingdate: '2025-05-01T10:00:00.000Z',
          endbookingdate: '2025-05-03T16:00:00.000Z'
        });

      expect(response.status).toBe(404);
      expect(bookingController.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('DELETE /:latitude/:longitude/:org_id', () => {
    it('should delete a specific booking', async () => {
      bookingController.delete.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Deleted successfully.' });
      });

      const response = await request(app)
        .delete('/api/bookings/40.123456/-74.123456/1');

      expect(response.status).toBe(200);
      expect(bookingController.delete).toHaveBeenCalledTimes(1);
      expect(response.body).toHaveProperty('message', 'Deleted successfully.');
    });

    it('should return 404 if booking to delete not found', async () => {
      bookingController.delete.mockImplementation((req, res) => {
        res.status(404).json({ message: 'Booking not found.' });
      });

      const response = await request(app)
        .delete('/api/bookings/99.999999/-99.999999/999');

      expect(response.status).toBe(404);
      expect(bookingController.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /organization/:org_id', () => {
    it('should get all bookings for a specific organization', async () => {
      const mockOrgBookings = [
        {
          latitude: 40.123456,
          longitude: -74.123456,
          org_id: 1,
          startbookingdate: '2025-04-30T10:00:00.000Z',
          endbookingdate: '2025-05-02T16:00:00.000Z',
          Location: { 
            name: 'Location 1',
            rating: 4.5,
            cost_of_booking: 100
          }
        },
        {
          latitude: 41.123456,
          longitude: -75.123456,
          org_id: 1,
          startbookingdate: '2025-05-05T10:00:00.000Z',
          endbookingdate: '2025-05-07T16:00:00.000Z',
          Location: { 
            name: 'Location 2',
            rating: 4.8,
            cost_of_booking: 150
          }
        }
      ];

      bookingController.getBookingsByOrganization.mockImplementation((req, res) => {
        res.status(200).json(mockOrgBookings);
      });

      const response = await request(app).get('/api/bookings/organization/1');

      expect(response.status).toBe(200);
      expect(bookingController.getBookingsByOrganization).toHaveBeenCalledTimes(1);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('org_id', 1);
      expect(response.body[0]).toHaveProperty('Location');
      expect(response.body[0].Location).toHaveProperty('name');
      expect(response.body[0].Location).toHaveProperty('rating');
      expect(response.body[0].Location).toHaveProperty('cost_of_booking');
    });

    it('should return empty array if no bookings found for organization', async () => {
      bookingController.getBookingsByOrganization.mockImplementation((req, res) => {
        res.status(200).json([]);
      });

      const response = await request(app).get('/api/bookings/organization/999');

      expect(response.status).toBe(200);
      expect(bookingController.getBookingsByOrganization).toHaveBeenCalledTimes(1);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0);
    });
  });

  describe('GET /location/:latitude/:longitude', () => {
    it('should get all bookings for a specific location', async () => {
      const mockLocationBookings = [
        {
          latitude: 40.123456,
          longitude: -74.123456,
          org_id: 1,
          startbookingdate: '2025-04-30T10:00:00.000Z',
          endbookingdate: '2025-05-02T16:00:00.000Z',
          Organization: { 
            name: 'Org 1',
            number_of_employees: 100
          }
        },
        {
          latitude: 40.123456,
          longitude: -74.123456,
          org_id: 2,
          startbookingdate: '2025-05-05T10:00:00.000Z',
          endbookingdate: '2025-05-07T16:00:00.000Z',
          Organization: { 
            name: 'Org 2',
            number_of_employees: 50
          }
        }
      ];

      bookingController.getBookingsByLocation.mockImplementation((req, res) => {
        res.status(200).json(mockLocationBookings);
      });

      const response = await request(app).get('/api/bookings/location/40.123456/-74.123456');

      expect(response.status).toBe(200);
      expect(bookingController.getBookingsByLocation).toHaveBeenCalledTimes(1);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('latitude', 40.123456);
      expect(response.body[0]).toHaveProperty('longitude', -74.123456);
      expect(response.body[0]).toHaveProperty('Organization');
      expect(response.body[0].Organization).toHaveProperty('name');
      expect(response.body[0].Organization).toHaveProperty('number_of_employees');
    });

    it('should return empty array if no bookings found for location', async () => {
      bookingController.getBookingsByLocation.mockImplementation((req, res) => {
        res.status(200).json([]);
      });

      const response = await request(app).get('/api/bookings/location/99.999999/-99.999999');

      expect(response.status).toBe(200);
      expect(bookingController.getBookingsByLocation).toHaveBeenCalledTimes(1);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(0);
    });
  });
});
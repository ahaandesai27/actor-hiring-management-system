const request = require('supertest');
const express = require('express');
const organizationRouter = require('../Resources/routes/OrganizationRoutes');
const organizationController = require('../Resources/controllers/organizationController');

jest.mock('../Resources/controllers/organizationController', () => ({
  create: jest.fn(),
  getOne: jest.fn(),
  getAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}));

const app = express();
app.use(express.json());
app.use('/api/organizations', organizationRouter);

describe('Organization Routes - Negative Test Cases', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /', () => {
    it('should return 500 if creation fails', async () => {
      organizationController.create.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Creation failed' });
      });

      const response = await request(app)
        .post('/api/organizations')
        .send({});

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Creation failed');
      expect(organizationController.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /:org_id', () => {
    it('should return 404 if organization not found', async () => {
      organizationController.getOne.mockImplementation((req, res) => {
        res.status(404).json({ message: 'Organization not found' });
      });

      const response = await request(app)
        .get('/api/organizations/invalid-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Organization not found');
      expect(organizationController.getOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /', () => {
    it('should return 500 if fetching all organizations fails', async () => {
      organizationController.getAll.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Database error' });
      });

      const response = await request(app)
        .get('/api/organizations');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
      expect(organizationController.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /:org_id', () => {
    it('should return 404 if organization to update not found', async () => {
      organizationController.update.mockImplementation((req, res) => {
        res.status(404).json({ message: 'Organization not found' });
      });

      const response = await request(app)
        .put('/api/organizations/invalid-id')
        .send({ name: 'Nonexistent Org' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Organization not found');
      expect(organizationController.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('DELETE /:org_id', () => {
    it('should return 404 if organization to delete not found', async () => {
      organizationController.delete.mockImplementation((req, res) => {
        res.status(404).json({ message: 'Organization not found' });
      });

      const response = await request(app)
        .delete('/api/organizations/invalid-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Organization not found');
      expect(organizationController.delete).toHaveBeenCalledTimes(1);
    });
  });
});

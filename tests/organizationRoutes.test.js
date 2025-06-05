const request = require('supertest');
const express = require('express');
const organizationRouter = require('../Resources/routes/OrganizationRoutes');
const organizationController = require('../Resources/controllers/organizationController');

// Mock the organizationController methods
jest.mock('../Resources/controllers/organizationController', () => ({
  create: jest.fn((req, res) => res.status(201).json({ message: 'Organization created', id: 'org123' })),
  getOne: jest.fn((req, res) => res.status(200).json({ organization: {} })),
  getAll: jest.fn((req, res) => res.status(200).json({ organizations: [] })),
  update: jest.fn((req, res) => res.status(200).json({ message: 'Organization updated' })),
  delete: jest.fn((req, res) => res.status(200).json({ message: 'Organization deleted' }))
}));

// Setup express app for testing
const app = express();
app.use(express.json());
app.use('/api/organizations', organizationRouter);

describe('Organization Routes', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('POST /', () => {
    it('should create a new organization', async () => {
      const orgData = { 
        name: 'Test Organization',
        industry: 'Technology',
        location: 'San Francisco',
        description: 'A test organization'
      };

      const response = await request(app)
        .post('/api/organizations')
        .send(orgData)
        .expect(201);

      expect(response.body.message).toBe('Organization created');
      expect(response.body).toHaveProperty('id');
      expect(organizationController.create).toHaveBeenCalledTimes(1);
      expect(organizationController.create.mock.calls[0][0].body).toEqual(orgData);
    });
  });

  describe('GET /:org_id', () => {
    it('should get a single organization by ID', async () => {
      const org_id = 'org123';

      const response = await request(app)
        .get(`/api/organizations/${org_id}`)
        .expect(200);

      expect(response.body).toHaveProperty('organization');
      expect(organizationController.getOne).toHaveBeenCalledTimes(1);
      expect(organizationController.getOne.mock.calls[0][0].params).toEqual({ org_id });
    });
  });

  describe('GET /', () => {
    it('should get all organizations', async () => {
      const response = await request(app)
        .get('/api/organizations')
        .expect(200);

      expect(response.body).toHaveProperty('organizations');
      expect(organizationController.getAll).toHaveBeenCalledTimes(1);
    });

    it('should pass query parameters to controller', async () => {
      await request(app)
        .get('/api/organizations?industry=Technology&location=NYC')
        .expect(200);

      expect(organizationController.getAll).toHaveBeenCalledTimes(1);
      expect(organizationController.getAll.mock.calls[0][0].query).toEqual({
        industry: 'Technology',
        location: 'NYC'
      });
    });
  });

  describe('PUT /:org_id', () => {
    it('should update an organization', async () => {
      const org_id = 'org123';
      const updateData = { 
        name: 'Updated Test Organization',
        description: 'Updated description'
      };

      const response = await request(app)
        .put(`/api/organizations/${org_id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.message).toBe('Organization updated');
      expect(organizationController.update).toHaveBeenCalledTimes(1);
      expect(organizationController.update.mock.calls[0][0].params).toEqual({ org_id });
      expect(organizationController.update.mock.calls[0][0].body).toEqual(updateData);
    });
  });

  describe('DELETE /:org_id', () => {
    it('should delete an organization', async () => {
      const org_id = 'org123';

      const response = await request(app)
        .delete(`/api/organizations/${org_id}`)
        .expect(200);

      expect(response.body.message).toBe('Organization deleted');
      expect(organizationController.delete).toHaveBeenCalledTimes(1);
      expect(organizationController.delete.mock.calls[0][0].params).toEqual({ org_id });
    });
  });
});
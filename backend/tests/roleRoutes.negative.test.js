const request = require('supertest');
const express = require('express');
const RoleController = require('../Resources/controllers/roleController');
const roles = require('../Resources/models/Roles');
const Professional = require('../Resources/models/Professional');
const Film = require('../Resources/models/Films');

// Mock Express app
const app = express();
app.use(express.json());

// Routes
app.post('/roles', RoleController.create);
app.get('/roles/:role_id/applicants', RoleController.viewApplicants);
app.get('/roles/:role_id', RoleController.getOne);
app.get('/roles', RoleController.getAll);
app.put('/roles/:role_id', RoleController.update);
app.delete('/roles/:role_id', RoleController.delete);

// Mock the models
jest.mock('../Resources/models/Roles');
jest.mock('../Resources/models/Professional');
jest.mock('../Resources/models/Films');

describe('Negative Tests for Role Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /roles', () => {
    test('should handle errors during role creation', async () => {
      roles.create.mockRejectedValue(new Error('Database error'));

      const response = await request(app).post('/roles').send({
        role_id: 1,
        information: 'Lead Actor needed',
        role_for: 'Actor',
        start_date: '2023-06-01',
        end_date: '2023-08-31',
        pay: '2023-09-15',
        creator: 'director1',
        film_id: 101
      });

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
    });
  });

  describe('GET /roles', () => {
    test('should handle errors when getting all roles', async () => {
      roles.findAll.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/roles');

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
    });
  });

  describe('GET /roles/:role_id', () => {
    test('should handle errors when getting a specific role', async () => {
      roles.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/roles/1');

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
    });
  });

  describe('PUT /roles/:role_id', () => {
    test('should handle errors when updating a role', async () => {
      roles.update.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .put('/roles/1')
        .send({
          information: 'Updated info',
          role_for: 'Actor',
          start_date: '2023-07-01',
          end_date: '2023-09-30',
          pay: '2023-10-15',
          creator: 'director1',
          film_id: 101
        });

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
    });
  });

  describe('DELETE /roles/:role_id', () => {
    test('should handle errors when deleting a role', async () => {
      roles.destroy.mockRejectedValue(new Error('Database error'));

      const response = await request(app).delete('/roles/1');

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
    });
  });

  describe('GET /roles/:role_id/applicants', () => {
    test('should handle errors when getting applicants', async () => {
      roles.findAll.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/roles/1/applicants');

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
    });
  });
});

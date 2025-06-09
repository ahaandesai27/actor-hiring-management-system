const request = require('supertest');
const express = require('express');
const RoleController = require('../Resources/controllers/roleController');
const roles = require('../Resources/models/Roles');
const Professional = require('../Resources/models/Professional');
const Film = require('../Resources/models/Films');

// Create a mock Express app for testing
const app = express();
app.use(express.json());

// Set up routes just like in your actual router file
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

describe('Role Controller Tests', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /roles', () => {
    test('should create a new role', async () => {
      // Mock data
      const newRoleData = {
        role_id: 1,
        information: 'Lead Actor needed for action film',
        role_for: 'Actor',
        start_date: '2023-06-01',
        end_date: '2023-08-31',
        pay: '2023-09-15', // Note: pay is DATE type in your model
        creator: 'director1',
        film_id: 101
      };

      const mockCreatedRole = { ...newRoleData };
      
      // Setup the mock
      roles.create.mockResolvedValue(mockCreatedRole);
      
      // Make request
      const response = await request(app)
        .post('/roles')
        .send(newRoleData);
      
      // Assertions
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('newRole', mockCreatedRole);
      expect(roles.create).toHaveBeenCalledWith(newRoleData);
    });

    test('should handle errors during role creation', async () => {
      // Setup the mock to throw an error
      roles.create.mockRejectedValue(new Error('Database error'));
      
      // Make request
      const response = await request(app)
        .post('/roles')
        .send({
          role_id: 1,
          information: 'Lead Actor needed',
          role_for: 'Actor',
          start_date: '2023-06-01',
          end_date: '2023-08-31',
          pay: '2023-09-15',
          creator: 'director1',
          film_id: 101
        });
      
      // Assertions
      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
    });
  });

  describe('GET /roles', () => {
    test('should return all roles with film information', async () => {
      // Mock data
      const mockRoles = [
        {
          role_id: 1,
          information: 'Lead Actor needed',
          role_for: 'Actor',
          start_date: '2023-06-01',
          end_date: '2023-08-31',
          pay: '2023-09-15',
          creator: 'director1',
          Film: {
            film_id: 101,
            title: 'Action Movie'
          }
        },
        {
          role_id: 2,
          information: 'Director needed',
          role_for: 'Director',
          start_date: '2023-05-01',
          end_date: '2023-07-31',
          pay: '2023-08-15',
          creator: 'producer1',
          Film: {
            film_id: 102,
            title: 'Drama Film'
          }
        }
      ];
      
      // Setup the mock
      roles.findAll.mockResolvedValue(mockRoles);
      
      // Make request
      const response = await request(app).get('/roles');
      
      // Assertions
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockRoles);
      expect(roles.findAll).toHaveBeenCalledWith({
        include: expect.any(Object),
        attributes: expect.any(Object)
      });
    });

    test('should handle errors when getting all roles', async () => {
      // Setup the mock to throw an error
      roles.findAll.mockRejectedValue(new Error('Database error'));
      
      // Make request
      const response = await request(app).get('/roles');
      
      // Assertions
      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
    });
  });

  describe('GET /roles/:role_id', () => {
    test('should return a specific role', async () => {
      // Mock data
      const mockRole = {
        role_id: 1,
        information: 'Lead Actor needed',
        role_for: 'Actor',
        start_date: '2023-06-01',
        end_date: '2023-08-31',
        pay: '2023-09-15',
        creator: 'director1',
        film_id: 101
      };
      
      // Setup the mock
      roles.findOne.mockResolvedValue(mockRole);
      
      // Make request
      const response = await request(app).get('/roles/1');
      
      // Assertions
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockRole);
      expect(roles.findOne).toHaveBeenCalledWith({
        where: { role_id: '1' }
      });
    });

    test('should return 404 when role not found', async () => {
      // Setup the mock
      roles.findOne.mockResolvedValue(null);
      
      // Make request
      const response = await request(app).get('/roles/999');
      
      // Assertions
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'Role not found!');
    });

    test('should handle errors when getting a specific role', async () => {
      // Setup the mock to throw an error
      roles.findOne.mockRejectedValue(new Error('Database error'));
      
      // Make request
      const response = await request(app).get('/roles/1');
      
      // Assertions
      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
    });
  });

  describe('PUT /roles/:role_id', () => {
    test('should update a role successfully', async () => {
      // Mock data
      const updatedRoleData = {
        information: 'Updated info',
        role_for: 'Actor',
        start_date: '2023-07-01',
        end_date: '2023-09-30',
        pay: '2023-10-15',
        creator: 'director1',
        film_id: 101
      };
      
      // Setup the mock
      roles.update.mockResolvedValue([1]); // Indicates 1 row was updated
      
      // Make request
      const response = await request(app)
        .put('/roles/1')
        .send(updatedRoleData);
      
      // Assertions
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Role updated successfully');
      expect(roles.update).toHaveBeenCalledWith(
        updatedRoleData,
        { where: { role_id: '1' } }
      );
    });

    test('should return 404 when updating non-existent role', async () => {
      // Setup the mock
      roles.update.mockResolvedValue([0]); // Indicates 0 rows were updated
      
      // Make request
      const response = await request(app)
        .put('/roles/999')
        .send({
          information: 'Updated info',
          role_for: 'Actor',
          start_date: '2023-07-01',
          end_date: '2023-09-30',
          pay: '2023-10-15',
          creator: 'director1',
          film_id: 101
        });
      
      // Assertions
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'Role not found or no changes made!');
    });

    test('should handle errors when updating a role', async () => {
      // Setup the mock to throw an error
      roles.update.mockRejectedValue(new Error('Database error'));
      
      // Make request
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
      
      // Assertions
      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
    });
  });

  describe('DELETE /roles/:role_id', () => {
    test('should delete a role successfully', async () => {
      // Setup the mock
      roles.destroy.mockResolvedValue(1); // Indicates 1 row was deleted
      
      // Make request
      const response = await request(app).delete('/roles/1');
      
      // Assertions
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Role deleted successfully');
      expect(roles.destroy).toHaveBeenCalledWith({
        where: { role_id: '1' }
      });
    });

    test('should return 404 when deleting non-existent role', async () => {
      // Setup the mock
      roles.destroy.mockResolvedValue(0); // Indicates 0 rows were deleted
      
      // Make request
      const response = await request(app).delete('/roles/999');
      
      // Assertions
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'Role not found!');
    });

    test('should handle errors when deleting a role', async () => {
      // Setup the mock to throw an error
      roles.destroy.mockRejectedValue(new Error('Database error'));
      
      // Make request
      const response = await request(app).delete('/roles/1');
      
      // Assertions
      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
    });
  });

  describe('GET /roles/:role_id/applicants', () => {
    test('should return applicants for a specific role', async () => {
      // Mock data
      const mockApplicants = [
        {
          role_id: 1,
          role_for: 'Actor',
          Professionals: [
            {
              username: 'actor1',
              rating: 4.5
            },
            {
              username: 'actor2',
              rating: 4.8
            }
          ]
        }
      ];
      
      // Setup the mock
      roles.findAll.mockResolvedValue(mockApplicants);
      
      // Make request
      const response = await request(app).get('/roles/1/applicants');
      
      // Assertions
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockApplicants);
      expect(roles.findAll).toHaveBeenCalledWith({
        where: { role_id: '1' },
        attributes: ['role_id', 'role_for'],
        include: expect.any(Object)
      });
    });

    test('should handle errors when getting applicants', async () => {
      // Setup the mock to throw an error
      roles.findAll.mockRejectedValue(new Error('Database error'));
      
      // Make request
      const response = await request(app).get('/roles/1/applicants');
      
      // Assertions
      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
    });
  });
});
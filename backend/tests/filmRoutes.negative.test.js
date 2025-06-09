const request = require('supertest');
const express = require('express');
const filmRouter = require('../Resources/routes/FilmRoutes');
const FilmController = require('../Resources/controllers/filmController');

// Mock FilmController methods with failures
jest.mock('../Resources/controllers/filmController', () => ({
  create: jest.fn(),
  getProfessionals: jest.fn(),
  getOne: jest.fn(),
  getAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}));

const app = express();
app.use(express.json());
app.use('/api/films', filmRouter);

describe('Film Routes - Negative Test Cases', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /', () => {
    it('should return 400 for missing fields', async () => {
      FilmController.create.mockImplementation((req, res) => {
        res.status(400).json({ error: 'Missing required fields' });
      });

      const res = await request(app)
        .post('/api/films')
        .send({ title: 'Only title' })
        .expect(400);

      expect(res.body).toHaveProperty('error', 'Missing required fields');
    });

    it('should return 500 on create failure', async () => {
      FilmController.create.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Server error while creating film' });
      });

      const res = await request(app)
        .post('/api/films')
        .send({})
        .expect(500);

      expect(res.body).toHaveProperty('error', 'Server error while creating film');
    });
  });

  describe('GET /:film_id/professionals', () => {
    it('should return 404 for non-existent film', async () => {
      FilmController.getProfessionals.mockImplementation((req, res) => {
        res.status(404).json({ error: 'Film not found' });
      });

      const res = await request(app)
        .get('/api/films/unknown123/professionals')
        .expect(404);

      expect(res.body).toHaveProperty('error', 'Film not found');
    });
  });

  describe('GET /:film_id', () => {
    it('should return 404 for unknown film ID', async () => {
      FilmController.getOne.mockImplementation((req, res) => {
        res.status(404).json({ error: 'Film not found' });
      });

      const res = await request(app)
        .get('/api/films/nonexistent')
        .expect(404);

      expect(res.body).toHaveProperty('error', 'Film not found');
    });
  });

  describe('GET /', () => {
    it('should return 500 if fetching all films fails', async () => {
      FilmController.getAll.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Failed to fetch films' });
      });

      const res = await request(app).get('/api/films').expect(500);

      expect(res.body).toHaveProperty('error', 'Failed to fetch films');
    });
  });

  describe('PUT /:film_id', () => {
    it('should return 404 if film to update does not exist', async () => {
      FilmController.update.mockImplementation((req, res) => {
        res.status(404).json({ error: 'Film not found for update' });
      });

      const res = await request(app)
        .put('/api/films/unknown')
        .send({ title: 'Updated Title' })
        .expect(404);

      expect(res.body).toHaveProperty('error', 'Film not found for update');
    });

    it('should return 500 on update failure', async () => {
      FilmController.update.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Internal server error during update' });
      });

      const res = await request(app)
        .put('/api/films/film123')
        .send({ title: 'Error Trigger' })
        .expect(500);

      expect(res.body).toHaveProperty('error', 'Internal server error during update');
    });
  });

  describe('DELETE /:film_id', () => {
    it('should return 404 if film to delete is not found', async () => {
      FilmController.delete.mockImplementation((req, res) => {
        res.status(404).json({ error: 'Film not found for deletion' });
      });

      const res = await request(app)
        .delete('/api/films/unknown')
        .expect(404);

      expect(res.body).toHaveProperty('error', 'Film not found for deletion');
    });

    it('should return 500 on delete failure', async () => {
      FilmController.delete.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Server error during deletion' });
      });

      const res = await request(app)
        .delete('/api/films/film123')
        .expect(500);

      expect(res.body).toHaveProperty('error', 'Server error during deletion');
    });
  });
});

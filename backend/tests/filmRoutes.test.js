const request = require('supertest');
const express = require('express');
const filmRouter = require('../Resources/routes/FilmRoutes');
const FilmController = require('../Resources/controllers/filmController');

// Mock the FilmController methods
jest.mock('../Resources/controllers/filmController', () => ({
  create: jest.fn((req, res) => res.status(201).json({ message: 'Film created', id: '123' })),
  getProfessionals: jest.fn((req, res) => res.status(200).json({ professionals: [] })),
  getOne: jest.fn((req, res) => res.status(200).json({ film: {} })),
  getAll: jest.fn((req, res) => res.status(200).json({ films: [] })),
  update: jest.fn((req, res) => res.status(200).json({ message: 'Film updated' })),
  delete: jest.fn((req, res) => res.status(200).json({ message: 'Film deleted' }))
}));

// Setup express app for testing
const app = express();
app.use(express.json());
app.use('/api/films', filmRouter);

describe('Film Routes', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('POST /', () => {
    it('should create a new film', async () => {
      const filmData = { 
        title: 'The Test Movie',
        director: 'Jane Director',
        release_year: 2025,
        genre: 'Sci-Fi'
      };

      const response = await request(app)
        .post('/api/films')
        .send(filmData)
        .expect(201);

      expect(response.body.message).toBe('Film created');
      expect(response.body).toHaveProperty('id');
      expect(FilmController.create).toHaveBeenCalledTimes(1);
      expect(FilmController.create.mock.calls[0][0].body).toEqual(filmData);
    });
  });

  describe('GET /:film_id/professionals', () => {
    it('should get professionals associated with a film', async () => {
      const film_id = 'film123';

      const response = await request(app)
        .get(`/api/films/${film_id}/professionals`)
        .expect(200);

      expect(response.body).toHaveProperty('professionals');
      expect(FilmController.getProfessionals).toHaveBeenCalledTimes(1);
      expect(FilmController.getProfessionals.mock.calls[0][0].params).toEqual({ film_id });
    });
  });

  describe('GET /:film_id', () => {
    it('should get a single film by ID', async () => {
      const film_id = 'film123';

      const response = await request(app)
        .get(`/api/films/${film_id}`)
        .expect(200);

      expect(response.body).toHaveProperty('film');
      expect(FilmController.getOne).toHaveBeenCalledTimes(1);
      expect(FilmController.getOne.mock.calls[0][0].params).toEqual({ film_id });
    });
  });

  describe('GET /', () => {
    it('should get all films', async () => {
      const response = await request(app)
        .get('/api/films')
        .expect(200);

      expect(response.body).toHaveProperty('films');
      expect(FilmController.getAll).toHaveBeenCalledTimes(1);
    });

    it('should pass query parameters to controller', async () => {
      await request(app)
        .get('/api/films?genre=Drama&year=2024')
        .expect(200);

      expect(FilmController.getAll).toHaveBeenCalledTimes(1);
      expect(FilmController.getAll.mock.calls[0][0].query).toEqual({
        genre: 'Drama',
        year: '2024'
      });
    });
  });

  describe('PUT /:film_id', () => {
    it('should update a film', async () => {
      const film_id = 'film123';
      const updateData = { 
        title: 'Updated Test Movie',
        genre: 'Drama'
      };

      const response = await request(app)
        .put(`/api/films/${film_id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.message).toBe('Film updated');
      expect(FilmController.update).toHaveBeenCalledTimes(1);
      expect(FilmController.update.mock.calls[0][0].params).toEqual({ film_id });
      expect(FilmController.update.mock.calls[0][0].body).toEqual(updateData);
    });
  });

  describe('DELETE /:film_id', () => {
    it('should delete a film', async () => {
      const film_id = 'film123';

      const response = await request(app)
        .delete(`/api/films/${film_id}`)
        .expect(200);

      expect(response.body.message).toBe('Film deleted');
      expect(FilmController.delete).toHaveBeenCalledTimes(1);
      expect(FilmController.delete.mock.calls[0][0].params).toEqual({ film_id });
    });
  });
});
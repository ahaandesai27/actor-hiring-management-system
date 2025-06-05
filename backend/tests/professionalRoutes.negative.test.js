const request = require("supertest");
const express = require("express");
const ProfessionalController = require("../Resources/controllers/professionalController");
const Professional = require("../Resources/models/Professional");
const Film = require("../Resources/models/Films");
const roles = require("../Resources/models/Roles");
const Applications = require("../Resources/models/Applications");
const connectionsController = require("../Resources/controllers/connectionsController");

const app = express();
app.use(express.json());

app.get("/professionals/:username/films", ProfessionalController.getFilms);
app.get("/professionals/:username/created_roles", ProfessionalController.getCreatedRoles);
app.get("/professionals/:username", ProfessionalController.getOne);
app.get("/professionals", ProfessionalController.getAll);
app.post("/professionals/apply", ProfessionalController.applyForRole);
app.post("/professionals", ProfessionalController.create);
app.put("/professionals/:username", ProfessionalController.update);
app.delete("/professionals/unapply", ProfessionalController.withdrawApplication);
app.delete("/professionals/:username", ProfessionalController.delete);

// Mock models
jest.mock("../Resources/models/Professional");
jest.mock("../Resources/models/Films");
jest.mock("../Resources/models/Roles");
jest.mock("../Resources/models/Applications");
jest.mock("../Resources/controllers/connectionsController");

describe("Negative Tests for Professional Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /professionals", () => {
    test("should fail when required fields are missing", async () => {
      const incompleteProfessional = { username: "newuser", profession: "Actor" };

      const response = await request(app).post("/professionals").send(incompleteProfessional);

      expect(response.statusCode).toBe(400); // Assuming field validation
      expect(response.body).toHaveProperty("error");
    });

    test("should handle database error during creation", async () => {
      Professional.create.mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .post("/professionals")
        .send({
          username: "erroruser",
          fullName: "Error User",
          profession: "Actor",
          years_of_experience: 2,
          rating: 3.5,
        });

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty("error", "Database error");
    });
  });

  describe("PUT /professionals/:username", () => {
    test("should return 404 if professional not found during update", async () => {
      Professional.update.mockResolvedValue([0]);

      const response = await request(app)
        .put("/professionals/nonexistent")
        .send({
          info: { profession: "Director", years_of_experience: 10 },
        });

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("message", "Professional not found.");
    });
  });

  describe("POST /professionals/apply", () => {
    test("should fail if professional does not exist", async () => {
      Professional.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .post("/professionals/apply")
        .send({ username: "ghostuser", role_id: 1 });

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("message", "Professional not found.");
    });

    test("should fail if role does not exist", async () => {
        Professional.findByPk.mockResolvedValue({ username: "jdoe", profession: "Actor" });
        roles.findByPk.mockResolvedValue(null);
      
        const response = await request(app)
          .post("/professionals/apply")
          .send({ username: "jdoe", role_id: 999 });
      
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Role not found.");
      });
  });

  describe("DELETE /professionals/unapply", () => {
    test("should handle database error during withdrawal", async () => {
      Applications.findOne.mockResolvedValue({
        professional: "jdoe",
        role_id: 1,
        destroy: jest.fn().mockRejectedValue(new Error("Database error")),
      });

      const response = await request(app)
        .delete("/professionals/unapply")
        .query({ username: "jdoe", role_id: 1 });

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty("error", "Database error");
    });
  });

  describe("DELETE /professionals/:username", () => {
    test("should handle database error during deletion", async () => {
      Professional.destroy.mockRejectedValue(new Error("Database error"));

      const response = await request(app).delete("/professionals/jdoe");

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty("error", "Database error");
    });
  });

  describe("GET /professionals/:username", () => {
    test("should handle error when fetching professional", async () => {
      Professional.findByPk.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/professionals/jdoe");

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty("error", "Database error");
    });
  });

  describe("GET /professionals/:username/created_roles", () => {
    test("should handle error when fetching created roles", async () => {
      roles.findAll.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/professionals/jdoe/created_roles");

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty("error", "Database error");
    });
  });

  describe("GET /professionals/:username/films", () => {
    test("should handle error when fetching films", async () => {
      Professional.findOne.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/professionals/jdoe/films");

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty("error", "Database error");
    });
  });
});

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
app.get(
  "/professionals/:username/created_roles",
  ProfessionalController.getCreatedRoles
);
app.get("/professionals/:username", ProfessionalController.getOne);
app.get("/professionals", ProfessionalController.getAll);
app.post("/professionals/apply", ProfessionalController.applyForRole);
app.post("/professionals", ProfessionalController.create);
app.put("/professionals/:username", ProfessionalController.update);
app.delete(
  "/professionals/unapply",
  ProfessionalController.withdrawApplication
);
app.delete("/professionals/:username", ProfessionalController.delete);

jest.mock("../Resources/models/Professional");
jest.mock("../Resources/models/Films");
jest.mock("../Resources/models/Roles");
jest.mock("../Resources/models/Applications");
jest.mock("../Resources/controllers/connectionsController");

describe("Professional Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /professionals", () => {
    test("should return all professionals", async () => {
      const mockProfessionals = [
        {
          username: "jdoe",
          full_name: "John Doe",
          profession: "Actor",
          years_of_experience: 5,
          rating: 4.5,
        },
        {
          username: "jsmith",
          full_name: "Jane Smith",
          profession: "Director",
          years_of_experience: 10,
          rating: 4.8,
        },
      ];

      Professional.findAll.mockResolvedValue(mockProfessionals);

      const response = await request(app).get("/professionals");

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockProfessionals);
      expect(Professional.findAll).toHaveBeenCalledTimes(1);
    });

    test("should handle errors", async () => {
      Professional.findAll.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/professionals");

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty("error", "Database error");
    });
  });

  describe("GET /professionals/:username", () => {
    test("should return a specific professional with follower counts", async () => {
      const mockProfessional = {
        username: "jdoe",
        full_name: "John Doe",
        profession: "Actor",
        years_of_experience: 5,
        rating: 4.5,
        get: jest.fn().mockReturnValue({
          username: "jdoe",
          full_name: "John Doe",
          profession: "Actor",
          years_of_experience: 5,
          rating: 4.5,
        }),
      };

      Professional.findByPk.mockResolvedValue(mockProfessional);
      connectionsController.getFollowersCount.mockResolvedValue(100);
      connectionsController.getFollowingCount.mockResolvedValue(50);

      const response = await request(app).get("/professionals/jdoe");

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        username: "jdoe",
        full_name: "John Doe",
        profession: "Actor",
        years_of_experience: 5,
        rating: 4.5,
        followerCount: 100,
        followingCount: 50,
      });
      expect(Professional.findByPk).toHaveBeenCalledWith("jdoe");
      expect(connectionsController.getFollowersCount).toHaveBeenCalledWith(
        "jdoe"
      );
      expect(connectionsController.getFollowingCount).toHaveBeenCalledWith(
        "jdoe"
      );
    });

    test("should return 404 when professional not found", async () => {
      Professional.findByPk.mockResolvedValue(null);

      const response = await request(app).get("/professionals/nonexistent");

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("message", "Professional not found");
    });
  });

  describe("GET /professionals/:username/films", () => {
    test("should return films associated with a professional", async () => {
      const mockProfessionalWithFilms = {
        username: "jdoe",
        Films: [
          {
            title: "Movie 1",
            genre: "Action",
            release_date: "2023-01-01",
            rating: 4.2,
            worked_on: {
              start_date: "2022-05-01",
              end_date: "2022-08-01",
            },
          },
        ],
      };

      Professional.findOne.mockResolvedValue(mockProfessionalWithFilms);

      const response = await request(app).get("/professionals/jdoe/films");

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockProfessionalWithFilms);
      expect(Professional.findOne).toHaveBeenCalledWith({
        where: { username: "jdoe" },
        attributes: ["username"],
        include: expect.any(Object),
      });
    });
  });

  describe("POST /professionals/apply", () => {
    test("should successfully apply for a role", async () => {
      const mockProfessional = {
        username: "jdoe",
        profession: "Actor",
      };
      const mockRole = {
        role_id: 1,
        role_for: "Actor",
      };

      Professional.findByPk.mockResolvedValue(mockProfessional);
      roles.findByPk.mockResolvedValue(mockRole);
      Applications.create.mockResolvedValue({});

      const response = await request(app)
        .post("/professionals/apply")
        .send({ username: "jdoe", role_id: 1 });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("success", "Applied successfully!");
      expect(Applications.create).toHaveBeenCalledWith({
        professional: "jdoe",
        role_id: 1,
      });
    });

    test("should reject when professional and role professions do not match", async () => {
      const mockProfessional = {
        username: "jdoe",
        profession: "Actor",
      };
      const mockRole = {
        role_id: 1,
        role_for: "Director",
      };

      Professional.findByPk.mockResolvedValue(mockProfessional);
      roles.findByPk.mockResolvedValue(mockRole);

      const response = await request(app)
        .post("/professionals/apply")
        .send({ username: "jdoe", role_id: 1 });

      expect(response.statusCode).toBe(403);
      expect(response.body).toHaveProperty(
        "forbidden",
        "Cannot apply for this role!"
      );
      expect(Applications.create).not.toHaveBeenCalled();
    });
  });

  describe("DELETE /professionals/unapply", () => {
    test("should successfully withdraw an application", async () => {
      const mockApplication = {
        professional: "jdoe",
        role_id: 1,
        destroy: jest.fn().mockResolvedValue({}),
      };

      Applications.findOne.mockResolvedValue(mockApplication);

      const response = await request(app)
        .delete("/professionals/unapply")
        .query({ username: "jdoe", role_id: 1 });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty(
        "success",
        "Application withdrawn successfully!"
      );
      expect(mockApplication.destroy).toHaveBeenCalled();
    });

    test("should return 404 when application not found", async () => {
      Applications.findOne.mockResolvedValue(null);

      const response = await request(app)
        .delete("/professionals/unapply")
        .query({ username: "jdoe", role_id: 1 });

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("error", "Application not found");
    });
  });

  describe("POST /professionals", () => {
    test("should create a new professional", async () => {
      const newProfessional = {
        username: "newuser",
        fullName: "New User",
        profession: "Actor",
        years_of_experience: 3,
        rating: 4.0,
      };

      Professional.create.mockResolvedValue({
        username: newProfessional.username,
        full_name: newProfessional.fullName,
        profession: newProfessional.profession,
        years_of_experience: newProfessional.years_of_experience,
        rating: newProfessional.rating,
      });

      const response = await request(app)
        .post("/professionals")
        .send(newProfessional);

      expect(Professional.create).toHaveBeenCalledWith({
        username: "newuser",
        full_name: "New User",
        profession: "Actor",
        years_of_experience: 3,
        rating: 4.0,
      });
    });
  });

  describe("PUT /professionals/:username", () => {
    test("should update a professional", async () => {
      const updateInfo = {
        info: {
          profession: "Director",
          years_of_experience: 8,
        },
      };

      Professional.update.mockResolvedValue([1]);

      const response = await request(app)
        .put("/professionals/jdoe")
        .send(updateInfo);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBe("Updated successfully.");
      expect(Professional.update).toHaveBeenCalledWith(updateInfo.info, {
        where: {
          username: "jdoe",
        },
      });
    });
  });

  describe("DELETE /professionals/:username", () => {
    test("should delete a professional", async () => {
      Professional.destroy.mockResolvedValue(1);

      const response = await request(app).delete("/professionals/jdoe");

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message", "Deleted successfully.");
      expect(Professional.destroy).toHaveBeenCalledWith({
        where: { username: "jdoe" },
      });
    });

    test("should return 404 when professional not found for deletion", async () => {
      Professional.destroy.mockResolvedValue(0);

      const response = await request(app).delete("/professionals/nonexistent");

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty(
        "message",
        "Professional not found."
      );
    });
  });

  describe("GET /professionals/:username/created_roles", () => {
    test("should return roles created by a professional", async () => {
      const mockRoles = [
        {
          role_id: 1,
          title: "Lead Actor",
          description: "Main character in the film",
          role_for: "Actor",
          Film: {
            film_id: 101,
            title: "The Great Movie",
          },
        },
      ];

      roles.findAll.mockResolvedValue(mockRoles);

      const response = await request(app).get(
        "/professionals/jdoe/created_roles"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockRoles);
      expect(roles.findAll).toHaveBeenCalledWith({
        where: { creator: "jdoe" },
        include: expect.any(Object),
        attributes: expect.any(Object),
      });
    });

    test("should return 404 when no roles found", async () => {
      roles.findAll.mockResolvedValue([]);

      const response = await request(app).get(
        "/professionals/jdoe/created_roles"
      );

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty(
        "message",
        "No roles found for this professional"
      );
    });
  });
});

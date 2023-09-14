const app = require("../public/app");
const request = require("supertest");
const mongoose = require("mongoose");
const Person = require("../models/person");
const { MongoMemoryServer } = require("mongodb-memory-server");

describe("Task Two", () => {
  let mongoServer;
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Person.deleteMany({});
  });

  describe("POST /api/", () => {
    it("should create a new person resource", async () => {
      const person = {
        name: "John Doe",
      };
      const response = await request(app).post("/api/").send(person);
      expect(response.body).toHaveProperty("name", "John Doe");
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("id.length", 24);
      expect(response.statusCode).toBe(201);
    });
  });

  describe("GET /api/:user_id", () => {
    it("should retrieve a person resource by id", async () => {
      const person = {
        name: "John Doe",
      };
      const creationResponse = await request(app).post("/api/").send(person);
      const personId = creationResponse.body.id;

      const response = await request(app).get(`/api/${personId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("name", "John Doe");
      expect(response.body).toHaveProperty("id", personId);
      expect(response.body).toHaveProperty("id.length", 24);
    });

    it("should return a 404 error when person is not found", async () => {
      const nonExistentUserId = "6131a61eb68f3932e4c414d1";
  
      const response = await request(app).put(`/api/${nonExistentUserId}`);
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("error", "Person not found");
  });

  });

describe("PUT /api/:user_id", () => {
    it("should update a person resource by id", async () => {
      const person = {
        name: "John Doe",
      };
      const creationResponse = await request(app).post("/api/").send(person);
      const personId = creationResponse.body.id;

      // Update the person by their id
      const updatedPersonData = {
        name: "John Smith",
      };

      const response = await request(app)
        .put(`/api/${personId}`)
        .send(updatedPersonData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("name", "John Smith");
      expect(response.body).toHaveProperty("id", personId);
      expect(response.body).toHaveProperty("id.length", 24);
    });

    it("should return a 404 error when person is not found", async () => {
      const nonExistentUserId = "6131a61eb68f3932e4c414d1";
  
      const response = await request(app).put(`/api/${nonExistentUserId}`);
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("error", "Person not found");
  });

  describe("DELETE /api/:user_id", () => {
    it("should delete a person resource", async () => {
      const person = {
        name: "John Doe",
      };

      const creationResponse = await request(app).post("/api/").send(person);
      const personId = creationResponse.body.id;
      const response = await request(app).delete(`/api/${personId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Person deleted successfully"
      );
    });
  
    it("should return a 400 error for an invalid user_id", async () => {
      const invalidUserId = "invalid-user-id";
  
      const response = await request(app).delete(`/api/${invalidUserId}`);
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error", "Invalid user id");
    });
  
    it("should return a 404 error when person is not found", async () => {
      const nonExistentUserId = "6131a61eb68f3932e4c414d1";
  
      const response = await request(app).delete(`/api/${nonExistentUserId}`);
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("error", "Person not found");
    });
  });
});
  
});

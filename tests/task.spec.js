require("module-alias/register");
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
        age: "20",
        phone: "09090909090",
        address: "No 1, Lagos Street",
        email: "gentlemotivator@gmail.com",
      };
      const response = await request(app).post("/api/").send(person);
      expect(response.body).toHaveProperty("name", "John Doe");
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("id.length", 24);
      expect(response.statusCode).toBe(201);
      
    });
  });
  describe("GET /api/:name", () => {
    it("should retrieve a person resource by name", async () => {
      const person = {
        name: "John Doe",
        age: "20",
        phone: "09090909090",
        address: "No 1, Lagos Street",
        email: "gentlemotivator@gmail.com",
      };
      await request(app).post("/api/").send(person);
      const response = await request(app).get("/api/John Doe");

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("name", "John Doe");
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("id.length", 24);
    });

    it("should return a 404 error when person is not found", async () => {
        const nonExistentName = "NonExistentPerson";
    
        const response = await request(app).get(`/api/${nonExistentName}`);
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("message", "Person not found");
      });
  });

  describe("POST /api/:name", () => {
    it("should update a person resource", async () => {
      const person = {
        name: "John Doe",
        age: "20",
        phone: "09090909090",
        address: "No 1, Lagos Street",
        email: "gentlemotivator@gmail.com",
        };
        await request(app).post("/api/").send(person);
        const response = await request(app).post("/api/John Doe").send({
          name: "John Doe",
          age: "20",
          phone: "09090909090",
          address: "No 1, Lagos Street",
          email: "gentlemotivator@gmail.com",
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("name", "John Doe");
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("id.length", 24);
        });
        it("should return a 404 error when person is not found", async () => {
          const nonExistentName = "NonExistentPerson";
      
          const response = await request(app).post(`/api/${nonExistentName}`).send({
            name: "John Doe",
            age: "20",
            phone: "09090909090",
            address: "No 1, Lagos Street",
            email: "gentlemotivator@gmail.com",
          });
            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty("error", "Person not found");
            });
            });
    
    describe("DELETE /api/:name", () => {
      it("should delete a person resource", async () => {
        const person = {
          name: "John Doe",
          age: "20",
          phone: "09090909090",
          address: "No 1, Lagos Street",
          email: "gentlemotivator@gmail.com",
        };
        await request(app).post("/api/").send(person);
        const response = await request(app).delete("/api/John Doe");
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message", "Person deleted successfully");
        });
        it("should return a 404 error when person is not found", async () => {
          const nonExistentName = "NonExistentPerson";
      
          const response = await request(app).delete(`/api/${nonExistentName}`);
          expect(response.statusCode).toBe(404);
          expect(response.body).toHaveProperty("error", "Person not found");
          });
          });

});

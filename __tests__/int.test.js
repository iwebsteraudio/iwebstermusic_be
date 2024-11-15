const app = require("../app");
const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed.js");
const endPoints = require("../endpoints.json");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("GET /api/songs", () => {
  test("Should return a 200 status code and an array of song objects when passed a request for songs", () => {
    return request(app)
      .get("/api/songs")
      .expect(200)
      .then(({ body }) => {
        const { songData } = body;
        expect(songData.length).toBe(3);
        songData.forEach((song) => {
          expect.objectContaining({
            title: expect.any(String),
            decade: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/", () => {
  test("When requesting the API, simply responds with the details of the various endpoints", () => {
    return request(app)
      .get("/api/")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(endPoints);
      });
  });
});

describe("POST /api/send-email", () => {
  test("When sending a contact form to the back end, response with 200 and sends email", () => {
    const formData = {
      name: "Testy McTestface",
      contactNumber: "07111111111",
      contactEmail: "test@test.com",
      date: "01-01-2060",
      subject: "Wedding",
      message: "This is a test email",
    };
    return request(app)
      .post("/api/send-email")
      .send(formData)
      .expect(200);
  });
});

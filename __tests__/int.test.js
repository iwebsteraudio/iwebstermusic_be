const app = require("../app");
const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed.js");
const endPoints = require("../endpoints.json");
const bcrypt = require("bcrypt")

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

describe.skip("POST /api/send-email", () => {
  test("When sending a contact form to the back end, response with 200 and sends email", () => {
    const formData = {
      name: "Testy McTestface",
      contactNumber: "07111111111",
      contactEmail: "test@test.com",
      date: "01-01-2060",
      subject: "Wedding",
      message: "This is a test email",
    };
    return request(app).post("/api/send-email").send(formData).expect(200);
  });
});

describe("GET /api/mp3s", () => {
  test("When requesting mp3's from s3, responds with a 200 an array of mp3 data objects", () => {
    return request(app)
      .get("/api/mp3s")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.mp3Data)).toBe(true);
        expect(body.mp3Data[0]).toHaveProperty("fileName", expect.any(String));
        expect(body.mp3Data[0]).toHaveProperty("url", expect.any(String));
      });
  });
});


process.env.ADMIN_PASSWORD = bcrypt.hashSync("test-password", 10);

describe("Password-Protected Routes", () => {
  describe("POST /api/songs", () => {
    test("401 - responds with 'Password is required' if no password is sent", () => {
      return request(app)
        .post("/api/songs")
        .send({
          artist: "Test Artist",
          title: "Test Song",
          genre: "Rock",
          decade: "1990",
        })
        .expect(401)
        .then(({ body }) => {
          expect(body.msg).toBe("Password is required.");
        });
    });

    test("403 - responds with 'Invalid password' if incorrect password is sent", () => {
      return request(app)
        .post("/api/songs")
        .send({
          password: "wrong-password",
          artist: "Test Artist",
          title: "Test Song",
          genre: "Rock",
          decade: "1990",
        })
        .expect(403)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid password.");
        });
    });

    test("201 - responds with the newly created song if correct password is provided", () => {
      return request(app)
        .post("/api/songs")
        .send({
          password: "test-password",
          artist: "Test Artist",
          title: "Test Song",
          genre: "Rock",
          decade: "1990",
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.songData).toEqual(
            expect.objectContaining({
              artist: "Test Artist",
              title: "Test Song",
              genre: "Rock",
              decade: "1990",
            })
          );
        });
    });
  });

  describe("DELETE /api/songs/:song_id", () => {
    test("403 - responds with 'Invalid password' for incorrect password", () => {
      return request(app)
        .delete("/api/songs/1")
        .send({ password: "wrong-password" })
        .expect(403)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid password.");
        });
    });

    test("204 - deletes the song successfully with the correct password", () => {
      return request(app)
        .delete("/api/songs/1")
        .send({ password: "test-password" }) // Correct password
        .expect(204);
    });
  });

  describe("PATCH /api/songs/:song_id", () => {
    test("401 - responds with 'Password is required' if no password is sent", () => {
      return request(app)
        .patch("/api/songs/1")
        .send({
          artist: "Updated Artist",
        })
        .expect(401)
        .then(({ body }) => {
          expect(body.msg).toBe("Password is required.");
        });
    });

    test("202 - updates the song successfully with the correct password", () => {
      return request(app)
        .patch("/api/songs/1")
        .send({
          password: "test-password", // Correct password
          artist: "Updated Artist",
          title: "Updated Song Title",
          genre: "Jazz",
          decade: "1980",
        })
        .expect(202)
        .then(({ body }) => {
          expect(body.artist).toBe("Updated Artist");
          expect(body.title).toBe("Updated Song Title");
          expect(body.genre).toBe("Jazz");
          expect(body.decade).toBe("1980");
        });
    });
  });
});

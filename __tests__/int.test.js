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

describe("POST /api/songs", () => {
  test("When sending a POST request to /songs, responds with 201 and returns the song object", () => {
    return request(app)
      .post("/api/songs")
      .send({
        title: "New Song",
        artist: "New Artist",
        genre: "Rock",
        decade: "1980s",
      })
      .expect(201)
      .then(({ body }) => {
        const { songData } = body;
        expect(songData).toEqual(
          expect.objectContaining({
            title: "New Song",
            artist: "New Artist",
            genre: "Rock",
            decade: "1980s",
          })
        );
      });
  });

  test("Should respond with 400 if any required field is missing", () => {
    return request(app)
      .post("/api/songs")
      .send({
        title: "Incomplete Song",
        artist: "Artist Only",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Missing Required Fields");
      });
  });
});

describe("DELETE /api/songs/:id", () => {
  test("When given a request to DELETE to /songs/:id, responds with 204 and deletes the song", () => {
    return request(app)
      .delete("/api/songs/1")
      .expect(204)
      .then(() => {
        return request(app)
          .get("/api/songs")
          .expect(200)
          .then(({ body }) => {
            expect(body.songData).not.toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  song_id: 1,
                }),
              ])
            );
          });
      });
  });
});

describe("PATCH /api/songs/:id", () => {
  test("When given a valid request to update a song, responds with 202 and the updated song", () => {
    return request(app)
      .patch("/api/songs/1")
      .send({
        artist: "The FakeNames",
        title: "None of Me",
        genre: "Jazz",
        decade: "1950",
      })
      .expect(202)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            artist: "The FakeNames",
            title: "None of Me",
            genre: "Jazz",
            decade: "1950",
          })
        );
      });
  });

  test("responds with 404 Not Found when the song_id does not exist", () => {
    return request(app)
      .patch("/api/songs/99999")
      .send({
        artist: "NonExistent",
        title: "NoSong",
        genre: "Pop",
        decade: "2000",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Song not found");
      });
  });
  test("responds with 400 Bad Request when required fields are missing", () => {
    return request(app)
      .patch("/api/songs/1")
      .send({
        artist: "IncompleteData", 
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });

});

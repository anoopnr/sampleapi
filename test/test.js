const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {
  it("Blank route test", done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.code).to.equals("NOT FOUND");
        done();
      });
  });

  it("api route test", done => {
    chai
      .request(app)
      .get("/api")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("SUCCESS");
        expect(res.body.message).to.equals("Welcome to API");
        done();
      });
  });

  it("getToken route test without parameters", done => {
    chai
      .request(app)
      .post("/getToken")
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });

  it("getToken route test with valid parameters", done => {
    chai
      .request(app)
      .post("/getToken")
      .send({ username: "testUser1", password: "12345678" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("getToken route test with invalid parameters", done => {
    chai
      .request(app)
      .post("/getToken")
      .send({ username: "testUser1", password: "x" })
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });

  it("get products without proper bearer", done => {    
    chai
    .request(app)
    .get("/api/products")
    .send({ Authorization: "Bearer  asdassd"})
    .end((err1, res1) => {
        expect(res1).to.have.status(422);
        done();
    });  
  });

  it("get products without invalid bearer", done => {    
    chai
    .request(app)
    .get("/api/products")
    .send({ Authorization: "Bearer EYjYB2XLiJOIywrTAw4Ilcj0Aw1LiJOXnJiXnZaWmJeZmZu0Fq=="})
    .end((err1, res1) => {
        expect(res1).to.have.status(401);
        done();
    });  
  });


  it("get products with authentication", done => {
    chai
      .request(app)
      .post("/getToken")
      .send({ username: "testUser1", password: "12345678" })
      .end((err, res) => {
        const{token}=res.body;
        chai
        .request(app)
        .get("/api/products")
        .send({ Authorization: "Bearer "+token})
        .end((err1, res1) => {
            expect(res1).to.have.status(200);
            done();
        });    
      });
  });
});
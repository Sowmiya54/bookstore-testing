const axios = require("axios");
const { expect } = require("chai");

describe("API - Bookstore Backend", function () {
  this.timeout(15000);
  const base = "http://localhost:5000";

  it("GET /health should be ok", async () => {
    const res = await axios.get(`${base}/health`);
    expect(res.status).to.equal(200);
    expect(res.data.ok).to.equal(true);
  });

  it("GET /books returns a list", async () => {
    const res = await axios.get(`${base}/books`);
    expect(res.status).to.equal(200);
    expect(res.data).to.be.an("array").that.is.not.empty;
    expect(res.data[0]).to.have.keys(["id", "title", "author", "price"]);
  });

  it("POST /order places an order", async () => {
    const res = await axios.post(`${base}/order`, { bookId: 1 }, {
      headers: { "Content-Type": "application/json" }
    });
    expect(res.status).to.equal(200);
    expect(res.data.message).to.include("Order placed for");
  });
});

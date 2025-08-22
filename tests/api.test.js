// tests/api.test.js
const axios = require("axios");
const { expect } = require("chai");

describe("API Test - Restful Booker", function () {
  this.timeout(20000); // 20 seconds timeout for API calls

  it("should fetch bookings", async function () {
    const response = await axios.get("https://restful-booker.herokuapp.com/booking");
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an("array");
  });

  it("should create a booking", async function () {
    const response = await axios.post(
      "https://restful-booker.herokuapp.com/booking",
      {
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2025-01-01",
          checkout: "2025-01-14",
        },
        additionalneeds: "Breakfast",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property("bookingid");
    expect(response.data.booking).to.include({
      firstname: "Jim",
      lastname: "Brown",
    });
  });
});

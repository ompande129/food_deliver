const rideModel = require("../models/ride.model");
const mapService = require("./maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);
  if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
    throw new Error("Unable to calculate distance and time");
  }

  const baseFare = {
    auto: 30, // Base fare for auto
    car: 50, // Base fare for car
    motorcycle: 20, // Base fare for motorcycle
  };

  const perKmRate = {
    auto: 10, // Rate per km for auto
    car: 15, // Rate per km for car
    motorcycle: 8, // Rate per km for motorcycle
  };

  const perMinuteRate = {
    auto: 2, // Rate per minute for auto
    car: 3, // Rate per minute for car
    motorcycle: 1.5, // Rate per minute for motorcycle
  };

  const fare = {
    auto:
      baseFare.auto +
      (distanceTime.distance.value / 1000) * perKmRate.auto +
      (distanceTime.duration.value / 60) * perMinuteRate.auto,

    car:
      baseFare.car +
      (distanceTime.distance.value / 1000) * perKmRate.car +
      (distanceTime.duration.value / 60) * perMinuteRate.car,

    motorcycle:
      baseFare.motorcycle +
      (distanceTime.distance.value / 1000) * perKmRate.motorcycle +
      (distanceTime.duration.value / 60) * perMinuteRate.motorcycle,
  };

  return fare;
}

  function getOtp(num) {
    function generateOtp(num) {
      const otp = crypto
        .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
        .toString()
        .padStart(num, "0");
      return otp;
    }
    return generateOtp(num);
  }

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);
  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });
  return ride;
};

const axios = require("axios");
// delete later

module.exports.getAddressCoordinates = async (address) => {
    try {

        const apiKey = process.env.GOOGLE_MAPS_API;

        // ✅ fallback if no API key
        if (!apiKey) {
            console.log("⚠️ No API key → using fallback coordinates");

            return {
                lat: 18.5204,   // Pune default
                lng: 73.8567
            };
        }

        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

        const response = await axios.get(url);

        // ✅ safe checks
        if (
            response.data.status !== "OK" ||
            !response.data.results ||
            response.data.results.length === 0
        ) {
            throw new Error("API Error");
        }

        const location = response.data.results[0].geometry.location;

        return {
            lat: location.lat,
            lng: location.lng
        };

    } catch (error) {
        console.log("ERROR:", error.message);

        if (error.response) {
            console.log("GOOGLE RESPONSE:", error.response.data);
        }

        // ✅ fallback even if API fails
        return {
            lat: 18.5204,
            lng: 73.8567
        };
    }
};
module.exports.getDistanceTime = async (origin, destination) => {
    try {
        // ❗ check input
        if (!origin || !destination) {
            throw new Error("Origin and Destination are required");
        }

        const apiKey = process.env.GOOGLE_MAPS_API;

        // ✅ fallback if no API key
        if (!apiKey) {
            console.log("⚠️ No API key → using fallback");

            return {
                distance: 5000,   // 5 km
                duration: 600     // 10 min
            };
        }

        // ✅ correct API URL
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

        const response = await axios.get(url);

        // ❗ check main API status
        if (response.data.status !== "OK") {
            console.log("GOOGLE ERROR:", response.data);
            throw new Error("Distance API Error");
        }

        const element = response.data.rows[0].elements[0];

        // ❗ check route status (VERY IMPORTANT)
        if (element.status !== "OK") {
            throw new Error("No route found");
        }

        return {
            distance: element.distance.value,   // meters
            duration: element.duration.value    // seconds
        };

    } catch (err) {
        console.log("ERROR:", err.message);

        if (err.response) {
            console.log("GOOGLE RESPONSE:", err.response.data);
        }

        // ✅ safe fallback
        return {
            distance: 5000,
            duration: 600
        };
    }
};

module.exports.getAutoSuggestions = async(input)=>{
    if(!input){
        throw new Error("query is required");
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if(response.data.status ==='OK'){
            return response.data.predictions;
        }else{
            throw new Error("Unable to fetch suggestions");
        }
    }catch(err){
        console.log(err);
        throw err;
    }
};


// use when google api key is available


// module.exports.getAddressCoordinates = async(address)=>{
//     const apiKey = process.env.GOOGLE_MAPS_API;
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
//     try {
//         const response = await axios.get(url);
//                 console.log("GOOGLE FULL RESPONSE:", response.data);

//         if(response.data.status === 'OK'){
//             const location = response.data.results[0].geometry.location;
//             return{
//                 lat: location.lat,
//                 lng: location.lng
//             };
//         }else{
//             throw new Error("Unable to fetch coordinates");
//         }
//     }
//     // catch (error) {
//     //     // console.log(error);
//     //     console.log("Google API Response:", response.data);
//     //     throw error;
//     // }
//     catch (error) {
//     console.log("ERROR MESSAGE:", error.message);

//     if (error.response) {
//         console.log("GOOGLE RESPONSE:", error.response.data);
//     }

//     throw error;
// }
// }

// module.exports.getDistanceTime = async (origin, destination) => {

//   if (!origin || !destination) {
//     throw new Error("Origin and Destination required");
//   }

//   const apiKey = process.env.GOOGLE_MAPS_API;

//   const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

//   try {
//     const response = await axios.get(url);

//     if (response.data.status === "OK") {
//       if(response.data.rows[0].elements[0].status === "ZERO_RESULTS"){
//         throw new Error("No routes found");

//       }
//       return response.data.rows[0].elements[0];
//     } else {
//       throw new Error("Unable to fetch distance and time");
//     }
//   } catch (err) {
//     console.log("ERROR:", err.message);
//     throw err;
//   }
// };


// module.exports.getAutoSuggestions = async (input) => {
//     try {
//         // input validation
//         if (!input) {
//             throw new Error("Query is required");
//         }

//         const apiKey = process.env.GOOGLE_MAPS_API;

//         // fallback if no API key
//         if (!apiKey) {
//             console.log("⚠️ No API key");
//             return [];
//         }

//         const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

//         const response = await axios.get(url);

//         // handle success
//         if (response.data.status === "OK") {
//             return response.data.predictions;
//         }

//         // handle all other cases safely
//         console.log("GOOGLE ERROR:", response.data);
//         return [];

//     } catch (err) {
//         console.log("ERROR:", err.message);

//         if (err.response) {
//             console.log("GOOGLE RESPONSE:", err.response.data);
//         }

//         // safe fallback
//         return [];
//     }
// };






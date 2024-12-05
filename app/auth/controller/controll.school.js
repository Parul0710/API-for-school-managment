const School = require("../model/model.school")

// Add School API
const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validate input
  if (
    !name ||
    !address ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return res.status(400).send({
         error: "Invalid input data"
         });
  }

  try {
    const newSchool = new School({ name, address, latitude, longitude });
    await newSchool.save();
    res
      .status(201)
      .send({
         message: "School added successfully",
          school: newSchool 
        });
  } catch (err) {
    res.status(500).send({
        error: err.message
     });
  }
};
// a8jei3slg7
// List Schools API
const listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  // Validate input
  if (
    typeof parseFloat(latitude) !== "number" ||
    typeof parseFloat(longitude) !== "number"
  ) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    const userLat = parseFloat(latitude);
    const userLng = parseFloat(longitude);

    const schools = await School.find();
    const sortedSchools = schools
      .map((school) => {
        const distance = Math.sqrt(
          Math.pow(school.latitude - userLat, 2) +
            Math.pow(school.longitude - userLng, 2)
        );
        return { ...school._doc, distance };
      })
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addSchool, listSchools };

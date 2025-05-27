const Course = require('../models/Course');
const path = require('path');

exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const materials = req.files.map((file) => file.path);
    const course = new Course({ title, description, materials });
    await course.save();
    console.log(req.body);
    console.log(req.files);
    res.status(201).json({ message: "course created" })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.viewcourses = async (req, res) => {
  try {
    const course = await Course.find();
    if (!course) return res.status(404).json({ error: "Courses not found" })
    res.json(course)
    
  } catch (err){
    res.status(500).json({error: err.message})
  }
};

exports.enrollUser = async (req, res) => {
  try {

    const userId = req.user.id || req.user._id;
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    if (!course.enrolledUsers.includes(userId)) {
      course.enrolledUsers.push(userId);
      await course.save();

    }
    res.json({ message: "User enrolled in the course", course });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

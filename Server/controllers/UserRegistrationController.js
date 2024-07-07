const Project = require('../models/Schema');
const {User} = require('../models/user');
const jwt = require('jsonwebtoken');


exports.getUserProjects = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const projects = await Project.find({ author: decoded._id });
    const user = await User.findById(decoded._id );
    console.log(projects, user);
    res.status(200).json({projects, user});

  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error : error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);

    const newProject = new Project({
      ...req.body,
      author: decoded._id
    });

    const project = await newProject.save();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }

};

// Function to get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('author','username');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
};

// Function to delete a project by ID
exports.deleteProject = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }

    if (project.author.toString() !== decoded._id) {
      return res.status(403).send({ message: "Unauthorized" });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
};


exports.updateProject = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }

    if (project.author.toString() !== decoded._id) {
      return res.status(403).send({ message: "Unauthorized" });
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
};

exports.getOneProject = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }
    if (project.author.toString() !== decoded._id) {
      return res.status(403).send({ message: "Unauthorized" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
}

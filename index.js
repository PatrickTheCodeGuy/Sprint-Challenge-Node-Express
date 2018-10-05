const express = require("express");
const dbProjects = require("./data/helpers/projectModel");
const dbActions = require("./data/helpers/actionModel");
const server = express();
const port = 6000;
const cors = require("cors");
server.use(cors());
server.use(express.json());

//Project Routes
server.get("/api/projects/", (req, res) => {
	dbProjects
		.get()
		.then(project => {
			res.status(200).json(project);
		})
		.catch(() => {
			res.status(500).json({ error: "Could not load the projects." });
		});
});

server.get("/api/projects/:id", (req, res) => {
	const { id } = req.params;
	if (!id) {
		res.status(500).json({ error: "No ID." });
	}
	dbProjects
		.get(id)
		.then(post => {
			res.status(200).json(post);
		})
		.catch(() => {
			res.status(500).json({ error: "Could not load posts." });
		});
});

server.get("/api/projects/getactions/:id", (req, res) => {
	const { id } = req.params;
	if (!id) {
		res.status(500).json({ error: "No ID." });
	}
	dbProjects
		.getProjectActions(id)
		.then(actions => {
			res.status(200).json(actions);
		})
		.catch(() => {
			res.status(500).json({ error: "Could not load posts." });
		});
});

server.post("/api/projects/", (req, res) => {
	const { name, description } = req.body;
	if (!name || !description) {
		res.status(400).json({ error: "You did not provide a project name." });
	} else {
		const newProject = { name, description };
		dbProjects
			.insert(newProject)
			.then(project => {
				res.status(200).json(project);
			})
			.catch(() => {
				res
					.status(500)
					.json({ error: "There was an error while saving the project." });
			});
	}
});

server.put("/api/projects/:id", (req, res) => {
	const { id } = req.params;
	const { name, description } = req.body;
	if (!name || !description) {
		res
			.status(400)
			.json({ error: "Please provide a name/description for the Project." });
	} else if (!id) {
		res.status(500).json(null);
	} else {
		const thisProject = { name, description };
		dbProjects
			.update(id, thisProject)
			.then(isUpdated => {
				res.status(200).json(isUpdated);
			})
			.catch(() => {
				res.status(404).json({ error: "Could not update project." });
			});
	}
});

server.delete("/api/projects/:id", (req, res) => {
	const { id } = req.params;
	if (!id) {
		res.status(500).json({ error: "Could not delete, id not found" });
	} else {
		dbProjects
			.remove(id)
			.then(removedPost => {
				if (removedPost === 0) {
					res.status(500).json({ error: "This post could not be deleted." });
				} else {
					res.status(200).json({ Success: "Post has been deleted!" });
				}
			})
			.catch(() => {
				res.status(500).json({ error: "id does not exist." });
			});
	}
});

//Actions ROutes

server.get("/api/projects/actions/", (req, res) => {
	dbActions
		.get()
		.then(action => {
			res.status(200).json(action);
		})
		.catch(() => {
			res.status(500).json({ error: "Could not load actions!." });
		});
});

server.get("/api/projects/actions/:id", (req, res) => {
	const { id } = req.params;
	if (!id) {
		res.status(500).json({ error: "No ID." });
	}
	dbActions
		.get(id)
		.then(post => {
			res.status(200).json(post);
		})
		.catch(() => {
			res.status(500).json({ error: "Could not load actions." });
		});
});

server.post("/api/projects/actions/", (req, res) => {
	const { project_id, description, notes } = req.body;
	if (!notes || !description || !project_id) {
		res.status(400).json({
			error:
				"You did not provide an action project id, description, or additional notes."
		});
	} else {
		const newProject = { project_id, description, notes };
		dbActions
			.insert(newProject)
			.then(project => {
				res.status(200).json(project);
			})
			.catch(() => {
				res.status(500).json({
					error: "There was an error while saving this action to the project."
				});
			});
	}
});

server.put("/api/projects/actions/:id", (req, res) => {
	const { id } = req.params;
	const { project_id, description, notes } = req.body;
	if (!notes || !description || !project_id) {
		res.status(400).json({
			error:
				"Please provide a project id, a description, and additional notes for this action."
		});
	} else if (!id) {
		res.status(500).json(null);
	} else {
		const thisAction = { project_id, description, notes };
		dbActions
			.update(id, thisAction)
			.then(isUpdated => {
				res.status(200).json(isUpdated);
			})
			.catch(() => {
				res.status(404).json({ error: "Could not update action." });
			});
	}
});

server.delete("/api/projects/actions/:id", (req, res) => {
	const { id } = req.params;
	if (!id) {
		res.status(500).json({ error: "Could not delete, id not found" });
	} else {
		dbActions
			.remove(id)
			.then(removedPost => {
				if (removedPost === 0) {
					res.status(500).json({ error: "This action could not be deleted." });
				} else {
					res.status(200).json({ Success: "Action has been deleted!" });
				}
			})
			.catch(() => {
				res.status(500).json({ error: "id does not exist." });
			});
	}
});

server.listen(port, () => {
	console.log(`Server now listening on Port ${port}`);
});

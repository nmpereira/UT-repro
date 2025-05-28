import express from "express";
// eslint-disable-next-line import/no-cycle
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "../controllers/uploadThing";
const router = express.Router();



// Add UploadThing route
router.use(
	"/uploadthing",
	createRouteHandler({
		router: uploadRouter,
		config: {
			callbackUrl: "https://scootmx-server.cheappass.club/api/uploadthing",
			logLevel: "All",
		},

	}),
);


// Add other routes here
router.get("*", (req, res) => {
	res.status(404).json({
		message: "Route not found `/api`",
	});
});

export default router;

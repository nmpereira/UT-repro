
import cors from "cors";
import express, { Request, Response } from "express";
import { createServer } from "http";
// eslint-disable-next-line import/no-cycle
import router from "./routes/routes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const httpServer = createServer(app);
app.use(express.json());


// middleware
app.use(
	cors({
		origin: [
			"http://localhost:8081",
			"*.cheappass.club",
			"https://scootmx.cheappass.club",
			"https://scootmx-server.cheappass.club",
			"https://scootmx-frontend.expo.app",
			"*.uploadthing.com",
			"*.*.uploadthing.com",
			"*.ingest.uploadthing.com",
			/^https:\/\/[\w-]+\.ingest\.uploadthing\.com$/,
		],
		methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"],
		credentials: true,
	})
);

const startServer = async () => {
	try {
		httpServer.listen(PORT, () => {
			console.log(
				`Server is running on ${process.env.NODE_ENV !== "production"
					? `http://localhost:${PORT}`
					: `port ${PORT}`
				}`
			);
		});
	} catch (error) {
		console.error("Error starting server:", error);
		throw new Error("Error starting server");
	}
};

startServer();

// app.use("/api", requireAuth(), router);
app.use("/api", router);

app.get("/ping", (req, res) => {
	res.status(200).json({
		msg: "pong",
	});
});

// routes
app.get("/", async (req: Request, res: Response) => {
	res.status(200).json({
		msg: `ScootMx API is running as of ${new Date().toLocaleString()}`,
	});
});

// Add other routes here
app.get("*", (req, res) => {
	res.status(404).json({
		message: "Route not found `/`",
	});
});


export default app;

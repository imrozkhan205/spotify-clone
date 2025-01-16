import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controller/admin.controller.js";
const router = Router();
// slightly optimize clean code
router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin );
router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);
router.post("/albums", createAlbum);
router.post("/songs", deleteAlbum);


export default router;

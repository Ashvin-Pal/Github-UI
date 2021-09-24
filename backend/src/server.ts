import express from "express";
import bodyParser from "body-parser";
import path from "path";

import { addFavorite, removeFavorite, getFavorites, findFavorite } from "../db";

const BUILD_PATH = path.join(__dirname, "/../../frontend/build");
const app = express();

app.use(express.static(BUILD_PATH));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/favorites/:nodeId", async (req, res, next) => {
    // if favorite not found, return 404, but if delete successful, return 200
    const nodeId = req.params.nodeId;
    const isDetails = Boolean(nodeId);
    if (isDetails) {
        const favorite = findFavorite(nodeId);
        return res.status(200).json({ ...favorite });
    } else {
        const favorites = getFavorites();
        return res.status(200).json({ ...favorites });
    }
});

app.put("/api/favorites/:nodeId", async (req, res, next) => {
    // if favorite not found, return 404, but if delete successful, return 200
    const favorite = req.body;

    try {
        const result = await addFavorite(favorite);
        res.status(201).json("OK");
    } catch (error) {
        res.status(400).json(error);
    }
});

app.delete("/api/favorites/:nodeId", function (req, res, next) {
    // if favorite not found, return 404, but if delete successful, return 200
    const nodeId = req.params.nodeId;
    const isDetails = Boolean(nodeId);

    if (isDetails) {
        const favorite = findFavorite(nodeId);
        if (favorite) {
            removeFavorite(nodeId);
            res.status(200).json("OK");
            return;
        } else {
            res.status(404).json({ message: "cant delete resource as it does not exists" });
            return;
        }
    }

    res.status(400).json({ message: "node id is empty" });
});

app.get("*", function (request, response) {
    response.sendFile(path.join(BUILD_PATH, "index.html"));
});

app.listen(9001);

export const ERROR_MSG = {};

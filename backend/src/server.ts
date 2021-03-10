import express from "express";
import bodyParser from "body-parser";
import path from "path";

import { addFavorite, removeFavorite, getFavorites, findFavorite } from "../db";

const BUILD_PATH = path.join(__dirname, "/../../frontend/build");
const app = express();

app.use(express.static(BUILD_PATH));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/favorites/:nodeId", function (req, res, next) {
    // if favorite not found, return 404, but if delete successful, return 200
    const nodeId = req.params.nodeId;
    const isDetails = Boolean(nodeId);
    res.writeHead(200, { "Content-Type": "application/json" });
    if (isDetails) {
        const favorite = findFavorite(nodeId);
        res.write(JSON.stringify({ ...favorite }));
    } else {
        const favorites = getFavorites();
        res.write(JSON.stringify(favorites));
    }
    res.end();
});

app.put("/api/favorites/:nodeId", function (req, res, next) {
    // if favorite not found, return 404, but if delete successful, return 200
    const favorite = req.body;
    addFavorite(favorite);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ response: "Succesfull" }));
    res.end();
    next();
});

app.delete("/api/favorites/:nodeId", function (req, res, next) {
    // if favorite not found, return 404, but if delete successful, return 200
    const nodeId = req.params.nodeId;
    const isDetails = Boolean(nodeId);
    if (isDetails) {
        const favorite = findFavorite(nodeId);
        if (favorite) {
            removeFavorite(nodeId);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ data: "Succesfull" }));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ data: "Unsuccesfull" }));
        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ data: "Unsuccesfull" }));
    }
    res.end();
    next();
});

app.get("*", function (request, response) {
    response.sendFile(path.join(BUILD_PATH, "index.html"));
});

app.listen(9001);

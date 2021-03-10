import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import path from "path";

interface Database {
    favorites: TrackedRepo[];
}

interface TrackedRepo {
    nodeId: string;
    owner: string;
    name: string;
}

const adapter = new FileSync<Database>(path.join(__dirname, "db.json"));
const db = low(adapter);

db.defaults({ favorites: [] }).write();

const addFavorite = (repo: TrackedRepo) => db.get("favorites").push(repo).write();
const removeFavorite = (nodeId: string) => db.get("favorites").remove({ nodeId: nodeId }).write();
const getFavorites = () => db.get("favorites").value();
const findFavorite = (nodeId: string) => {
    let favorites = db.get("favorites").value();
    return favorites.find((favorite) => favorite.nodeId === nodeId);
};

export { addFavorite, removeFavorite, getFavorites, findFavorite };

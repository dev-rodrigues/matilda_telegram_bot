import path from "path";
import fspromises from "fs/promises";
import fs from "fs";

// path to json file
const FILE_PATH = path.join(__dirname, "database.json");

const initJSONDatabase = <T>(initialData: T) => {
    const read = async () => {
        const data = await fspromises.readFile(FILE_PATH, { encoding: "utf-8" });
        return JSON.parse(data) as unknown as T;
    };

    const write = async (data: T) => {
        await fspromises.writeFile(FILE_PATH, JSON.stringify(data), {
            encoding: "utf-8",
        });
    };

    if (!fs.existsSync(FILE_PATH)) {
        write(initialData).then(r => console.log("Database initialized"));
    }

    return {
        read,
        write,
    };
};

export default initJSONDatabase;


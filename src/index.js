import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env",
});

// console.log("Hello World!!!")
// console.log(process.env.userName)

const port = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is listning on port : ${port}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB Connection Error");
        console.log(error);
        process.exit(1);
    });

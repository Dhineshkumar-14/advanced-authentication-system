import express from "express";

const app = express();


app.listen(3000, (req, res) => {
  console.log("Sever Started Successfully at http://localhost:3000");
});

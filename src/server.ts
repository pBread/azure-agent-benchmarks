import express from "express";
import ExpressWs from "express-ws";

const PORT = "8080";

const { app } = ExpressWs(express());
app.use(express.urlencoded({ extended: true })).use(express.json());

app.get("/get_caller_profile", async (req, res) => {
  console.debug("/get_caller_profile");

  res.status(200).json({
    firstName: "Jerry",
    lastName: "Smith",
    callerPhoneNumber: "+18885550001",
  });
});

app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
});

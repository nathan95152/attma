const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.get("/get/all", (req, res) => {
  return res.status(200).json({
    ids: [
      1370, 1369, 1490, 1426, 1480, 1410, 937, 995, 985, 1020, 1082, 1031, 1620, 1612, 1609, 1332, 1305, 1010, 1371,
      932,
    ],
  });
});
app.get("/get/cse", (req, res) => {
  return res.status(200).json({ ids: [1370, 1369, 1490, 1426, 1480, 1410, 1332, 1305, 1371] });
});
app.get("/get/ai", (req, res) => {
  return res.status(200).json({ ids: [937, 995, 985, 1020, 1082, 1031, 1010, 932] });
});
app.get("/get/ece", (req, res) => {
  return res.status(200).json({ ids: [1620, 1612, 1609] });
});
app.use("/get", (req, res) => {
  return res.status(200).json({ ids: [1370, 1369, 1490, 1426, 1480] });
});
app.use("/", async (req, res) => {
  let query = req.query;
  let myurl = new URL("https://muerp.mahindrauniversity.edu.in/markAtt.json");
  const params = myurl.searchParams;
  params.append("at", query.at);
  params.append("ld", query.ld);
  if (!query.at || !query.ld) {
    console.log("data not provided" + " " + query.at);
    return res.status(400).json({ err: "data not provided" });
  }
  try {
    const response = await axios.get(myurl.toString());
    console.log(JSON.stringify({ ...response.data, id: query.at }));
    // if (!response.ok) {
    //   return res.status(200).json();
    // } else {
    // const data = await response.json();
    return res.status(200).json(response.data);
  } catch (err) {
    console.log(err + " " + "id:" + query.at);
    return res.status(400).json(err);
  }
});
app.listen(8080);

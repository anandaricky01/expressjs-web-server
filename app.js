const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const { MongoClient, ObjectId } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017";
const dbName = "mahasiswa";
const collectionName = "mahasiswa";
const client = new MongoClient(uri);

// check koneksi MongoDB
client.connect((error, client) => {
  if (error) {
    return console.log("Koneksi Gagal!");
  }

  console.log("Koneksi berhasil!");
});

const database = client.db(dbName);
const mahasiswaCol = database.collection(collectionName);

const app = express();
const port = 3000;

// gunakan ejs untuk view engine
app.set("view engine", "ejs");

// third-party middleware
// set layout
app.use(expressLayouts);
app.use(morgan("dev"));

// built-in middleware
app.use(express.static("public"));

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Ricky",
      prodi: "Teknologi Informasi",
      angkatan: 2020,
      email: "ricky@gmail.com",
    },
    {
      nama: "Yogi",
      prodi: "Teknologi Informasi",
      angkatan: 2020,
      email: "yogi@gmail.com",
    },
    {
      nama: "Miko",
      prodi: "Teknologi Informasi",
      angkatan: 2020,
      email: "miko@gmail.com",
    },
  ];

  res.render("index", {
    mahasiswa,
    layout: "layouts/main-layout",
    nama: "Ricky",
    title: "Halaman Home",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layout",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
  });
});

app.get('/update', (req, res) => {
  mahasiswaCol.updateOne({ _id:ObjectId("6343ebcee92f69571f58ff88") }, {
    $set: {
      nama: 'Kokonotsu'
    }
  });

  res.send('Update berhasil!');
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

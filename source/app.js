const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const hbs = require("hbs");
const async = require("hbs/lib/async");
const router = express();
const port = process.env.PORT || 80;
const allSchemas = require("./models/dbmodel");
const schemaComment = allSchemas.UsersComments;
const regiesterShcema = allSchemas.UsersRegiester;
const {
  cp,
  copyFileSync
} = require("fs");
const uploadSignUP = require("./controls/uploadMulter");
const bcryptjs = require("bcryptjs");

// creating the paths containers
const forStatic = path.join(__dirname, "../media");
const forEngine = path.join(__dirname, "../tempelate/views");
const forPartials = path.join(__dirname, "../tempelate/layouts");
const ErrorMessage =
  "please try agian or refresh the  page or check your router wifi data or hotasot";
// setting the middle ware
router.use(express.static(forStatic));
router.use(express.json());
router.use(
  express.urlencoded({
    extended: false,
  })
);

// setting the view engine
router.set("view engine", "hbs");
router.set("views", forEngine);

// settng the partials
hbs.registerPartials(forPartials);

// starting the routers
router.get("/", async (req, res) => {
  try {
    res.status(200).render("index");
  } catch (error) {
    res.status(400).send(ErrorMessage);
  }
});

router.get("/searchPage", async (req, res) => {
  try {
    res.status(200).render("mainsearch");
  } catch (error) {
    res.status(400).send(ErrorMessage);
  }
});

router.get("/gallery", async (req, res) => {
  try {
    res.status(200).render("gallery");
  } catch (error) {
    res.status(400).send(ErrorMessage);
    console.log(error);
  }
});

router.get("/visitplan", (req, res) => {
  try {
    res.status(200).render("visitplan");
  } catch (error) {
    res.status(400).send(ErrorMessage);
    console.log(error);
  }
});

router.get("/chart", async (req, res) => {
  try {
    res.status(200).render("chart");
  } catch (error) {
    res.status(400).send();
    console.log(error);
  }
});

router.get("/projects", async (req, res) => {
  try {
    res.status(200).render("projects");
  } catch (error) {
    res.status(400).send(ErrorMessage);
    console.log(error);
  }
});
router.get("/contact", async (req, res) => {
  try {
    res.status(200).render("contact");
  } catch (error) {
    res.status(400).send(ErrorMessage);
    console.log(error);
  }
});
router.get("/account", async (req, res) => {
  try {
    res.status(200).render("accountFirst");
  } catch (error) {
    res.status(400).send(ErrorMessage);
    console.log(error);
  }
});
router.get("/Signup", async (req, res) => {
  try {
    res.status(200).render("accountSec");
  } catch (error) {
    res.status(400).send(ErrorMessage);
    console.log(error);
  }
});

router.get("/resetPassword", async (req, res) => {
  try {
    res.status(200).render("accountThird");
  } catch (error) {
    res.send(error);
    console.log(err);
  }
});

router.post("/signUp", uploadSignUP.single("ProfileImg"), async (req, res) => {
  try {
    const {
      Userfirstname,
      Userlastname,
      Userfathername,
      Phone,
      Email,
      Cnic,
      Gender,
      MartialStatus,
      OnJobOrNot,
      Country,
      Provience,
      district,
      PermanentAddress,
      PostalAddress,
      password,
      confirmPassword,
      passwordHint,
    } = req.body;

    const image = req.file.filename;
    const UserRegiesters = new regiesterShcema({
      Userfirstname,
      Userlastname,
      Userfathername,
      Phone,
      Email,
      Cnic,
      Gender,
      MartialStatus,
      OnJobOrNot,
      Country,
      Provience,
      district,
      PermanentAddress,
      PostalAddress,
      password: password,
      confirmPassword,
      passwordHint,
      image,
    });
    const token = await UserRegiesters.setNewtoken();
    console.log("the token is ", token);

    if (password == confirmPassword) {
      UserRegiesters.save().then(() => {
        res.status(201).render("accountFirst", {
          ErrorMessage: "Signup Sucessfull Please Login! .",
          title: "Login from signup"
        })
      }).catch((error) => {
        res.status(200).render("error", {
          ErrorMsg: error.Message,
          ErrorName: error.name
        })
      })
    }
  } catch (error) {
    console.log("this is an error");
    res.status(400).render("error",{
      ErrorName : error.name,
      ErrorMsg: error.Message
    })
  }
});

router.post("/login", async (req, res) => {
  try {
    // const { Email, Password } = req.body;
    const Email = req.body.Email;
    const findUserReg = await regiesterShcema.findOne({
      Email: Email
    });
    console.log("from login the user password is ", findUserReg.password);
    const passMatch = await bcryptjs.compare(req.body.Password, findUserReg.password);
    console.log("is password are matched .. ", passMatch);
    if (passMatch) {
      const data_user_regiester = await regiesterShcema.find({},
        function (err, dta) {
          if (!err) {
            res.status(200).render("dashboard", {
              dataForDashboard: dta,
              user: findUserReg.Userfirstname + " " + findUserReg.Userlastname,
              Email: findUserReg.Email,
              Phone: findUserReg.Phone,
              Cnic: findUserReg.Cnic,
              Userfathername: findUserReg.Userfathername,
              MartialStatus: findUserReg.MartialStatus,
              OnJobOrNot: findUserReg.OnJobOrNot,
              Country: findUserReg.Country,
              Provience: findUserReg.Provience,
              district: findUserReg.district,
              PermanentAddress: findUserReg.PermanentAddress,
              PostalAddress: findUserReg.PostalAddress,
              passwordHint: findUserReg.passwordHint,
              image: "fromUsers/images/" + findUserReg.image,

            });
          }
        }
      );
      console.log("password are correct");
    } else {
      res.status(200).render("accountFirst", {
        ErrorMessage: "Incorrect email Or password ",
      });
      console.log(
        "password are Incorrected .. please try again on the correct password"
      );
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/usercomments", async (req, res) => {
  try {
    const allSchemaDetails = schemaComment.find({}, function (err, data) {
      if (!err) {
        console.log(data);
        res.status(200).render("comment", {
          details: data,
        });
      } else {
        console.log(err);
      }
    });
  } catch (error) {
    res.status(404).send("NOT found the comments SEction");
  }
});

router.post("/comment", async (req, res) => {
  try {
    const {
      Name,
      Email,
      Phone,
      Message
    } = req.body;
    const Data = new schemaComment({
      Name,
      Email,
      Phone,
      Message,
    });

    Data.save()
      .then((data) => {
        // console.log(data);
        res.status(201).render("index");
      })
      .catch((err) => {
        res.send(err);
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// starting the app
router.listen(port, () => {
  console.log("app are listenning on port 80");
});
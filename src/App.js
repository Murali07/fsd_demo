import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const API = "http://localhost:4000";

function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <nav>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
            <Button color="inherit" onClick={() => navigate("/mobiles")}>Mobiles</Button>
          </Toolbar>
        </AppBar>
      </nav>

      
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/mobiles"
          element={
            <ProtectedRoute>
              <PhoneList />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/" element={<Navigate replace to="/login" />}></Route>
      </Routes>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("token");
  return isAuth ? children : <Navigate replace to="/login" />;
}

function Login() {
  const formik = useFormik({
    initialValues: { username: "mura", password: "abcd" },
    onSubmit: (values) => {
      console.log("onSubmit", values);
      localStorage.setItem("token", "my_cool_token");
    },
  });

  return (
    <form className="login-form" onSubmit={formik.handleSubmit}>
      <h2>Login</h2>
      <TextField
        label="username"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.username}
        name="username"
      />

      <TextField
        type="password"
        label="password"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.password}
        name="password"
      />

      {/* <pre>Values:{JSON.stringify(formik.values)} </pre> */}
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
}

function PhoneList() {
  // const mobiles = [
  //   {
  //     model: "OnePlus 9 5G",
  //     img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
  //     company: "Oneplus",
  //   },
  //   {
  //     model: "Iphone 13 mini",
  //     img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
  //     company: "Apple",
  //   },
  //   {
  //     model: "Samsung s21 ultra",
  //     img: "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
  //     company: "Samsung",
  //   },
  //   {
  //     model: "Xiomi mi 11",
  //     img: "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
  //     company: "Xiomi",
  //   },
  // ];

  const [mobiles, setMobiles] = useState([]);

  // const navigate = useNavigate();

  useEffect(() => {
    // console.log("Hi");

    // if (!localStorage.getItem("token")) {
    //   navigate("/login");
    // }

    fetch(`${API}/mobiles`)
      .then((data) => data.json())
      .then((mbs) => setMobiles(mbs));
  }, []);

  return (
    <div className="phone-list-container">
      {mobiles.map((mb) => (
        <Phone key={mb._id} mobile={mb} />
      ))}
    </div>
  );
}

function Phone({ mobile }) {
  return (
    <div className="phone-container">
      <img className="phone-picture" src={mobile.img} alt={mobile.model}></img>
      <h2 className="phone-name">{mobile.model}</h2>
      <p className="phone-company">{mobile.company}</p>
    </div>
  );
}

export default App;

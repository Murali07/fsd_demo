import { useEffect, useState } from "react";
import "./App.css";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import { useFormik } from "formik";

const API = "http://localhost:4000";

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/mobiles">Mobiles</Link>
          </li>
        </ul>
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

function ProtectedRoute({children}) {
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
    <form onSubmit={formik.handleSubmit}>
      <input
        placeholder="username"
        onChange={formik.handleChange}
        value={formik.values.username}
        name="username"
      ></input>
      <input
        type="password"
        placeholder="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        name="password"
      ></input>
      <pre>Values:{JSON.stringify(formik.values)} </pre>
      <button type="submit">Submit</button>
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

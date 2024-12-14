import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/contextprovider";
import Data from "../data.json";
import { FourSquare } from "react-loading-indicators";

const User = () => {
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useStateContext();

  useEffect(() => {
    axiosClient
      .get("/me")
      .then(({ data }) => {
        setUser(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch user:", error);
        setLoading(false);
      });
  }, [setUser]);

  return (
    <>
      {loading && (
        <div className="loading-spin">
          <FourSquare
            color="#A294F9"
            size="medium"
            text="Loading"
            textColor=""
          />
        </div>
      )}
      {!loading && (
        <div>
          <h3>Welcome Back, Mr. {user.name}</h3>
          <br></br>
          <hr></hr>
          <br></br>
          <h1>Available Courses</h1>
          <br></br>
          <div className="s-cards">
            {Data &&
              Data.map((sub) => {
                return (
                  <div className="s-card">
                    <h3>{sub.subject}</h3>
                    <span>
                      Conduct by <b>{sub.teacher}</b> <br />
                      <b>{sub.fee}</b> Per Month
                      <br />
                      Every {sub.DAT}
                    </span>
                    <br></br>
                    <br></br>
                    <br />
                    <button>Enroll</button>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <hr />
    </>
  );
};

export default User;

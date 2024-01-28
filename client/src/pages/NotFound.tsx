import { Link } from "react-router-dom";
import notFoundImage from "../assets/404-error.png";

const NotFound = () => {
  return (
    <div className="flex justify-center mt-12">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img style={{ height: "384px", width: "384px" }} loading="lazy" src={notFoundImage} alt="Page Not Found" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Not found</h2>
          <p>Seems like this page does not exists</p>
          <div className="card-actions justify-end">
            <Link className="btn btn-primary" to="/">
              Go to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

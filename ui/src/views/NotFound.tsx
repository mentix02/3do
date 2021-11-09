import { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <div className="text-center">
      <h2>not found</h2>
      <p>perhaps you forgot to add this to <Link to="/">your tasks</Link>?</p>
    </div>
  );
};

export default NotFound;
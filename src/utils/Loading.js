import { React } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <div>
      <h2 className="text-center">
        <ClipLoader loading={true} color={"green"} />
      </h2>
    </div>
  );
};

export default Loading;

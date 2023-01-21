import React from "react";
import poster from "../../img/blog1.png";
const HomePage = () => {
  return (
    <>
      <section
        className="pb-10 bg-gray-800 "
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div
          className="relative container px-4 w-auto h-auto  mx-auto"
          style={{ top: "25%" }}
        >
          <div className="flex  items-center ">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <span className=" font-bold text-blue-400">
                Create posts to educate
              </span>
              <h2 className=" my-2 text-2xl  text-white font-bold font-heading">
                Pen down your ideas{" "}
                <span className="text-yellow-500">By creating a post</span>
              </h2>
              <p className=" lg:mb-16 2xl:mb-24 text-lg text-gray-100">
                Your post must be free from racism and unhealthy words
              </p>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <img className="w-full" src={poster} alt={poster} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;

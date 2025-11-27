import React from "react";
import Form from "../componenets/Form";
import Records from "../componenets/Records";

const Home = () => {
  return (
    <section className="flex flex-row min-h-screen justify-between px-32 pt-14 bg-gray-200 font-[poppins]">
      <Records />
      <Form />
    </section>
  );
};

export default Home;

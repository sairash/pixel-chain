import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Firstpage = () => {
  const [name, setName] = useState<string>();
  const handleSubmit = () => {
    name && localStorage.setItem("username", name);
  };
  const img = '/logo.png'
  return (
    <div className="flex items-center justify-center h-screen overflow-y-hidden">
      <section className="w-full max-w-md py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="space-y-6 text-center">
            <img src={img} alt="" className="w-52 ml-20" />
            <div className="space-y-2">
              <h2 className="text-3xl  tracking-tighter sm:text-4xl md:text-5xl  bg-gradient-to-r from-purple-600 font-bold inline-block to-yellow-500 text-transparent bg-clip-text transition-all">
                Pixel Chain
              </h2>
              <p className=" dark:text-gray-400 font-bold text-black">
                Enter your name to begin.
              </p>
            </div>
            <form className="space-y-4">
              <Input
                className="w-full  border border-gray-300"
                placeholder="Enter your name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <Button className="w-full bg-gradient-to-r bg-purple-600 font-bold inline-block  " type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Firstpage;

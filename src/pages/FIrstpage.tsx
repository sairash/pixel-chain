import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Firstpage = () => {
  const [name, setName] = useState<string>();
  const handleSubmit = () => {
    name && localStorage.setItem("username", name);
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <section className="w-full max-w-md py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Pixel Chain
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your name to begin.
              </p>
            </div>
            <form className="space-y-4">
              <Input
                className="w-full"
                placeholder="Enter your name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
              <Button className="w-full" type="submit" onClick={handleSubmit}>
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

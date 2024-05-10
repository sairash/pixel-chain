import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

const Firstpage = ()=>{
   return( <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6">
      <div className="mx-auto max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get Started</h2>
          <p className="text-gray-500 dark:text-gray-400">Enter your name to begin.</p>
        </div>
        <form className="space-y-4">
          <Input className="w-full" placeholder="Enter your name" type="text" />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  </section>)
}

export default Firstpage
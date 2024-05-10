import { useParams } from "react-router-dom"

export default function IndEvents() {
  let {id} = useParams()
  console.log(id)
  return (
    <div>
      <p>hello world </p>
    </div>
  )
}

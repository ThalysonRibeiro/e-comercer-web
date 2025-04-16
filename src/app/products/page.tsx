import { Header } from "@/components/Header/header";
import { ListItems } from "./components/listItems";

export default function Products() {

  return (
    <div>
      <div className="w-full mx-auto flex flex-col items-center justify-center">
        <div className="max-w-7xl w-full mt-6">
          <ListItems />

        </div>
      </div>
    </div>
  )
}
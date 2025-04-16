import { Search } from "lucide-react";

export function InputSearch() {
  return (
    <div className="flex h-10 max-w-2xl w-full justify-center items-center outline-0 bg-transparent backdrop-blur-sm border border-gray-400 focus-within:border-primary rounded-lg">
      <div className="border-r border-r-gray-500 px-2 text-gray-400">
        <Search className="size-8" />
      </div>
      <input
        type="text"
        className="outline-0 w-full h-10 px-2" />
    </div>
  )
}
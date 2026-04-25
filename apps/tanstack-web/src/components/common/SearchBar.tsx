import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4" />
      <input
        type="text"
        className="border border-white/10 pl-8 pr-6 py-1 bg-dark-200 rounded-lg"
        placeholder="Buscar docs..."
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-600/50 rounded-xs px-1 text-sm">
        ⌘k
      </span>
    </div>
  );
}

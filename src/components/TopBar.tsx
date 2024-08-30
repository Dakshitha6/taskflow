import React from "react";

interface TopBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortCriteria: "newest" | "oldest";
  setSortCriteria: (criteria: "newest" | "oldest") => void;
  openAddTaskModal: () => void;
}

const TopBar= ({
  searchQuery,
  setSearchQuery,
  sortCriteria,
  setSortCriteria,
  openAddTaskModal
}:TopBarProps) => {
  return (
    <div className="flex flex-wrap space-y-4 justify-between items-center mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border rounded-lg px-4 py-2 w-full max-w-md"
      />
      <div className="flex gap-2">
        <select
          value={sortCriteria}
          onChange={(e) =>
            setSortCriteria(e.target.value as "newest" | "oldest")
          }
          className="border rounded-lg px-4 py-2"
        >
          <option value="newest">Sort by Newest</option>
          <option value="oldest">Sort by Oldest</option>
        </select>
        <button
          onClick={openAddTaskModal}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TopBar;

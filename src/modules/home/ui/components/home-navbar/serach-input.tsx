import React from "react";

const serchInput = () => {
  return (
    <form className="flex w-full max-w-[600px]">
      <div className="relative w-full">
        <input
          placeholder="serach"
          type="text"
          className="rounded-l-full pl-3 py-2 border focus:outline-none focus:border-blue-300 w-full pr-12 "
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2.5 bg-gray-400 hover:bg-slate-400 border-l-0 rounded-r-full disabled:cursor-not-allowed disabled:opacity-50"
      ></button>
    </form>
  );
};
export default serchInput;

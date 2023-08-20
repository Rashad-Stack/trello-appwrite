"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/boardStore";
import fetchSuggestion from "@/utils/fetchSuggestion";

export default function Header() {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [suggestion, setSuggestion] = useState<string>();

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);
    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);

      setSuggestion(suggestion);
      setLoading(false);
    };

    fetchSuggestionFunc();
  }, [board]);

  return (
    <header>
      <div className="flex flex-col items-center p-5 md:flex-row bg-gray-500/10">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 -z-50" />
        <Image
          src="/trello-logo.png"
          width={0}
          height={0}
          sizes="100vh"
          alt="trello logo"
          className="object-contain pb-10 w-44 md:w-56 md:pb-0"
        />
        <div className="flex items-center justify-end flex-1 w-full space-x-5">
          {/* Search Box */}
          <form className="flex items-center flex-1 p-2 space-x-5 bg-white rounded-md shadow-md md:flex-initial">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 p-2 outline-none"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button hidden>Search</button>
          </form>
          {/* Avatar */}
          <Avatar name="Rashadul Islam" round size="50" color="#0055D1" />
        </div>
      </div>

      <div className="flex items-center justify-center px-5 md:py-5">
        <p className="flex items-center text-sm font-light p-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]">
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${
              loading && "animate-spin"
            }`}
          />
          {suggestion && !loading
            ? suggestion
            : "GPT is summarizing your task for the day..."}
        </p>
      </div>
    </header>
  );
}

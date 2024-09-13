"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="relative flex h-16 items-center justify-end p-4">
        <Button>Sign in</Button>
      </div>
    </nav>
  );
};

export default Navbar;

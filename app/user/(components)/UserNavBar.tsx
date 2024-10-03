"use client";
import { Anchor } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";

export default function UserNavBar() {
  return (
    <div className="w-full flex justify-between p-5">
      <Link href="/">
        <Anchor />
      </Link>
      <Link href="/user/whiteboard">
        <Button variant="outlined">Whiteboard</Button>
      </Link>
    </div>
  );
}

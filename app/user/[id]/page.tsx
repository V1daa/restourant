"use client";
import { Button, Input } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function User({ params }: { params: { id: string } }) {
  const [email, setEmail] = useState(params.id);
  const router = useRouter();

  useEffect(() => {
    if (window) {
      let val = JSON.parse(localStorage.getItem("auth") as string);
      if (val !== true) {
        router.push("login");
      }
    }
  });

  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="w-auto h-auto p-10 border border-b border-dotted flex justify-center items-center flex-col gap-5 rounded-xl">
        <h1>Hello {params.id}</h1>
        <h1>Change email</h1>
        <Input type="text" onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={() => alert(`Changed ${email}`)}>Change</Button>
        <Link href="/">
          <Button variant="contained" className="bg-red-600 hover:bg-red-500">
            Exit
          </Button>
        </Link>
      </div>
    </div>
  );
}

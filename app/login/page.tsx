"use client";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();

  const [data, setData] = useState({
    password: "",
    email: "",
  });

  const handleClick = () => {
    if (window && data.password == "a") {
      let arr = data.email.split("");

      localStorage.setItem("auth", "true");
      router.push(
        `user/${arr
          .toSpliced(arr.indexOf("@"), arr.length - arr.indexOf("@"))
          .join("")}`
      );
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (window) {
      localStorage.setItem("auth", "");
    }
  }, []);
  
  return (
    <section className="w-full h-[80vh] flex items-center justify-center">
      <div className="w-[300px] h-[300px] shadow-lg flex flex-col items-center gap-5 border-b border p-5 rounded-md">
        <h1 className="text-2xl uppercase">Login</h1>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="email"
          value={data.email}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <TextField
          id="outlined-basic"
          type="password"
          label="Password"
          variant="outlined"
          name="password"
          value={data.password}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <Button type="button" variant="outlined" onClick={handleClick}>
          Submit
        </Button>
      </div>
    </section>
  );
}

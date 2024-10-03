import AnchorIcon from "@mui/icons-material/Anchor";
import { Button } from "@mui/material";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="p-5 w-full flex justify-between">
      <Link href="/">
        <AnchorIcon className=" cursor-pointer w-[30px] h-[30px]" />
      </Link>
      <div className="flex items-center justify-center gap-5">
        <Link href="/about">
          <Button variant="outlined">About</Button>
        </Link>
        <Link href="/login">
          <Button variant="contained">Login</Button>
        </Link>
      </div>
    </nav>
  );
}

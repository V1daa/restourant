import UserNavBar from "./(components)/UserNavBar";

export const metadata = {
  title: "User Page",
  description: "This is user page",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-full">
        <UserNavBar />
        {children}
      </body>
    </html>
  );
}

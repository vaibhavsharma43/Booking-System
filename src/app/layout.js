
import "src/app/globals.css";
// import Navbar from "@/components/Navbar"


export const metadata = {
  title: "Doctor Booking System",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}

import Footer from "@/components/modules/HomePage/Footer/Footer";
import Navbar from "@/components/modules/HomePage/Navbar/Navbar";


export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar/>
      <main className="min-h-dvh">{children}</main>
      <Footer/>
    </>
  );
}
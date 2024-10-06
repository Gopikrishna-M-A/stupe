import Nav from "@/components/Nav";
import Footer from "@/components/Footer";


export default function StaticLayout({ children }) {
  return (
    <div className='min-h-screen flex flex-col justify-between'>
        <Nav/>
        {children}
        <Footer/>
    </div>
  );
}

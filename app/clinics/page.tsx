import Navbar from "@/components/Navbar";
import Clinics from "@/components/Clinics";
import Footer from "@/components/Footer";

export default function ClinicsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Clinics />
      </main>
      <Footer />
    </>
  );
}

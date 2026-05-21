import { Suspense } from "solid-js";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = (props) => {
  return (
    <div class="min-h-screen bg-[#FFF4E0] font-['Poppins',sans-serif] text-[#3D2A1F] antialiased selection:bg-[#4DB6AC] selection:text-white">
      <Navbar />

      <main>
        <Suspense>{props.children}</Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;

import { Suspense } from "solid-js";
import { Meta, Title } from "@solidjs/meta";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = (props) => {
  return (
    <div class="min-h-screen bg-[#FFF4E0] font-['Poppins',sans-serif] text-[#3D2A1F] antialiased selection:bg-[#4DB6AC] selection:text-white">
      <Title>Stoward</Title>
      <Meta
        name="description"
        content="Stoward is a Stoat listing site; Discover, explore, and join the best public Stoat servers and communities on Stoward. Find your next space!"
      />
      <Meta
        name="keywords"
        content="stoat server list, stoat list, stoward, stoward web, stoat communities, public stoat servers, stoat servers"
      />
      <Meta name="robots" content="index, follow" />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" content="https://stoward.space/" />
      <Meta property="og:title" content="Stoward" />
      <Meta
        property="og:description"
        content="Stoward is a Stoat listing site; Discover, explore, and join the best public Stoat servers and communities on Stoward."
      />
      <Meta property="twitter:url" content="https://stoward.space/" />
      <Meta property="twitter:title" content="Stoward" />
      <Meta
        property="twitter:description"
        content="Stoward is a Stoat listing site; Discover, explore, and join the best public Stoat servers."
      />
      <Navbar />

      <main>
        <Suspense>{props.children}</Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default App;

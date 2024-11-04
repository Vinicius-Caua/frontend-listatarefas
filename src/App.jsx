import PaginaInicial from "./pages/PaginaInicial";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <div className="flex flex-col gap-4 space-y-0">
      <div>
        <PaginaInicial />;
      </div>
      <Footer />
    </div>
  );
}

export default App;

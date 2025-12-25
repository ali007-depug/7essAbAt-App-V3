import "./index.css";
import Header from "./components/Header";
import AppTabs from "./components/Store/AppTabs";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="bg-darkPurple h-screen">
      <Toaster position="top-center" richColors />

      <div className="max-md:h-screen  px-4 md:px-10 py-8 md:py-10 [direction:rtl]">
        {/* header */}
        <Header />
        {/* form + Taps */}
        <div className="relative top-20 md:top-10 w-full  md:max-w-2xl md:mx-auto border border-gray-400 rounded-lg bg-lightPurple/50 py-6 px-2 md:p-10 shadow-lg">
          <AppTabs />
        </div>
      </div>
    </div>
  );
}

export default App;

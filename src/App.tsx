import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import { AccountNoteProvider } from "./contexts/AccountNoteContext";
import { EditPage, HomePage, NewAccountPage } from "./pages";

const App = () => {
  return (
    <AccountNoteProvider>
      <div className="min-h-screen bg-gray-950 relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-account" element={<NewAccountPage />} />
          <Route path=":accountID" element={<EditPage />} />
        </Routes>
      </div>
    </AccountNoteProvider>
  );
};

export default App;

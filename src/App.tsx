import { lazy, Suspense, memo } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import { LoadingProvider } from "./context/LoadingProvider";
import "./components/styles/mobile-fixes.css";

// Lazy imports
const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const ProjectPage = lazy(() => import("./components/Projectpage"));
const CertificationsPage = lazy(() =>
  import("./components/CertificationsPage")
);
const PortfolioPage = lazy(() => import("./components/PortfolioPage"));

// Memoize heavy component
const MemoCharacter = memo(CharacterModel);

// Loader
const Loader = () => <div className="app-loader">Loading...</div>;

const AppInner = () => {
  const location = useLocation();

  const isSubPage =
    location.pathname.startsWith("/project/") ||
    location.pathname === "/certifications" ||
    location.pathname === "/portfolio" ||
    location.pathname === "/profile";

  return (
    <>
      {/* ✅ KEEP HOME ALWAYS MOUNTED */}
      <div style={{ display: isSubPage ? "none" : "block" }}>
        <Suspense fallback={<Loader />}>
          <MainContainer>
            <MemoCharacter />
          </MainContainer>
        </Suspense>
      </div>

      {/* ✅ ROUTES */}
      <Suspense fallback={<Loader />}>
        <Routes location={location} key={location.pathname}>
          {/* ✅ FIX: Home route */}
          <Route path="/" element={null} />

          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <AppInner />
      </LoadingProvider>
    </BrowserRouter>
  );
};

export default App;
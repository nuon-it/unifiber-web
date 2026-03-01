import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/layouts/MainLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Landing } from "./pages/Landing";
import { Internet } from "./pages/Internet";
import { Billing } from "./pages/Billing";
import { Entertainment } from "./pages/Entertainment";
import { GameTopUpImproved } from "./pages/entertainment/GameTopUpImproved";
import { GameDetailWrapperImproved } from "./pages/entertainment/GameDetailWrapperImproved";
import { Vouchers } from "./pages/entertainment/Vouchers";
import { LifestyleDetail } from "./pages/entertainment/LifestyleDetail";
import { Concerts } from "./pages/entertainment/Concerts";
import { Football } from "./pages/entertainment/Football";
import { ConcertDetail } from "./pages/entertainment/ConcertDetail";
import { FootballDetail } from "./pages/entertainment/FootballDetail";
import { Rewards } from "./pages/Rewards";
import { Support } from "./pages/Support";
import { Installation } from "./pages/Installation";
import { Profile } from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/app",
    element: (
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    ),
    children: [
      { index: true, Component: Home },
      { path: "internet", Component: Internet },
      { path: "billing", Component: Billing },
      { path: "entertainment", Component: Entertainment },
      { path: "entertainment/game-topup", Component: GameTopUpImproved },
      { path: "entertainment/game-topup/:gameId", Component: GameDetailWrapperImproved },
      { path: "entertainment/vouchers", Component: Vouchers },
      { path: "entertainment/vouchers/:lifestyleSlug", Component: LifestyleDetail },
      { path: "entertainment/concerts", Component: Concerts },
      { path: "entertainment/concerts/:concertId", Component: ConcertDetail },
      { path: "entertainment/football", Component: Football },
      { path: "entertainment/football/:matchId", Component: FootballDetail },
      { path: "rewards", Component: Rewards },
      { path: "support", Component: Support },
      { path: "installation", Component: Installation },
      { path: "profile", Component: Profile },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    ),
  },
]);

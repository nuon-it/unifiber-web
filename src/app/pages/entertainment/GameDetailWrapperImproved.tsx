import { useParams } from "react-router";
import { GameDetail } from "./GameDetail";
import { OtherGameDetailImproved } from "./OtherGameDetailImproved";

const supportedGames = [
  "mobile-legends",
  "pubg-mobile", 
  "free-fire",
  "genshin-impact"
];

export function GameDetailWrapperImproved() {
  const { gameId } = useParams<{ gameId: string }>();
  
  if (!gameId) {
    return <OtherGameDetailImproved />;
  }
  
  // Check if this is a supported game with full detail page
  const isSupportedGame = supportedGames.includes(gameId);
  
  return isSupportedGame ? <GameDetail /> : <OtherGameDetailImproved />;
}

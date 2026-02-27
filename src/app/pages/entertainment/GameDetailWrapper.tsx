import { useParams } from "react-router";
import { GameDetail } from "./GameDetail";
import { OtherGameDetail } from "./OtherGameDetail";

const supportedGames = [
  "mobile-legends",
  "pubg-mobile", 
  "free-fire",
  "genshin-impact"
];

export function GameDetailWrapper() {
  const { gameId } = useParams<{ gameId: string }>();
  
  if (!gameId) {
    return <OtherGameDetail />;
  }
  
  // Check if this is a supported game with full detail page
  const isSupportedGame = supportedGames.includes(gameId);
  
  return isSupportedGame ? <GameDetail /> : <OtherGameDetail />;
}
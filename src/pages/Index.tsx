import { useState } from "react";
import { FounderCard, Founder } from "@/components/FounderCard";
import { SwipeActions } from "@/components/SwipeActions";
import { MatchDialog } from "@/components/MatchDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Flame } from "lucide-react";
import { mockFounders } from "@/data/mockFounders";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface IndexProps {
  matches: Founder[];
  setMatches: (matches: Founder[]) => void;
}

const Index = ({ matches, setMatches }: IndexProps) => {
  const navigate = useNavigate();
  const [founders] = useState<Founder[]>(mockFounders);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [history, setHistory] = useState<{ founder: Founder; action: "like" | "pass" }[]>([]);
  const [matchedFounder, setMatchedFounder] = useState<Founder | null>(null);
  const [showMatchDialog, setShowMatchDialog] = useState(false);

  const currentFounder = founders[currentIndex];

  const handleSwipe = (direction: "left" | "right") => {
    if (!currentFounder) return;

    setSwipeDirection(direction);
    setHistory([...history, { founder: currentFounder, action: direction === "right" ? "like" : "pass" }]);

    if (direction === "right") {
      // 40% chance of match for demo purposes
      const isMatch = Math.random() > 0.6;
      if (isMatch) {
        setMatches([...matches, currentFounder]);
        setMatchedFounder(currentFounder);
        setShowMatchDialog(true);
      } else {
        toast.success(`Liked ${currentFounder.name}!`, {
          description: "We'll notify you if they like you back"
        });
      }
    }

    setTimeout(() => {
      setSwipeDirection(null);
      setCurrentIndex(currentIndex + 1);
    }, 300);
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const lastAction = history[history.length - 1];
    setHistory(history.slice(0, -1));
    
    if (lastAction.action === "like") {
      const matchIndex = matches.findIndex(m => m.id === lastAction.founder.id);
      if (matchIndex !== -1) {
        setMatches(matches.filter((_, i) => i !== matchIndex));
      }
    }

    setCurrentIndex(Math.max(0, currentIndex - 1));
    toast.info("Undone");
  };

  if (currentIndex >= founders.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <Flame className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">That's everyone for now!</h2>
          <p className="text-muted-foreground mb-6">
            Check back later for more potential co-founders, or view your matches.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => {
              setCurrentIndex(0);
              setHistory([]);
            }}>
              Start Over
            </Button>
            <Button variant="outline" onClick={() => navigate("/matches")}>
              View Matches ({matches.length})
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CoFoundr
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/matches")}
            className="relative"
          >
            <Users className="w-4 h-4 mr-2" />
            Matches
            {matches.length > 0 && (
              <Badge className="ml-2 bg-gradient-to-r from-success to-success/80 text-white border-0 h-5 px-2">
                {matches.length}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-8">
        <div
          className={`transition-all duration-300 ${
            swipeDirection === "left"
              ? "animate-swipe-out-left"
              : swipeDirection === "right"
              ? "animate-swipe-out-right"
              : ""
          }`}
        >
          {currentFounder && <FounderCard founder={currentFounder} />}
        </div>

        <SwipeActions
          onPass={() => handleSwipe("left")}
          onLike={() => handleSwipe("right")}
          onUndo={handleUndo}
          canUndo={history.length > 0}
        />

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            {founders.length - currentIndex} founders remaining
          </p>
        </div>
      </main>

      <MatchDialog
        open={showMatchDialog}
        onOpenChange={setShowMatchDialog}
        founder={matchedFounder}
      />
    </div>
  );
};

export default Index;

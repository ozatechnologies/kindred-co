import { Button } from "@/components/ui/button";
import { X, Heart, RotateCcw } from "lucide-react";

interface SwipeActionsProps {
  onPass: () => void;
  onLike: () => void;
  onUndo: () => void;
  canUndo: boolean;
}

export const SwipeActions = ({ onPass, onLike, onUndo, canUndo }: SwipeActionsProps) => {
  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      <Button
        onClick={onPass}
        size="lg"
        variant="outline"
        className="h-16 w-16 rounded-full border-2 hover:border-destructive hover:text-destructive hover:scale-110 transition-all"
      >
        <X className="w-7 h-7" />
      </Button>

      <Button
        onClick={onUndo}
        size="lg"
        variant="outline"
        disabled={!canUndo}
        className="h-14 w-14 rounded-full border-2 hover:scale-110 transition-all disabled:opacity-30"
      >
        <RotateCcw className="w-5 h-5" />
      </Button>

      <Button
        onClick={onLike}
        size="lg"
        className="h-16 w-16 rounded-full bg-gradient-to-r from-success to-success/80 hover:scale-110 transition-all shadow-lg"
      >
        <Heart className="w-7 h-7" />
      </Button>
    </div>
  );
};

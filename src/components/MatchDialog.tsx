import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Founder } from "./FounderCard";
import { Heart } from "lucide-react";

interface MatchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  founder: Founder | null;
}

export const MatchDialog = ({ open, onOpenChange, founder }: MatchDialogProps) => {
  if (!founder) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Heart className="w-20 h-20 text-success fill-success animate-pulse" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">It's a Match!</DialogTitle>
          <DialogDescription className="text-center text-base">
            You and {founder.name} liked each other!
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-center gap-4 py-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-success">
            <img
              src={founder.image}
              alt={founder.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full bg-gradient-to-r from-success to-success/80"
          >
            Send Message
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="w-full"
          >
            Keep Swiping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Founder } from "@/components/FounderCard";

interface MatchesProps {
  matches: Founder[];
}

const Matches = ({ matches }: MatchesProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Your Matches</h1>
            <p className="text-muted-foreground">
              {matches.length} {matches.length === 1 ? "match" : "matches"}
            </p>
          </div>
        </div>

        {matches.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">
              No matches yet. Keep swiping to find your co-founder!
            </p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Start Swiping
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {matches.map((founder) => (
              <Card key={founder.id} className="overflow-hidden hover:shadow-[var(--shadow-hover)] transition-shadow">
                <div className="relative h-48">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {founder.name}, {founder.age}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {founder.title} • {founder.location}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {founder.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-accent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;

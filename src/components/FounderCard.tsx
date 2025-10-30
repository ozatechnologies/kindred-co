import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Target, Sparkles } from "lucide-react";

export interface Founder {
  id: number;
  name: string;
  age: number;
  location: string;
  title: string;
  industry: string;
  experience: string;
  lookingFor: string;
  skills: string[];
  bio: string;
  image: string;
}

interface FounderCardProps {
  founder: Founder;
}

export const FounderCard = ({ founder }: FounderCardProps) => {
  return (
    <Card className="w-full h-[600px] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-shadow">
      <div className="relative h-64 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
        <img
          src={founder.image}
          alt={founder.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h2 className="text-2xl font-bold text-white">{founder.name}, {founder.age}</h2>
          <div className="flex items-center gap-1 text-white/90 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{founder.location}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6 space-y-4 overflow-y-auto h-[336px]">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Briefcase className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground">{founder.title}</p>
              <p className="text-sm text-muted-foreground">{founder.industry} • {founder.experience}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground">Looking for</p>
              <p className="text-sm text-muted-foreground">{founder.lookingFor}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="w-full">
              <p className="font-semibold text-foreground mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">
                {founder.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-sm text-foreground leading-relaxed">{founder.bio}</p>
        </div>
      </CardContent>
    </Card>
  );
};

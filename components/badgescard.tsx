import React from 'react';
import { Badge } from '../components/ui/badge';

interface BadgesCardProps {
  className?: string;
  keywords: { [keyword: string]: string };
}

const BadgesCard: React.FC<BadgesCardProps> = ({ className, keywords }) => {
  return (
    <div className={`w-40 mt-2 ml-2 ${className}`}>
      {Object.entries(keywords).map(([keyword, value], i) => (
        <Badge key={i} className="m-1 p-2 bg-blue-300 md:text-xs shadow-md bg-gradient-to-b from-muted/10">
          {keyword}: {value}
        </Badge>
      ))}
    </div>
  );
}

export default BadgesCard;

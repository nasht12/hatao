import React from 'react';
import { Badge } from '../components/ui/badge';
import { getKeywords } from '@/lib/utils';

interface BadgesCardProps {
  className?: string;
}

const BadgesCard: React.FC<BadgesCardProps> = ({ className }) => {
  const keywords = getKeywords('restaurants');

  return (
        <div className="w-40 mt-2 ml-2">
          {keywords.map((keyword, i) => (
            <Badge key={i} className="m-1 p-2 bg-blue-300 md: text-xs shadow-md bg-gradient-to-b from-muted/10">
              {keyword}: XYZ
            </Badge>
          ))}
        </div>
  );
}

export default BadgesCard;
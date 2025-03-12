'use client';

import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  address: string;
  status: 'In Progress' | 'Completed' | 'Pending';
  criticalIssues: number;
  highIssues: number;
  mediumIssues: number;
  lowIssues: number;
  timestamp: string;
}

const projects: Project[] = [
  {
    id: 'project1',
    name: 'TokenSwap.sol',
    address: '0x1a2b...3c4d',
    status: 'In Progress',
    criticalIssues: 2,
    highIssues: 3,
    mediumIssues: 2,
    lowIssues: 0,
    timestamp: '2025-03-04T15:30:00',
  },
  {
    id: 'project2',
    name: 'LiquidityPool.sol',
    address: '0x5e6f...7g8h',
    status: 'Completed',
    criticalIssues: 0,
    highIssues: 1,
    mediumIssues: 3,
    lowIssues: 6,
    timestamp: '2025-03-03T12:15:00',
  },
  {
    id: 'project3',
    name: 'NFTMarketplace.sol',
    address: '0x9i0j...1k2l',
    status: 'Completed',
    criticalIssues: 1,
    highIssues: 2,
    mediumIssues: 4,
    lowIssues: 5,
    timestamp: '2025-03-02T09:45:00',
  },
  {
    id: 'project4',
    name: 'StakingRewards.sol',
    address: '0x3m4n...5o6p',
    status: 'Completed',
    criticalIssues: 0,
    highIssues: 0,
    mediumIssues: 2,
    lowIssues: 7,
    timestamp: '2025-03-01T14:20:00',
  },
  {
    id: 'project5',
    name: 'GovernanceToken.sol',
    address: '0x7q8r...9s0t',
    status: 'Pending',
    criticalIssues: 0,
    highIssues: 0,
    mediumIssues: 0,
    lowIssues: 0,
    timestamp: '2025-02-28T11:10:00',
  },
];

interface ProjectListProps {
  selectedProject: string | null;
  onSelectProject: (id: string) => void;
}

export function ProjectList({
  selectedProject,
  onSelectProject,
}: ProjectListProps) {
  return (
    <div className="divide-y">
      <div className="grid grid-cols-3 px-4 py-2 text-xs font-medium text-muted-foreground">
        <div>PROJECT</div>
        <div>STATUS</div>
        <div>FINDINGS</div>
      </div>

      {projects.map((project) => (
        <div
          key={project.id}
          className={`px-4 py-3 hover:bg-muted/50 cursor-pointer ${
            selectedProject === project.id
              ? 'bg-muted border-l-4 border-primary'
              : ''
          }`}
          onClick={() => onSelectProject(project.id)}
        >
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="font-medium truncate max-w-[150px]">
                {project.name}
              </div>
              <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                {project.address}
              </div>
            </div>

            <div className="flex items-center">
              <Badge
                variant={
                  project.status === 'Completed'
                    ? 'success'
                    : project.status === 'In Progress'
                      ? 'default'
                      : 'secondary'
                }
                className="text-xs"
              >
                {project.status}
              </Badge>
            </div>

            <div className="flex items-center space-x-1">
              {project.status !== 'Pending' ? (
                <>
                  {project.criticalIssues > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {project.criticalIssues}
                    </Badge>
                  )}
                  {project.highIssues > 0 && (
                    <Badge
                      variant="outline"
                      className="text-xs border-orange-500 text-orange-500"
                    >
                      {project.highIssues}
                    </Badge>
                  )}
                  {project.mediumIssues > 0 && (
                    <Badge
                      variant="outline"
                      className="text-xs border-yellow-500 text-yellow-500"
                    >
                      {project.mediumIssues}
                    </Badge>
                  )}
                  {project.criticalIssues === 0 &&
                    project.highIssues === 0 &&
                    project.mediumIssues === 0 && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                </>
              ) : (
                <Clock className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

'use client';

import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

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

interface ProjectListProps {
  selectedProject: string | null;
  onSelectProject: (id: string) => void;
}

export function ProjectList({ selectedProject, onSelectProject }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/scan/results');
        const data = await res.json();
        console.log('Fetched scan results:', data);

        const parsed = data.map((item: any) => {
          const sev = item.scan_results?.scanner_results?.summary?.severity_breakdown ?? {};
          const high = sev['High'] ?? 0;
          const medium = sev['Medium'] ?? 0;
          const low = sev['Low'] ?? 0;

          const missed = item.scan_results?.ai_verification?.missed_vulnerabilities ?? [];
          const critical = missed.filter((vuln: any) => vuln.severity === 'High' || vuln.severity === 'Critical').length;

          return {
            id: item.id,
            name: item.contract_name || 'Unnamed Contract',
            address: item.contract_address || 'N/A',
            status: 'Completed',
            criticalIssues: critical,
            highIssues: high,
            mediumIssues: medium,
            lowIssues: low,
            timestamp: item.created_at,
          };
        });
        setProjects(parsed);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="divide-y">
      <div className="grid grid-cols-3 px-4 py-2 text-xs font-medium text-muted-foreground">
        <div>PROJECT</div>
        <div>STATUS</div>
        <div>FINDINGS</div>
      </div>

      {projects.length === 0 ? (
        <div className="px-4 py-8 text-center text-muted-foreground text-sm">
          No projects found. Upload a contract to get started.
        </div>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className={`px-4 py-3 hover:bg-muted/50 cursor-pointer ${
              selectedProject === project.id ? 'bg-muted border-l-4 border-primary' : ''
            }`}
            onClick={() => onSelectProject(project.id)}
          >
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="font-medium truncate max-w-[150px]">{project.name}</div>
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
        ))
      )}
    </div>
  );
}

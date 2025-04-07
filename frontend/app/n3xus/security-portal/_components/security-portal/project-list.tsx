"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  name: string;
  address: string;
  status: "In Progress" | "Completed" | "Pending";
  criticalIssues: number;
  highIssues: number;
  mediumIssues: number;
  lowIssues: number;
  timestamp: string;
  scan_results?: any;
}

interface ProjectListProps {
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
  projects: Project[];
}

export function ProjectList({ selectedProject, onSelectProject, projects }: ProjectListProps) {
  return (
    <div className="p-4 space-y-3">
      {projects.length === 0 ? (
        <p className="text-sm text-muted-foreground">No projects found.</p>
      ) : (
        projects.map((project) => {
          const isSelected = selectedProject?.id === project.id;
          return (
            <Card
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`p-4 cursor-pointer border ${
                isSelected ? "border-primary ring-2 ring-primary" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-semibold">{project.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {new Date(project.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-1">
                  {project.criticalIssues > 0 && (
                    <Badge variant="destructive" className="text-xs h-5">
                      {project.criticalIssues} Critical
                    </Badge>
                  )}
                  {project.highIssues > 0 && (
                    <Badge
                      variant="outline"
                      className="text-xs h-5 border-orange-500 text-orange-500"
                    >
                      {project.highIssues} High
                    </Badge>
                  )}
                  {project.mediumIssues > 0 && (
                    <Badge
                      variant="outline"
                      className="text-xs h-5 border-yellow-500 text-yellow-500"
                    >
                      {project.mediumIssues} Medium
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
}

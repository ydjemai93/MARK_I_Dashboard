import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PhoneIcon } from "lucide-react";
import { Agent } from "@/polymet/data/agents-data";
import { Link, useNavigate } from "react-router-dom";

interface AgentsTableProps {
  agents: Agent[];
}

export function AgentsTable({ agents }: AgentsTableProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "draft":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "paused":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      default:
        return "";
    }
  };

  const handleRowClick = (agentId: number) => {
    navigate(`/agents/${agentId}`);
  };

  return (
    <div className="rounded-md border font-thin">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Calls</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No agents found.
              </TableCell>
            </TableRow>
          ) : (
            agents.map((agent) => (
              <TableRow
                key={agent.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(agent.id)}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <PhoneIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{agent.name}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {agent.description}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{agent.type}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`capitalize ${getStatusColor(agent.status)}`}
                  >
                    {agent.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{agent.calls}</TableCell>
                <TableCell>{agent.lastModified}</TableCell>
                <TableCell>{agent.createdAt}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

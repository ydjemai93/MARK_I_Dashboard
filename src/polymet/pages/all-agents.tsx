import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { AgentFilter } from "@/polymet/components/agent-filter";
import { AgentsTable } from "@/polymet/components/agents-table";
import { AGENTS_DATA, Agent } from "@/polymet/data/agents-data";

export default function AllAgentsPage() {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    type: "all",
  });

  // Extract unique agent types for the filter dropdown
  const agentTypes = useMemo(() => {
    const types = new Set(AGENTS_DATA.map((agent) => agent.type));
    return Array.from(types);
  }, []);

  // Filter agents based on search, status, and type
  const filteredAgents = useMemo(() => {
    return AGENTS_DATA.filter((agent: Agent) => {
      const matchesSearch =
        filters.search === "" ||
        agent.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        agent.description.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === "all" || agent.status === filters.status;

      const matchesType =
        filters.type === "all" ||
        agent.type.toLowerCase() === filters.type.toLowerCase();

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [filters]);

  const handleFilterChange = (newFilters: {
    search: string;
    status: string;
    type: string;
  }) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Agents</h1>
          <p className="text-muted-foreground">
            View and manage all your AI agents
          </p>
        </div>
        <Link to="/create-agent">
          <Button className="gap-2">
            <PlusIcon className="h-4 w-4" />
            New Agent
          </Button>
        </Link>
      </div>

      <div className="bg-card rounded-lg border shadow-sm p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Agent Management</h2>
          <p className="text-muted-foreground">
            Filter, search, and manage your AI agents from one place
          </p>
        </div>

        <AgentFilter
          onFilterChange={handleFilterChange}
          agentTypes={agentTypes}
        />

        <div className="mt-2">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredAgents.length} of {AGENTS_DATA.length} agents
            </p>
          </div>

          <AgentsTable agents={filteredAgents} />
        </div>
      </div>
    </div>
  );
}

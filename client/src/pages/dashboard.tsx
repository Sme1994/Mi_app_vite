import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Ticket, TicketStatus } from "@shared/schema";
import { useLanguage } from "@/hooks/use-language";
import { useAnnouncement } from "@/hooks/use-announcement";
import { 
  ClipboardList, 
  Search, 
  Wrench, 
  CheckCircle, 
  Flag,
  Plus,
  Monitor,
  Edit,
  Eye
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/status-badge";
import UpdateStatusDialog from "@/components/update-status-dialog";
import { format } from "date-fns";

export default function Dashboard() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Enable voice announcements for this page
  useAnnouncement();

  const { data: tickets = [], isLoading: ticketsLoading } = useQuery<Ticket[]>({
    queryKey: ["/api/tickets"],
  });

  const { data: stats = { registered: 0, diagnosis: 0, repair: 0, quality: 0, ready: 0 } } = useQuery<{
    registered: number;
    diagnosis: number;
    repair: number;
    quality: number;
    ready: number;
  }>({
    queryKey: ["/api/tickets/stats"],
  });

  const { data: searchResults = [], isLoading: searchLoading } = useQuery<Ticket[]>({
    queryKey: ["/api/tickets/search", searchQuery],
    enabled: searchQuery.length > 0,
  });

  const displayedTickets = searchQuery.length > 0 ? searchResults : tickets;

  const handleUpdateStatus = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setDialogOpen(true);
  };

  const formatElapsedTime = (createdAt: string | Date) => {
    const now = new Date();
    const created = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
    const diffInMs = now.getTime() - created.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffInHours > 0) {
      return `${diffInHours}h ${diffInMinutes}m`;
    }
    return `${diffInMinutes}m`;
  };

  const statsConfig = [
    {
      label: t.registered,
      value: stats.registered,
      icon: ClipboardList,
      bgColor: "bg-blue-100",
      iconColor: "text-primary",
      testId: "stat-registered",
    },
    {
      label: t.inDiagnosis,
      value: stats.diagnosis,
      icon: Search,
      bgColor: "bg-orange-100",
      iconColor: "text-secondary",
      testId: "stat-diagnosis",
    },
    {
      label: t.inRepair,
      value: stats.repair,
      icon: Wrench,
      bgColor: "bg-yellow-100",
      iconColor: "text-warning",
      testId: "stat-repair",
    },
    {
      label: t.qualityControl,
      value: stats.quality,
      icon: CheckCircle,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      testId: "stat-quality",
    },
    {
      label: t.ready,
      value: stats.ready,
      icon: Flag,
      bgColor: "bg-green-100",
      iconColor: "text-success",
      testId: "stat-ready",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {statsConfig.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.label} className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                    <IconComponent className={`${stat.iconColor} h-5 w-5`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p 
                      className="text-2xl font-semibold text-gray-900"
                      data-testid={stat.testId}
                    >
                      {stat.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions & Search */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <Card className="flex-1 border border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.searchTicket}</h3>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                  data-testid="input-search"
                />
              </div>
              <Button
                variant="default"
                className="px-6"
                disabled={searchLoading}
                data-testid="button-search"
              >
                <Search className="mr-2 h-4 w-4" />
                {t.search}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.quickActions}</h3>
            <div className="flex space-x-4">
              <Link href="/register">
                <Button
                  variant="default"
                  className="bg-green-600 hover:bg-green-700"
                  data-testid="button-new-vehicle"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {t.newVehicle}
                </Button>
              </Link>
              <Link href="/display">
                <Button
                  variant="secondary"
                  className="bg-gray-600 hover:bg-gray-700 text-white"
                  data-testid="button-display-view"
                >
                  <Monitor className="mr-2 h-4 w-4" />
                  {t.displayView}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Tickets Table */}
      <Card className="border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{t.activeTickets}</h3>
          <p className="text-sm text-gray-600 mt-1">{t.manageTickets}</p>
        </div>
        <div className="overflow-x-auto">
          {ticketsLoading ? (
            <div className="p-8 text-center text-gray-500">{t.loading}</div>
          ) : displayedTickets.length === 0 ? (
            <div className="p-8 text-center text-gray-500" data-testid="empty-tickets">
              {searchQuery ? t.noTicketsFound : t.noTicketsAvailable}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.ticket}</TableHead>
                  <TableHead>{t.vehicle}</TableHead>
                  <TableHead>{t.customer}</TableHead>
                  <TableHead>{t.status}</TableHead>
                  <TableHead>{t.time}</TableHead>
                  <TableHead>{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedTickets.map((ticket: Ticket) => (
                  <TableRow 
                    key={ticket.id} 
                    className="hover:bg-gray-50"
                    data-testid={`row-ticket-${ticket.id}`}
                  >
                    <TableCell>
                      <div className="text-sm font-medium text-gray-900" data-testid={`ticket-number-${ticket.id}`}>
                        {ticket.ticketNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(new Date(ticket.createdAt), "h:mm a")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-gray-900" data-testid={`license-plate-${ticket.id}`}>
                        {ticket.licensePlate}
                      </div>
                      <div className="text-sm text-gray-500">
                        {ticket.vehicleMake} {ticket.vehicleModel} {ticket.vehicleYear}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-gray-900" data-testid={`customer-name-${ticket.id}`}>
                        {ticket.customerName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {ticket.customerPhone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={ticket.status as TicketStatus} />
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatElapsedTime(ticket.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateStatus(ticket)}
                          className="text-primary hover:text-blue-700"
                          data-testid={`button-update-${ticket.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-gray-600"
                          data-testid={`button-view-${ticket.id}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>

      <UpdateStatusDialog
        ticket={selectedTicket}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </main>
  );
}

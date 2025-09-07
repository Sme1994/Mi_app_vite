import { useEffect, useState } from "react";
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
  ArrowLeft,
  Clock
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/status-badge";

export default function CustomerDisplay() {
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Enable voice announcements for this page
  useAnnouncement();

  const { data: tickets = [] } = useQuery<Ticket[]>({
    queryKey: ["/api/tickets"],
    refetchInterval: 5000, // Refresh every 5 seconds for real-time updates
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const activeTickets = tickets.filter((ticket: Ticket) => ticket.status !== "ready");
  const readyTickets = tickets.filter((ticket: Ticket) => ticket.status === "ready");
  const currentTicket = readyTickets[0]; // First ready ticket
  const nextTicket = activeTickets[0]; // Next in queue

  const getStatusSteps = (currentStatus: string) => {
    const allSteps = [
      { key: "registered", label: t.registered, icon: ClipboardList },
      { key: "diagnosis", label: t.diagnosis, icon: Search },
      { key: "repair", label: t.repair, icon: Wrench },
      { key: "quality", label: t.quality, icon: CheckCircle },
      { key: "ready", label: t.ready, icon: Flag },
    ];

    const currentIndex = allSteps.findIndex(step => step.key === currentStatus);
    
    return allSteps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      current: index === currentIndex,
    }));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <main className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {t.appName}
          </h1>
          <p className="text-xl text-blue-100">{t.vehicleServiceStatus}</p>
          <div className="text-lg text-blue-200 mt-2" data-testid="current-time">
            {formatTime(currentTime)}
          </div>
        </div>

        {/* Current Status Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Now Serving */}
          <Card className="shadow-2xl">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t.nowBeingServed}
              </h2>
              {currentTicket ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <div 
                    className="text-4xl font-bold text-green-800 mb-2"
                    data-testid="current-ticket-number"
                  >
                    {currentTicket.ticketNumber}
                  </div>
                  <div 
                    className="text-xl text-green-700 mb-2"
                    data-testid="current-ticket-plate"
                  >
                    {currentTicket.licensePlate}
                  </div>
                  <StatusBadge status={currentTicket.status as TicketStatus} />
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
                  <div className="text-2xl text-gray-500" data-testid="no-current-ticket">
                    {t.noTicketsBeingServed}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Next in Queue */}
          <Card className="shadow-2xl">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t.nextInQueue}
              </h2>
              {nextTicket ? (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                  <div 
                    className="text-4xl font-bold text-blue-800 mb-2"
                    data-testid="next-ticket-number"
                  >
                    {nextTicket.ticketNumber}
                  </div>
                  <div 
                    className="text-xl text-blue-700 mb-2"
                    data-testid="next-ticket-plate"
                  >
                    {nextTicket.licensePlate}
                  </div>
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                    <Clock className="mr-2 h-4 w-4" />
                    {t.pleaseWait}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
                  <div className="text-2xl text-gray-500" data-testid="no-next-ticket">
                    {t.noTicketsInQueue}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Status Progress */}
        {currentTicket && (
          <Card className="shadow-2xl mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                {t.serviceProgress}
              </h2>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4 w-full">
                  {getStatusSteps(currentTicket.status).map((step, index, array) => {
                    const IconComponent = step.icon;
                    return (
                      <div key={step.key} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                              step.completed
                                ? "bg-green-500"
                                : "bg-gray-300"
                            } ${
                              step.current ? "ring-4 ring-green-200" : ""
                            }`}
                            data-testid={`progress-${step.key}`}
                          >
                            <IconComponent
                              className={`h-5 w-5 ${
                                step.completed ? "text-white" : "text-gray-500"
                              }`}
                            />
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              step.completed ? "text-green-600" : "text-gray-500"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                        {index < array.length - 1 && (
                          <div
                            className={`flex-1 h-1 mx-2 ${
                              step.completed ? "bg-green-500" : "bg-gray-300"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Active Tickets */}
        <Card className="shadow-2xl">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              {t.allActiveTickets}
            </h2>
            {tickets.length === 0 ? (
              <div className="text-center text-gray-500" data-testid="no-active-tickets">
                {t.noActiveTickets}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map((ticket: Ticket) => (
                  <div
                    key={ticket.id}
                    className="border border-gray-200 rounded-lg p-6 text-center"
                    data-testid={`display-ticket-${ticket.id}`}
                  >
                    <div 
                      className="text-2xl font-bold text-gray-900 mb-2"
                      data-testid={`display-ticket-number-${ticket.id}`}
                    >
                      {ticket.ticketNumber}
                    </div>
                    <div 
                      className="text-lg text-gray-600 mb-3"
                      data-testid={`display-license-plate-${ticket.id}`}
                    >
                      {ticket.licensePlate}
                    </div>
                    <StatusBadge status={ticket.status as TicketStatus} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back to Dashboard */}
        <div className="text-center mt-8">
          <Link href="/">
            <Button
              variant="secondary"
              className="bg-white text-blue-900 hover:bg-gray-100"
              data-testid="button-back-dashboard"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.backToDashboard}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

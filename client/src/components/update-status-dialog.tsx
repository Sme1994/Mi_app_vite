import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ticket, TicketStatus, updateTicketStatusSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface UpdateStatusDialogProps {
  ticket: Ticket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getStatusOptions = (t: any) => [
  { value: "registered", label: t.registered },
  { value: "diagnosis", label: t.inDiagnosis },
  { value: "repair", label: t.inRepair },
  { value: "quality", label: t.qualityControl },
  { value: "ready", label: t.readyForDelivery },
] as const;

export default function UpdateStatusDialog({
  ticket,
  open,
  onOpenChange,
}: UpdateStatusDialogProps) {
  const { t } = useLanguage();
  const [newStatus, setNewStatus] = useState<TicketStatus>("registered");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const statusOptions = getStatusOptions(t);

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: TicketStatus }) => {
      const validatedData = updateTicketStatusSchema.parse({ status });
      const response = await apiRequest("PATCH", `/api/tickets/${id}/status`, validatedData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tickets"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tickets/active"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tickets/stats"] });
      toast({
        title: t.statusUpdated,
        description: t.statusUpdateSuccess,
      });
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: t.error,
        description: t.tryAgain,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!ticket) return;
    updateStatusMutation.mutate({ id: ticket.id, status: newStatus });
  };

  if (!ticket) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>{t.updateTicketStatus}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="font-medium text-gray-900" data-testid="modal-ticket-number">
                Ticket {ticket.ticketNumber}
              </div>
              <div className="text-sm text-gray-600" data-testid="modal-vehicle-info">
                {ticket.licensePlate} - {ticket.vehicleMake} {ticket.vehicleModel} {ticket.vehicleYear}
              </div>
              <div className="text-sm text-gray-600" data-testid="modal-customer-name">
                {ticket.customerName}
              </div>
            </CardContent>
          </Card>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.newStatus}
            </label>
            <Select
              value={newStatus}
              onValueChange={(value) => setNewStatus(value as TicketStatus)}
              data-testid="select-status"
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    data-testid={`option-${option.value}`}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="button-cancel"
          >
            {t.cancel}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={updateStatusMutation.isPending}
            data-testid="button-update"
          >
            {updateStatusMutation.isPending ? t.updating : t.updateStatus}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

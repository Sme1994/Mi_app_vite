import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { insertTicketSchema, type InsertTicket } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus } from "lucide-react";

export default function RegisterVehicle() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertTicket>({
    resolver: zodResolver(insertTicketSchema),
    defaultValues: {
      licensePlate: "",
      vehicleMake: undefined,
      vehicleModel: undefined,
      vehicleYear: undefined,
      vehicleColor: undefined,
      mileage: undefined,
      customerName: "",
      customerPhone: "",
      customerEmail: undefined,
      emergencyContact: undefined,
      serviceDescription: undefined,
      status: "registered",
    },
  });

  const createTicketMutation = useMutation({
    mutationFn: async (data: InsertTicket) => {
      const response = await apiRequest("POST", "/api/tickets", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tickets"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tickets/stats"] });
      toast({
        title: t.ticketCreated,
        description: t.vehicleRegistered,
      });
      setLocation("/");
    },
    onError: (error: any) => {
      toast({
        title: t.error,
        description: error.message || t.tryAgain,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertTicket) => {
    createTicketMutation.mutate(data);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="border border-gray-200">
        <CardContent className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{t.registerNewVehicle}</h2>
            <p className="text-gray-600 mt-2">
              {t.vehicleCustomerInfo}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Vehicle Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t.vehicleInformation}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="licensePlate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.licensePlate} *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ABC-123"
                            {...field}
                            data-testid="input-license-plate"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vehicleMake"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.vehicleMake}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Honda"
                            {...field}
                            data-testid="input-vehicle-make"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vehicleModel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.vehicleModel}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Civic"
                            {...field}
                            data-testid="input-vehicle-model"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vehicleYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.year}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="2020"
                            {...field}
                            data-testid="input-vehicle-year"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vehicleColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.color}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Blue"
                            {...field}
                            data-testid="input-vehicle-color"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mileage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.mileage}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="45000"
                            {...field}
                            data-testid="input-mileage"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t.customerInformation}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.fullName} *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Maria Rodriguez"
                            {...field}
                            data-testid="input-customer-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.phoneNumber} *</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+1 234 567 8900"
                            {...field}
                            data-testid="input-customer-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.email}</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="maria.rodriguez@email.com"
                            {...field}
                            data-testid="input-customer-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.emergencyContact}</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+1 234 567 8901"
                            {...field}
                            data-testid="input-emergency-contact"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Service Details */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t.serviceDetails}
                </h3>
                <FormField
                  control={form.control}
                  name="serviceDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.serviceDescription}</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder={t.serviceDescriptionPlaceholder}
                          {...field}
                          data-testid="textarea-service-description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/")}
                  data-testid="button-cancel"
                >
                  {t.cancel}
                </Button>
                <Button
                  type="submit"
                  disabled={createTicketMutation.isPending}
                  data-testid="button-create-ticket"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {createTicketMutation.isPending ? t.creating : t.createTicket}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}

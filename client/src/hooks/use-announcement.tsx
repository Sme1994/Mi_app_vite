import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSpeech } from './use-speech';
import { useLanguage } from './use-language';
import { Ticket } from '@shared/schema';

export function useAnnouncement() {
  const { speak } = useSpeech();
  const { t, language } = useLanguage();
  const previousTicketsRef = useRef<Ticket[]>([]);

  const { data: tickets = [] } = useQuery<Ticket[]>({
    queryKey: ["/api/tickets"],
    refetchInterval: 5000,
  });

  useEffect(() => {
    const previousTickets = previousTicketsRef.current;
    
    if (previousTickets.length > 0) {
      // Check for tickets that just became ready
      const newlyReadyTickets = tickets.filter(ticket => {
        const wasReady = previousTickets.find(prev => 
          prev.id === ticket.id && prev.status === 'ready'
        );
        return ticket.status === 'ready' && !wasReady;
      });

      // Announce each newly ready ticket
      newlyReadyTickets.forEach(ticket => {
        const announcements = {
          en: `Good afternoon... Your vehicle with license plate ${ticket.licensePlate}, service ticket ${ticket.ticketNumber}, is now ready for pickup. Please come to the service desk at your convenience. Thank you for choosing our service.`,
          es: `Muy buenas${ticket.customerName ? ` ${ticket.customerName}` : ''}... El vehículo${ticket.vehicleMake && ticket.vehicleModel ? ` ${ticket.vehicleMake} ${ticket.vehicleModel}` : ''} con placas ${ticket.licensePlate}, ticket ${ticket.ticketNumber}, ya está listo para ser entregado. Favor de pasar al mostrador de atención a clientes. Muchas gracias.`,
          pt: `Atenção por favor... O veículo com placa ${ticket.licensePlate}, ticket número ${ticket.ticketNumber}, está pronto para entrega. Por favor dirija-se ao balcão de atendimento. Obrigado.`,
          fr: `Attention s'il vous plaît... Le véhicule avec la plaque d'immatriculation ${ticket.licensePlate}, ticket numéro ${ticket.ticketNumber}, est prêt pour la livraison. Veuillez vous diriger vers le comptoir de service. Merci.`
        };

        const announcement = announcements[language] || announcements.en;
        
        // Delay the announcement slightly to allow UI updates
        setTimeout(() => {
          speak(announcement);
        }, 1000);
      });
    }

    // Update the reference for next comparison
    previousTicketsRef.current = [...tickets];
  }, [tickets, speak, language]);

  const announceTicket = (ticket: Ticket) => {
    const announcements = {
      en: `Good afternoon... Your vehicle with license plate ${ticket.licensePlate}, service ticket ${ticket.ticketNumber}, is now ready for pickup. Please come to the service desk at your convenience. Thank you for choosing our service.`,
      es: `Muy buenas${ticket.customerName ? ` ${ticket.customerName}` : ''}... El vehículo${ticket.vehicleMake && ticket.vehicleModel ? ` ${ticket.vehicleMake} ${ticket.vehicleModel}` : ''} con placas ${ticket.licensePlate}, ticket ${ticket.ticketNumber}, ya está listo para ser entregado. Favor de pasar al mostrador de atención a clientes. Muchas gracias.`,
      pt: `Atenção por favor... O veículo com placa ${ticket.licensePlate}, ticket número ${ticket.ticketNumber}, está pronto para entrega. Por favor dirija-se ao balcão de atendimento. Obrigado.`,
      fr: `Attention s'il vous plaît... Le véhicule avec la plaque d'immatriculation ${ticket.licensePlate}, ticket numéro ${ticket.ticketNumber}, est prêt pour la livraison. Veuillez vous diriger vers le comptoir de service. Merci.`
    };

    const announcement = announcements[language] || announcements.en;
    speak(announcement);
  };

  return {
    announceTicket
  };
}
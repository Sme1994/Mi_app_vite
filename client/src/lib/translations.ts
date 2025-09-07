export type Language = 'en' | 'es' | 'pt' | 'fr';

export interface Translation {
  // Header
  appName: string;
  dashboard: string;
  registerVehicle: string;
  customerDisplay: string;
  
  // Dashboard
  registered: string;
  inDiagnosis: string;
  inRepair: string;
  qualityControl: string;
  readyForDelivery: string;
  searchTicket: string;
  searchPlaceholder: string;
  search: string;
  quickActions: string;
  newVehicle: string;
  displayView: string;
  activeTickets: string;
  manageTickets: string;
  ticket: string;
  vehicle: string;
  customer: string;
  status: string;
  time: string;
  actions: string;
  noTicketsFound: string;
  noTicketsAvailable: string;
  loading: string;

  // Register Vehicle
  registerNewVehicle: string;
  vehicleCustomerInfo: string;
  vehicleInformation: string;
  licensePlate: string;
  vehicleMake: string;
  vehicleModel: string;
  year: string;
  color: string;
  mileage: string;
  customerInformation: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  emergencyContact: string;
  serviceDetails: string;
  serviceDescription: string;
  serviceDescriptionPlaceholder: string;
  cancel: string;
  createTicket: string;
  creating: string;

  // Customer Display
  vehicleServiceStatus: string;
  nowBeingServed: string;
  nextInQueue: string;
  noTicketsBeingServed: string;
  noTicketsInQueue: string;
  pleaseWait: string;
  serviceProgress: string;
  allActiveTickets: string;
  noActiveTickets: string;
  backToDashboard: string;

  // Status Dialog
  updateTicketStatus: string;
  newStatus: string;
  updateStatus: string;
  updating: string;

  // Status Labels
  diagnosis: string;
  repair: string;
  quality: string;
  ready: string;

  // Messages
  ticketCreated: string;
  vehicleRegistered: string;
  statusUpdated: string;
  statusUpdateSuccess: string;
  error: string;
  tryAgain: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    // Header
    appName: "AutoService Pro",
    dashboard: "Dashboard",
    registerVehicle: "Register Vehicle",
    customerDisplay: "Customer Display",
    
    // Dashboard
    registered: "Registered",
    inDiagnosis: "In Diagnosis",
    inRepair: "In Repair",
    qualityControl: "Quality Control",
    readyForDelivery: "Ready for Delivery",
    searchTicket: "Search Ticket",
    searchPlaceholder: "Ticket number or license plate...",
    search: "Search",
    quickActions: "Quick Actions",
    newVehicle: "New Vehicle",
    displayView: "Display View",
    activeTickets: "Active Tickets",
    manageTickets: "Manage and update vehicle service status",
    ticket: "Ticket",
    vehicle: "Vehicle",
    customer: "Customer",
    status: "Status",
    time: "Time",
    actions: "Actions",
    noTicketsFound: "No tickets found matching your search.",
    noTicketsAvailable: "No tickets available.",
    loading: "Loading tickets...",

    // Register Vehicle
    registerNewVehicle: "Register New Vehicle",
    vehicleCustomerInfo: "Enter vehicle and customer information to create a new service ticket",
    vehicleInformation: "Vehicle Information",
    licensePlate: "License Plate",
    vehicleMake: "Vehicle Make",
    vehicleModel: "Vehicle Model",
    year: "Year",
    color: "Color",
    mileage: "Mileage",
    customerInformation: "Customer Information",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    email: "Email",
    emergencyContact: "Emergency Contact",
    serviceDetails: "Service Details",
    serviceDescription: "Service Description",
    serviceDescriptionPlaceholder: "Describe the service required or issues reported...",
    cancel: "Cancel",
    createTicket: "Create Ticket",
    creating: "Creating...",

    // Customer Display
    vehicleServiceStatus: "Vehicle Service Status",
    nowBeingServed: "Now Being Served",
    nextInQueue: "Next in Queue",
    noTicketsBeingServed: "No tickets being served",
    noTicketsInQueue: "No tickets in queue",
    pleaseWait: "Please Wait",
    serviceProgress: "Service Progress",
    allActiveTickets: "All Active Tickets",
    noActiveTickets: "No active tickets",
    backToDashboard: "Back to Dashboard",

    // Status Dialog
    updateTicketStatus: "Update Ticket Status",
    newStatus: "New Status",
    updateStatus: "Update Status",
    updating: "Updating...",

    // Status Labels
    diagnosis: "Diagnosis",
    repair: "Repair",
    quality: "Quality Check",
    ready: "Ready",

    // Messages
    ticketCreated: "Ticket Created",
    vehicleRegistered: "Vehicle has been successfully registered.",
    statusUpdated: "Status Updated",
    statusUpdateSuccess: "Ticket status has been successfully updated.",
    error: "Error",
    tryAgain: "Failed to update ticket status. Please try again."
  },
  es: {
    // Header
    appName: "AutoService Pro",
    dashboard: "Panel",
    registerVehicle: "Registrar Vehículo",
    customerDisplay: "Pantalla Cliente",
    
    // Dashboard
    registered: "Registrado",
    inDiagnosis: "En Diagnóstico",
    inRepair: "En Reparación",
    qualityControl: "Control de Calidad",
    readyForDelivery: "Listo para Entrega",
    searchTicket: "Buscar Ticket",
    searchPlaceholder: "Número de ticket o placa...",
    search: "Buscar",
    quickActions: "Acciones Rápidas",
    newVehicle: "Nuevo Vehículo",
    displayView: "Vista Pantalla",
    activeTickets: "Tickets Activos",
    manageTickets: "Gestionar y actualizar estado del servicio vehicular",
    ticket: "Ticket",
    vehicle: "Vehículo",
    customer: "Cliente",
    status: "Estado",
    time: "Tiempo",
    actions: "Acciones",
    noTicketsFound: "No se encontraron tickets que coincidan con su búsqueda.",
    noTicketsAvailable: "No hay tickets disponibles.",
    loading: "Cargando tickets...",

    // Register Vehicle
    registerNewVehicle: "Registrar Nuevo Vehículo",
    vehicleCustomerInfo: "Ingrese información del vehículo y cliente para crear un nuevo ticket de servicio",
    vehicleInformation: "Información del Vehículo",
    licensePlate: "Placa",
    vehicleMake: "Marca",
    vehicleModel: "Modelo",
    year: "Año",
    color: "Color",
    mileage: "Kilometraje",
    customerInformation: "Información del Cliente",
    fullName: "Nombre Completo",
    phoneNumber: "Teléfono",
    email: "Correo Electrónico",
    emergencyContact: "Contacto de Emergencia",
    serviceDetails: "Detalles del Servicio",
    serviceDescription: "Descripción del Servicio",
    serviceDescriptionPlaceholder: "Describa el servicio requerido o problemas reportados...",
    cancel: "Cancelar",
    createTicket: "Crear Ticket",
    creating: "Creando...",

    // Customer Display
    vehicleServiceStatus: "Estado del Servicio Vehicular",
    nowBeingServed: "Siendo Atendido",
    nextInQueue: "Siguiente en Cola",
    noTicketsBeingServed: "No hay tickets siendo atendidos",
    noTicketsInQueue: "No hay tickets en cola",
    pleaseWait: "Por Favor Espere",
    serviceProgress: "Progreso del Servicio",
    allActiveTickets: "Todos los Tickets Activos",
    noActiveTickets: "No hay tickets activos",
    backToDashboard: "Volver al Panel",

    // Status Dialog
    updateTicketStatus: "Actualizar Estado del Ticket",
    newStatus: "Nuevo Estado",
    updateStatus: "Actualizar Estado",
    updating: "Actualizando...",

    // Status Labels
    diagnosis: "Diagnóstico",
    repair: "Reparación",
    quality: "Control de Calidad",
    ready: "Listo",

    // Messages
    ticketCreated: "Ticket Creado",
    vehicleRegistered: "El vehículo ha sido registrado exitosamente.",
    statusUpdated: "Estado Actualizado",
    statusUpdateSuccess: "El estado del ticket ha sido actualizado exitosamente.",
    error: "Error",
    tryAgain: "Error al actualizar el estado del ticket. Por favor intente de nuevo."
  },
  pt: {
    // Header
    appName: "AutoService Pro",
    dashboard: "Painel",
    registerVehicle: "Registrar Veículo",
    customerDisplay: "Tela do Cliente",
    
    // Dashboard
    registered: "Registrado",
    inDiagnosis: "Em Diagnóstico",
    inRepair: "Em Reparo",
    qualityControl: "Controle de Qualidade",
    readyForDelivery: "Pronto para Entrega",
    searchTicket: "Buscar Ticket",
    searchPlaceholder: "Número do ticket ou placa...",
    search: "Buscar",
    quickActions: "Ações Rápidas",
    newVehicle: "Novo Veículo",
    displayView: "Vista da Tela",
    activeTickets: "Tickets Ativos",
    manageTickets: "Gerenciar e atualizar status do serviço veicular",
    ticket: "Ticket",
    vehicle: "Veículo",
    customer: "Cliente",
    status: "Status",
    time: "Tempo",
    actions: "Ações",
    noTicketsFound: "Nenhum ticket encontrado para sua busca.",
    noTicketsAvailable: "Nenhum ticket disponível.",
    loading: "Carregando tickets...",

    // Register Vehicle
    registerNewVehicle: "Registrar Novo Veículo",
    vehicleCustomerInfo: "Digite as informações do veículo e cliente para criar um novo ticket de serviço",
    vehicleInformation: "Informações do Veículo",
    licensePlate: "Placa",
    vehicleMake: "Marca",
    vehicleModel: "Modelo",
    year: "Ano",
    color: "Cor",
    mileage: "Quilometragem",
    customerInformation: "Informações do Cliente",
    fullName: "Nome Completo",
    phoneNumber: "Telefone",
    email: "E-mail",
    emergencyContact: "Contato de Emergência",
    serviceDetails: "Detalhes do Serviço",
    serviceDescription: "Descrição do Serviço",
    serviceDescriptionPlaceholder: "Descreva o serviço necessário ou problemas relatados...",
    cancel: "Cancelar",
    createTicket: "Criar Ticket",
    creating: "Criando...",

    // Customer Display
    vehicleServiceStatus: "Status do Serviço Veicular",
    nowBeingServed: "Sendo Atendido",
    nextInQueue: "Próximo na Fila",
    noTicketsBeingServed: "Nenhum ticket sendo atendido",
    noTicketsInQueue: "Nenhum ticket na fila",
    pleaseWait: "Por Favor Aguarde",
    serviceProgress: "Progresso do Serviço",
    allActiveTickets: "Todos os Tickets Ativos",
    noActiveTickets: "Nenhum ticket ativo",
    backToDashboard: "Voltar ao Painel",

    // Status Dialog
    updateTicketStatus: "Atualizar Status do Ticket",
    newStatus: "Novo Status",
    updateStatus: "Atualizar Status",
    updating: "Atualizando...",

    // Status Labels
    diagnosis: "Diagnóstico",
    repair: "Reparo",
    quality: "Controle de Qualidade",
    ready: "Pronto",

    // Messages
    ticketCreated: "Ticket Criado",
    vehicleRegistered: "Veículo foi registrado com sucesso.",
    statusUpdated: "Status Atualizado",
    statusUpdateSuccess: "Status do ticket foi atualizado com sucesso.",
    error: "Erro",
    tryAgain: "Falha ao atualizar status do ticket. Tente novamente."
  },
  fr: {
    // Header
    appName: "AutoService Pro",
    dashboard: "Tableau de Bord",
    registerVehicle: "Enregistrer Véhicule",
    customerDisplay: "Affichage Client",
    
    // Dashboard
    registered: "Enregistré",
    inDiagnosis: "En Diagnostic",
    inRepair: "En Réparation",
    qualityControl: "Contrôle Qualité",
    readyForDelivery: "Prêt pour Livraison",
    searchTicket: "Rechercher Ticket",
    searchPlaceholder: "Numéro de ticket ou plaque...",
    search: "Rechercher",
    quickActions: "Actions Rapides",
    newVehicle: "Nouveau Véhicule",
    displayView: "Vue Affichage",
    activeTickets: "Tickets Actifs",
    manageTickets: "Gérer et mettre à jour le statut du service véhicule",
    ticket: "Ticket",
    vehicle: "Véhicule",
    customer: "Client",
    status: "Statut",
    time: "Temps",
    actions: "Actions",
    noTicketsFound: "Aucun ticket trouvé correspondant à votre recherche.",
    noTicketsAvailable: "Aucun ticket disponible.",
    loading: "Chargement des tickets...",

    // Register Vehicle
    registerNewVehicle: "Enregistrer Nouveau Véhicule",
    vehicleCustomerInfo: "Entrez les informations du véhicule et du client pour créer un nouveau ticket de service",
    vehicleInformation: "Informations du Véhicule",
    licensePlate: "Plaque d'Immatriculation",
    vehicleMake: "Marque",
    vehicleModel: "Modèle",
    year: "Année",
    color: "Couleur",
    mileage: "Kilométrage",
    customerInformation: "Informations du Client",
    fullName: "Nom Complet",
    phoneNumber: "Numéro de Téléphone",
    email: "E-mail",
    emergencyContact: "Contact d'Urgence",
    serviceDetails: "Détails du Service",
    serviceDescription: "Description du Service",
    serviceDescriptionPlaceholder: "Décrivez le service requis ou les problèmes signalés...",
    cancel: "Annuler",
    createTicket: "Créer Ticket",
    creating: "Création...",

    // Customer Display
    vehicleServiceStatus: "Statut du Service Véhicule",
    nowBeingServed: "En Cours de Service",
    nextInQueue: "Suivant dans la File",
    noTicketsBeingServed: "Aucun ticket en cours de service",
    noTicketsInQueue: "Aucun ticket dans la file",
    pleaseWait: "Veuillez Patienter",
    serviceProgress: "Progression du Service",
    allActiveTickets: "Tous les Tickets Actifs",
    noActiveTickets: "Aucun ticket actif",
    backToDashboard: "Retour au Tableau de Bord",

    // Status Dialog
    updateTicketStatus: "Mettre à Jour le Statut du Ticket",
    newStatus: "Nouveau Statut",
    updateStatus: "Mettre à Jour le Statut",
    updating: "Mise à jour...",

    // Status Labels
    diagnosis: "Diagnostic",
    repair: "Réparation",
    quality: "Contrôle Qualité",
    ready: "Prêt",

    // Messages
    ticketCreated: "Ticket Créé",
    vehicleRegistered: "Le véhicule a été enregistré avec succès.",
    statusUpdated: "Statut Mis à Jour",
    statusUpdateSuccess: "Le statut du ticket a été mis à jour avec succès.",
    error: "Erreur",
    tryAgain: "Échec de la mise à jour du statut du ticket. Veuillez réessayer."
  }
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  fr: 'Français'
};
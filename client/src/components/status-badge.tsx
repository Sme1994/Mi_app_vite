import { TicketStatus } from "@shared/schema";
import { useLanguage } from "@/hooks/use-language";
import { 
  ClipboardList, 
  Search, 
  Wrench, 
  CheckCircle, 
  Flag 
} from "lucide-react";

interface StatusBadgeProps {
  status: TicketStatus;
  className?: string;
}

const getStatusConfig = (t: any) => ({
  registered: {
    label: t.registered,
    icon: ClipboardList,
    className: "status-registered",
  },
  diagnosis: {
    label: t.inDiagnosis,
    icon: Search,
    className: "status-diagnosis",
  },
  repair: {
    label: t.inRepair,
    icon: Wrench,
    className: "status-repair",
  },
  quality: {
    label: t.qualityControl,
    icon: CheckCircle,
    className: "status-quality",
  },
  ready: {
    label: t.readyForDelivery,
    icon: Flag,
    className: "status-ready",
  },
});

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const { t } = useLanguage();
  const statusConfig = getStatusConfig(t);
  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.className} ${className}`}
      data-testid={`status-${status}`}
    >
      <IconComponent className="mr-1 h-3 w-3" />
      {config.label}
    </span>
  );
}

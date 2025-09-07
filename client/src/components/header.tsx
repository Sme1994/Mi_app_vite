import { Link, useLocation } from "wouter";
import { Wrench, User, LogOut } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/language-selector";
import AudioSettings from "@/components/audio-settings";

export default function Header() {
  const [location] = useLocation();
  const { t } = useLanguage();
  const { logout } = useAuth();

  const navItems = [
    { path: "/", label: t.dashboard, testId: "nav-dashboard" },
    { path: "/register", label: t.registerVehicle, testId: "nav-register" },
    { path: "/display", label: t.customerDisplay, testId: "nav-display" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Wrench className="text-primary text-2xl h-6 w-6" />
            <h1 className="text-xl font-semibold text-gray-900">{t.appName}</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`pb-1 px-1 font-medium transition-colors ${
                  location === item.path
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                data-testid={item.testId}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <AudioSettings />
            <LanguageSelector />
            <span className="text-sm text-gray-600">Admin</span>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="text-white text-sm h-4 w-4" />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-gray-600 hover:text-gray-900"
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

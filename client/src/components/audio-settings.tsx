import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSpeech } from "@/hooks/use-speech";
import { useLanguage } from "@/hooks/use-language";

export default function AudioSettings() {
  const [isEnabled, setIsEnabled] = useState(true);
  const { speak, isSupported } = useSpeech();
  const { t, language } = useLanguage();

  const testAnnouncement = () => {
    if (isEnabled && isSupported) {
      const testMessages = {
        en: "Good afternoon... This is a test of our announcement system. Voice notifications are working great and sound crystal clear. Thanks for listening.",
        es: "Muy buenas... Esta es una prueba del sistema de anuncios. Las notificaciones por voz están funcionando de maravilla. Muchas gracias por su atención.",
        pt: "Olá... Este é um anúncio de teste. As notificações de voz estão funcionando perfeitamente. Obrigado por ouvir.",
        fr: "Bonjour... Ceci est une annonce de test. Les notifications vocales fonctionnent parfaitement. Merci de votre attention."
      };
      
      const message = testMessages[language] || testMessages.en;
      
      speak(message);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsEnabled(!isEnabled)}
        className={`${isEnabled ? 'text-green-600' : 'text-gray-400'}`}
        title={isEnabled ? "Voice announcements enabled" : "Voice announcements disabled"}
      >
        {isEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>
      {isEnabled && (
        <Button
          variant="ghost"
          size="sm"
          onClick={testAnnouncement}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Test
        </Button>
      )}
    </div>
  );
}
// src/components/InstallPrompt.tsx
import { useState, useEffect } from "react";
import { Button, Snackbar, Alert } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the install prompt
      setShowInstallPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowInstallPrompt(false);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    console.log(`User response: ${outcome}`);

    // Clear the deferredPrompt for the next time
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleClose = () => {
    setShowInstallPrompt(false);
  };

  if (!showInstallPrompt) return null;

  return (
    <Snackbar
      open={showInstallPrompt}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert
        severity="info"
        action={
          <>
            <Button color="inherit" size="small" onClick={handleInstallClick}>
              <DownloadIcon sx={{ mr: 0.5 }} />
              Install
            </Button>
            <Button color="inherit" size="small" onClick={handleClose}>
              Later
            </Button>
          </>
        }
      >
        Install this app for a better experience!
      </Alert>
    </Snackbar>
  );
};

import { Component, type ErrorInfo, type ReactNode } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "../constants";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

const fallbackWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("App render error:", error, info.componentStack);
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="min-h-screen bg-surface flex items-center justify-center px-4"
        >
          <div className="max-w-md w-full bg-surface-card rounded-2xl shadow-xl p-8 text-center">
            <h1 className="text-2xl font-bold text-primary mb-3">
              Algo salió mal
            </h1>
            <p className="text-text-muted mb-6">
              La página encontró un error inesperado. Puedes recargar o
              contactarnos por WhatsApp.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={fallbackWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-success text-white font-bold py-3 px-4 rounded-lg hover:bg-success-dark transition"
              >
                <FaWhatsapp aria-hidden />
                Escribir por WhatsApp
              </a>
              <button
                type="button"
                onClick={this.handleReload}
                className="font-medium text-accent hover:text-accent-dark underline"
              >
                Recargar página
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

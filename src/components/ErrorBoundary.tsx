import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Error no controlado en la aplicación:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-background">
          <h1 className="font-serif text-3xl text-text mb-4">Algo ha ido mal</h1>
          <p className="text-text-muted font-sans font-light max-w-md mb-8">
            Ha ocurrido un error inesperado. Prueba a recargar la página o vuelve al inicio.
          </p>
          <a
            href="/"
            className="inline-block bg-primary text-white font-sans tracking-[0.2em] uppercase text-sm px-10 py-4 rounded-full hover:bg-primary-dark transition-all duration-300"
          >
            Volver al inicio
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

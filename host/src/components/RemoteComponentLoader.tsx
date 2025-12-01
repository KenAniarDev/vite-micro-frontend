import { lazy, Suspense, Component } from "react";
import type { ReactNode, ComponentType, ErrorInfo } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { ErrorOutline, Refresh } from "@mui/icons-material";

// Error Boundary for catching remote loading errors
interface ErrorBoundaryProps {
  children: ReactNode;
  moduleName: string;
  onRetry?: () => void;
  errorFallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class RemoteErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      `Remote module error (${this.props.moduleName}):`,
      error,
      errorInfo
    );
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    } else {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      // Use custom errorFallback if provided
      if (this.props.errorFallback) {
        return this.props.errorFallback;
      }

      // Default error UI
      return (
        <Paper
          sx={{
            p: 3,
            border: "1px solid",
            borderColor: "error.main",
            bgcolor: "error.lighter",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <ErrorOutline color="error" sx={{ mr: 1, fontSize: 32 }} />
            <Typography variant="h6" color="error">
              Failed to Load {this.props.moduleName}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {this.state.error?.message ||
              "The remote application could not be reached."}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Possible causes:
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body2" color="text.secondary">
                Remote application is not running
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary">
                Network connectivity issues
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary">
                Incorrect remote URL configuration
              </Typography>
            </li>
          </Box>
          <Button
            variant="contained"
            color="error"
            startIcon={<Refresh />}
            onClick={this.handleRetry}
            size="small"
          >
            Retry
          </Button>
        </Paper>
      );
    }

    return this.props.children;
  }
}

// Loading fallback component
const LoadingFallback = ({ message }: { message?: string }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      p: 4,
    }}
  >
    <CircularProgress />
    {message && (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        {message}
      </Typography>
    )}
  </Box>
);

// Main RemoteComponentLoader props
interface RemoteComponentLoaderProps {
  /** The lazy-loaded remote component */
  loader: () => Promise<{ default: ComponentType<any> }>;
  /** Name of the module for error messages */
  moduleName: string;
  /** Optional loading message */
  loadingMessage?: string;
  /** Optional props to pass to the remote component */
  componentProps?: Record<string, any>;
  /** Optional custom error component */
  errorFallback?: ReactNode;
  /** Optional custom loading component */
  loadingFallback?: ReactNode;
  /** Optional retry callback */
  onRetry?: () => void;
}

/**
 * RemoteComponentLoader - Handles loading remote components with error handling
 *
 * @example
 * ```tsx
 * <RemoteComponentLoader
 *   loader={() => import("remoteApp/Button")}
 *   moduleName="Remote Button"
 *   loadingMessage="Loading button component..."
 * />
 * ```
 */
export function RemoteComponentLoader({
  loader,
  moduleName,
  loadingMessage,
  componentProps = {},
  errorFallback,
  loadingFallback,
  onRetry,
}: RemoteComponentLoaderProps) {
  const LazyComponent = lazy(() =>
    loader().catch((error) => {
      console.error(`Failed to load ${moduleName}:`, error);
      throw new Error(
        `Remote module "${moduleName}" is not available. Please ensure it's running and accessible.`
      );
    })
  );

  return (
    <RemoteErrorBoundary
      moduleName={moduleName}
      onRetry={onRetry}
      errorFallback={errorFallback}
    >
      <Suspense
        fallback={
          loadingFallback || <LoadingFallback message={loadingMessage} />
        }
      >
        <LazyComponent {...componentProps} />
      </Suspense>
    </RemoteErrorBoundary>
  );
}

export default RemoteComponentLoader;

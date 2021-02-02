export interface Toast {
  autoDismiss?: boolean;
  duration?: number;
  icon?: string;
  id: number | string;
  intent?: string;
  message: string;
  onDismiss?: () => {};
  title?: string;
}

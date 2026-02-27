import { cn } from "../../lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn("bg-card text-card-foreground rounded-lg border border-border p-6 shadow-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
}

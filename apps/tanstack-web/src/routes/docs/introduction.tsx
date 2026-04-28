import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/introduction")({
  component: RouteComponent,
});

function RouteComponent() {
  return <main></main>;
}

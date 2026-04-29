import { createFileRoute } from "@tanstack/react-router";
import { DocPage } from "@/components/docs/DocPage";
import { installationData } from "@/data/docs/installation";

export const Route = createFileRoute("/docs/installation")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        name: "description",
        content: installationData.description,
      },
      {
        property: "og:title",
        content: `${installationData.title} | Blaze Motion Docs`,
      },
      {
        property: "og:description",
        content: installationData.description,
      },
      {
        property: "og:type",
        content: "article",
      },
    ],
  }),
});

function RouteComponent() {
  return <DocPage data={installationData} />;
}

export default RouteComponent;
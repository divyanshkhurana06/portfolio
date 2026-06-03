"use client";

import dynamic from "next/dynamic";

// Three.js / react-three-fiber pull in WebGL globals at module-eval time,
// so we never want them to run on the server. `ssr: false` here keeps the
// scene strictly client-side; the loading placeholder holds the layout
// open while the chunk streams in.
const ExtraScene = dynamic(
  () => import("@/components/extra-scene").then((m) => m.ExtraScene),
  {
    ssr: false,
    loading: () => <ScenePlaceholder />,
  }
);

export function ExtraSceneClient() {
  return <ExtraScene />;
}

function ScenePlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-paper-sunk">
      <div className="text-center">
        <div
          aria-hidden
          className="mx-auto mb-3 h-8 w-8 animate-pulse rounded-full bg-accent/30"
        />
        <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
          warming up the scene…
        </p>
      </div>
    </div>
  );
}

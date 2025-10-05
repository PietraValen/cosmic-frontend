"use client";

import dynamic from "next/dynamic";
import { LoadingSpinner } from "./LoadingComponents";

// Lazy loading dos componentes mais pesados
export const LazyGlobeVisualization = dynamic(
  () => import("./GlobeVisualization"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false, // Componente 3D não deve ser renderizado no servidor
  }
);

export const LazyWaveVisualization = dynamic(
  () => import("./WaveVisualization"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);

export const LazyNeuralNetworkFlow = dynamic(
  () => import("./NeuralNetworkFlow"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);

export const LazyInteractiveScientificMap = dynamic(
  () => import("./InteractiveScientificMap"),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,
  }
);

export const LazySpectrogramGallery = dynamic(
  () => import("./SpectrogramGallery"),
  {
    loading: () => <LoadingSpinner />,
  }
);

export const LazyStatistics = dynamic(() => import("./Statistics"), {
  loading: () => <LoadingSpinner />,
});

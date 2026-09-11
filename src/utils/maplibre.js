import maplibregl from "maplibre-gl/dist/maplibre-gl-csp"
import workerUrl from "maplibre-gl/dist/maplibre-gl-csp-worker.js?url"

// The default maplibre-gl build bootstraps its own Web Worker by fetching its own script URL
// and running the response as the worker's source. Under Vite's production build that fetched
// chunk is an ES module (import/export syntax), which a classic Worker can't execute — it works
// in dev only because Vite serves an unbundled, worker-friendly copy there. The "csp" build
// ships a plain, already-classic-script worker file instead; pointing at it as a static asset
// (via the `?url` import, so Vite copies it byte-for-byte instead of bundling it) sidesteps the
// whole self-fetch trick and its assumption that "your own script" == "a workable worker script".
maplibregl.setWorkerUrl(workerUrl)

export default maplibregl

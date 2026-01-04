import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// If the app is served without hash URLs but the user navigated to a path
// (e.g. /archviz/a1), convert it to a hash URL before the router mounts.
// This prevents 404s when opening direct links or using the browser back button.
if (typeof window !== 'undefined') {
	const { pathname, search, hash } = window.location;
	// Normalize a few legacy hash formats (e.g. #projects or #archviz)
	// to the HashRouter-friendly `#/gallery?tab=...` form so refresh/back works.
	try {
		if (hash && !hash.startsWith('#/')) {
			const key = hash.replace('#', '');
			if (['projects', 'archviz', 'showreel'].includes(key)) {
				window.history.replaceState(null, '', `/#/gallery?tab=${encodeURIComponent(key)}`);
			} else {
				// If we have a pathname (like /archviz/id) rewrite to hash route
				if (pathname && pathname !== '/') {
					window.history.replaceState(null, '', `/#${pathname}${search}${hash}`);
				}
			}
		} else if (pathname && pathname !== '/' && (!hash || hash === '')) {
			window.history.replaceState(null, '', `/#${pathname}${search}${hash}`);
		}
	} catch (e) {
		// ignore
	}
}

createRoot(document.getElementById("root")!).render(<App />);
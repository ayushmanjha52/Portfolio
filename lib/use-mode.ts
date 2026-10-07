"use client";

import { useSyncExternalStore } from "react";
import { MODE_EVENT, MODE_KEY, type Mode } from "./mode";

function read(): Mode {
  return document.documentElement.dataset.mode === "recruiter" ? "recruiter" : "engineer";
}

function subscribe(onChange: () => void) {
  window.addEventListener(MODE_EVENT, onChange);
  return () => window.removeEventListener(MODE_EVENT, onChange);
}

export function setMode(mode: Mode) {
  document.documentElement.dataset.mode = mode;
  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch {
    // Private windows can refuse storage; the mode still applies for this page view.
  }
  window.dispatchEvent(new Event(MODE_EVENT));
}

export function useMode(): Mode {
  return useSyncExternalStore(subscribe, read, () => "engineer");
}

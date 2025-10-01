/**
 * apiFetch.ts (Solo Leveling clean build)
 * -------------------------------------------------------
 * - Authorization header (token from localStorage)
 * - Timeout + retry on transient errors
 * - "Waking server…" toast on slow/ retry conditions
 */

import { showToast } from "./showToast";

const BASE_URL = import.meta.env.VITE_API_URL;

// ---------------------- Types ----------------------

export type ApiOptions = RequestInit & {
    timeoutMs?: number;
    retries?: number;
    retryDelayMs?: number;
    slowMs?: number;
};

// ---------------------- Helpers ----------------------

function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}

function isAbortError(err: unknown) {
    return err instanceof DOMException && err.name === "AbortError";
}

function shouldRetry(res?: Response, err?: unknown) {
    if (res) return [408, 429, 500, 502, 503, 504].includes(res.status);
    if (isAbortError(err)) return true;
    if (err instanceof TypeError) return true; // Network error
    return false;
}

async function fetchWithTimeout(url: string, opts: RequestInit, timeoutMs: number) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeoutMs);
    try {
        return await fetch(url, { ...opts, signal: controller.signal });
    } finally {
        clearTimeout(t);
    }
}

// ---------------------- Main ----------------------

export const apiFetch = async (
    path: string,
    options: ApiOptions = {}
): Promise<Response> => {
    const {
        timeoutMs = 8000,
        retries = 1,
        retryDelayMs = 1500,
        slowMs = 3000,
        ...opts
    } = options;

    const base = String(BASE_URL ?? "").replace(/\/+$/, "");
    const url = `${base}${path.startsWith("/") ? "" : "/"}${path}`;
    const token = localStorage.getItem("token");

    const headers: HeadersInit = {
        ...(opts.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const requestInit: RequestInit = {
        credentials: "include",
        ...opts,
        headers,
    };

    const start = Date.now();
    let attempt = 0;
    let lastErr: unknown;
    let lastRes: Response | undefined;
    let toastShown = false;

    const maybeToastForSlow = () => {
        if (!toastShown && Date.now() - start > slowMs) {
            showToast('warning', "Waking server… one sec ⏳");
            toastShown = true;
        }
    };

    const showToastForRetry = () => {
        if (!toastShown) {
            showToast('warning', "Waking server… one sec ⏳");
            toastShown = true;
        }
    };

    while (attempt <= retries) {
        try {
            const res = await fetchWithTimeout(url, requestInit, timeoutMs);

            if (attempt === 0) maybeToastForSlow();

            if (!res.ok) {
                if (attempt < retries && shouldRetry(res)) {
                    lastRes = res;
                    showToastForRetry();
                    await sleep(retryDelayMs);
                    attempt++;
                    continue;
                }

                // Parse error body
                let message = "API error";
                try {
                    const data = await res.json();
                    message = (data as any).error || (data as any).errors?.join(", ") || message;
                } catch {
                    try {
                        message = await res.text();
                    } catch { }
                }
                throw new Error(message);
            }

            return res; // ✅ Success
        } catch (err) {
            if (attempt < retries && shouldRetry(undefined, err)) {
                lastErr = err;
                showToastForRetry();
                await sleep(retryDelayMs);
                attempt++;
                continue;
            }

            // If last response was captured, parse it
            if (lastRes) {
                let message = "API error";
                try {
                    const data = await lastRes.json();
                    message = (data as any).error || (data as any).errors?.join(", ") || message;
                } catch {
                    try {
                        message = await lastRes.text();
                    } catch { }
                }
                throw new Error(message);
            }

            throw err; // terminal error
        }
    }

    throw new Error("API request failed");
};

import { useEffect, useState } from 'react';

// --- Logic ---

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export type Notification = {
    id: string;
    type: NotificationType;
    message: string;
    duration?: number; // ms
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
};

export interface ToastConfig {
    defaultDuration?: number;
    position?: Notification['position'];
    maxNotifications?: number;
    className?: string;
    styles?: {
        success?: string;
        error?: string;
        warning?: string;
        info?: string;
    };
}

type Listener = (n: Notification) => void;

const listeners = new Set<Listener>();

export function subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

export function notify(input: { type: NotificationType; message: string; duration?: number; position?: Notification['position'] }) {
    const n: Notification = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        type: input.type,
        message: input.message,
        duration: input.duration ?? 3500,
        position: input.position
    };
    for (const l of listeners) l(n);
}

// Helpers to parse standardized backend envelope
export function notifyFromEnvelope(
    result: any,
    opts?: { successType?: NotificationType; errorType?: NotificationType }
) {
    const { successType = 'success', errorType = 'error' }: { successType: NotificationType; errorType: NotificationType } = opts || {} as any;
    if (!result || typeof result !== 'object') return;
    const topKey = Object.keys(result)[0];
    if (!topKey) return;
    const payload = (result as any)[topKey];
    const resp = payload?.response;
    if (!resp) return;
    const status = resp.status;
    const message = resp.message || '';
    if (!message) return;
    notify({ type: status ? successType : errorType, message });
}

// --- Component ---

function bgFor(type: NotificationType, config?: ToastConfig) {
    const customStyles = config?.styles;
    if (customStyles?.[type]) return customStyles[type];
    
    switch (type) {
        case 'success': return 'bg-emerald-600';
        case 'error': return 'bg-rose-600';
        case 'warning': return 'bg-amber-600';
        default: return 'bg-slate-700';
    }
}

function getPositionClasses(position?: Notification['position']) {
    switch (position) {
        case 'top-left': return 'fixed top-0 left-0 z-[2000] flex flex-col items-start gap-2 p-4 pointer-events-none';
        case 'top-center': return 'fixed top-0 left-1/2 transform -translate-x-1/2 z-[2000] flex flex-col items-center gap-2 p-4 pointer-events-none';
        case 'top-right': 
        default: return 'fixed top-0 right-0 z-[2000] flex flex-col items-end gap-2 p-4 pointer-events-none';
        case 'bottom-left': return 'fixed bottom-0 left-0 z-[2000] flex flex-col items-start gap-2 p-4 pointer-events-none';
        case 'bottom-center': return 'fixed bottom-0 left-1/2 transform -translate-x-1/2 z-[2000] flex flex-col items-center gap-2 p-4 pointer-events-none';
        case 'bottom-right': return 'fixed bottom-0 right-0 z-[2000] flex flex-col items-end gap-2 p-4 pointer-events-none';
    }
}

export function Toaster({ config }: { config?: ToastConfig } = {}) {
    const [items, setItems] = useState<Notification[]>([]);

    useEffect(() => {
        const unsub = subscribe((n) => {
            setItems((prev: Notification[]) => {
                const updated = [...prev, n];
                // Limit max notifications if specified
                if (config?.maxNotifications && updated.length > config.maxNotifications) {
                    return updated.slice(-config.maxNotifications);
                }
                return updated;
            });
            
            if (n.duration && n.duration > 0) {
                setTimeout(() => {
                    setItems((prev: Notification[]) => prev.filter((x: Notification) => x.id !== n.id));
                }, n.duration);
            }
        });
        return () => unsub();
    }, [config]);

    const positionClasses = getPositionClasses(config?.position);

    return (
        <div className={config?.className || positionClasses}>
            {items.map((n) => (
                <div
                    key={n.id}
                    className={`pointer-events-auto ${bgFor(n.type, config)} text-white shadow-lg rounded-md px-4 py-2 animate-[toast-in_200ms_ease-out]`}
                    role="status"
                    aria-live="polite"
                >
                    {n.message}
                </div>
            ))}
            <style>
                {`@keyframes toast-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}
            </style>
        </div>
    );
}

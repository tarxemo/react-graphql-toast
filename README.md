# @tarxemo/react-toast

[![npm version](https://img.shields.io/npm/v/@tarxemo/react-toast.svg)](https://www.npmjs.com/package/@tarxemo/react-toast)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple, lightweight React toast notification system with Tailwind CSS styling.

## Features

✅ **Multiple Types** - Success, error, warning, info  
✅ **Positioning** - 6 position options  
✅ **Auto-Dismiss** - Configurable duration  
✅ **Customizable** - Custom styles and classes  
✅ **TypeScript Support** - Full type definitions  
✅ **Lightweight** - Minimal dependencies  
✅ **Tailwind CSS** - Built-in Tailwind styling

## Installation

\`\`\`bash
npm install @tarxemo/react-toast
\`\`\`

## Quick Start

### 1. Add Toaster Component

\`\`\`tsx
import { Toaster } from '@tarxemo/react-toast';

function App() {
  return (
    <>
      <Toaster />
      {/* Your app */}
    </>
  );
}
\`\`\`

### 2. Show Notifications

\`\`\`tsx
import { notify } from '@tarxemo/react-toast';

function Component() {
  return (
    <div>
      <button onClick={() => notify({ type: 'success', message: 'Success!' })}>
        Success
      </button>
      <button onClick={() => notify({ type: 'error', message: 'Error!' })}>
        Error
      </button>
      <button onClick={() => notify({ type: 'warning', message: 'Warning!' })}>
        Warning
      </button>
      <button onClick={() => notify({ type: 'info', message: 'Info!' })}>
        Info
      </button>
    </div>
  );
}
\`\`\`

## API Reference

### notify()

\`\`\`tsx
notify({
  type: 'success' | 'error' | 'warning' | 'info',
  message: string,
  duration?: number,  // milliseconds (default: 3500)
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
});
\`\`\`

### Toaster Component

\`\`\`tsx
<Toaster config={{
  defaultDuration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  maxNotifications?: number;
  className?: string;
  styles?: {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
  };
}} />
\`\`\`

## Usage Examples

### Custom Duration

\`\`\`tsx
notify({
  type: 'success',
  message: 'Saved!',
  duration: 5000  // 5 seconds
});
\`\`\`

### Custom Position

\`\`\`tsx
<Toaster config={{ position: 'bottom-right' }} />

// Or per notification
notify({
  type: 'info',
  message: 'Hello',
  position: 'top-center'
});
\`\`\`

### Custom Styles

\`\`\`tsx
<Toaster config={{
  styles: {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }
}} />
\`\`\`

### Max Notifications

\`\`\`tsx
<Toaster config={{ maxNotifications: 3 }} />
\`\`\`

### Backend Response Integration

\`\`\`tsx
import { notifyFromEnvelope } from '@tarxemo/react-toast';

// Automatically show toast from backend response
const response = await api.mutate(MUTATION);
notifyFromEnvelope(response.data);

// With custom types
notifyFromEnvelope(response.data, {
  successType: 'success',
  errorType: 'error'
});
\`\`\`

## License

MIT
# react-graphql-toast
# react-graphql-toast

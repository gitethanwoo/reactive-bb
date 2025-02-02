// Simple polyfill for structuredClone
if (typeof globalThis.structuredClone !== 'function') {
  globalThis.structuredClone = function structuredClone(value: any) {
    return JSON.parse(JSON.stringify(value));
  };
} 
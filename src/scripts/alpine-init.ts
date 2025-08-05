import Alpine from 'alpinejs';

declare global {
  interface Window {
    Alpine: typeof Alpine;
  }
}

// Initialize Alpine globally
if (typeof window !== 'undefined') {
  // Only set Alpine if not already set
  if (!window.Alpine) {
    window.Alpine = Alpine;
  }
  
  // Function to initialize Alpine
  const initAlpine = () => {
    // Only start Alpine if it hasn't been started
    if (!Alpine.version) {
      Alpine.start();
    }
    // Dispatch custom event when Alpine is initialized
    window.dispatchEvent(new CustomEvent('alpine:initialized'));
  };
  
  // Initialize on first load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAlpine);
  } else {
    // DOM is already loaded
    initAlpine();
  }
  
  // Re-initialize Alpine components after Astro page transitions
  document.addEventListener('astro:after-swap', () => {
    // Alpine needs to re-initialize components after DOM swap
    Alpine.initTree(document.body);
    // Dispatch event again for any listeners
    window.dispatchEvent(new CustomEvent('alpine:initialized'));
  });
}

export { Alpine };
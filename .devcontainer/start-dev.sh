#!/bin/bash
# Robust dev server startup script

echo "Starting Astro dev server..."

# Kill any existing Astro processes
pkill -f "astro dev" || true

# Start the dev server with nohup to detach from terminal
nohup npm run dev -- --host > /tmp/astro.log 2>&1 &

# Save the PID
echo $! > /tmp/astro.pid

# Wait a moment for server to start
sleep 3

# Check if server started successfully
if ps -p $(cat /tmp/astro.pid) > /dev/null; then
    echo "✓ Astro dev server started successfully (PID: $(cat /tmp/astro.pid))"
    echo "✓ Server running at http://localhost:4321"
    echo "✓ Logs available at: /tmp/astro.log"
    echo ""
    echo "To stop the server: ./.devcontainer/stop-dev.sh"
    echo "To view logs: tail -f /tmp/astro.log"
else
    echo "✗ Failed to start dev server. Check /tmp/astro.log for errors"
    tail -20 /tmp/astro.log
    exit 1
fi
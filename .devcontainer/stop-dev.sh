#!/bin/bash
# Stop the dev server

if [ -f /tmp/astro.pid ]; then
    PID=$(cat /tmp/astro.pid)
    if ps -p $PID > /dev/null; then
        echo "Stopping Astro dev server (PID: $PID)..."
        kill $PID
        echo "✓ Server stopped"
    else
        echo "Server not running (PID: $PID not found)"
    fi
    rm -f /tmp/astro.pid
else
    echo "No PID file found. Attempting to find and stop Astro processes..."
    pkill -f "astro dev" && echo "✓ Stopped Astro processes" || echo "No Astro processes found"
fi
FROM node:22

# ==============================================================================
# Chromium Installation for Puppeteer
# ==============================================================================
#
# CURRENT APPROACH (System Chromium):
# We install system Chromium from Debian repos instead of using Puppeteer's
# bundled Chrome. This is necessary because:
#
# 1. ARCHITECTURE MISMATCH BUG: On ARM64 systems, Puppeteer downloads Chrome
#    binaries labeled as "linux_arm" but they are actually x86-64 binaries.
#    Running x86-64 binaries on ARM64 requires emulation (Rosetta on macOS)
#    which doesn't exist in Linux containers, causing the error:
#    "rosetta error: failed to open elf at /lib64/ld-linux-x86-64.so.2"
#
# 2. VERIFICATION: Running `file` on Puppeteer's downloaded Chrome shows:
#    "ELF 64-bit LSB pie executable, x86-64" (wrong for aarch64 system)
#
# 3. SOLUTION: System Chromium is compiled for the correct architecture
#    (ARM aarch64) and includes all necessary dependencies.
#
# Version pinning removed

RUN apt update && apt install -y \
    ca-certificates \
    curl \
    gpg \
    less \
    man-db \
    sudo \
    linkchecker \
    chromium \
    chromium-common \
    chromium-sandbox \
    python3 \
    python3-pip \
    && pip3 install --break-system-packages python-pptx \
    && rm -rf /var/lib/apt/lists/*

# Install GitHub CLI from GitHub's official apt repository.
RUN mkdir -p -m 755 /etc/apt/keyrings \
    && curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
        -o /etc/apt/keyrings/githubcli-archive-keyring.gpg \
    && chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
        > /etc/apt/sources.list.d/github-cli.list \
    && apt update \
    && apt install -y gh \
    && rm -rf /var/lib/apt/lists/*

# Install Doppler CLI from Doppler's official apt repository.
RUN mkdir -p -m 755 /etc/apt/keyrings \
    && curl -fsSL https://packages.doppler.com/public/cli/gpg.DE2A7741A397C129.key \
        | gpg --dearmor -o /etc/apt/keyrings/doppler-archive-keyring.gpg \
    && chmod go+r /etc/apt/keyrings/doppler-archive-keyring.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/doppler-archive-keyring.gpg] https://packages.doppler.com/public/cli/deb/debian any-version main" \
        > /etc/apt/sources.list.d/doppler-cli.list \
    && apt update \
    && apt install -y doppler \
    && rm -rf /var/lib/apt/lists/*

# Install Bun, which Oh My Pi uses as its runtime.
ENV BUN_INSTALL=/usr/local
RUN curl -fsSL https://bun.sh/install | bash

# ==============================================================================
# ALTERNATIVE APPROACH (Puppeteer's Bundled Chrome) - DOES NOT WORK ON ARM64
# ==============================================================================
# This approach works on x86-64 systems but fails on ARM64 due to Puppeteer
# downloading the wrong architecture. Kept here for documentation.
#
# # Install Chrome dependencies for Puppeteer's bundled Chrome
# RUN apt update && apt install -y \
#     less \
#     man-db \
#     sudo \
#     linkchecker \
#     # Chrome/Chromium dependencies
#     wget \
#     gnupg \
#     libasound2 \
#     libatk-bridge2.0-0 \
#     libatk1.0-0 \
#     libc6 \
#     libcairo2 \
#     libcups2 \
#     libdbus-1-3 \
#     libexpat1 \
#     libfontconfig1 \
#     libgcc1 \
#     libgconf-2-4 \
#     libgdk-pixbuf2.0-0 \
#     libglib2.0-0 \
#     libgtk-3-0 \
#     libnspr4 \
#     libnss3 \
#     libpango-1.0-0 \
#     libpangocairo-1.0-0 \
#     libstdc++6 \
#     libx11-6 \
#     libx11-xcb1 \
#     libxcb1 \
#     libxcomposite1 \
#     libxcursor1 \
#     libxdamage1 \
#     libxext6 \
#     libxfixes3 \
#     libxi6 \
#     libxrandr2 \
#     libxrender1 \
#     libxss1 \
#     libxtst6 \
#     ca-certificates \
#     fonts-liberation \
#     libappindicator1 \
#     lsb-release \
#     xdg-utils
#
# # Install Chrome for Puppeteer (downloads during build)
# RUN npx puppeteer browsers install chrome
#
# # In scripts, use Puppeteer without executablePath:
# # const browser = await puppeteer.launch({
# #   headless: true,
# #   args: ['--no-sandbox', '--disable-setuid-sandbox']
# # });
# ==============================================================================

# Ensure default `node` user has access to `sudo`
ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Install AI coding CLIs.
RUN npm install -g \
    @openai/codex \
    @anthropic-ai/claude-code \
    @moonshot-ai/kimi-code \
    @oh-my-pi/pi-coding-agent

# Create tool config directories. devcontainer.json mounts named volumes over
# these paths so CLI auth and settings survive container rebuilds.
RUN mkdir -p \
    /home/node/.config \
    /home/node/.codex \
    /home/node/.claude \
    /home/node/.kimi-code \
    /home/node/.doppler \
    /home/node/.omp \
    && chown -R node:node \
    /home/node/.config \
    /home/node/.codex \
    /home/node/.claude \
    /home/node/.kimi-code \
    /home/node/.doppler \
    /home/node/.omp


# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

WORKDIR /workspaces/app 

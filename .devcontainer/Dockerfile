FROM node:20

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
# Version pinned for reproducibility (Debian security repo)
# To update: Check available versions with: apt-cache madison chromium
# Current version: 141.0.7390.107-1~deb12u1 (installed 2025-10-16)
#
RUN apt update && apt install -y \
    less \
    man-db \
    sudo \
    linkchecker \
    chromium=141.0.7390.107-1~deb12u1 \
    chromium-common=141.0.7390.107-1~deb12u1 \
    chromium-sandbox=141.0.7390.107-1~deb12u1

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

# Install Claude
RUN npm install -g @anthropic-ai/claude-code


# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

WORKDIR /workspaces/app 

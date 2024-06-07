#!/usr/bin/env bash

set -euo pipefail

git config --global --add safe.directory /workspaces/vscode-remote-try-java

corepack enable pnpm
corepack install --global pnpm
pnpm config set store-dir ~/.local/share/pnpm/store

./mvnw clean package
pnpm install --force

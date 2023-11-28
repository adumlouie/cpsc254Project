#!/bin/bash

# Update package manager
sudo apt update
sudo apt upgrade -y

# Clean up unused packages
sudo apt autoremove -y
sudo apt autoclean

echo "System maintenance completed successfully"

-----------------------------------------------------------------------------------
executable script: chmod +x system_maintenance.sh
using cron: 0 4 * * 1 /path/to/system_maintenance.sh
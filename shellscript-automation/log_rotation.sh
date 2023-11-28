#!/bin/bash

# Log directory
log_dir="/path/to/log/directory"

# Log file to rotate
log_file="$log_dir/application.log"

# Compress and rotate logs
gzip -9 $log_file
mv $log_file.gz $log_dir/$(date +'%Y%m%d%H%M%S').log.gz

# Delete logs older than 7 days
find $log_dir -type f -name "*.log.gz" -mtime +7 -exec rm {} \;

echo "Log rotation completed successfully"
-----------------------------------------------------------------------------------
executable script: chmod +x log_rotation.sh
using cron: 0 3 * * * /path/to/log_rotation.sh
-----------------------------------------------------------------------------------

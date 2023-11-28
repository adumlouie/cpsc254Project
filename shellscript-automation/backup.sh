#!/bin/bash

# Backup directory
backup_dir="/path/to/backup/directory"

# MongoDB connection details
mongo_host="localhost"
mongo_port="27017"
mongo_database="fitnessApp"

# Backup filename with timestamp
backup_filename="backup-$(date +'%Y%m%d%H%M%S').bson"

# Perform MongoDB backup
mongodump --host $mongo_host --port $mongo_port --db $mongo_database --out $backup_dir

# Create a tarball of the backup
tar -czf $backup_dir/$backup_filename.tar.gz $backup_dir/dump

# Clean up temporary files
rm -rf $backup_dir/dump

# Remove backups older than 7 days
find $backup_dir -type f -name "backup-*" -mtime +7 -exec rm {} \;

echo "Backup completed successfully"
-----------------------------------------------------------------------------------
executable script: chmod +x backup.sh
using cron: 0 2 * * * /path/to/backup.sh
-----------------------------------------------------------------------------------

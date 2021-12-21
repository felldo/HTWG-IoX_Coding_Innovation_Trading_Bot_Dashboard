#!/bin/bash

# Start the first process
cd /sources/checkers-vue
serve -s dist &
/sources/target/universal/play-server-1.0-SNAPSHOT/bin/play-server -Dplay.http.secret.key='m:_GkW1ufC>81T=mO[tXVgP?8Z]y5NeqfUX/J?MF2R=@Tt0ZUfD0;lgDDNuM=/S>'

wait -n

# Exit with status of process that exited first
exit $?
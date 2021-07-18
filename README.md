# power-desk-server
PowerDesk web server

Docker Image can be found here - https://hub.docker.com/repository/docker/kriznaraj/powerdesk-node-server

Run the below command
```
docker container run \
--rm -it \
--name powerdesk-node-server \
-p 50000:8080 \
--mount type=bind,source=$(pwd)/data,target=/usr/src/app/data \
kriznaraj/powerdesk-node-server
```

Test the server by runnig the below command
```
curl -i http://localhost:50000/issues/freshworks
curl -i http://localhost:50000/prechecks/freshworks

<!-- If any new report file added -->
curl -i http://localhost:50000/report/<reportFileName>/<siteName> 

```



job "server" {
  datacenters = ["dc1"]
  group "default" {
    task "server" {
      driver = "exec"

      config {
        command = "sudo chmod +x /home/ubuntu/script.sh && /home/ubuntu/script.sh && cd /home/ubuntu/checkbox/server-side/site/ && env MONGO_PORT=3002 MONGO_IP=localhost MONGO_USER=jenkins MONGO_PASSWORD=12345 && /usr/bin/node server.js"
      }
    }
  }
}

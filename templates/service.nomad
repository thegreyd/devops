job "server" {
  datacenters = ["dc1"]
  group "example" {
    task "server" {
      driver = "exec"

      config {
        command = "/usr/bin/node"
        args = [
          "service.js", 
          ]
      }

      resources {
        network {
          mbits = 10
          port "http" {
            static = "5678"
          }
        }
      }
    }
  }
}

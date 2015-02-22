/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */

// Adds the systems that shape your system
systems({
  'flux-todomvc': {
    // Dependent systems
    depends: ['redis'],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/node:0.12"},
    // Steps to execute before running instances
    provision: [
      "npm install",
    ],
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",
    command: "npm start",
    wait: {"retry": 20, "timeout": 1000},
    mounts: {
      '/azk/#{manifest.dir}': path("."),
    },
    scalable: {"default": 1},
    http: {
      domains: [ "#{system.name}.#{azk.default_domain}" ]
    },
    ports:{
      http:    "3000:3000/tcp",
      monitor: "3001:3001/tcp",
    },
    envs: {
      // set instances variables
      NODE_ENV: "dev",
    },
  },
  redis: {
    image: { docker: "redis" },
    command: "redis-server --appendonly yes",
    mounts: {
      "/data": persistent("data"),
    },
    export_envs: {
      "DATABASE_URL": "redis://#{net.host}:#{net.port[6379]}"
    }
  }
});




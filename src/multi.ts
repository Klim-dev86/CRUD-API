const cluster = require('cluster');
const os = require('os');

const pid = process.pid;

import { initServer } from "./server";

if (cluster.isMaster) {
  const count = os.cpus().length;
  console.log(`Master pid: ${pid}`);
  console.log(`Starting ${count} forks`);
  for (let i = 0; i < count; i++) cluster.fork();
} else {
  const id = cluster.worker.id;
  console.log(`Worker: ${id}, pid: ${pid}`);
  initServer()
}
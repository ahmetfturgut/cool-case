import * as _cluster from 'cluster';
const cluster = _cluster as unknown as _cluster.Cluster;
import * as os from 'os';

export class AppClusterService {
  static async clusterize(bootstrapFunction: () => Promise<void>): Promise<void> {
    if (cluster.isPrimary) {
      const cpuCount = os.cpus().length;

      console.log(`Primary ${process.pid} is running`);
      for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker) => {
        console.log(`Auth Api Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
      });
    } else {
      console.log(`Worker ${process.pid} started`);
      await bootstrapFunction();
    }
  }
}

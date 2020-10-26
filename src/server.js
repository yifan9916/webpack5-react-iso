import http from 'http';
import app from './app';

const PORT = process.env.PORT || 3000;

// https://www.gnu.org/software/libc/manual/html_node/Termination-Signals.html
const SIGNALS = ['SIGINT', 'SIGTERM'];

const server = http.createServer(app);

// you need this code so node will watch for exit signals
// node by default doesn't handle SIGINT/SIGTERM
// docker containers use SIGINT and SIGTERM to properly exit

// quit on ctrl-c when running docker in terminal
// quit properly on docker stop

SIGNALS.forEach((signal) => {
  process.on(signal, () => {
    console.log(
      `Got ${signal}. Gracefully shutting down http server...`,
      new Date().toISOString(),
    );

    shutdown();
  });
});

const shutdown = () => {
  server.close((err) => {
    if (err) {
      console.log(err);
      process.exitCode = 1;
    }

    console.log('Http server closed.');
    process.exit();
  });
};

server.listen(PORT, () => {
  console.log(`Server is up: http://0.0.0.0:${PORT}`);
});

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept('./app', async () => {
    try {
      (await import('./app')).default;
      server.removeAllListeners('request');
      server.on('request', app);
    } catch (error) {
      console.error(error);
    }
  });
  console.log('Server HMR enabled!');
}

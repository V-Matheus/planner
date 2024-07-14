import fastify from 'fastify';

const app = fastify();

app.get('/teste', () => {
  return 'Hellor word';
});

app.listen({ port: 3333 }).then(() => {
  console.log('server running');
});

function main(argv) {
  new HttpServer({
    'GET': createServlet(StaticServlet),
    'HEAD': createServlet(StaticServlet)
  }).start(process.env.PORT || Number(argv[2]) || DEFAULT_PORT);
}

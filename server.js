const http = require("http");

http
.createServer((request, response) =>{
  console.log("Requested url: " + request.url);
  if( request.url.toLowerCase() === "/events" ){
    // respond with a keep alive connection
    response.writeHead(200, {
      Connection: "keep-alive",
      "Content-Type": "text/event-stream",
      //this value informs the client that this connection uses the Server-Sent Events protocol.
      "Cache-Control": "no-cache",
      /*
       * Cache-Control header asks the client not to store data into its local cache,
       * so that data read by the client is really sent by the server and not some old,
       * out-of-date data received in the past.
       */
      'Access-Control-Allow-Origin': '*',
      // CORS
    });

    // after 3 seconds, send the first message
    setTimeout(() => {
      response.write('data: {"flight": "I768", "state": "landing"}');
      response.write("\n\n");
    }, 3000);

    // after 6 seconds, send the next message
    setTimeout(() => {
      response.write('data: {"flight": "I768", "state": "landed"}');
      response.write("\n\n");
    }, 6000);
  }else{
    response.writeHead(404);
    response.end()
  }
})
.listen(5000, () =>{
  console.log("Server running at http://127.0.0.1:5000/");
});

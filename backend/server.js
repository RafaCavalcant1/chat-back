const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io'); // Certifique-se de que está importando 'socket.io' corretamente

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = socketIo(server, {
  cors: {
    origin: "http://127.0.0.1:5500", // Altere para a URL do seu front-end
    methods: ["GET", "POST"],
  }
});

io.on("connection", (socket) => {
  console.log("Novo cliente conectado com ID:", socket.id);

  // Evento para mostrar o loading
  socket.on("show-loading", () => {
    io.emit("show-loading");
  });

  // Evento para esconder o loading
  socket.on("hide-loading", () => {
    io.emit("hide-loading");
  });

  // Evento para receber e retransmitir mensagens
  socket.on("message", (data) => {
    console.log("Mensagem recebida de", data.username, "com ID:", data.id);
    io.emit("message", data); // Envia a mensagem para todos os clientes conectados
  });

  // Evento para quando o cliente desconectar
  socket.on("disconnect", () => {
    console.log("Cliente desconectado com ID:", socket.id);
  });
});

// Inicia o servidor na porta 4000
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

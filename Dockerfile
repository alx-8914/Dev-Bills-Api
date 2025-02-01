FROM node:18-alpine

WORKDIR /home/app

# Copiar apenas os arquivos necessários
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos para o contêiner
COPY . .

# Expor a porta do servidor
EXPOSE 4000

# Comando para iniciar a aplicação
CMD [ "npm", "run", "dev" ]

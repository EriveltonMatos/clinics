# Docker Setup for Clínicas

Este projeto inclui configuração Docker para desenvolvimento e produção.

## Arquivos Docker

- `Dockerfile` - Imagem de produção otimizada
- `Dockerfile.dev` - Imagem de desenvolvimento
- `docker-compose.yml` - Configuração para produção
- `docker-compose.dev.yml` - Configuração para desenvolvimento
- `.dockerignore` - Arquivos ignorados no build

## Comandos Docker

### Desenvolvimento

```bash
# Construir e executar em modo desenvolvimento
docker-compose -f docker-compose.dev.yml up --build

# Executar em background
docker-compose -f docker-compose.dev.yml up -d

# Parar os serviços
docker-compose -f docker-compose.dev.yml down
```

### Produção

```bash
# Construir e executar em modo produção
docker-compose up --build

# Executar em background
docker-compose up -d

# Parar os serviços
docker-compose down
```

### Comandos Docker Diretos

```bash
# Construir imagem de produção
docker build -t clinicas-app .

# Construir imagem de desenvolvimento
docker build -f Dockerfile.dev -t clinicas-dev .

# Executar container de produção
docker run -p 3000:3000 clinicas-app

# Executar container de desenvolvimento
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules clinicas-dev
```

## Variáveis de Ambiente

Certifique-se de configurar as seguintes variáveis de ambiente:

```env
NEXT_PUBLIC_API_BASE_URL=sua_url_da_api
NEXT_PUBLIC_API_CORE_URL=sua_url_da_api_core
```

## Notas

- A imagem de produção usa multi-stage build para otimização
- A configuração standalone do Next.js é habilitada para Docker
- O healthcheck está configurado no docker-compose
- Volumes são mapeados no modo desenvolvimento para hot reload

## Troubleshooting

Se encontrar problemas com permissões, certifique-se de que o Docker está executando com as permissões adequadas.

Para limpar imagens e containers:

```bash
# Remover containers parados
docker container prune

# Remover imagens não utilizadas
docker image prune

# Limpeza completa
docker system prune -a
```

@echo off
echo =========================================
echo 🚀 Iniciando NestJS y exponiendo con ngrok
echo =========================================

REM Abrir NestJS en una ventana separada
start cmd /k "npm run start:dev"

REM Esperar unos segundos para que Nest arranque
timeout /t 5 > nul

REM Levantar ngrok en este mismo terminal
ngrok http 3000

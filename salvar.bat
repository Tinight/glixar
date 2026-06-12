@echo off
echo =================──────────────────────────────────
echo        SINCRONIZANDO COM GITHUB PRIVADO
echo =================──────────────────────────────────
echo.

:: MUDAR APENAS O NOME DA PASTA NO FINAL DESSA LINHA:
cd /d "D:\APPSDev\glixar"

echo [1/3] Puxando atualizações do GitHub...
git pull origin main --rebase

echo.
echo [2/3] Adicionando modificações...
git add .

echo.
echo [3/3] Criando ponto de salvamento...
git commit -m "Refactor: Organizacao de arquivos e seguranca de credenciais"

echo.
echo [^>^>] Subindo tudo para o GitHub...
git push origin main

echo.
echo =================──────────────────────────────────
echo        PROCESSO CONCLUÍDO COM SUCESSO!
echo =================──────────────────────────────────
pause
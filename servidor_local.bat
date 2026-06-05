@echo off
echo ========================================================
echo Iniciando Servidor Local para el Curso de GeoGebra
echo ========================================================
echo.
echo Por favor, NO cierres esta ventana.
echo Firebase requiere un servidor web para que el inicio de sesion funcione correctamente.
echo.
npx serve . -p 3000
pause

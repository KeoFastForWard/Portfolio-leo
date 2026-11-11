@echo off
node "%~dp0preview.cjs" --open
if errorlevel 1 pause

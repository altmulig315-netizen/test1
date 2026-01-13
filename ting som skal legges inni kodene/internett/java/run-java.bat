@echo off
REM Setter opp Java-miljøet med den lokale JDK-installasjonen

set JAVA_HOME=%~dp0openJdk-25
set PATH=%JAVA_HOME%\bin;%PATH%

REM Hvis det er gitt argumenter, kjør dem som Java-kommando
if "%~1"=="" (
    echo Java-miljøet er satt opp!
    echo Du kan nå bruke 'java' og 'javac' kommandoer.
    echo.
    echo Eksempel:
    echo   java HelloWorld
    echo   javac HelloWorld.java
    echo.
    cmd /k
) else (
    java %*
)

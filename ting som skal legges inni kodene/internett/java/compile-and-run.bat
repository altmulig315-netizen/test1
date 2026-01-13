@echo off
REM Kompilerer og kjører en Java-fil

if "%~1"=="" (
    echo Bruk: compile-and-run.bat [filnavn.java]
    echo Eksempel: compile-and-run.bat HelloWorld.java
    exit /b 1
)

set JAVA_HOME=%~dp0openJdk-25
set PATH=%JAVA_HOME%\bin;%PATH%

set FILENAME=%~1
set CLASSNAME=%~n1

echo Kompilerer %FILENAME%...
javac "%FILENAME%"

if %ERRORLEVEL% EQU 0 (
    echo Kompilering vellykket! Kjører %CLASSNAME%...
    echo.
    java %CLASSNAME%
) else (
    echo Kompilering feilet!
    exit /b 1
)

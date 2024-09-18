@echo off

cd %~dp0

:: setting old tsconfig and typescript tsconfig
set ORIGINAL_TSCONFIG=%~dp0..\tsconfig.json
set FBS_TSCONFIG=%~dp0..\_compile\tsconfig_fbs.json

echo %ORIGINAL_TSCONFIG%
echo %FBS_TSCONFIG%

cd ../

:: copying tsconfig
echo Backing up the original tsconfig
copy "%ORIGINAL_TSCONFIG%" "%ORIGINAL_TSCONFIG%.bak"

:: Swapping the temp tsconfig
copy /y "%FBS_TSCONFIG%" "%ORIGINAL_TSCONFIG%"

:: compiling typescript files into generated folder then moving them to the appropriate spot
echo "Compiling TypeScript files..."
call tsc

echo "Copying generated files to schema folder..."
echo 'a' | xcopy /s "./src/generated" "./src/schema"

echo Deleting generated files
rd /s /q "src\generated"

echo Moving the original tsconfig back to original spot
move /y "%ORIGINAL_TSCONFIG%.bak" "%ORIGINAL_TSCONFIG%"

echo "Completed."
pause
@echo off

cd ../

echo "Compiling TypeScript files..."
call tsc

echo "Copying generated files to schema folder..."
echo 'a' | xcopy /s "./src/generated" "./src/schema"

echo "Completed."
pause
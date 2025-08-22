#!/bin/bash

# List of component test files that need HttpClient dependency
test_files=(
  "src/app/inscription/inscription.component.spec.ts"
  "src/app/header/header.component.spec.ts"
  "src/app/home/home.component.spec.ts"
  "src/app/effectif/effectif.component.spec.ts"
  "src/app/register/register.component.spec.ts"
  "src/app/contact/contact.component.spec.ts"
  "src/app/standing/standing.component.spec.ts"
  "src/app/demande-inscription/demande-inscription.component.spec.ts"
  "src/app/inscris/inscris.component.spec.ts"
  "src/app/calendar/calendar.component.spec.ts"
  "src/app/login/login.component.spec.ts"
)

for file in "${test_files[@]}"; do
  if [ -f "$file" ]; then
    echo "Updating $file..."
    
    # Add import for test utilities at the top
    sed -i '/import.*component.*from/a import { COMMON_TEST_IMPORTS } from '"'"'../testing/test-utils'"'"';' "$file"
    
    # Update TestBed configuration to include common imports
    sed -i 's/imports: \[\([^]]*\)\]/imports: [\1, ...COMMON_TEST_IMPORTS]/g' "$file"
  else
    echo "File $file not found, skipping..."
  fi
done

echo "Done updating test files!"

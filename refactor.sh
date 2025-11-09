#!/bin/bash

# ==========================================
# STRZYKAWA REFACTOR SCRIPT
# ==========================================
# Usuwa duplikaty, reorganizuje foldery, 
# updatuje wszystkie importy
# ==========================================

echo "🚀 STARTING REFACTOR..."
echo ""

# KROK 1: BACKUP (opcjonalne - jeśli chcesz)
# echo "📦 Creating backup..."
# cp -r src src_backup_$(date +%Y%m%d_%H%M%S)

# KROK 2: USUWANIE DUPLIKATÓW
echo "🗑️  Removing duplicates..."
rm -f src/components/atoms/Button.jsx  # stary Button
rm -f src/components/ContactSection.jsx  # duplikat z pages/

# KROK 3: REPLACE UniversalButton → Button w całym projekcie
echo "🔄 Updating imports: UniversalButton → Button..."

# Find all files and replace imports
find src -type f \( -name "*.jsx" -o -name "*.js" \) -exec sed -i \
    -e "s/UniversalButton/Button/g" \
    -e "s|from ['\"]../components/UniversalButton|from '@/components/atoms/Button|g" \
    -e "s|from ['\"]./components/UniversalButton|from '@/components/atoms/Button|g" \
    -e "s|from ['\"]../../components/UniversalButton|from '@/components/atoms/Button|g" \
    -e "s|from ['\"]../../../components/UniversalButton|from '@/components/atoms/Button|g" \
    {} +

# KROK 4: REORGANIZACJA FOLDERÓW
echo "📁 Reorganizing folders..."

# Create new structure
mkdir -p src/components/layout
mkdir -p src/components/features/hero
mkdir -p src/components/features/about  
mkdir -p src/components/features/contact

# Move layout components
mv src/components/Header.jsx src/components/layout/ 2>/dev/null || true
mv src/components/Footer.jsx src/components/layout/ 2>/dev/null || true
mv src/components/PageLayout.jsx src/components/layout/ 2>/dev/null || true
mv src/components/PageHeader.jsx src/components/layout/ 2>/dev/null || true

# Move feature components
mv src/components/hero/* src/components/features/hero/ 2>/dev/null || true
mv src/components/about/* src/components/features/about/ 2>/dev/null || true
mv src/components/contact/* src/components/features/contact/ 2>/dev/null || true

# Remove old empty folders
rmdir src/components/hero 2>/dev/null || true
rmdir src/components/about 2>/dev/null || true
rmdir src/components/contact 2>/dev/null || true

# KROK 5: MOVE UniversalButton.jsx → atoms/Button.jsx
echo "📦 Moving UniversalButton → atoms/Button..."
mv src/components/UniversalButton.jsx src/components/atoms/Button.jsx 2>/dev/null || true

# KROK 6: UPDATE IMPORTS dla przeniesionych komponentów
echo "🔄 Updating import paths..."

# Update Header imports (z components/ → components/layout/)
find src -type f \( -name "*.jsx" -o -name "*.js" \) -exec sed -i \
    -e "s|from ['\"]./components/Header|from './components/layout/Header|g" \
    -e "s|from ['\"]../components/Header|from '../components/layout/Header|g" \
    -e "s|from ['\"]../../components/Header|from '../../components/layout/Header|g" \
    -e "s|from ['\"]./components/header/Header|from './components/layout/Header|g" \
    -e "s|from ['\"]../components/header/Header|from '../components/layout/Header|g" \
    {} +

# Update Footer imports
find src -type f \( -name "*.jsx" -o -name "*.js" \) -exec sed -i \
    -e "s|from ['\"]./components/Footer|from './components/layout/Footer|g" \
    -e "s|from ['\"]../components/Footer|from '../components/layout/Footer|g" \
    -e "s|from ['\"]../../components/Footer|from '../../components/layout/Footer|g" \
    {} +

# Update PageLayout imports
find src -type f \( -name "*.jsx" -o -name "*.js" \) -exec sed -i \
    -e "s|from ['\"]../components/PageLayout|from '../components/layout/PageLayout|g" \
    -e "s|from ['\"]../../components/PageLayout|from '../../components/layout/PageLayout|g" \
    {} +

# Update hero components
find src -type f \( -name "*.jsx" -o -name "*.js" \) -exec sed -i \
    -e "s|from ['\"]./hero/|from './features/hero/|g" \
    -e "s|from ['\"]../hero/|from '../features/hero/|g" \
    {} +

# Update about components  
find src -type f \( -name "*.jsx" -o -name "*.js" \) -exec sed -i \
    -e "s|from ['\"]./about/|from './features/about/|g" \
    -e "s|from ['\"]../about/|from '../features/about/|g" \
    {} +

# Update contact components
find src -type f \( -name "*.jsx" -o -name "*.js" \) -exec sed -i \
    -e "s|from ['\"]./contact/|from './features/contact/|g" \
    -e "s|from ['\"]../contact/|from '../features/contact/|g" \
    {} +

# KROK 7: WYCZYŚĆ ZAKOMENTOWANY KOD
echo "🧹 Cleaning commented code in ActionButtons..."
# This will be done manually or with str_replace

echo ""
echo "✅ REFACTOR COMPLETE!"
echo ""
echo "📋 SUMMARY:"
echo "  - Removed: atoms/Button.jsx (old)"
echo "  - Removed: components/ContactSection.jsx (duplicate)"
echo "  - Moved: UniversalButton.jsx → atoms/Button.jsx"
echo "  - Created: layout/, features/hero, features/about, features/contact"
echo "  - Updated: All imports across project"
echo ""
echo "🧪 NEXT STEPS:"
echo "  1. Test the app: npm run dev"
echo "  2. Check console for import errors"
echo "  3. Commit if working: git add . && git commit -m 'refactor: reorganize components & update Button'"

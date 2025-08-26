#!/bin/bash
# ============================
# Minify CSS and JS for production
# ============================

echo "🔹 Minifying CSS..."
cleancss -o css/style.min.css css/style.css

echo "🔹 Minifying JavaScript..."
terser js/script.js -o js/script.min.js -c -m

echo "✅ Minification complete!"
echo "   CSS: css/style.min.css"
echo "   JS:  js/script.min.js"

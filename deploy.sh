echo "start deployment..."

# abort on errors
set -e

rm -rf dist

cd dist

git init
git add .
git cm -m "deploy"

git push -f git@github.com:eyvindove/vue3-todolist.git master:gh-pages

cd -

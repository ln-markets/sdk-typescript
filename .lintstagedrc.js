export default {
  '*': 'prettier --ignore-unknown --write',
  '*.md': 'markdownlint --fix',
  '*.ts': 'eslint --fix',
}

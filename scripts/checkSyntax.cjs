const ts = require('typescript');
const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '../src/pages/Gallery.tsx');
const text = fs.readFileSync(file, 'utf8');
const program = ts.createProgram([file], { allowJs: true, jsx: ts.JsxEmit.React, allowSyntheticDefaultImports: true, skipLibCheck: true });
const diagnostics = ts.getPreEmitDiagnostics(program);
if (!diagnostics || diagnostics.length === 0) {
  console.log('No diagnostics');
} else {
  diagnostics.forEach(d => {
    const f = d.file || program.getSourceFiles()[0];
    const start = d.start || 0;
    const { line, character } = f.getLineAndCharacterOfPosition(start);
    console.log(`${f.fileName}:${line + 1}:${character + 1}: ${ts.flattenDiagnosticMessageText(d.messageText, '\n')}`);
  });
}

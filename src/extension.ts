// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('hello-diff: activate');
  const d = vscode.commands.registerCommand('hello-diff.hello', async () => {
    vscode.window.showInformationMessage('Hello from hello-diff!');

    const files = await vscode.workspace.findFiles('**/*', '**/node_modules/**', 100);
    const pick = await vscode.window.showQuickPick(files.map(f=>f.fsPath), {placeHolder:'Pick a file to duplicate'});
    if (!pick || !vscode.workspace.workspaceFolders?.length) return;

    const src = vscode.Uri.file(pick);
    const dst = vscode.Uri.joinPath(vscode.workspace.workspaceFolders[0].uri, '.hello-copy.txt');
    const data = await vscode.workspace.fs.readFile(src);
    await vscode.workspace.fs.writeFile(dst, data);

    const left = src, right = dst;
    await vscode.commands.executeCommand('vscode.diff', left, right, 'Original ↔ Copy');
  });
  context.subscriptions.push(d);
}
export function deactivate() {}


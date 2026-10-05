import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // Create the wolf status bar item
  const wolf = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100,
  );
  wolf.text = "🐺 White Wolf"; // temporary text, we'll make it nicer later
  wolf.tooltip = "The White Wolf is watching your code...";
  wolf.command = "white-wolf.showWolfMessage";
  wolf.show();

  // Register the command that runs when you click the wolf
  const disposable = vscode.commands.registerCommand(
    "white-wolf.showWolfMessage",
    () => {
      vscode.window.showInformationMessage(
        "The White Wolf is proud of you. Keep coding, witcher.",
      );
    },
  );

  context.subscriptions.push(wolf, disposable);
}

export function deactivate() {}

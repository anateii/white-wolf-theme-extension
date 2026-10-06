import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const wolf = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100,
  );
  wolf.command = "white-wolf.showWolfMessage";
  wolf.show();

  const updateMood = () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      wolf.text = "🐺 White Wolf";
      wolf.tooltip = "The White Wolf is resting.";
      return;
    }

    const diagnostics = vscode.languages.getDiagnostics(editor.document.uri);
    const errors = diagnostics.filter(
      (d) => d.severity === vscode.DiagnosticSeverity.Error,
    );
    const warnings = diagnostics.filter(
      (d) => d.severity === vscode.DiagnosticSeverity.Warning,
    );

    if (errors.length > 0) {
      const first = errors[0].message;
      wolf.text = "🐺 Monsters nearby";
      wolf.tooltip =
        errors.length === 1
          ? first
          : `${errors.length} errors. First: ${first}`;
    } else if (warnings.length > 0) {
      const first = warnings[0].message;
      wolf.text = "🐺 The wolf is uneasy";
      wolf.tooltip =
        warnings.length === 1
          ? first
          : `${warnings.length} warnings. First: ${first}`;
    } else {
      wolf.text = "🐺 White Wolf";
      wolf.tooltip = "The path is clear.";
    }
  };

  updateMood();

  const disposable = vscode.commands.registerCommand(
    "white-wolf.showWolfMessage",
    () => {
      const message =
        typeof wolf.tooltip === "string"
          ? wolf.tooltip
          : wolf.tooltip?.value || "The White Wolf is watching.";

      vscode.window.showInformationMessage(message);
    },
  );

  context.subscriptions.push(
    wolf,
    disposable,
    vscode.window.onDidChangeActiveTextEditor(updateMood),
    vscode.languages.onDidChangeDiagnostics(updateMood),
  );
}

export function deactivate() {}

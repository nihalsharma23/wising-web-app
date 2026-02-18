# OpenJDK 17 Installation Instructions

The **Wising-Dev** backend requires **Java 17**. Since the automated installation was interrupted, you can install it manually using one of the methods below.

## Option 1: Manual Download (Recommended)

1.  **Download**: Go to the [Microsoft Build of OpenJDK 17 download page](https://learn.microsoft.com/en-us/java/openjdk/download#openjdk-17).
2.  **Select Version**: Look for **Windows x64** and download the `.msi` file.
3.  **Install**: Run the downloaded `.msi` installer.
    *   **Important**: During installation, ensure you select **"Set JAVA_HOME variable"** and **"JavaSoft (Oracle) registry keys"** if prompted. This ensures other tools can find Java.

## Option 2: Using Winget (Command Line)

You can try running the installation command again from PowerShell (Run as Administrator is recommended but not always strictly required for user-scope installs, though `winget` usually requests elevation).

```powershell
winget install --id Microsoft.OpenJDK.17 --source winget
```

## Verify Installation

After installing, open a **new** PowerShell terminal and run:

```powershell
java -version
```

You should see output similar to:
```
openjdk 17.0.x ...
OpenJDK Runtime Environment ...
```

## Troubleshooting

If `java` is still not found after installation:
1.  **Restart Terminal**: Close and reopen VS Code or your terminal window.
2.  **Check Path**: Ensure the path to the `bin` folder of your Java installation is added to your System `PATH` environment variable.

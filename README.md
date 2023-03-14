# portatoapp

## Containerized Toolchain
Instead of installing the toolchain on your system, another more scalable way is to use a containerized Toolchain. This allows to compile and debug the code without installing the toolchain on your computer and also allows us to version the toolchain in git and link it to a specific release.
### Requirements
#### Docker
In order to use the containerized toolchain you need to install Docker.
- For Linux, install Docker Engine by following the instructions under [this link](https://docs.docker.com/engine/install/ubuntu/).
Furthermore Docker needs to be executable by a non-root user. To enable this follow the [post installation step here](https://docs.docker.com/engine/install/linux-postinstall/)
- For Windows, please install [Docker Desktop](https://docs.docker.com/desktop/release-notes/)

#### VSCode
VScode supports to open the workspace in a predefined container. Install it using [this link](https://code.visualstudio.com/docs/setup/linux)
Ensure you have the *Remote Containers* extension (with ID: ms-vscode-remote.remote-containers) installed, which is needed to run a container inside VSCode.

You can also install the *Docker* extension (with ID: ms-azuretools.vscode-docker), which can be useful to manage images.

## Pre-commit hook

Before you can run hooks, you need to have the pre-commit package manager installed.

Using pip:

```
pip install pre-commit
```

Install the git hook scripts by running:

```
pre-commit install
```
now pre-commit will run automatically on git commit!

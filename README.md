# NodeScript Git Ops

This repo manages Kubernetes manifests and is used as a source-of-truth for all current deployments.

## Prerequisites

### GCloud

- Follow [the GCloud CLI installation steps](https://cloud.google.com/sdk/docs/install).

- Log into your GKE console and follow intructions to connect to NodeScript cluster.

### SOPS

Secrets are managed using [SOPS](https://github.com/getsops/sops). Installing SOPS is required to edit the secrets locally.

1. Install SOPS:

    ```
    brew install sops
    ```

2. Log into GCloud:

    ```
    gcloud auth login
    gcloud auth application-default login
    ```

3. Edit any secret file with sops:

    ```
    sops ./secrets/apps/<env>/<file>.yaml
    ```

See [Secrets](#secrets) for more info.

## Secrets

### Adding new secrets

1. Create an unencrypted k8s secret YAML file in `secrets/ac-production`.

2. Encrypt with sops (`-e` encrypt, `-i` in-place):

    ```
    sops -e -i ./secrets/<group>/<env>/<file>.yaml
    ```

3. Apply with `kubectl`:

    ```
    sops -d ./secrets/<group>/<env>/<file>.yaml | kubectl apply -f -
    ```

4. Commit your changes.

### Editing existing secrets

1. Edit the file with sops:

    ```
    sops ./secrets/<group>/<env>/<file>.yaml
    ```

2. Apply with `kubectl`:

    ```
    sops -d ./secrets/<group>/<env>/<file>.yaml | kubectl apply -f -
    ```

3. Commit your changes.

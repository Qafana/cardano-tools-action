# Cardano Tools GitHub Action

## Overview
This GitHub Action facilitates the integration of Cardano tools into workflows, enabling easy access and manipulation of Cardano-related tasks in your CI/CD pipelines.

## Features
Automatically downloads and installs the latest Cardano tools.
Configures the environment to make the tools accessible throughout the workflow.

## Usage
To use this action in your workflow just add the following lines to your workflow file:

```yaml
- name: Install Cardano tools
  uses: input-output-hk/cardano-tools-action@latest
```
Instead of `latest` you can also use a specific version number, e.g. `v0.1.6` so future changes to the action won't break your workflow.

After this step `bech32`, `cardano-cli`, `cardano-node`, `cardano-address` and `cardano-wallet` will be available in your workflow.
You can use them in your scripts or directly execute them in your workflow steps.

### Example on using it: 
```yaml
- name: Create payment address
  run: |
    paymentAddress=$(cardano-cli address build \
      --payment-verification-key-file payment.vkey \
      --testnet-magic 1097911063)
```

##Contributing
Contributions to this action are welcome! Please follow the standard pull request process to suggest improvements or add new features.
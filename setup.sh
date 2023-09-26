#!/bin/bash

# List of packages to check and install if missing
packages=("parse_shebang" "pre-commit" "commitizen" "cz-github-jira-conventional")
aliases=(
    "retag#!git tag -l | xargs git tag -d >/dev/null && git fetch -q && echo \"fetched tags: \$(git tag -l | wc -l)\""
    "push-tag#!git tag --contains HEAD | xargs -I {} git push origin {}"
    "push-up#!git push -u origin \$(git symbolic-ref --short HEAD)"
    "push-all#!git push-up && git push-tag"
    "zen#cz c"
    "zen-bump#!git retag && cz bump"
    "zen-bump-mr#!git checkout -B \"bump-\$(date +'%Y%m%d')\" && git zen-bump"
    "zen-release#!git zen-bump-mr && git push-all"
)
help="----------------------------------------
You can now use following commands:
  git zen:         Write a commit message using Commitizen wizard
  git zen-bump:    Bump version and create a release commit with tags using Commitizen wizard
  git zen-bump-mr: Like zen-bump, but in a separate bump-<date> branch
  git zen-release: Like zen-bump-mr, but also push all changes to remote including created tags
  git push-tag:    Push tags from current commit to remote
"
is_git_repo=$(git rev-parse --is-inside-work-tree 2>/dev/null)

if [ ! "$is_git_repo" ]; then
  echo "This is not a Git repository. Make sure you run the script from the root of the repository directory."
fi

# Check if curl is available
if ! command -v curl &> /dev/null; then
    echo "curl is not installed. Please install curl."
    exit 1
fi

echo "Installing Commitizen and its plugins..."

# Check if the operating system is Windows
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" || "$OSTYPE" == "cygwin" ]]; then
    echo "Detected Windows..."

    # Step 1: Check Python version
    python --version
    if [ $? -ne 0 ]; then
        echo "Python is not installed. Downloading and installing Python 3.11.5..."
        curl -o python_installer.exe https://www.python.org/ftp/python/3.11.5/python-3.11.5-amd64.exe

        # Install Python silently
        installPath="$PROGRAMFILES\Python311"
        scriptsPath="$installPath\Scripts"
        ./python_installer.exe /quiet InstallAllUsers=1 PrependPath=1 Include_test=0 TargetDir="$installPath"

        # Append the export statement to ~/.bash_profile
        echo "
        export PATH=\"$scriptsPath:$installPath:\$PATH\"" >> ~/.bash_profile
        echo "Exported Python paths to ~/.bash_profile."

        # Reload ~/.bash_profile
        source ~/.bash_profile
        echo "Reloaded ~/.bash_profile."

        rm python_installer.exe

        # Check Python version again
        python --version
        if [ $? -ne 0 ]; then
            echo "Python installation failed."
            exit 1
        fi
    fi

    # Step 2: Check pip version
    pip --version
    if [ $? -ne 0 ]; then
        echo "Pip is not installed. Installing pip..."
        curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
        python get-pip.py
        rm get-pip.py

        if [ $? -ne 0 ]; then
            echo "Pip installation failed."
            exit 1
        fi
    fi

    # Step 3: Install Commitizen and plugins
    for package in "${packages[@]}"; do
        if ! python -m pip show "$package" &>/dev/null; then
            echo "Installing $package..."
            python -m pip install "$package"
        else
            echo "$package is already installed."
        fi
    done

# Check if the operating system is macOS
elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Detected macOS..."

    # Step 1: Check Python version
    python3 --version
    if [ $? -ne 0 ]; then
        echo "Python is not installed. Downloading and installing Python 3.11.5..."
        curl -o python_installer.pkg https://www.python.org/ftp/python/3.11.5/python-3.11.5-macosx10.9.pkg
        sudo installer -pkg python_installer.pkg -target /
        rm python_installer.pkg

        # Check Python version again
        python3 --version
        if [ $? -ne 0 ]; then
            echo "Python installation failed."
            exit 1
        fi
    fi

    # Step 2: Check pip version
    pip3 --version
    if [ $? -ne 0 ]; then
        echo "Pip is not installed. Installing pip..."
        curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
        python3 get-pip.py
        rm get-pip.py

        if [ $? -ne 0 ]; then
            echo "Pip installation failed."
            exit 1
        fi
    fi

    # Step 3: Install Commitizen and plugins
    for package in "${packages[@]}"; do
        if ! pip3 show "$package" &>/dev/null; then
            echo "Installing $package..."
            pip3 install "$package"
        else
            echo "$package is already installed."
        fi
    done

# Unsupported operating system
else
    echo "Unsupported operating system."
    exit 1
fi

# Step 4: Create project files
is_git_repo=$(git rev-parse --is-inside-work-tree 2>/dev/null)

# Check if .cz.yaml exists
if [ -f .cz.yaml ]; then
    cz_version=$(cat .cz.yaml | grep version: | awk -F': ' '/version:/ {print $2}')
    read -p ".cz.yaml already exists. Would you like to overwrite it? (y/N): " overwrite_cz_file
fi

if [ ! -f .cz.yaml ] || [ "$overwrite_cz_file" == "Y" ] || [ "$overwrite_cz_file" == "y" ] ; then
    echo "Creating .cz.yaml..."

    # Get the repository path
    if [ -n "$is_git_repo" ]; then
      git_repo_path=$(git remote -v | awk '/git@git/ && /push/ {print $2}' | sed 's/.*://; s/\.git.*//' | uniq)
    fi

    # Initialize Commitizen properties with default values
    cz_version="${cz_version:-1.0.0}"
    cz_version_files="gradle.properties:version"
    cz_jira_prefix="EPMDHMTWO"
    cz_github_repo="$git_repo_path"

    # Prompt for Commitizen properties with default values displayed
    read -p "Enter current version (default: $cz_version): " input_version
    cz_version="${input_version:-$cz_version}"

    read -p "Enter path to file where version is stored (default: $cz_version_files): " input_version_files
    cz_version_files="${input_version_files:-$cz_version_files}"

    read -p "Enter yor Jira project code (default: $cz_jira_prefix): " input_jira_prefix
    cz_jira_prefix="${input_jira_prefix:-$cz_jira_prefix}"
    if [[ ! $cz_jira_prefix =~ - ]]; then
        cz_jira_prefix="$cz_jira_prefix-"
    fi

    read -p "Enter Commitizen github_repo (default: $cz_github_repo): " input_github_repo
    cz_github_repo="${input_github_repo:-$cz_github_repo}"

    cat <<EOF > .cz.yaml
---
commitizen:
  bump_message: "bump(release): version \$current_version \u2192 \$new_version"
  github_base_url: https://git.epam.com
  github_repo: $cz_github_repo
  jira_base_url: https://jira.epam.com/jira
  jira_prefix: $cz_jira_prefix
  name: cz_github_jira_conventional
  tag_format: \$major.\$minor.\$patch
  update_changelog_on_bump: true
  version: $cz_version
  version_files:
    - $cz_version_files
  version_provider: commitizen
  version_scheme: semver
EOF
    echo ".cz.yaml created."
fi


# Check if CHANGELOG.md exists
if [ -f CHANGELOG.md ]; then
    read -p "CHANGELOG.md already exists. Would you like to overwrite it? (y/N): " overwrite_changelog_file
fi

if [ ! -f CHANGELOG.md ] || [ "$overwrite_changelog_file" == "Y" ] || [ "$overwrite_changelog_file" == "y" ]; then
    echo "Creating CHANGELOG.md..."
    cat <<EOF > CHANGELOG.md
# Changelog

All notable changes to this project will be documented in this file.

See [conventional-commits](https://www.conventionalcommits.org/) for commit guidelines.

See [commitizen-tools](https://commitizen-tools.github.io/commitizen/) for release management setup.

## ${cz_version}
EOF
    echo "CHANGELOG.md created."
fi

# Setup pre-commit
if [ -d .husky ]; then
  echo -e "\033[0;31m
  Warning: Detected Husky installation in this project.
  Make sure you have configured it to validate commit messages with following pattern:
        (feat|fix|build|ci|docs|perf|refactor|style|test|chore|revert|bump)(\(\S+\))?!?:(\s.*)
  \033[0m"
else
  # Check if .pre-commit-config.yaml exists
  if [ -f .pre-commit-config.yaml ]; then
      echo "Checking .pre-commit-config.yaml..."

      # Check if lines are missing in .pre-commit-config.yaml
      if ! grep -q 'commitizen' .pre-commit-config.yaml; then
          cat <<EOF >> .pre-commit-config.yaml
  - repo: https://github.com/commitizen-tools/commitizen
    rev: v3.10.0
    hooks:
      - id: commitizen
        stages: [commit-msg]
        additional_dependencies: [cz-github-jira-conventional]
EOF
          echo "commitizen hook added to .pre-commit-config.yaml."
      else
          echo "commitizen hook already exist in .pre-commit-config.yaml."
      fi
  else
      echo "Creating .pre-commit-config.yaml..."
      cat <<EOF > .pre-commit-config.yaml
repos:
  - repo: https://github.com/commitizen-tools/commitizen
    rev: v3.10.0
    hooks:
      - id: commitizen
        stages: [commit-msg]
        additional_dependencies: [cz-github-jira-conventional]
EOF
      echo ".pre-commit-config.yaml created."
  fi

  # Install pre-commit hook
  if [ -n "$is_git_repo" ]; then
      echo "Installing pre-commit hooks..."
      pre-commit install --hook-type commit-msg

      # Replace shebang line in pre-commit.legacy file to make it work on Windows
      legacy_hooks=(
          ".git/hooks/pre-commit.legacy"
          ".git/hooks/commit-msg.legacy"
      )

      for legacy_hook in "${legacy_hooks[@]}"; do
          # Check if the pre-commit.legacy file exists
          if [ -f "$legacy_hook" ]; then
              # Replace the shebang line in the file
              sed -i '1s|^#!/bin/sh$|#!/usr/bin/env sh|' "$legacy_hook"
              chmod 777 "$legacy_hook"
              echo "Shebang line replaced in $legacy_hook"
          fi
      done

      echo "Pre-commit hooks installed successfully."
  fi
fi

# Setup git aliases
for alias_definition in "${aliases[@]}"; do
    # Split each entry into alias_name and alias_command
    IFS='#' read -ra alias_parts <<< "$alias_definition"
    alias_name="${alias_parts[0]}"
    alias_command="${alias_parts[1]}"

    git config --global alias."$alias_name" "$alias_command"
done
echo "Aliases configured."


echo "Setup completed!"

# Print help
echo -e "\033[0;32m$help\033[0m"

read -p "Press Enter to exit..."

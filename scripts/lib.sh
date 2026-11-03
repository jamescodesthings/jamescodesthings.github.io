# Shared CLI helpers for the scripts in this folder; source it, do not run it.
# Follows the house cli-style: say ok|info|warn|fail, and -h -v -q --plain.
# Uses zsh-config's helpers when present, else prints plain `kind  text` lines.

CLI_VERBOSE=0 CLI_QUIET=0 CLI_PLAIN=0
CLI_REST=()
_cli_zsh=""

# Once per run: is zsh-config's `say` reachable?
_cli_have_zsh() {
  if [ -z "$_cli_zsh" ]; then
    if command -v zsh >/dev/null 2>&1 && zsh -c 'autoload -Uz +X say' >/dev/null 2>&1; then _cli_zsh=1; else _cli_zsh=0; fi
  fi
  [ "$_cli_zsh" = 1 ]
}

# say ok|info|warn|fail <text>; fail goes to stderr, quiet hides ok and info.
say() {
  local kind="$1"; shift
  case "$kind" in ok | info) [ "$CLI_QUIET" = 1 ] && return 0 ;; esac
  if [ "$CLI_PLAIN" != 1 ] && _cli_have_zsh; then
    if [ "$kind" = fail ]; then
      zsh -c 'autoload -Uz cli-init say; cli-init; say "$@"' -- "$kind" "$*" >&2
    else
      zsh -c 'autoload -Uz cli-init say; cli-init; say "$@"' -- "$kind" "$*"
    fi
  elif [ "$kind" = fail ]; then
    printf '%s  %s\n' "$kind" "$*" >&2
  else
    printf '%s  %s\n' "$kind" "$*"
  fi
  return 0
}

# cli_help <cheat words...>: the cheat sheet, else the calling script's header comment.
cli_help() {
  if command -v zsh >/dev/null 2>&1 && zsh -c 'autoload -Uz +X cheat' >/dev/null 2>&1; then
    zsh -c 'autoload -Uz cheat; cheat "$@"' -- "$@"
  else
    sed -n '2,/^[^#]/{/^#/s/^# \{0,1\}//p;}' "$0"
  fi
}

# cli_parse <cheat words> -- "$@": sets CLI_VERBOSE, CLI_QUIET, CLI_PLAIN; leftovers in CLI_REST.
cli_parse() {
  local words=()
  while [ "$#" -gt 0 ] && [ "$1" != -- ]; do words+=("$1"); shift; done
  shift
  while [ "$#" -gt 0 ]; do
    case "$1" in
      -h | --help) cli_help "${words[@]}"; exit 0 ;;
      -v | --verbose) CLI_VERBOSE=1 ;;
      -q | --quiet) CLI_QUIET=1 ;;
      --plain) CLI_PLAIN=1; export NO_COLOR=1 ;;
      -*) say fail "unknown option: $1"; exit 2 ;;
      *) CLI_REST+=("$1") ;;
    esac
    shift
  done
}

"use strict";

const path = require("path");

const usage = msg => {
  if (msg) {
    console.log(msg);
    console.log("");
  }

  console.log("Usage: yanc <env> <command> [options]");
  console.log("");
  console.log("-h, --help               print help");
  console.log("");
};

const {
  argv
} = process;

if (argv.length < 3) {
  usage();
  process.exit(1);
}

if (argv[2] === "-h" || argv[2] === "--help") {
  usage();
  process.exit(0);
}

if (argv.length < 4) {
  usage("No command specified");
  process.exit(1);
}

const pluginName = argv[2];

const plugin = require(`@yanc/env-${pluginName}`);

if (!plugin) {
  console.error("!!! no plugin:", pluginName);
  process.exit(1);
}

const command = plugin[argv[3]];

if (!command || typeof command !== "function") {
  console.error(`!!! invalid command, ${argv[3]} for plugin, env-${pluginName}`);
  console.error(`    valid commands are ${Object.keys(plugin).join(", ")}`);
  process.exit(1);
}

const args = [...argv.slice(4)];

const withDefaultOpts = opt => ({
  verbose: false,
  browser: false,
  rootDir: process.cwd(),
  ...opt
});

(async () => {
  const {
    yanc = {}
  } = require(path.resolve(path.join(process.cwd(), "package.json")));

  const res = await command(withDefaultOpts(yanc), args);

  if (res !== 0) {
    usage();
    process.exit(res);
  }
})();
// main.ts may wire every ring as the composition root. Only the directional
// rules use this exact exception; the cycle rule deliberately does not.
const compositionRoot = '^src/main[.]ts$';

/** @type {import('dependency-cruiser').IConfiguration} */
const config = {
  forbidden: [
    {
      name: 'domain-does-not-depend-on-outer-layers',
      severity: 'error',
      comment:
        'Protects the innermost boundary: domain code must remain independent of application orchestration, interface adapters, and frameworks.',
      from: {
        path: '^src/domain(?:/|$)',
        pathNot: compositionRoot,
      },
      to: {
        path: '^src/(?:application|interface-adapters|frameworks)(?:/|$)',
      },
    },
    {
      name: 'application-does-not-depend-on-outer-layers',
      severity: 'error',
      comment:
        'Protects the use-case boundary: application code may depend on domain code, but not on delivery adapters or framework details.',
      from: {
        path: '^src/application(?:/|$)',
        pathNot: compositionRoot,
      },
      to: {
        path: '^src/(?:interface-adapters|frameworks)(?:/|$)',
      },
    },
    {
      name: 'interface-adapters-do-not-depend-on-frameworks',
      severity: 'error',
      comment:
        'Protects the adapter boundary: interface adapters translate between layers and must not know concrete framework or driver implementations.',
      from: {
        path: '^src/interface-adapters(?:/|$)',
        pathNot: compositionRoot,
      },
      to: {
        path: '^src/frameworks(?:/|$)',
      },
    },
    {
      name: 'no-circular-dependencies',
      severity: 'error',
      comment:
        'Protects every production module, including the composition root, from cycles that obscure dependency direction and initialization order.',
      from: {
        path: '^src(?:/|$)',
      },
      to: {
        path: '^src(?:/|$)',
        circular: true,
      },
    },
  ],
  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    includeOnly: {
      path: '^src(?:/|$)',
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.json',
    },
  },
};

module.exports = config;

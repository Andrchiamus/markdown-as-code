import { TypeScriptNpmPackage } from '@ally-murray/projen-modules';
import { createReadme } from './scripts/create-readme.js';

const project = new TypeScriptNpmPackage({
  name: 'markdown-as-code',
  description: 'Define and maintain markdown files through code.',
  authorName: 'Ally Murray',
  authorEmail: 'allymurray88@gmail.com',
  defaultReleaseBranch: 'main',
  deps: ['change-case'],
  devDeps: ['@ally-murray/projen-modules', 'ts-jest-resolver'],
  jestOptions: {
    jestConfig: {
      resolver: 'ts-jest-resolver',
    },
  },
});

if (project.jest) {
  project.jest.config.globals = {
    ...project.jest.config.globals,
    'ts-jest': {
      ...project.jest.config.globals['ts-jest'],
      useESM: true,
    },
  };
}

project.synth();

createReadme({ ourDir: project.outdir });

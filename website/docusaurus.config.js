const repository = process.env.GITHUB_REPOSITORY || '';
const [repositoryOwner, repositoryName] = repository.split('/');
const organizationName = process.env.GITHUB_REPOSITORY_OWNER || repositoryOwner || 'bit-spec';
const projectName = repositoryName || 'bit-spec';
const isUserSite = projectName.toLowerCase() === `${organizationName.toLowerCase()}.github.io`;

const url = process.env.DOCUSAURUS_URL || process.env.GITHUB_PAGES_URL || `https://${organizationName}.github.io`;
const configuredBaseUrl = process.env.DOCUSAURUS_BASE_URL;
const inferredBaseUrl = isUserSite ? '/' : `/${projectName}/`;
const baseUrl = (configuredBaseUrl || inferredBaseUrl).replace(/\/?$/, '/');
const githubUrl = `https://github.com/${organizationName}/${projectName}`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Bit Specification',
  tagline: 'A portable language and a verifiable intermediate representation',
  url,
  baseUrl,
  organizationName,
  projectName,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  presets: [
    [
      'classic',
      {
        docs: {
          path: '../',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          include: [
            'index.md',
            'architecture/**/*.md',
            'design/**/*.md',
            'spec/**/*.md',
            'rfcs/**/*.md',
            'guides/**/*.md',
            'glossary/**/*.md',
            'decisions/**/*.md',
            'conformance/**/*.md',
            'history/**/*.md'
          ],
          exclude: ['website/**', '**/node_modules/**'],
          showLastUpdateAuthor: false,
          showLastUpdateTime: false
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ],

  themeConfig: {
    navbar: {
      title: 'Bit Spec',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation'
        },
        {
          href: githubUrl,
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Specification',
          items: [
            { label: 'Language', to: '/docs/spec/bit/language' },
            { label: 'BIR', to: '/docs/spec/bir/overview' },
            { label: 'Architecture', to: '/docs/architecture/overview' }
          ]
        },
        {
          title: 'Project',
          items: [
            { label: 'RFC process', to: '/docs/rfcs/rfc-process' },
            { label: 'GitHub', href: githubUrl }
          ]
        }
      ],
      copyright: `Bit Specification - ${new Date().getFullYear()}`
    },
    prism: {
          additionalLanguages: ['bash']
    }
  }
};

module.exports = config;

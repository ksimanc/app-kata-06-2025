import { db } from './index';
import { Applications, Computers } from './schema';

export async function seedComputers() {
  await db.insert(Computers).values([
    {
      model: 'MacBook Pro 14"',
      serialNumber: 'MBP14-2023-001',
      status: 'available',
      specifications: {
        processor: 'M2 Pro',
        ram: '16GB',
        storage: '512GB SSD',
        year: 2023,
      },
    },
    {
      model: 'MacBook Pro 16"',
      serialNumber: 'MBP16-2023-001',
      status: 'available',
      specifications: {
        processor: 'M2 Max',
        ram: '32GB',
        storage: '1TB SSD',
        year: 2023,
      },
    },
    {
      model: 'Dell XPS 13',
      serialNumber: 'XPS13-2023-001',
      status: 'available',
      specifications: {
        processor: 'Intel i7 13th Gen',
        ram: '32GB',
        storage: '1TB SSD',
        year: 2023,
      },
    },
    {
      model: 'Dell XPS 15',
      serialNumber: 'XPS15-2023-001',
      status: 'available',
      specifications: {
        processor: 'Intel i9 13th Gen',
        ram: '64GB',
        storage: '2TB SSD',
        year: 2023,
      },
    },
    {
      model: 'ThinkPad X1 Carbon',
      serialNumber: 'X1C-2023-001',
      status: 'maintenance',
      specifications: {
        processor: 'Intel i7 13th Gen',
        ram: '16GB',
        storage: '512GB SSD',
        year: 2023,
      },
    },
    {
      model: 'ThinkPad P1',
      serialNumber: 'P1-2023-001',
      status: 'available',
      specifications: {
        processor: 'Intel i9 13th Gen',
        ram: '64GB',
        storage: '2TB SSD',
        year: 2023,
      },
    },
    {
      model: 'HP EliteBook 840',
      serialNumber: 'EB840-2023-001',
      status: 'available',
      specifications: {
        processor: 'Intel i7 13th Gen',
        ram: '32GB',
        storage: '1TB SSD',
        year: 2023,
      },
    },
    {
      model: 'HP ZBook Studio',
      serialNumber: 'ZBS-2023-001',
      status: 'available',
      specifications: {
        processor: 'Intel i9 13th Gen',
        ram: '64GB',
        storage: '2TB SSD',
        year: 2023,
      },
    },
    {
      model: 'MacBook Air',
      serialNumber: 'MBA-2023-001',
      status: 'available',
      specifications: {
        processor: 'M2',
        ram: '16GB',
        storage: '512GB SSD',
        year: 2023,
      },
    },
    {
      model: 'Dell Precision 5570',
      serialNumber: 'DP5570-2023-001',
      status: 'available',
      specifications: {
        processor: 'Intel i7 13th Gen',
        ram: '32GB',
        storage: '1TB SSD',
        year: 2023,
      },
    },
  ]);
}

export async function seedApplications() {
  await db.insert(Applications).values([
    // Developer Applications
    {
      name: 'GitHub Enterprise',
      description: 'Code repository and version control system',
      requiredRole: 'Developer',
    },
    {
      name: 'Visual Studio Code',
      description: 'Integrated development environment',
      requiredRole: 'Developer',
    },
    {
      name: 'IntelliJ IDEA',
      description: 'Java development environment',
      requiredRole: 'Developer',
    },

    // Tester Applications
    {
      name: 'Selenium Grid',
      description: 'Automated testing platform',
      requiredRole: 'Tester',
    },
    {
      name: 'TestRail',
      description: 'Test case management system',
      requiredRole: 'Tester',
    },
    {
      name: 'JMeter',
      description: 'Performance testing tool',
      requiredRole: 'Tester',
    },

    // Product Owner Applications
    {
      name: 'Jira',
      description: 'Project management and issue tracking system',
      requiredRole: 'Product Owner',
    },
    {
      name: 'Aha!',
      description: 'Product roadmap software',
      requiredRole: 'Product Owner',
    },
    {
      name: 'ProductPlan',
      description: 'Product planning and roadmap tool',
      requiredRole: 'Product Owner',
    },

    // Agile Coach Applications
    {
      name: 'Miro',
      description: 'Online collaborative whiteboard platform',
      requiredRole: 'Agile Coach',
    },
    {
      name: 'Retrium',
      description: 'Agile retrospective tool',
      requiredRole: 'Agile Coach',
    },

    // DevOps Applications
    {
      name: 'Jenkins',
      description: 'Continuous Integration/Continuous Deployment platform',
      requiredRole: 'DevOps',
    },
    {
      name: 'Kubernetes Dashboard',
      description: 'Container orchestration platform UI',
      requiredRole: 'DevOps',
    },
    {
      name: 'Grafana',
      description: 'Metrics visualization and monitoring',
      requiredRole: 'DevOps',
    },

    // UX/UI Applications
    {
      name: 'Figma',
      description: 'Design and prototyping tool',
      requiredRole: 'UX/UI',
    },
    {
      name: 'Adobe Creative Cloud',
      description: 'Suite of design tools including Photoshop and Illustrator',
      requiredRole: 'UX/UI',
    },
    {
      name: 'Sketch',
      description: 'Digital design toolkit',
      requiredRole: 'UX/UI',
    },

    // Applications with no role requirement
    {
      name: 'Slack',
      description: 'Team communication platform',
    },
    {
      name: 'Microsoft Office 365',
      description: 'Office productivity suite',
    },
    {
      name: 'Zoom',
      description: 'Video conferencing platform',
    },
    {
      name: 'Google Workspace',
      description: 'Cloud-based productivity and collaboration tools',
    },
    {
      name: 'LastPass',
      description: 'Password management system',
    },
  ]);
}

export async function seed() {
  try {
    await seedComputers();
    await seedApplications();
    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  }
}

import { db } from './index';
import { Apps, Computers, Users } from './schema';

async function seedComputers() {
  // Check if computers table is empty
  const existingComputers = await db.select().from(Computers).limit(1);

  if (existingComputers.length > 0) {
    console.log('Computers table already has data, skipping seed');
    return;
  }

  await db.insert(Computers).values([
    {
      model: 'MacBook Pro 14"',
      serialNumber: 'MBP14-2023-001',
      status: 'Disponible',
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
      status: 'Disponible',
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
      status: 'Disponible',
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
      status: 'Disponible',
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
      status: 'En mantenimiento',
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
      status: 'Disponible',
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
      status: 'Disponible',
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
      status: 'Disponible',
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
      status: 'Disponible',
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
      status: 'Disponible',
      specifications: {
        processor: 'Intel i7 13th Gen',
        ram: '32GB',
        storage: '1TB SSD',
        year: 2023,
      },
    },
  ]);
}

async function seedApps() {
  // Check if apps table is empty
  const existingApps = await db.select().from(Apps).limit(1);

  if (existingApps.length > 0) {
    console.log('Apps table already has data, skipping seed');
    return;
  }

  await db.insert(Apps).values([
    // Developer Apps
    {
      name: 'GitHub Enterprise',
      description: 'Code repository and version control system',
      requiredRole: 'Desarrollador',
    },
    {
      name: 'Visual Studio Code',
      description: 'Integrated development environment',
      requiredRole: 'Desarrollador',
    },
    {
      name: 'IntelliJ IDEA',
      description: 'Java development environment',
      requiredRole: 'Desarrollador',
    },

    // Tester Apps
    {
      name: 'Selenium Grid',
      description: 'Automated testing platform',
      requiredRole: 'Analista de Calidad',
    },
    {
      name: 'TestRail',
      description: 'Test case management system',
      requiredRole: 'Analista de Calidad',
    },
    {
      name: 'JMeter',
      description: 'Performance testing tool',
      requiredRole: 'Analista de Calidad',
    },

    // Product Owner Apps
    {
      name: 'Jira',
      description: 'Project management and issue tracking system',
      requiredRole: 'Gestor de Producto',
    },
    {
      name: 'Aha!',
      description: 'Product roadmap software',
      requiredRole: 'Gestor de Producto',
    },
    {
      name: 'ProductPlan',
      description: 'Product planning and roadmap tool',
      requiredRole: 'Gestor de Producto',
    },

    // Agile Coach Apps
    {
      name: 'Miro',
      description: 'Online collaborative whiteboard platform',
      requiredRole: 'Agilista',
    },
    {
      name: 'Retrium',
      description: 'Agile retrospective tool',
      requiredRole: 'Agilista',
    },

    // DevOps Apps
    {
      name: 'Jenkins',
      description: 'Continuous Integration/Continuous Deployment platform',
      requiredRole: 'Ingeniero(a) DevOps',
    },
    {
      name: 'Kubernetes Dashboard',
      description: 'Container orchestration platform UI',
      requiredRole: 'Ingeniero(a) DevOps',
    },
    {
      name: 'Grafana',
      description: 'Metrics visualization and monitoring',
      requiredRole: 'Ingeniero(a) DevOps',
    },

    // UX/UI Apps
    {
      name: 'Figma',
      description: 'Design and prototyping tool',
      requiredRole: 'Diseñador(a) de Experiencia',
    },
    {
      name: 'Adobe Creative Cloud',
      description: 'Suite of design tools including Photoshop and Illustrator',
      requiredRole: 'Diseñador(a) de Experiencia',
    },
    {
      name: 'Sketch',
      description: 'Digital design toolkit',
      requiredRole: 'Diseñador(a) de Experiencia',
    },

    // Apps with no role requirement
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

async function seedUsers() {
  // Check if users table is empty
  const existingUsers = await db.select().from(Users).limit(1);

  if (existingUsers.length > 0) {
    console.log('Users table already has data, skipping seed');
    return;
  }

  await db.insert(Users).values([
    {
      name: 'Juan Pérez',
      email: 'juan.perez@katabank.com',
      area: 'Tecnología',
      role: 'Desarrollador',
      status: 'Aprobado',
    },
    {
      name: 'Ana Martínez',
      email: 'ana.martinez@katabank.com',
      area: 'QA',
      role: 'Analista de Calidad',
      status: 'Aprobado',
    },
    {
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@katabank.com',
      area: 'Producto',
      role: 'Gestor de Producto',
      status: 'Aprobado',
    },
    {
      name: 'María González',
      email: 'maria.gonzalez@katabank.com',
      area: 'Transformación',
      role: 'Agilista',
      status: 'Aprobado',
    },
    {
      name: 'Diego López',
      email: 'diego.lopez@katabank.com',
      area: 'Infraestructura',
      role: 'Ingeniero(a) DevOps',
      status: 'Aprobado',
    },
    {
      name: 'Laura Torres',
      email: 'laura.torres@katabank.com',
      area: 'Diseño',
      role: 'Diseñador(a) de Experiencia',
      status: 'Aprobado',
    },
    {
      name: 'Andrés Sánchez',
      email: 'andres.sanchez@katabank.com',
      area: 'Tecnología',
      role: 'Desarrollador',
      status: 'Aprobado',
    },
    {
      name: 'Sofia Ramírez',
      email: 'sofia.ramirez@katabank.com',
      area: 'QA',
      role: 'Analista de Calidad',
      status: 'Pendiente',
    },
    {
      name: 'Daniel Morales',
      email: 'daniel.morales@katabank.com',
      area: 'Infraestructura',
      role: 'Ingeniero(a) DevOps',
      status: 'Rechazado',
    },
    {
      name: 'Carmen Vargas',
      email: 'carmen.vargas@katabank.com',
      area: 'Diseño',
      role: 'Diseñador(a) de Experiencia',
      status: 'Pendiente',
    },
  ]);
}

export async function seed() {
  try {
    await seedComputers();
    await seedApps();
    await seedUsers();
    console.log('Seed process completed');
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  }
}

// Run seed when this file is executed directly
// Using CommonJS, so check if this is the main module
if (require.main === module) {
  seed();
}

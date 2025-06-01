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
      description: 'Sistema de control de versiones y repositorio de código',
      requiredRole: 'Desarrollador',
    },
    {
      name: 'Visual Studio Code',
      description: 'Entorno de desarrollo integrado',
      requiredRole: 'Desarrollador',
    },
    {
      name: 'IntelliJ IDEA',
      description: 'Entorno de desarrollo para Java',
      requiredRole: 'Desarrollador',
    },

    // Tester Apps
    {
      name: 'Selenium Grid',
      description: 'Plataforma de pruebas automatizadas',
      requiredRole: 'Analista de Calidad',
    },
    {
      name: 'TestRail',
      description: 'Sistema de gestión de casos de prueba',
      requiredRole: 'Analista de Calidad',
    },
    {
      name: 'JMeter',
      description: 'Herramienta de pruebas de rendimiento',
      requiredRole: 'Analista de Calidad',
    },

    // Product Owner Apps
    {
      name: 'Jira',
      description: 'Sistema de gestión de proyectos y seguimiento de incidencias',
      requiredRole: 'Gestor de Producto',
    },
    {
      name: 'Aha!',
      description: 'Software de planificación de producto',
      requiredRole: 'Gestor de Producto',
    },
    {
      name: 'ProductPlan',
      description: 'Herramienta de planificación y hoja de ruta de productos',
      requiredRole: 'Gestor de Producto',
    },

    // Agile Coach Apps
    {
      name: 'Miro',
      description: 'Plataforma colaborativa de pizarra virtual',
      requiredRole: 'Agilista',
    },
    {
      name: 'Retrium',
      description: 'Herramienta para retrospectivas ágiles',
      requiredRole: 'Agilista',
    },

    // DevOps Apps
    {
      name: 'Jenkins',
      description: 'Plataforma de Integración Continua y Despliegue Continuo',
      requiredRole: 'Ingeniero(a) DevOps',
    },
    {
      name: 'Kubernetes Dashboard',
      description: 'Interfaz de usuario para plataforma de orquestación de contenedores',
      requiredRole: 'Ingeniero(a) DevOps',
    },
    {
      name: 'Grafana',
      description: 'Visualización y monitoreo de métricas',
      requiredRole: 'Ingeniero(a) DevOps',
    },

    // UX/UI Apps
    {
      name: 'Figma',
      description: 'Herramienta de diseño y prototipado',
      requiredRole: 'Diseñador(a) de Experiencia',
    },
    {
      name: 'Adobe Creative Cloud',
      description: 'Suite de herramientas de diseño que incluye Photoshop e Illustrator',
      requiredRole: 'Diseñador(a) de Experiencia',
    },
    {
      name: 'Sketch',
      description: 'Kit de herramientas de diseño digital',
      requiredRole: 'Diseñador(a) de Experiencia',
    },

    // Apps with no role requirement
    {
      name: 'Slack',
      description: 'Plataforma de comunicación en equipo',
    },
    {
      name: 'Microsoft Office 365',
      description: 'Suite de productividad de oficina',
    },
    {
      name: 'Zoom',
      description: 'Plataforma de videoconferencias',
    },
    {
      name: 'Google Workspace',
      description: 'Herramientas de productividad y colaboración en la nube',
    },
    {
      name: 'LastPass',
      description: 'Sistema de gestión de contraseñas',
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

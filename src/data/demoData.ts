import { Project, AboutData, ResumeData, ContactInfo } from '@/types/portfolio';

export const demoProjects: Project[] = [
  {
    id: '1',
    title: 'Sci-Fi Power Core',
    description: 'A high-tech power core prop designed for futuristic game environments. Features intricate mechanical details and emissive elements for dramatic lighting effects.',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    images: {
      rendered: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
      wireframe: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      uv: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop',
    },
    specs: {
      polyCount: 12500,
      vertexCount: 8200,
      texelDensity: '512 px/m',
      materialSlots: 3,
      textureResolution: '4K',
      fileSize: '45 MB',
    },
    software: ['Blender', 'Substance Painter', 'Marmoset Toolbag'],
    category: 'Props',
    createdAt: '2024-01-15',
    process: 'Started with concept sketches, blocked out basic shapes in Blender, refined topology for game-ready mesh, created high-poly for baking, textured in Substance Painter with custom smart materials.',
  },
  {
    id: '2',
    title: 'Medieval Treasure Chest',
    description: 'An ornate treasure chest with weathered wood textures and metallic hardware. Perfect for RPG inventory systems or dungeon environments.',
    thumbnail: 'https://images.unsplash.com/photo-1579783483458-83d02f0a1c0a?w=400&h=300&fit=crop',
    images: {
      rendered: 'https://images.unsplash.com/photo-1579783483458-83d02f0a1c0a?w=800&h=600&fit=crop',
      wireframe: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      uv: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop',
    },
    specs: {
      polyCount: 4200,
      vertexCount: 3100,
      texelDensity: '1024 px/m',
      materialSlots: 2,
      textureResolution: '2K',
      fileSize: '18 MB',
    },
    software: ['ZBrush', 'Blender', 'Substance Painter'],
    category: 'Props',
    createdAt: '2024-02-20',
    process: 'Sculpted wood grain details in ZBrush, retopologized in Blender for optimal game performance, hand-painted wear and tear details in Substance Painter.',
  },
  {
    id: '3',
    title: 'Cyberpunk Vending Machine',
    description: 'A neon-lit vending machine with holographic displays and futuristic branding. Designed for cyberpunk urban environments.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
    images: {
      rendered: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
      wireframe: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      uv: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop',
    },
    specs: {
      polyCount: 8900,
      vertexCount: 6200,
      texelDensity: '768 px/m',
      materialSlots: 4,
      textureResolution: '4K',
      fileSize: '62 MB',
    },
    software: ['Blender', 'Substance Painter', 'Photoshop'],
    category: 'Environment',
    createdAt: '2024-03-10',
    process: 'Hard-surface modeled in Blender using boolean operations, created custom decals and holographic materials, added emissive maps for neon lighting effects.',
  },
];

export const demoAboutData: AboutData = {
  bio: `I'm Utibe Ebong, a passionate 3D Prop Artist with over 5 years of experience creating immersive game assets. My journey began with a fascination for video game worlds and has evolved into a career crafting the objects that bring those worlds to life.

I specialize in creating game-ready props that balance visual fidelity with technical optimization. From sci-fi gadgets to medieval artifacts, I love the challenge of telling stories through objects.

When I'm not modeling, you can find me exploring game art communities, experimenting with new techniques, or breaking down the props in my favorite games to understand what makes them work.`,
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  experiences: [
    {
      id: '1',
      title: 'Senior 3D Prop Artist',
      company: 'Nexus Game Studios',
      location: 'Remote',
      startDate: '2022-01',
      endDate: 'Present',
      description: 'Lead prop artist for AAA action RPG project',
      achievements: [
        'Created over 200 game-ready props for flagship title',
        'Established prop art pipeline and style guide',
        'Mentored junior artists on optimization techniques',
      ],
    },
    {
      id: '2',
      title: '3D Artist',
      company: 'Indie Game Collective',
      location: 'Lagos, Nigeria',
      startDate: '2019-06',
      endDate: '2021-12',
      description: 'General 3D artist for indie game projects',
      achievements: [
        'Delivered assets for 3 shipped indie titles',
        'Reduced average prop poly count by 40% while maintaining quality',
        'Collaborated with art directors on visual development',
      ],
    },
  ],
  skills: [
    { id: '1', name: 'Blender', level: 95, category: 'software' },
    { id: '2', name: 'ZBrush', level: 85, category: 'software' },
    { id: '3', name: 'Substance Painter', level: 90, category: 'software' },
    { id: '4', name: 'Maya', level: 75, category: 'software' },
    { id: '5', name: 'Marmoset Toolbag', level: 80, category: 'software' },
    { id: '6', name: 'UV Mapping', level: 90, category: 'skill' },
    { id: '7', name: 'PBR Texturing', level: 92, category: 'skill' },
    { id: '8', name: 'Hard Surface Modeling', level: 88, category: 'skill' },
    { id: '9', name: 'Sculpting', level: 82, category: 'skill' },
  ],
};

export const demoResumeData: ResumeData = {
  education: [
    {
      id: '1',
      degree: 'Bachelor of Fine Arts in Digital Media',
      institution: 'Lagos State University',
      location: 'Lagos, Nigeria',
      startDate: '2015',
      endDate: '2019',
      description: 'Specialized in 3D modeling and game art with honors',
    },
  ],
  experiences: demoAboutData.experiences,
  skills: demoAboutData.skills,
  certifications: [
    'Unreal Engine Certified Developer',
    'Substance Painter Masterclass Certificate',
    'CGMA Hard Surface Modeling',
  ],
};

export const demoContactInfo: ContactInfo = {
  email: 'utibe.ebong@example.com',
  phone: '+234 7071486994',
  location: 'Lagos, Nigeria',
  social: {
    artstation: 'https://www.artstation.com/captionstudioz2',
    linkedin: 'https://www.linkedin.com/in/utibe-ebong-3d-artist?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
  },
};

export const ADMIN_PASSCODE = '1802993'; // In production, this should be more secure

export const demoTools = [
  { id: 't1', name: 'Blender', ver: 'v4.0', desc: 'Open-source 3D creation suite.', url: 'https://www.blender.org/', actionLabel: 'Visit' },
  { id: 't2', name: 'ZBrush', ver: 'v2024', desc: 'Industry-standard sculpting tool.', url: 'https://pixologic.com/zbrush/', actionLabel: 'Visit' },
  { id: 't3', name: 'Substance Painter', ver: 'v8.4', desc: 'PBR texturing workflow.', url: 'https://www.substance3d.com/products/substance-painter', actionLabel: 'Visit' },
  { id: 't4', name: 'Maya', ver: 'v2024', desc: 'DCC for animation and modeling.', url: 'https://www.autodesk.com/products/maya/', actionLabel: 'Visit' },
  { id: 't5', name: 'Marmoset', ver: 'v5.0', desc: 'Real-time rendering toolkit.', url: 'https://marmoset.co/toolbag', actionLabel: 'Visit' },
  { id: 't6', name: 'Unreal Engine', ver: 'v5', desc: 'Real-time engine for visualization.', url: 'https://www.unrealengine.com/', actionLabel: 'Visit' },
];

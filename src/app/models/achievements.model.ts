export const enum ACHIEVEMENT_LOCAL_STORAGE_KEYS {
  GLOBAL = 'global_achievements',
  HEART_UNIQUE_MESSAGE = 'heart_unique_message_achievements',
}

export const enum ACHIEVEMENT_ID {
  // HEART INTERACTIONS
  HEART_GAZER_20 = 'heartGazer20',
  HEART_WATCHER_40 = 'heartWatcher40',
  HEART_ADMIRER_60 = 'heartAdmirer60',
  HEART_OBSESSED_80 = 'heartObsessed80',
  HEART_ENTHUSIAST_100 = 'heartEnthusiast100',

  // UNIQUE HEART MESSAGES READ
  WHISPERS_OF_LOVE = 'whispersOfLove',
  HEARTFELT_DISCOVERER = 'heartfeltDiscoverer',
  EMPATHETIC_EXPLORER = 'empatheticExplorer',
  SOULFUL_SCHOLAR = 'soulfulScholar',
  HEART_MESSAGE_MANIAC = 'heartMessageManiac',

  // GRAPH GENERATION & CREATION
  RANDOM_CRAFTER_20 = 'randomCrafter20',
  CHAOS_ARCHITECT_40 = 'chaosArchitect40',
  GENERATOR_GURU_60 = 'generatorGuru60',
  INFINITY_WEAVER_80 = 'infinityWeaver80',
  GRAPH_GOD_100 = 'graphGod100',

  // LOCAL SAVE
  LOCAL_HERO = 'localHero',

  // CREATING NODES/EDGES
  NODE_WHISPERER = 'nodeWhisperer',
  EDGE_LORD = 'edgeLord',

  // ALGORITHM RUNS
  ALGOHOLIC = 'algoholic',
  THE_TRAVERSER = 'theTraverser',
  SHORTEST_ROMANTIC = 'shortestRomantic',
  TREE_HUGGER = 'treeHugger',

  // DELETION MASTERY
  SHIFT_STRIKER = 'shiftStriker',
  EDGE_ASSASSIN = 'edgeAssassin',

  // MISCHIEVOUS BEHAVIOR
  GRAPH_CHAOS_AGENT = 'graphChaosAgent',
  ZOOM_ZOOM = 'zoomZoom',
  LATE_NIGHT_DEBUGGER = 'lateNightDebugger',

  // SECRET INTERACTIONS
  KONAMI_NODE = 'konamiNode',
  HEART_OF_GRAPS_COMBO = 'heartOfGrapsCombo',

  // META DISCOVERY
  WHATS_BEHIND_THE_JSON = 'whatsBehindTheJson',
  YOU_FOUND_ME = 'youFoundMe',
}
export const enum ACHIEVEMENT_CATEGORY {
  HEART_HOVER = 'heart_hover',
  UNIQUE_HEART_MESSAGES = 'unique_heart_messages',
  RANDOM_GENERATOR = 'random_generator',
  LOCAL_SAVE = 'local_save',
  EDGE_CREATOR = 'edge_creator',
  NODE_CREATOR = 'node_creator',
  ALGORITHM_RUN = 'algorithm_run',

  ALGORITHM_COMBO = 'algorithm_combo', // For combining multiple algorithms
  NODE_DELETION = 'node_deletion',
  EDGE_DELETION = 'edge_deletion',
  MISCHIEVOUS = 'mischievous',       // For quirky/unusual actions
  SECRET_INTERACTIONS = 'secret_interactions', // For Konami code, Heart of GRAPS combo
  META = 'meta_discovery'            // For finding hidden stuff or external interaction
}

export interface CategoryInfo {
  name: string;
  description: string;
}

export interface AchievementCriteria {
  type?: 'count' | 'sequence' | 'combo' | 'boolean' | 'custom' | 'runAlgorithm';
  ranAlgorithms?: Partial<Record<'DFS' | 'BFS' | 'Dijkstra' | 'Kruskal' | 'Prim' | 'AllPaths' | 'Eades' | 'ShortLongPathsDFS', boolean>>;
  zoomHistory?: any;
  sequence?: any;
  hovered?: any;
  clicks?: number;
  algRan?: boolean;
  target?: number;
  details?: any;
}

export interface Achievement {
  id: ACHIEVEMENT_ID;
  name: string;
  description: string;
  criteria: AchievementCriteria;
  isUnlocked: boolean;
  progress?: number;
  unlockedOn?: string;
  category: ACHIEVEMENT_CATEGORY
}

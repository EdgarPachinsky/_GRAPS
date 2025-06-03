import {Achievement, ACHIEVEMENT_CATEGORY, ACHIEVEMENT_ID, CategoryInfo} from "../models/achievements.model";

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  // PROGRESSION for Heart Icon Hovers ONLY
  { id: ACHIEVEMENT_ID.HEART_GAZER_20, name: 'Heart Gazer (20) 💖', description: "You've truly been touched! Hovered the heart icon 20 times.", criteria: { type: 'count', target: 20 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.HEART_HOVER },
  { id: ACHIEVEMENT_ID.HEART_WATCHER_40, name: 'Heart Watcher (40) ❤️', description: "Still staring at that heart? You've hovered it 40 times now!", criteria: { type: 'count', target: 40 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.HEART_HOVER },
  { id: ACHIEVEMENT_ID.HEART_ADMIRER_60, name: 'Heart Admirer (60) 💕', description: "Your devotion is noted! 60 hovers on the heart icon and counting!", criteria: { type: 'count', target: 60 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.HEART_HOVER },
  { id: ACHIEVEMENT_ID.HEART_OBSESSED_80, name: 'Heart Obsessed (80) 💞', description: "Okay, you might need a break. 80 times hovering the heart!", criteria: { type: 'count', target: 80 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.HEART_HOVER },
  { id: ACHIEVEMENT_ID.HEART_ENTHUSIAST_100, name: 'Heart Enthusiast (100) 💓', description: "A true heart whisperer! 100 hovers, you're practically family.", criteria: { type: 'count', target: 100 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.HEART_HOVER },

  // PROGRESSION for Unique Heart Messages Read
  { id: ACHIEVEMENT_ID.WHISPERS_OF_LOVE, name: 'Whispers of Love (20) 💖', description: "Uncovered 20 unique sentiments hidden within the heart. What secrets lie within?", criteria: { type: 'count',target: 20 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.UNIQUE_HEART_MESSAGES },
  { id: ACHIEVEMENT_ID.HEARTFELT_DISCOVERER, name: 'Heartfelt Discoverer (40) 💫', description: "Revealed 40 distinct insights from the depths of the heart. Keep digging!", criteria: { type: 'count', target: 40 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.UNIQUE_HEART_MESSAGES },
  { id: ACHIEVEMENT_ID.EMPATHETIC_EXPLORER, name: 'Empathetic Explorer (60) ✨', description: "Journeyed through 60 unique expressions found in the heart. Are you sure you're not a mind reader?", criteria: { type: 'count', target: 60 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.UNIQUE_HEART_MESSAGES },
  { id: ACHIEVEMENT_ID.SOULFUL_SCHOLAR, name: 'Soulful Scholar (80) 💡', description: "Deciphered 80 hidden wisdoms radiating from the heart. You're practically fluent!", criteria: { type: 'count', target: 80 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.UNIQUE_HEART_MESSAGES },
  { id: ACHIEVEMENT_ID.HEART_MESSAGE_MANIAC, name: 'Heart Message Maniac (100) 🤯', description: "Master of mysteries! You've read ALL 100 unique messages from the heart! Go touch some grass.", criteria: { type: 'count', target: 100 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.UNIQUE_HEART_MESSAGES },

  // GRAPH GENERATION & CREATION //
  // PROGRESSION for random graph generation
  { id: ACHIEVEMENT_ID.RANDOM_CRAFTER_20, name: 'Random Crafter (20) 🎲', description: "Summoned 20 unique random graphs into existence. Feeling lucky?", criteria: { type: 'count', target: 20 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.RANDOM_GENERATOR },
  { id: ACHIEVEMENT_ID.CHAOS_ARCHITECT_40, name: 'Chaos Architect (40) 🌀', description: "Mastered the art of randomness by generating 40 graphs. Controlled chaos, delightful!", criteria: { type: 'count', target: 40 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.RANDOM_GENERATOR },
  { id: ACHIEVEMENT_ID.GENERATOR_GURU_60, name: 'Generator Guru (60) ✨', description: "Achieved enlightenment by creating 60 diverse random graph structures. Who needs a plan?", criteria: { type: 'count', target: 60 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.RANDOM_GENERATOR },
  { id: ACHIEVEMENT_ID.INFINITY_WEAVER_80, name: 'Infinity Weaver (80) 🌌', description: "Tapped into the endless possibilities, generating 80 random graphs. The universe is yours!", criteria: { type: 'count', target: 80 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.RANDOM_GENERATOR },
  { id: ACHIEVEMENT_ID.GRAPH_GOD_100, name: 'Graph God (100) 👑', description: "The ultimate creator! You've generated 100 random graphs, shaping digital destiny! Bow down.", criteria: { type: 'count', target: 100 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.RANDOM_GENERATOR },

  // PROGRESSION for local save
  { id: ACHIEVEMENT_ID.LOCAL_HERO, name: 'Local Hero 💾', description: "You're a data hoarder! Saved 10 graphs to local storage, just in case.", criteria: { type: 'count', target: 10 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.LOCAL_SAVE},

  // PROGRESSION for creating
  { id: ACHIEVEMENT_ID.NODE_WHISPERER, name: 'Node Whisperer 🌱', description: "You talk to nodes, and they listen! Created 100,000 nodes, a true population boom.", criteria: { type: 'count', target: 100000 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.NODE_CREATOR },
  // TODO: after fixing edges when generating random edges fix this
  // { id: ACHIEVEMENT_ID.EDGE_LORD, name: 'Edge Lord 🧷', description: "Lord of the connections! You've forged 100,000 edges. Are you building a web?", criteria: { target: 100000 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.EDGE_CREATOR },

  // ALGORITHM RUNS //
  // PROGRESSION for algorithm run (all algorithms at least once)
  { id: ACHIEVEMENT_ID.ALGOHOLIC, name: 'Algoholic 📊', description: "You've got the bug! Ran all algorithms at least once. Now for the hard part: remembering them all.", criteria: { type: 'runAlgorithm', ranAlgorithms: { DFS: false, BFS: false, Dijkstra: false, Kruskal: false, Prim: false, AllPaths: false, Eades: false, ShortLongPathsDFS: false } }, isUnlocked: false , category: ACHIEVEMENT_CATEGORY.ALGORITHM_RUN},

  // Algorithm Combinations
  { id: ACHIEVEMENT_ID.THE_TRAVERSER, name: 'Pathfinder Duo 🤝', description: "You've proven your versatility! Ran both BFS and DFS to explore the graph. No stone unturned!", criteria: { type:'runAlgorithm', ranAlgorithms: { BFS: false, DFS: false } }, isUnlocked: false, category: ACHIEVEMENT_CATEGORY.ALGORITHM_COMBO },
  { id: ACHIEVEMENT_ID.SHORTEST_ROMANTIC, name: 'Love at First Path 💘', description: "Who needs a map? You ran Dijkstra for the ultimate shortest path!", criteria: { type:'runAlgorithm', ranAlgorithms: { Dijkstra: false } }, isUnlocked: false, category: ACHIEVEMENT_CATEGORY.ALGORITHM_COMBO },
  { id: ACHIEVEMENT_ID.TREE_HUGGER, name: 'Minimalist Forest Ranger 🌳', description: "You cherish efficiency! Explored both Prim's and Kruskal's for the perfect minimal trees. No branches left behind!", criteria: { ranAlgorithms: { Prim: false, Kruskal: false } }, isUnlocked: false, category: ACHIEVEMENT_CATEGORY.ALGORITHM_COMBO },

  // DELETION MASTERY //
  { id: ACHIEVEMENT_ID.SHIFT_STRIKER, name: 'Demolitionist Dexterity 💥', description: "With a shift and a click, you've precise-demolished 1000 nodes! Watch out, graph, they're coming for you!", criteria: { type: 'count', target: 1000 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.NODE_DELETION },
  { id: ACHIEVEMENT_ID.EDGE_ASSASSIN, name: 'Cutting Edge Master 🗡️', description: "A true blade runner! You've expertly sliced 1000 edges from existence. No loose ends!", criteria: { type: 'count', target: 1000 }, isUnlocked: false, progress: 0, category: ACHIEVEMENT_CATEGORY.EDGE_DELETION },

  // MISCHIEVOUS BEHAVIOR //
  // { id: ACHIEVEMENT_ID.GRAPH_CHAOS_AGENT, name: 'Existential Crisis Creator 🕳️', description: 'You stared into the abyss... and created a graph with literally nothing in it. Impressive, or just nihilistic?', criteria: {}, isUnlocked: false, category: ACHIEVEMENT_CATEGORY.MISCHIEVOUS },
  // { id: ACHIEVEMENT_ID.ZOOM_ZOOM, name: 'Gotta Go Fast! 🏎️💨', description: "Whoosh! You zoomed in/out 20 times in a flash, probably trying to escape your responsibilities.", criteria: { zoomHistory: [] }, isUnlocked: false, category: ACHIEVEMENT_CATEGORY.MISCHIEVOUS },
  // { id: ACHIEVEMENT_ID.LATE_NIGHT_DEBUGGER, name: 'Owl\'s Watcher 🦉🌙', description: "Still building graphs when the wise owls are active. Dedication, or sheer insomnia?", criteria: {}, isUnlocked: false, category: ACHIEVEMENT_CATEGORY.MISCHIEVOUS },

  // SECRET INTERACTIONS //
  // { id: ACHIEVEMENT_ID.KONAMI_NODE, name: 'The Secret Handshake 🤫', description: "You know the ancient ways! Entered a forbidden sequence to unlock this secret. Are you a hacker?", criteria: { sequence: [] }, isUnlocked: false, category: ACHIEVEMENT_CATEGORY.SECRET_INTERACTIONS },
  // { id: ACHIEVEMENT_ID.HEART_OF_GRAPS_COMBO, name: 'The GRAPS Whisperer ❤️‍🔥', description: "You've truly connected with the heart of GRAPS: a delicate dance of hover, click, and algorithm! Magical!", criteria: { hovered: false, clicks: 0, algRan: false }, isUnlocked: false, category: ACHIEVEMENT_CATEGORY.SECRET_INTERACTIONS },

  // META DISCOVERY //
  // { id: ACHIEVEMENT_ID.WHATS_BEHIND_THE_JSON, name: 'Digital Architect\'s Touch ✏️', description: "You dared to modify the raw data! A true master of the matrix, or just lazy?", criteria: {}, isUnlocked: false, category: ACHIEVEMENT_CATEGORY.META },
  // { id: ACHIEVEMENT_ID.YOU_FOUND_ME, name: 'Easter Egg Hunter 🥚🔍', description: "A keen eye! You've unearthed a hidden spot within the application. Now, what next?", criteria: {}, isUnlocked: false, category: ACHIEVEMENT_CATEGORY.META }
];

export const ACHIEVEMENT_CATEGORY_INFO: { [key in ACHIEVEMENT_CATEGORY]: CategoryInfo } = {
  [ACHIEVEMENT_CATEGORY.HEART_HOVER]: {
    name: 'Heart Interactions',
    description: 'Achievements related to your curious interaction with the mystical heart icon.'
  },
  [ACHIEVEMENT_CATEGORY.UNIQUE_HEART_MESSAGES]: {
    name: 'Heartfelt Discoveries',
    description: 'Uncovering the unique wisdom and whispers hidden within the heart.'
  },
  [ACHIEVEMENT_CATEGORY.RANDOM_GENERATOR]: {
    name: 'Random Generation Mastery',
    description: 'Creating chaotic and beautiful graphs with a touch of randomness.'
  },
  [ACHIEVEMENT_CATEGORY.LOCAL_SAVE]: {
    name: 'Local Preservation',
    description: 'The art of safeguarding your graph creations for future adventures.'
  },
  [ACHIEVEMENT_CATEGORY.NODE_CREATOR]: {
    name: 'Node Nurturing',
    description: 'Populating your graphs with a thriving community of nodes.'
  },
  [ACHIEVEMENT_CATEGORY.EDGE_CREATOR]: {
    name: 'Edge Forging',
    description: 'Connecting the dots and weaving intricate networks of edges.'
  },
  [ACHIEVEMENT_CATEGORY.ALGORITHM_RUN]: {
    name: 'Algorithmic Prowess',
    description: 'Demonstrating your skill by running various graph algorithms.'
  },
  [ACHIEVEMENT_CATEGORY.ALGORITHM_COMBO]: {
    name: 'Algorithmic Synergy',
    description: 'Mastering the combined power of multiple graph algorithms.'
  },
  [ACHIEVEMENT_CATEGORY.EDGE_DELETION]: {
    name: 'Snip Snip Surgeon',
    description: 'You’ve got scissors for hands and a vision for clean architecture. Edges fear you — and rightly so.'
  },
  [ACHIEVEMENT_CATEGORY.NODE_DELETION]: {
    name: 'Node-nado',
    description: 'Like a tornado with a grudge, you erase nodes with ruthless efficiency. Hope they had backups!'
  },
  [ACHIEVEMENT_CATEGORY.MISCHIEVOUS]: {
    name: 'Playful Shenanigans',
    description: 'Unlocking achievements by exploring the quirkier and more chaotic sides of GRAPS.'
  },
  [ACHIEVEMENT_CATEGORY.SECRET_INTERACTIONS]: {
    name: 'Hidden Talents',
    description: 'Discovering secret combos and unique interactions within the application.'
  },
  [ACHIEVEMENT_CATEGORY.META]: {
    name: 'Meta Discoveries',
    description: 'Going beyond the ordinary to find hidden features or interact with the app in unexpected ways.'
  }
};

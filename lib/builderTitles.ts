export const BUILDER_TITLES = [
  "Agent Architect",
  "Prompt Pirate",
  "Vector Alchemist",
  "GPU Whisperer",
  "Token Wrangler",
  "Inference Wizard",
  "Latency Slayer",
  "Runtime Rebel",
  "Open Source Goblin",
  "Memory Hacker",
  "Cloud Nomad",
  "Bug Hunter",
  "Context Engineer",
  "Model Whisperer",
  "Deployment Ninja",
] as const;

export type BuilderTitle = (typeof BUILDER_TITLES)[number];

export function getRandomBuilderTitle(): BuilderTitle {
  return BUILDER_TITLES[Math.floor(Math.random() * BUILDER_TITLES.length)];
}

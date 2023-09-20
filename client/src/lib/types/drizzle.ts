export type User = {
  id: string;
  username: string;
};

export type Key = {
  id: string;
  userId: string;
  hashedPassword: string;
};

export type Session = {
  id: string;
  userId: string;
  activeExpires: number;
  idleExpires: number;
};

export type PluginVersionEntry = {
  pluginId: string; // used to find the plugin in spaces
  version: string;
};

export type PluginVersions = {
  id: string;
  pluginId: string;
  versions: PluginVersionEntry[];
};

export type Plugin = {
  id: string;
  title: string;
  description: string;
  latestVersion: string;
  publisherId: string;
  createdAt: number;
  updatedAt: number;
};

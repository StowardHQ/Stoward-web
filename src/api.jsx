// API URL
const BASE_URL = "https://api.asraye.com/api";

// Fetch servers from API
export const fetchServers = async () => {
  const response = await fetch(`${BASE_URL}/servers`);
  if (!response.ok) {
    throw new Error("Failed to scout servers");
  }
  return response.json();
};

// Fetch server from API
export const fetchSingleServer = async (sid) => {
  const response = await fetch(`${BASE_URL}/servers/${sid}`);
  if (!response.ok) {
    throw new Error(`Failed to scout server with ID: ${sid}`);
  }
  return response.json();
};

// Fetch Stoward stats from API
export const fetchStats = async () => {
  const response = await fetch(`${BASE_URL}/stats`);
  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }
  return response.json();
};

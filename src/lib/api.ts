// Update this with your InfinityFree domain
export const API_BASE_URL = "https://your-domain.infinityfreeapp.com/api";

export interface ApiFounder {
  id: number;
  name: string;
  age: number;
  location: string;
  title: string;
  industry: string;
  experience: string;
  looking_for: string;
  skills: string[];
  bio: string;
  image_url: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// Get founders to swipe
export const getFounders = async (): Promise<ApiFounder[]> => {
  const response = await fetch(`${API_BASE_URL}/founders.php`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const result: ApiResponse<ApiFounder[]> = await response.json();
  
  if (!result.success) {
    throw new Error(result.message || "Failed to fetch founders");
  }
  
  return result.data || [];
};

// Record a swipe (like or pass)
export const recordSwipe = async (
  fromId: number,
  toId: number,
  action: "like" | "pass"
): Promise<{ isMatch: boolean }> => {
  const response = await fetch(`${API_BASE_URL}/swipe.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from_founder_id: fromId,
      to_founder_id: toId,
      action,
    }),
  });
  
  const result: ApiResponse<{ is_match: boolean }> = await response.json();
  
  if (!result.success) {
    throw new Error(result.message || "Failed to record swipe");
  }
  
  return { isMatch: result.data?.is_match || false };
};

// Get user's matches
export const getMatches = async (founderId: number): Promise<ApiFounder[]> => {
  const response = await fetch(`${API_BASE_URL}/matches.php?founder_id=${founderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  const result: ApiResponse<ApiFounder[]> = await response.json();
  
  if (!result.success) {
    throw new Error(result.message || "Failed to fetch matches");
  }
  
  return result.data || [];
};

// Login
export const login = async (email: string, password: string): Promise<{ founder: ApiFounder }> => {
  const response = await fetch(`${API_BASE_URL}/auth/login.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  
  const result: ApiResponse<{ founder: ApiFounder }> = await response.json();
  
  if (!result.success) {
    throw new Error(result.message || "Login failed");
  }
  
  return result.data!;
};

// Signup
export const signup = async (founderData: {
  name: string;
  email: string;
  password: string;
  age: number;
  location: string;
  title: string;
  industry: string;
  experience: string;
  looking_for: string;
  skills: string[];
  bio: string;
  image_url: string;
}): Promise<{ founder: ApiFounder }> => {
  const response = await fetch(`${API_BASE_URL}/auth/signup.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(founderData),
  });
  
  const result: ApiResponse<{ founder: ApiFounder }> = await response.json();
  
  if (!result.success) {
    throw new Error(result.message || "Signup failed");
  }
  
  return result.data!;
};

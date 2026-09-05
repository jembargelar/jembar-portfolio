const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase environment variables belum dikonfigurasi."
  );
}

const REST_URL = `${supabaseUrl}/rest/v1`;

async function publicRequest(table, params = {}) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      search.set(key, value);
    }
  });

  const response = await fetch(
    `${REST_URL}/${table}?${search.toString()}`,
    {
      method: "GET",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    const message = await response.text();

    return {
      data: null,
      error: new Error(
        `Supabase REST ${response.status}: ${message || response.statusText}`
      ),
    };
  }

  try {
    return {
      data: await response.json(),
      error: null,
    };
  } catch {
    return {
      data: null,
      error: new Error("Supabase REST mengembalikan response yang tidak valid."),
    };
  }
}

async function publicList(table, params = {}) {
  return publicRequest(table, params);
}

async function publicSingle(table, params = {}) {
  const result = await publicRequest(table, params);

  if (result.error) {
    return result;
  }

  const rows = Array.isArray(result.data) ? result.data : [];

  return {
    data: rows[0] ?? null,
    error: null,
  };
}

export async function getHeroContent() {
  return publicSingle("hero_content", {
    select: "*",
    is_active: "eq.true",
    order: "created_at.desc",
    limit: "1",
  });
}

export async function getAboutContent() {
  return publicSingle("about_content", {
    select: "*",
    is_active: "eq.true",
    order: "created_at.desc",
    limit: "1",
  });
}

export async function getExperiences() {
  return publicList("experiences", {
    select: "*",
    is_active: "eq.true",
    order: "sort_order.asc,created_at.asc",
  });
}

export async function getSkills() {
  return publicList("skills", {
    select: "*",
    is_active: "eq.true",
    order: "sort_order.asc",
  });
}

export async function getProjects() {
  return publicList("projects", {
    select: "*",
    order: "featured.desc,created_at.desc",
  });
}

export async function getProjectById(id) {
  return publicSingle("projects", {
    select: "*",
    id: `eq.${id}`,
    limit: "1",
  });
}

export async function getProjectGallery(projectId) {
  return publicList("gallery_items", {
    select: "*",
    project_id: `eq.${projectId}`,
    order: "sort_order.asc,created_at.asc",
  });
}

export async function getBuildServices() {
  return publicList("build_services", {
    select:
      "id,title_id,title_en,description_id,description_en,icon,sort_order,is_active",
    is_active: "eq.true",
    order: "sort_order.asc",
  });
}

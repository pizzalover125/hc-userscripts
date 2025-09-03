import { supabase } from "$lib/supabaseClient.js";

export async function load() {
  const { data } = await supabase.from("Projects").select();
  return {
    projects: data ?? [],
  };
}

export async function createProject({
  name,
  creator,
  description,
  image,
  github,
  demo,
}) {
  const { data, error } = await supabase
    .from("Projects")
    .insert([{ name, creator, description, image, github, demo }])
    .select();
  if (error) {
    throw error;
  }
  return data;
}

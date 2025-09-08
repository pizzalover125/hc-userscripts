import { supabase } from "$lib/supabaseClient.js";
import { fail } from "@sveltejs/kit";

export async function load() {
  const { data } = await supabase.from("Projects").select();
  return {
    projects: data ?? [],
  };
}

export const actions = {
  submit: async ({ request }) => {
    const data = await request.formData();
    const projectData = {
      name: data.get("name")?.toString().trim(),
      creator: data.get("creator")?.toString().trim(),
      description: data.get("description")?.toString().trim(),
      image: data.get("image")?.toString().trim() || null,
      github: data.get("github")?.toString().trim(),
      demo: data.get("demo")?.toString().trim() || null,
    };

    // Validation
    if (
      !projectData.name ||
      !projectData.creator ||
      !projectData.description ||
      !projectData.github
    ) {
      return fail(400, {
        error: "Please fill in all required fields.",
        values: projectData,
      });
    }

    if (!projectData.github.startsWith("https://github.com/")) {
      return fail(400, {
        error: "Please provide a valid GitHub URL.",
        values: projectData,
      });
    }

    if (projectData.demo && !isValidUrl(projectData.demo)) {
      return fail(400, {
        error: "Please provide a valid demo URL.",
        values: projectData,
      });
    }

    if (projectData.image && !isValidUrl(projectData.image)) {
      return fail(400, {
        error: "Please provide a valid image URL.",
        values: projectData,
      });
    }

    try {
      const { data: insertData, error } = await supabase
        .from("Projects")
        .insert([projectData])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        return fail(500, {
          error: "Failed to submit userscript. Please try again.",
          values: projectData,
        });
      }

      return {
        success: true,
        message: "Userscript submitted successfully!",
        data: insertData,
      };
    } catch (error) {
      console.error("Unexpected error:", error);
      return fail(500, {
        error: "An unexpected error occurred. Please try again.",
        values: projectData,
      });
    }
  },
};

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

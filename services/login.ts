import { createClient } from "@/utils/supabase/client";

type LoginData = {
  email: string;
  password: string;
};

export const loginUser = async ({ email, password }: LoginData) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
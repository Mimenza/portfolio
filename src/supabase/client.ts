// filepath: /home/emimenza/Github/portfolio/src/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

// Crear el cliente de Supabase usando las variables de entorno
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL || '',
  process.env.REACT_APP_SUPABASE_ANON_KEY || ''
);

export default supabase;
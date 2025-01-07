// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://azbppiezjcqmxbtkofom.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6YnBwaWV6amNxbXhidGtvZm9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyOTA0ODEsImV4cCI6MjA1MTg2NjQ4MX0.5A-IOawMGqmkBkpkiL1kjQXcKRfRyb17AJm2Ln48wzM';

export const supabase = createClient(supabaseUrl, supabaseKey);

// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xxvipjhvzyibydwcqjgk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4dmlwamh2enlpYnlkd2NxamdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwMDI5NjksImV4cCI6MjA1MDU3ODk2OX0.MJ33EM2-iW84fcmeCNS8c04QNRUXN-8gDgZFhRePyfs';

export const supabase = createClient(supabaseUrl, supabaseKey);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      tables: {
        Row: {
          id: number;
          table_number: number;
          status: string;
          current_waiter_id: number | null;
          customer_arrival_time: string | null;
          waiter_arrival_time: string | null;
          total_amount: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          table_number: number;
          status?: string;
          current_waiter_id?: number | null;
          customer_arrival_time?: string | null;
          waiter_arrival_time?: string | null;
          total_amount?: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          table_number?: number;
          status?: string;
          current_waiter_id?: number | null;
          customer_arrival_time?: string | null;
          waiter_arrival_time?: string | null;
          total_amount?: number;
          created_at?: string;
        };
      };
      waiters: {
        Row: {
          id: number;
          name: string;
          qr_code: string | null;
          performance_score: number;
          total_served_tables: number;
          late_arrivals: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          qr_code?: string | null;
          performance_score?: number;
          total_served_tables?: number;
          late_arrivals?: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          qr_code?: string | null;
          performance_score?: number;
          total_served_tables?: number;
          late_arrivals?: number;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: number;
          table_id: number;
          waiter_id: number;
          food_category: string;
          quantity: number;
          unit_price: number;
          total_price: number;
          order_time: string;
        };
        Insert: {
          id?: number;
          table_id: number;
          waiter_id: number;
          food_category: string;
          quantity?: number;
          unit_price: number;
          total_price: number;
          order_time?: string;
        };
        Update: {
          id?: number;
          table_id?: number;
          waiter_id?: number;
          food_category?: string;
          quantity?: number;
          unit_price?: number;
          total_price?: number;
          order_time?: string;
        };
      };
      reports: {
        Row: {
          id: number;
          table_id: number;
          waiter_id: number;
          session_start: string;
          session_end: string;
          total_amount: number;
          items_served: number;
          performance_rating: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          table_id: number;
          waiter_id: number;
          session_start: string;
          session_end: string;
          total_amount: number;
          items_served: number;
          performance_rating: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          table_id?: number;
          waiter_id?: number;
          session_start?: string;
          session_end?: string;
          total_amount?: number;
          items_served?: number;
          performance_rating?: number;
          created_at?: string;
        };
      };
    };
  };
};
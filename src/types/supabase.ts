export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      movielikes: {
        Row: {
          movieid: number;
          users: string[];
        };
        Insert: {
          movieid?: number;
          users: string[];
        };
        Update: {
          movieid?: number;
          users?: string[];
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          content: string | null;
          movieid: string | null;
          reviewid: string;
          userid: string;
        };
        Insert: {
          content?: string | null;
          movieid?: string | null;
          reviewid?: string;
          userid: string;
        };
        Update: {
          content?: string | null;
          movieid?: string | null;
          reviewid?: string;
          userid?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          email: string;
          name: string | null;
          profile: string | null;
          userid: string;
        };
        Insert: {
          email: string;
          name?: string | null;
          profile?: string | null;
          userid: string;
        };
        Update: {
          email?: string;
          name?: string | null;
          profile?: string | null;
          userid?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

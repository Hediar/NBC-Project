export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
declare global {
  interface Database {
    public: {
      Tables: {
        ignored_movies: {
          Row: {
            created_at: string;
            id: number;
            movie_id: string;
            user_id: string;
          };
          Insert: {
            created_at?: string;
            id?: number;
            movie_id?: string;
            user_id: string;
          };
          Update: {
            created_at?: string;
            id?: number;
            movie_id?: string;
            user_id?: string;
          };
          Relationships: [
            {
              foreignKeyName: 'ignored_movies_user_id_fkey';
              columns: ['user_id'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            }
          ];
        };
        movie_reviews: {
          Row: {
            created_at: string;
            id: number;
            movieId: string;
            quick_reviews: string[] | null;
            review: string | null;
            score: number | null;
            userId: string;
          };
          Insert: {
            created_at?: string;
            id?: number;
            movieId: string;
            quick_reviews?: string[] | null;
            review?: string | null;
            score?: number | null;
            userId: string;
          };
          Update: {
            created_at?: string;
            id?: number;
            movieId?: string;
            quick_reviews?: string[] | null;
            review?: string | null;
            score?: number | null;
            userId?: string;
          };
          Relationships: [
            {
              foreignKeyName: 'movie_reviews_userId_fkey';
              columns: ['userId'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            }
          ];
        };
        movielikes: {
          Row: {
            movieid: string;
            user_id: string[];
          };
          Insert: {
            movieid: string;
            user_id: string[];
          };
          Update: {
            movieid?: string;
            user_id?: string[];
          };
          Relationships: [];
        };
        reviews: {
          Row: {
            category: Json | null;
            content: string;
            date: string | null;
            keyword: string[] | null;
            movieid: string;
            review: string;
            reviewid: string;
            userid: string;
          };
          Insert: {
            category?: Json | null;
            content: string;
            date?: string | null;
            keyword?: string[] | null;
            movieid: string;
            review: string;
            reviewid?: string;
            userid: string;
          };
          Update: {
            category?: Json | null;
            content?: string;
            date?: string | null;
            keyword?: string[] | null;
            movieid?: string;
            review?: string;
            reviewid?: string;
            userid?: string;
          };
          Relationships: [
            {
              foreignKeyName: 'reviews_userid_fkey';
              columns: ['userid'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            }
          ];
        };
        users: {
          Row: {
            avatar_url: string | null;
            id: string;
            name: string | null;
            username: string | null;
            watched_movies: Json;
          };
          Insert: {
            avatar_url?: string | null;
            id: string;
            name?: string | null;
            username?: string | null;
            watched_movies?: Json;
          };
          Update: {
            avatar_url?: string | null;
            id?: string;
            name?: string | null;
            username?: string | null;
            watched_movies?: Json;
          };
          Relationships: [
            {
              foreignKeyName: 'users_id_fkey';
              columns: ['id'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            }
          ];
        };
        watch_later: {
          Row: {
            movies: string[];
            userid: string;
          };
          Insert: {
            movies: string[];
            userid: string;
          };
          Update: {
            movies?: string[];
            userid?: string;
          };
          Relationships: [
            {
              foreignKeyName: 'watch_later_userid_fkey';
              columns: ['userid'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            }
          ];
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
}

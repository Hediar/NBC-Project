export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

declare global {
  export interface Database {
    public: {
      Tables: {
        discussion_comments: {
          Row: {
            content: string;
            created_at: string;
            id: string;
            post_id: number;
            profiles: Json | null;
            user_id: string;
          };
          Insert: {
            content: string;
            created_at?: string;
            id?: string;
            post_id: number;
            profiles?: Json | null;
            user_id: string;
          };
          Update: {
            content?: string;
            created_at?: string;
            id?: string;
            post_id?: number;
            profiles?: Json | null;
            user_id?: string;
          };
          Relationships: [
            {
              foreignKeyName: 'discussion_comments_post_id_fkey';
              columns: ['post_id'];
              referencedRelation: 'discussion_post';
              referencedColumns: ['post_id'];
            },
            {
              foreignKeyName: 'discussion_comments_user_id_fkey';
              columns: ['user_id'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            }
          ];
        };
        discussion_comments_likes: {
          Row: {
            comments_id: string;
            created_at: string;
            id: number;
            user_id: string;
          };
          Insert: {
            comments_id: string;
            created_at?: string;
            id?: number;
            user_id: string;
          };
          Update: {
            comments_id?: string;
            created_at?: string;
            id?: number;
            user_id?: string;
          };
          Relationships: [
            {
              foreignKeyName: 'discussion_comments_likes_user_id_fkey';
              columns: ['user_id'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            },
            {
              foreignKeyName: 'fk_comments_id';
              columns: ['comments_id'];
              referencedRelation: 'discussion_comments';
              referencedColumns: ['id'];
            }
          ];
        };
        discussion_option: {
          Row: {
            content: string | null;
            option_id: number;
            post_id: number;
          };
          Insert: {
            content?: string | null;
            option_id?: number;
            post_id: number;
          };
          Update: {
            content?: string | null;
            option_id?: number;
            post_id?: number;
          };
          Relationships: [
            {
              foreignKeyName: 'discussion_option_post_id_fkey';
              columns: ['post_id'];
              referencedRelation: 'discussion_post';
              referencedColumns: ['post_id'];
            }
          ];
        };
        discussion_post: {
          Row: {
            comment_count: number | null;
            content: string | null;
            created_at: string;
            movie_genreIds: number[] | null;
            movie_id: string | null;
            movie_imgUrl: string | null;
            movie_title: string | null;
            post_id: number;
            title: string | null;
            user_id: string | null;
            view_count: number | null;
            vote_count: number | null;
          };
          Insert: {
            comment_count?: number | null;
            content?: string | null;
            created_at?: string;
            movie_genreIds?: number[] | null;
            movie_id?: string | null;
            movie_imgUrl?: string | null;
            movie_title?: string | null;
            post_id?: number;
            title?: string | null;
            user_id?: string | null;
            view_count?: number | null;
            vote_count?: number | null;
          };
          Update: {
            comment_count?: number | null;
            content?: string | null;
            created_at?: string;
            movie_genreIds?: number[] | null;
            movie_id?: string | null;
            movie_imgUrl?: string | null;
            movie_title?: string | null;
            post_id?: number;
            title?: string | null;
            user_id?: string | null;
            view_count?: number | null;
            vote_count?: number | null;
          };
          Relationships: [];
        };
        discussion_user: {
          Row: {
            id: number;
            option_id: number | null;
            post_id: number | null;
            user_id: string | null;
          };
          Insert: {
            id?: number;
            option_id?: number | null;
            post_id?: number | null;
            user_id?: string | null;
          };
          Update: {
            id?: number;
            option_id?: number | null;
            post_id?: number | null;
            user_id?: string | null;
          };
          Relationships: [
            {
              foreignKeyName: 'discussion_user_option_id_fkey';
              columns: ['option_id'];
              referencedRelation: 'discussion_option';
              referencedColumns: ['option_id'];
            },
            {
              foreignKeyName: 'discussion_user_post_id_fkey';
              columns: ['post_id'];
              referencedRelation: 'discussion_post';
              referencedColumns: ['post_id'];
            }
          ];
        };
        ignored_movies: {
          Row: {
            ignored_movies: string[];
            userid: string;
          };
          Insert: {
            ignored_movies: string[];
            userid: string;
          };
          Update: {
            ignored_movies?: string[];
            userid?: string;
          };
          Relationships: [
            {
              foreignKeyName: 'ignored_movies_userid_fkey';
              columns: ['userid'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            }
          ];
        };
        is_public: {
          Row: {
            discussion_post: boolean;
            movielikes: boolean;
            reviews: boolean;
            user_id: string;
            watch_later: boolean;
          };
          Insert: {
            discussion_post?: boolean;
            movielikes?: boolean;
            reviews?: boolean;
            user_id: string;
            watch_later?: boolean;
          };
          Update: {
            discussion_post?: boolean;
            movielikes?: boolean;
            reviews?: boolean;
            user_id?: string;
            watch_later?: boolean;
          };
          Relationships: [
            {
              foreignKeyName: 'is_public_user_id_fkey';
              columns: ['user_id'];
              referencedRelation: 'users';
              referencedColumns: ['id'];
            }
          ];
        };
        movie_ratings: {
          Row: {
            created_at: string;
            id: string;
            movie_id: string;
            ratings: number;
            user_id: string;
          };
          Insert: {
            created_at?: string;
            id?: string;
            movie_id: string;
            ratings: number;
            user_id: string;
          };
          Update: {
            created_at?: string;
            id?: string;
            movie_id?: string;
            ratings?: number;
            user_id?: string;
          };
          Relationships: [
            {
              foreignKeyName: 'movie_ratings_user_id_fkey';
              columns: ['user_id'];
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
        reviewlikes: {
          Row: {
            count: number | null;
            reviewid: string;
            user_id: string[];
          };
          Insert: {
            count?: number | null;
            reviewid: string;
            user_id: string[];
          };
          Update: {
            count?: number | null;
            reviewid?: string;
            user_id?: string[];
          };
          Relationships: [
            {
              foreignKeyName: 'reviewlikes_reviewid_fkey';
              columns: ['reviewid'];
              referencedRelation: 'reviews';
              referencedColumns: ['reviewid'];
            }
          ];
        };
        reviews: {
          Row: {
            category: Json | null;
            content: string;
            created_at: string;
            date: string | null;
            keyword: string[] | null;
            movie_title: string | null;
            movieid: string;
            rating: number | null;
            review: string;
            reviewid: string;
            userid: string;
          };
          Insert: {
            category?: Json | null;
            content: string;
            created_at?: string;
            date?: string | null;
            keyword?: string[] | null;
            movie_title?: string | null;
            movieid: string;
            rating?: number | null;
            review: string;
            reviewid?: string;
            userid: string;
          };
          Update: {
            category?: Json | null;
            content?: string;
            created_at?: string;
            date?: string | null;
            keyword?: string[] | null;
            movie_title?: string | null;
            movieid?: string;
            rating?: number | null;
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
            email: string | null;
            id: string;
            name: string | null;
            provider: string | null;
            username: string | null;
            watched_movies: string[];
          };
          Insert: {
            avatar_url?: string | null;
            email?: string | null;
            id: string;
            name?: string | null;
            provider?: string | null;
            username?: string | null;
            watched_movies?: string[];
          };
          Update: {
            avatar_url?: string | null;
            email?: string | null;
            id?: string;
            name?: string | null;
            provider?: string | null;
            username?: string | null;
            watched_movies?: string[];
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

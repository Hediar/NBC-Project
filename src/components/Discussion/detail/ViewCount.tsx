'use client';
import supabase from '@/supabase/config';
import React, { useEffect } from 'react';

type Props = {
  postId: number;
  viewCount: number;
};

const ViewCount = ({ postId, viewCount }: Props) => {
  useEffect(() => {
    const checkSeenPosts = async () => {
      const formData = new FormData();
      formData.append('postId', postId.toString());
      const res = await fetch(`${process.env.BASE_URL}/api/discussion/view`, { method: 'post', body: formData });
      const check = await res.json();

      if (check.message === '이미 봄') return;

      const { data, error } = await supabase
        .from('discussion_post')
        .update({ view_count: viewCount + 1 })
        .eq('post_id', postId)
        .select();
    };
    checkSeenPosts();
  }, []);
  return <></>;
};

export default ViewCount;

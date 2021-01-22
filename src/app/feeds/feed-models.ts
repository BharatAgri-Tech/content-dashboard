export interface NotificationType {
  id: number;
  name: string;
  lang: string;
  notif_type: string;
  priority: number;
  is_share: boolean;
  is_automated: boolean;
  background_image: string;
  text_color: string;
}

export interface Feed {
  notification_type: string;
  org_ids: number[];
  users_type: string;
  lang: string;
  news_lang: string[];
  preferred_lang: string[];
  delivery_type: string;
  youtube_video_link_en: string;
  youtube_video_link_mr: string;
  youtube_video_link_hi: string;
  secondary_redirection_hint_en: string;
  secondary_redirection_hint_mr: string;
  secondary_redirection_hint_hi: string;
  secondary_redirection_deeplink: string;
  title_en: string;
  title_mr: string;
  title_hi: string;
  image_id_en: number;
  image_id_mr: number;
  image_id_hi: number;
  message_en: string;
  message_mr: string;
  message_hi: string;
  should_schedule: boolean;
  schedule_to: string;
  crops: string[];
  state: string[];
  district: string[];
  taluka: string[];
  is_test_feed: boolean;
}

export interface FeedImage {
  id: number;
  detail: string;
  image: string;
}

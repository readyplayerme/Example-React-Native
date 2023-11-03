export type BodyType = 'halfbody' | 'fullbody';

export type Language =
  | 'en'
  | 'en-IE'
  | 'de'
  | 'fr'
  | 'es'
  | 'es-MX'
  | 'it'
  | 'pt'
  | 'pt-BR'
  | 'tr'
  | 'ja'
  | 'kr'
  | 'ch';

export type AvatarCreatorConfig = {
  clearCache?: boolean;
  bodyType?: BodyType;
  quickStart?: boolean;
  language?: Language;
};

/**
 * These are some of the parameters to fetch custom 2D Avatar image
 * More info about rest of parameters is available here:
 *
 * https://docs.readyplayer.me/ready-player-me/api-reference/rest-api/avatars/get-2d-avatars
 */
export type Avatar2DConfig = {
  expression?: 'happy' | 'lol' | 'sad' | 'scared' | 'rage';
  pose?: 'power-stance' | 'relaxed' | 'standing' | 'thumbs-up';
  camera?: 'fullbody' | 'portrait';
};

export type IFrameEvent<TPayload> = {
  eventName?: string;
  source?: string;
  data: TPayload;
};

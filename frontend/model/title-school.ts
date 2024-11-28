export type TitleSchool = {
  userId: UUID;
  imageUrl: string;
  caption: string;
}

export const isTitleSchool = (data: unknown): data is TitleSchool => {
  return typeof data === 'object' && data !== null && 'userId' in data && 'imageUrl' in data && 'caption' in data;
}

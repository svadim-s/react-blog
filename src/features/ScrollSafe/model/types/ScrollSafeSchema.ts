// Адресс страницы, позиция скролла
export type ScrollSchema = Record<string, number>

export interface ScrollSafeSchema {
  scroll: ScrollSchema
}

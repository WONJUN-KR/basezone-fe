// 피그마 디자인 시스템 아이콘 (Hugeicons, MIT) - 디자인 레포 HUGEICONS 에서 옮김
// batter-box 는 피그마에서 직접 그린 아이콘이라 같은 모양으로 다시 그림
// 색은 currentColor -> 쓰는 곳의 text-* 색을 따라감
export const ICONS = {
  search:
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m17 17l4 4m-2-10a8 8 0 1 0-16 0a8 8 0 0 0 16 0"/>',
  baseball:
    '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M6.5 3.7C8.4 6 9.5 8.9 9.5 12s-1.1 6-3 8.3M17.5 3.7c-1.9 2.3-3 5.2-3 8.3s1.1 6 3 8.3"/></g>',
  bat: '<g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"><path d="M5.46 20L20.556 8.69a3.738 3.738 0 1 0-5.246-5.247L4 18.541"/><path d="M5.578 21.843c1.502-2.072-1.332-4.932-3.42-3.418a.38.38 0 0 0-.046.577L5 21.888c.166.166.44.144.578-.045ZM10 17l-3-3"/><circle cx="2.5" cy="2.5" r="2.5" transform="matrix(-1 0 0 1 21 16)"/></g>',
  people:
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.5 20.5c-.234-2.931-2.658-5.252-5.692-5.448L11.999 15q-.431.012-.811.03C8.18 15.172 5.73 17.597 5.5 20.5m9.75-11.25a3.25 3.25 0 1 1-6.5 0a3.25 3.25 0 0 1 6.5 0M5.502 8.5A3.25 3.25 0 0 1 9.5 3.752M18.496 8.5A3.25 3.25 0 0 0 14.5 3.752M22 18c-.18-2.263-2-4.5-4-5M2 18c.18-2.263 2-4.5 4-5"/>',
  map: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m5.253 4.196l-1.227.712c-.989.573-1.483.86-1.754 1.337C2 6.722 2 7.302 2 8.464v8.164c0 1.526 0 2.29.342 2.714c.228.282.547.472.9.535c.53.095 1.18-.282 2.478-1.035c.882-.511 1.73-1.043 2.785-.898c.48.065.937.293 1.853.748l3.813 1.896c.825.41.833.412 1.75.412H18c1.886 0 2.828 0 3.414-.599c.586-.598.586-1.562.586-3.49v-6.74c0-1.927 0-2.89-.586-3.49c-.586-.598-1.528-.598-3.414-.598h-2.079c-.917 0-.925-.002-1.75-.412L10.84 4.015C9.449 3.323 8.753 2.977 8.012 3S6.6 3.415 5.253 4.196M8 3v14.5m7-11v14"/>',
  bookmark:
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 17.98V9.709c0-3.634 0-5.45 1.172-6.58S8.229 2 12 2s5.657 0 6.828 1.129C20 4.257 20 6.074 20 9.708v8.273c0 2.306 0 3.459-.773 3.871c-1.497.8-4.304-1.867-5.637-2.67c-.773-.465-1.16-.698-1.59-.698s-.817.233-1.59.698c-1.333.803-4.14 3.47-5.637 2.67C4 21.44 4 20.287 4 17.981"/>',
  bell: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.5 18a3.5 3.5 0 1 1-7 0m10.731 0H4.77a1.769 1.769 0 0 1-1.25-3.02l.602-.603A3 3 0 0 0 5 12.256V9.5a7 7 0 0 1 14 0v2.756a3 3 0 0 0 .879 2.121l.603.603a1.77 1.77 0 0 1-1.25 3.02"/>',
  user: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M20 21a7.53 7.53 0 0 0-7.005-6.934L12 14q-.531.015-1 .038c-3.7.181-6.716 3.268-7 6.962"/><circle cx="12" cy="7" r="4"/></g>',
  locate:
    '<g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.514 12a8.5 8.5 0 1 1-17 0a8.5 8.5 0 0 1 17 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M22.5 12h-2m-17 0h-2M12 1.5v2m0 17v2"/><path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z"/></g>',
  navigate:
    '<path fill="none" stroke="currentColor" stroke-width="1.5" d="M11.922 4.79c4.774-1.628 7.161-2.441 8.445-1.157s.47 3.67-1.157 8.445l-1.108 3.251c-1.25 3.667-1.875 5.5-2.906 5.652c-.277.04-.563.016-.837-.072c-1.02-.327-1.558-2.26-2.636-6.126c-.239-.857-.358-1.286-.63-1.614a2 2 0 0 0-.262-.261c-.328-.273-.756-.392-1.614-.631c-3.866-1.078-5.799-1.616-6.126-2.636a1.86 1.86 0 0 1-.072-.837c.152-1.03 1.985-1.656 5.652-2.906z"/>',
  chevron:
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 6s6 4.419 6 6s-6 6-6 6"/>',
  check:
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m5 14l3.5 3.5L19 6.5"/>',
  close:
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 6L6 18m12 0L6 6"/>',
  list: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="M8 5.5h12m-12 7h12m-12 7h12"/><path stroke-linejoin="round" d="M4.375 5.5H4.25m.25 0a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0m-.125 7H4.25m.25 0a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0m-.125 7H4.25m.25 0a.25.25 0 1 1-.5 0a.25.25 0 0 1 .5 0"/></g>',
  plus: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4"/>',
  back: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 6s-6 4.419-6 6s6 6 6 6"/>',
  "batter-box":
    '<rect x="3.75" y="3.75" width="16.5" height="16.5" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 20.25V16l3-2.75L15 16v4.25" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
} as const;

export type IconName = keyof typeof ICONS;
